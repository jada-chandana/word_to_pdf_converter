const express = require("express"); 
const multer = require("multer"); //document upload
const cors = require("cors"); //connecting frontend to backend
const mammoth = require("mammoth");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path"); //path for store pdf

const app = express();
const port = 3000; //backend port

app.use(cors());

// Storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage });

// Convert DOCX → PDF manually (with spacing)
app.post("/convertFile", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const inputPath = req.file.path;
    const outputPath = path.join(
      __dirname,
      "files",
      req.file.originalname.replace(/\.[^/.]+$/, "") + ".pdf"
    );

    // Extract text from DOCX
    const { value: text } = await mammoth.extractRawText({ path: inputPath });

    // Create PDF
    const doc = new PDFDocument({
      size: "A4",
      margin: 20,
    });

    const writeStream = fs.createWriteStream(outputPath);
    doc.pipe(writeStream);

    doc.font("Times-Roman").fontSize(14);

    // Apply proper line spacing (NO LOOP)
    
    doc.text(text, {
      lineGap: 8, // Increase or decrease spacing
    });

    doc.end();

    writeStream.on("finish", () => {
      res.download(outputPath);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error converting file" });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
