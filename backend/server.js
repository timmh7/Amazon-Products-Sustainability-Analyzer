import express from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Helper to extract product description/materials from Amazon page
async function extractProductData(url) {
  try {
    console.log("Beginning product data extraction...")
    // Use axios to extract raw html
    const { data: html } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
      }
    });

    // Initialize cheerio to extract data from raw html
    const $ = cheerio.load(html);

    // Extract data
    const title = $('#productTitle').text().trim(); // Get product title
    const description = $('#feature-bullets').text().trim();  // get description
    const features = $('#climatePledgeFriendly').text().trim();  // get sustainability feats

    return {
      title,
      description,
      features
    };
  } catch (error) {
    throw new Error('Failed to extract product data');
  }
}

// ROUTES
app.post('/extract', async (req, res) => {
    console.log("Extract route succesfully called...")
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'Missing URL' });

    try {
        const data = await extractProductData(url);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to extract product data' });
    }
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
