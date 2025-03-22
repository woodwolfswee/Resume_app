export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
  
    const { email, fileName } = req.body; // Get user email and file name
    const bucketName = process.env.AWS_BUCKET_NAME;
  
    try {
      // Step 1: Download Resume from S3
      const filePath = await downloadResumeFromS3(bucketName, fileName);
  
      // Step 2: Extract Text from Resume
      const extractedText = await extractTextFromPDF(filePath);
  
      // Step 3: Extract Skills
      const skills = extractSkills(extractedText);
  
      // Step 4: Store in MongoDB
      await saveSkillsToDB(email, skills);
  
      res.status(200).json({ success: true, skills });
    } catch (error) {
      console.error("Error processing resume:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  