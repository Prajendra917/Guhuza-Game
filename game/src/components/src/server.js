import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());

// Proxy route to handle API requests
app.get('/api/quiz', async (req, res) => {
  const { level } = req.query; // Get the level from the query string
  const apiUrl = `https://api-ghz-v2.azurewebsites.net/api/v2/quiz?level=${level}`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error("API Error:", error.response?.status, error.response?.data);
    res.status(error.response?.status || 500).json({ error: "Failed to fetch data" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
