const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Client } = require("pg");
const { Parser } = require("json2csv");
const PDFDocument = require("pdfkit");
const { PassThrough } = require("stream");
const NodeCache = require("node-cache");
const Buffer = require("buffer").Buffer;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create a new cache instance
const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 }); // TTL of 60 seconds

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "BAHARTEXPLOSIVE",
  password: "system",
  port: 5432,
});

client
  .connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Connection error", err.stack));

// Middleware to check cache
const checkCache = (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const cacheKey = `items:${page}:${limit}`;

  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log("Cache hit");
    return res.json(cachedData);
  } else {
    console.log("Cache miss");
    next();
  }
};

// Fetch data from barcode data with caching
app.get("/api/items", checkCache, async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;
  const cacheKey = `items:${page}:${limit}`;

  try {
    const result = await client.query(
      "SELECT DISTINCT l1, l2, l3 FROM barcodedata ORDER BY l1, l2, l3 LIMIT $1 OFFSET $2",
      [parseInt(limit), parseInt(offset)]
    );

    const data = result.rows;
    // Store the data in cache with TTL of 60 seconds
    cache.set(cacheKey, data);
    res.send(data);
  } catch (err) {
    console.error("Error fetching items:", err.message);
    res.status(500).send("An error occurred while fetching items.");
  }
});

// Get count of items with caching
app.get("/api/items-count", async (req, res) => {
  const cacheKey = "items-count";

  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log("Cache hit");
    return res.json({ count: cachedData });
  } else {
    console.log("Cache miss");
    try {
      const result = await client.query("SELECT COUNT(l3) FROM barcodedata");
      const count = result.rows[0].count;
      // Store the count in cache with TTL of 60 seconds
      cache.set(cacheKey, count);
      res.json({ count });
    } catch (err) {
      console.error("Error fetching total L3 count:", err.message);
      res.status(500).send("An error occurred while fetching the count.");
    }
  }
});

// Export data as CSV without quotes around fields
app.get("/api/export-csv", async (req, res) => {
  const cacheKey = "export-csv";

  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log("Cache hit");
    res.header("Content-Type", "text/csv");
    res.attachment("data.csv");
    return res.send(cachedData);
  } else {
    console.log("Cache miss");
    try {
      const result = await client.query("SELECT l1, l2, l3 FROM barcodedata");

      const fields = ["l1", "l2", "l3"];
      const opts = { fields, header: false, quote: "" };

      const parser = new Parser(opts);
      let csv = parser.parse(result.rows);

      csv = csv.replace(/"/g, ""); // Remove any quotes

      // Store the CSV data in cache with TTL of 60 seconds
      cache.set(cacheKey, csv);

      res.header("Content-Type", "text/csv");
      res.attachment("data.csv");
      res.send(csv);
    } catch (err) {
      console.error("Error exporting CSV:", err.message);
      res.status(500).send("An error occurred while exporting the data.");
    }
  }
});

// Export data as PDF
app.get("/api/export-pdf", async (req, res) => {
  const cacheKey = "export-pdf";

  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log("Cache hit");
    res.header("Content-Type", "application/pdf");
    res.attachment("data.pdf");
    return res.send(Buffer.from(cachedData, "base64"));
  } else {
    console.log("Cache miss");
    try {
      const result = await client.query(
        "SELECT l1, l2, l3 FROM barcodedata LIMIT 1000"
      );

      // Create a new PDF document
      const doc = new PDFDocument({ size: "A4", margin: 50 });
      const passThrough = new PassThrough();

      // Pipe the PDF document into the PassThrough stream
      doc.pipe(passThrough);

      // Buffer to store PDF data
      let buffers = [];

      passThrough.on("data", (chunk) => {
        buffers.push(chunk);
      });

      passThrough.on("end", () => {
        const pdfData = Buffer.concat(buffers);
        // Store the PDF data in cache as a base64 string
        cache.set(cacheKey, pdfData.toString("base64"));
        res.header("Content-Type", "application/pdf");
        res.attachment("data.pdf");
        res.send(pdfData);
      });

      doc.fontSize(18).text("Barcode Data", { align: "center" });
      doc.moveDown(1);

      // Add table headers
      doc
        .fontSize(12)
        .text("L1", { continued: true })
        .text("L2", { continued: true })
        .text("L3");
      doc.moveDown(0.5);

      // Add rows to the PDF
      result.rows.forEach((row) => {
        doc
          .fontSize(10)
          .text(row.l1, { continued: true })
          .text(row.l2, { continued: true })
          .text(row.l3);
      });

      // Finalize the PDF and end the stream
      doc.end();
    } catch (err) {
      console.error("Error exporting PDF:", err.message);
      res.status(500).send("An error occurred while exporting the data.");
    }
  }
});

app.listen(5000, () => console.log("Server is running on port 5000"));
