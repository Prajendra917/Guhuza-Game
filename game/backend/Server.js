
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 4000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// Dummy data
const players = [
    { id: 1, name: "Alice", score: 1500, badges: ["🏅 Top Scorer"] },
    { id: 2, name: "Scarlett", score: 1300, badges: ["🔥 Streak Master", "🏅"] },
    { id: 3, name: "Charlie", score: 1200 },
    { id: 4, name: "David", score: 1100, badges: ["🚀 Speedster"] },
    { id: 5, name: "Eve", score: 900 },
    { id: 6, name: "Alex", score: 880 , badges: ["🔥 Streak Master", "🏅"] },
    { id: 7, name: "Mark", score: 750 , },
    { id: 8, name: "Bob", score: 400, badges: ["🔥 Streak Master", "🏅"]  },
    { id: 9, name: "Jenny", score: 100 },
    { id: 10, name: "Gillian", score: 0, badges: [" Beginner"] }, 
];

// Route to get leaderboard data
app.get('/leaderboard', (req, res) => {
  res.json(players);
});

// Route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Game Leaderboard API! Use /leaderboard to get the leaderboard data.');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});