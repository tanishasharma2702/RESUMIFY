import fs from 'fs';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

/**
 * Extracts plain text from an uploaded PDF or DOCX file and deletes the temporary file.
 * @param {string} filePath - Absolute path to the uploaded file.
 * @param {string} mimeType - File MIME type.
 * @returns {Promise<string>} Extracted plain text.
 */
export const extractTextFromFile = async (filePath, mimeType) => {
  try {
    const fileBuffer = await fs.promises.readFile(filePath);
    let extractedText = '';

    if (mimeType === 'application/pdf' || filePath.toLowerCase().endsWith('.pdf')) {
      const data = await pdfParse(fileBuffer);
      extractedText = data.text || '';
    } else if (
      mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      filePath.toLowerCase().endsWith('.docx')
    ) {
      const result = await mammoth.extractRawText({ buffer: fileBuffer });
      extractedText = result.value || '';
    } else {
      throw new Error('Unsupported document format. Please upload a PDF or DOCX document.');
    }

    // Clean up excessive whitespace
    extractedText = extractedText.replace(/\r\n/g, '\n').replace(/\n\s*\n/g, '\n\n').trim();

    return extractedText;
  } finally {
    // Ephemeral file hygiene: Delete uploaded file immediately after extraction
    try {
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
      }
    } catch (cleanupErr) {
      console.warn('Temporary file cleanup warning:', cleanupErr.message);
    }
  }
};
