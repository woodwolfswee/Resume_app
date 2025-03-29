import multer from "multer";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";

const unlinkFile = promisify(fs.unlink);

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const upload = multer({ dest: "uploads/" });

export const config = {
  api: {
    bodyParser: false,
  },
};

async function extractText(filePath, fileType) {
  try {
    if (fileType === "application/pdf") {
      const data = await pdfParse(fs.readFileSync(filePath));
      return data.text;
    } else if (
      fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const data = await mammoth.extractRawText({ path: filePath });
      return data.value;
    }
  } catch (error) {
    console.error("Error extracting text:", error);
    return "";
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const multerUpload = upload.single("resume");

    await new Promise((resolve, reject) => {
      multerUpload(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const extractedText = await extractText(req.file.path, req.file.mimetype);
    const skills = [
      ...new Set(
        (extractedText.match(/\b(Java|Python|AWS|React|Node\.js|SQL|MongoDB|Javascript|CSS|HTML|AI|Networking|Flutter|Kubernetes|Docker)\b/gi) || []).map(skill => skill.toLowerCase())
      ),
    ];

    const fileStream = fs.createReadStream(req.file.path);
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `resumes/${req.file.filename}${path.extname(req.file.originalname)}`,
      Body: fileStream,
      ContentType: req.file.mimetype,
    };

    await s3.send(new PutObjectCommand(uploadParams));
    await unlinkFile(req.file.path);

    return res.status(200).json({
      message: "Upload successful",
      extractedSkills: skills, // ✅ Return extracted skills
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ error: "Upload failed", details: error.message });
  }
}
