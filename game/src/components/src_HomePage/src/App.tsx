import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Modal from "./components/Modal";
import "./App.css";
import "../../../App";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import Card from "./components/Card";

function App() {
  const navigate = useNavigate(); 
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState(""); 
  const [modalContent, setModalContent] = useState<string[]>([]); 
  const handleOpenModal = (title: string, content: string) => {
    setModalTitle(title);
    setModalContent(content.split("\n")); 
    setIsOpen(true);
  };

  return (
    <div className="App">
      <div className="card-container">
        {/* Card 1 */}
        <Card 
          title="Game Rules"
          body={
            <div style={{ whiteSpace: "pre-line" }}>
              {`Five Stages of the Quiz:
        1. Self-Assessment 
        2. Resume Building
        3. Networking
        4. Job search
        5. Interview Preparation`}
            </div>
          }
          btn={{
            text: "SeeMore",
            type: "primary",
            filled: true,
            icon: <PaperAirplaneIcon />,
            onClick: () =>
              handleOpenModal(
                "📝Game Rules",
                `✅ 5 Stages & 10 Levels – Each level has 10 questions.
⏳ 20s Time Limit – Answer in time to earn more points.
⏳ The more time you take to answer a question, the fewer points you earn.
🎯 Pass with 8/10 – Fail? Repeat the level.
🔓 Complete Stage 1 to unlock the next.
🏆 Leaderboard – Top 3 get a resume review.
🤝 Invite Friends – Earn 100 points per invite & badges.
 

🚀 Play, Compete & Win!`
              ),
          }}
        />

        {/* Card 2 */}
        <Card
          title="How To Play"
          body="To start playing, click on the 'Play' button in the navigation bar. There are 3 difficulty levels in eawch stage — Beginner, Intermediate, Pro. Answer multiple-choice questions about job applications, interviews, and workplace skills. Score points for correct answers, compete with others, and climb the leaderboard to prove your job-readiness!"
          btn={{
            text: "SeeMore",
            type: "primary",
            filled: true,
            icon: <PaperAirplaneIcon />,
            onClick: () =>
              handleOpenModal(
                "How To Play",
                `To start playing, click on the 'Play' button in the navigation bar. There are 3 difficulty levels in each stage — Beginner, Intermediate, Pro. Answer multiple-choice questions about job applications, interviews, and workplace skills. Score points for correct answers, compete with others, and climb the leaderboard to prove your job-readiness!`
              ),
          }}
        />

        {/* Card 3 */}
        <Card
          title="Quiz Game"
          body="Test your job-seeking skills with exciting MCQs and climb the leaderboard! There are total of 500 questions divides into five stages of 10 levels each. You Must pass each level to unlock the next level. You must answer correclty on the given timeframe to earn more points or you can also earn points and badges by inviting friends and sharing your achievements on social media too ."
          btn={{
            text: "ClickToPlay",
            type: "primary",
            filled: true,
            icon: <PaperAirplaneIcon />,
            onClick: () => {
              navigate("/play");
            },
          }}
        />

        {/* Card 4 */}
        <Card
          title="Ranking"
          body={
            <div style={{ whiteSpace: "pre-line" }}>
              {`Click below to see Top  Rankers:
              Top Rankers For this week:
        1. ALice 
        2. Scarlett
        3. Charlie
        4. David
        5. Eve`}
            </div>}
          btn={{
            text: "Check",
            type: "primary",
            filled: true,
            icon: <PaperAirplaneIcon />,
            onClick: () => {
              navigate("/Leaderboard");
            },
          }}
        />

        {/* Card 5 */}
        <Card
          title="Leaderboard"
          body="Leaderboard position and Rewards. Check your position in the leaderboard section. Top 3 Users – Win a professional resume review & a Guhuza Pro badge. Stay in Top 10 for a week to earn extra points. Share achievements on Facebook, X, LinkedIn. Invite friends to earn points and unlock a special badge. Also, Our leaderboard refreshes every week."
          btn={{
            text: "SeeMore",
            type: "primary",
            filled: true,
            icon: <PaperAirplaneIcon />,
            onClick: () =>
              handleOpenModal(
                "🏆 Leaderboard & Rewards",
                `📊 Leaderboard Ranking – Check your position in the leaderboard section.
🥇 Top 3 Users – Win a professional resume review & a Guhuza Pro badge.
🔥 Streak Bonus – Stay in Top 10 for a week to earn extra points.
📣 Share & Shine – Post achievements on Facebook, X, LinkedIn.
🎉 Invite & Earn – Get 100 points per successful invite.
🏅 Special Badge – Invite 5 friends to unlock a profile badge.
`
              ),
          }}
        />

        {/* Card 6 */}
        <Card
          title="Badges"
          body="You can earn and redeem multiple badges. Badges are awarded for various achievements, such as completing a stage, passing a level, earning a certain number of points, and inviting friends. You can view your badges on your profile page and redeem them for points or rewards."
          btn={{
            text: "CheckHere",
            type: "primary",
            filled: true,
            icon: <PaperAirplaneIcon />, 
            onClick: () => {
              navigate("/Badges"); 
            },
          }}
          
        />
      </div>

      {/* Modal to display title and content */}
      {isOpen && (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <h2>{modalTitle}</h2>
          {modalContent.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </Modal>
      )}
    </div>
  );
}

export default App;
