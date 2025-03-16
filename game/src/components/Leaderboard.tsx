import React, { useState, useEffect } from "react";
import "./Leaderboard.css";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

type Player = {
  id: number;
  name: string;
  score: number;
  badges?: string[];
};

const Leaderboard: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const [currentUser] = useState<Player>({
    id: 1,
    name: "Alice",
    score: 1500,
    badges: ["🏅 Top Scorer"],
  });

  const fetchData = async () => {
    
    try {
      const response = await fetch("http://localhost:4000/leaderboard");
      if (!response.ok) throw new Error("Failed to fetch leaderboard data");
      const data = await response.json();
      // Sort players by descending score
      setPlayers(data.sort((a: Player, b: Player) => b.score - a.score));
      setError(null);
    } catch (err) {
      console.error("Error fetching leaderboard data:", err);
      setError("Failed to load leaderboard. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleReset = () => {
    setLoading(true);
    fetchData();
  };



  // Calculate current user's rank from players array
  const userIndex = players.findIndex((player) => player.id === currentUser.id);
  const navigate = useNavigate();
  const userRank = userIndex !== -1 ? userIndex + 1 : "N/A";

  return (
    <>
      <Header />
      <div className="leaderboard-page container mt-5">
        <div className="row align-items-center">
          {/* Left Column: Leaderboard */}
          <div className="col-md-8 mb-4">
            <div className="card shadow">
              <div className="card-body">
                <h2 className="leaderboard-title">🏆 Quiz Leaderboard</h2>
                {loading ? (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "400px" }}
                  >
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : error ? (
                  <div className="alert alert-danger text-center">{error}</div>
                ) : (
                  <table className="leaderboard-table table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Rank</th>
                        <th scope="col">Player</th>
                        <th scope="col">Score</th>
                        <th scope="col">Badges</th>
                      </tr>
                    </thead>
                    <tbody>
                      {players.map((player, index) => (
                        <tr key={player.id}>
                          <td>{index + 1}</td>
                          <td>{player.name}</td>
                          <td>{player.score}</td>
                          <td>
                            {player.badges && player.badges.length > 0 ? (
                              player.badges.map((badge, i) => (
                                <span key={i} className="badge bg-secondary me-1">
                                  {badge}
                                </span>
                              ))
                            ) : (
                              <span className="badge bg-light text-muted">
                                None
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                <div className="d-flex justify-content-center mt-4">
                  <button
                    className="btn btn-primary"
                    onClick={handleReset}
                    disabled={loading}
                  >
                    {loading ? "Refreshing..." : "Refresh Leaderboard"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: User Score, Rank & Badges */}
          <div className="col-md-4 d-flex align-items-center">
            <div className="card shadow mb-4 score-card w-100">
              <div className="card-body">
                <h4>Your Score</h4>
                <p className="score-value">{currentUser.score}</p>
                <div className="rank-section">
                  <h5>Your Rank</h5>
                  <p className="rank-value">{userRank}</p>
                </div>
                <hr />
                <h5>Your Badges</h5>
                <div className="badge-container">
                  {currentUser.badges && currentUser.badges.length > 0 ? (
                    currentUser.badges.map((badge, i) => (
                      <span key={i} className="badge bg-secondary">
                        {badge}
                      </span>
                    ))
                  ) : (
                    <span className="badge bg-light text-muted">None</span>
                  )}
                </div>
                <button className="redeem-btn" onClick={() => navigate("/Badges")}>
                  Redeem Badges
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Leaderboard;
