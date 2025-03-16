import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./Profile.css";
import ProfileImage from "../components/src/Assets/Images/Guzuha-03.jpg";

type Player = {
  id: number;
  name: string;
  score: number;
  badges?: string[];
};

type ProfileData = Player & {
  email: string;
  profilePicture: string;
  currentLevel: number;
  currentStage: string;
  currentRank: number;
};

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  // Fetch profile data from the leaderboard API and pick the user with id: 1.
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:4000/leaderboard");
        if (!response.ok) throw new Error("Failed to fetch profile data");
        const data: Player[] = await response.json();
        const currentUser = data.find((player) => player.id === 1);
        if (currentUser) {
          setProfile({
            ...currentUser,
            email: "alice123@gmail.com",
            profilePicture: ProfileImage,
            currentLevel: 5, 
            currentStage: "resume-building", 
            currentRank: 1,
          });
        } else {
          setError("Current user not found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="container text-center mt-5">Loading profile...</div>;
  }
  if (error) {
    return <div className="container text-center mt-5">{error}</div>;
  }
  if (!profile) return null;

  return (
    <>
      <Header />
      <div className="profile-page container">
        <div className="card profile-card shadow">
          <div className="card-body">
            <div className="profile-header text-center">
              <img
                src={profile.profilePicture}
                alt="Profile"
                className="profile-picture mb-3"
              />
              <h2 className="profile-name">{profile.name}</h2>
              <p className="profile-email">{profile.email}</p>
            </div>
            <div className="profile-info mt-4 d-flex justify-content-around">
              <div className="info-item text-center">
                <h5>Points</h5>
                <p className="info-value">{profile.score}</p>
              </div>
              <div className="info-item text-center">
                <h5>Rank</h5>
                <p className="info-value">{profile.currentRank}</p>
              </div>
            </div>
            <div className="profile-extra mt-4 d-flex justify-content-around">
              <div className="extra-item text-center">
                <h5>Current Level</h5>
                <p className="extra-value">{profile.currentLevel}</p>
              </div>
              <div className="extra-item text-center">
                <h5>Current Stage</h5>
                <p className="extra-value">{profile.currentStage}</p>
              </div>
            </div>
            <div className="profile-badges mt-4 text-center">
              <h5>Your Badges</h5>
              <div className="badge-container">
                {profile.badges && profile.badges.length > 0 ? (
                  profile.badges.map((badge, index) => (
                    <span key={index} className="badge bg-secondary me-1">
                      {badge}
                    </span>
                  ))
                ) : (
                  <span className="badge bg-light text-muted">No badges yet</span>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <button
                className="redeem-btn"
                onClick={() => Navigate("/Badges")}
              >
                Redeem Badges
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
