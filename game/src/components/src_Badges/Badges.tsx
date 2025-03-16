import React, { useState } from "react";
import "./Badges.css";
import Header from "../Header";
import Footer from "../Footer";

interface Badge {
  title: string;
  description: string;
  pointsRequired?: number; // Optional pointsRequired property
}

const badges: Badge[] = [
  {
    title: "Job Seeker Pro",
    description: "Awarded for completing all levels of the Beginner tier.",
  },
  {
    title: "Interview Ace",
    description:
      "Awarded for answering all interview questions correctly in the Intermediate tier.",
  },
  {
    title: "Referral Master",
    description: "Awarded for referring at least 20 friends to the Guhuza platform.",
  },
  {
    title: "Expert Recruiter",
    description: "Earned when your profile is visited by at least 50 recruiters.",
  },
  {
    title: "Networking Guru",
    description: "Awarded for connecting with 10 or more recruiters on the platform.",
  },
  {
    title: "Scholar",
    description:
      "Awarded for consistently answering advanced-level questions correctly in the quiz game.",
    pointsRequired: 1000,
  },
  {
    title: "Mastermind",
    description:
      "Earned by achieving top scores in the toughest rounds, demonstrating strategic thinking and precision.",
    pointsRequired: 1500,
  },
  {
    title: "Expert",
    description:
      "Awarded for consistently mastering complex questions with accuracy in both the Advanced and Pro rounds.",
  },
  {
    title: "Speedster",
    description:
      "Earned for completing rapid-fire rounds with speed and accuracy, staying calm under pressure.",
  },
  {
    title: "Genius",
    description:
      "Awarded for consistently achieving flawless victories and conquering the most difficult questions.",
    pointsRequired: 1200,
  },
  {
    title: "Champion",
    description:
      "Awarded to those who consistently perform at the highest level, winning tournaments or top positions.",
    pointsRequired: 1500,
  },
  {
    title: "Pioneer",
    description:
      "Earned for unlocking new levels or challenges, pushing the boundaries of the quiz game.",
  },
  {
    title: "Ace",
    description:
      "Awarded for achieving a perfect score in a difficult round or category, demonstrating exceptional knowledge and skill.",
    pointsRequired: 800,
  },
  {
    title: "Fast Learner",
    description:
      "Earned by completing a level with all correct answers in under 2 minutes.",
  },
  {
    title: "Social Sharer",
    description: "Earned by sharing your leaderboard position on social media.",
  },
  {
    title: "Top Recruit",
    description: "Given to players who achieve the highest score in the Advanced level.",
  },
];

const Badges: React.FC = () => {
  const [points, setPoints] = useState<number>(1200); // Example starting points

  const redeemBadge = (badge: Badge) => {
    if (badge.pointsRequired && points >= badge.pointsRequired) {
      alert(`${badge.title} has been redeemed!`);
      setPoints(points - badge.pointsRequired); // Deduct points after redemption
    } else {
      alert(`You need ${badge.pointsRequired} points to redeem ${badge.title}.`);
    }
  };

  return (
    <>
      <Header />
      <div className="badges-container">
        <h2 className="badges-title">Reedem Badges For Points or Earn Them</h2>

        {/* Eye-catching points display */}
        <div className="points-display">
          <h3>Your Points</h3>
          <p className="points-value">{points}</p>
        </div>

        <div className="badges-grid">
          {badges.map((badge, index) => (
            <div key={index} className="badge-card">
              <span className="badge-title">{badge.title}</span>
              <p className="badge-description">{badge.description}</p>

              {badge.pointsRequired ? (
                points >= badge.pointsRequired ? (
                  <button
                    onClick={() => redeemBadge(badge)}
                    className="redeem-button"
                  >
                    Redeem for {badge.pointsRequired} points
                  </button>
                ) : (
                  <p className="badge-requirement">
                    Requires {badge.pointsRequired} points
                  </p>
                )
              ) : (
                <p className="badge-requirement">No points required for this badge</p>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Badges;
