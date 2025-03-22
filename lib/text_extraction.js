import pdfParse from "pdf-parse";
import fs from "fs";

async function extractTextFromPDF(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const pdfData = await pdfParse(dataBuffer);
  return pdfData.text;
}
