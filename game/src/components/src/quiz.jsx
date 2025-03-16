import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Assets/styles/quiz.css";
import axios from "axios";
import Invite from "./invite";
import { useNavigate } from "react-router-dom";
import Mascot_Start from "./Assets/Images/Guzuha-02.png";

const Quiz = () => {
  const navigate = useNavigate();
  const [level, setLevel] = useState(1);
  const [quizStarted, setQuizStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(20); // Visible timer (20 sec)
  const [calcTimer, setCalcTimer] = useState(60); // Internal scoring timer (60 sec)
  const [selectedStage, setSelectedStage] = useState("self-assessment");
  const [completedLevels, setCompletedLevels] = useState({
    "self-assessment": 9,
    "resume-building": 0,
    "networking": 0,
    "job-search-strategies": 0,
    "interview-preparation": 0,
  });
  const [timeIsRunning, setTimeIsRunning] = useState(true);
  const [showResult, setShowResult] = useState(true);
  const [reloadQuiz, setReloadQuiz] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [showContinueScreen, setShowContinueScreen] = useState(false);

  const stages = [
    "self-assessment",
    "resume-building",
    "networking",
    "job-search-strategies",
    "interview-preparation",
  ];

  // Fetch quiz questions based on level, stage, and reload trigger
  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchQuizQuestions = async (lvl, stage) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/quiz?level=${lvl}&stage=${stage}`
        );
        if (response.data?.test?.question) {
          setQuestions(response.data.test.question);
        } else {
          setError("Invalid API response format. Check server console.");
        }
        setQuestionIndex(0);
        setTimeLeft(20);
        setCalcTimer(60);
      } catch (err) {
        setError("Failed to load questions.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuizQuestions(level, selectedStage);
  }, [level, selectedStage, reloadQuiz]);

  // Visible countdown timer (20 sec)
  useEffect(() => {
    if (!quizStarted || showContinueScreen) return;
    if (timeLeft === 0) {
      setTimeIsRunning(false);
      return;
    }
    const visibleInterval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(visibleInterval);
  }, [timeLeft, quizStarted, showContinueScreen]);

  // Internal scoring timer (decreases 3 per second)
  useEffect(() => {
    if (!quizStarted || showContinueScreen) return;
    if (calcTimer <= 0) return;
    const calcInterval = setInterval(() => {
      setCalcTimer((prev) => Math.max(prev - 3, 0));
    }, 1000);
    return () => clearInterval(calcInterval);
  }, [calcTimer, quizStarted, showContinueScreen]);

  // Calculate points based on elapsed time
  const calculatePoints = () => {
    const elapsed = 60 - calcTimer;
    if (elapsed < 10) return 100;
    else if (elapsed < 20) return 90;
    else if (elapsed < 30) return 80;
    else if (elapsed < 40) return 70;
    else if (elapsed < 50) return 60;
    else if (elapsed < 60) return 50;
    else return 40;
  };

  // Determine CSS class for level difficulty
  const getLevelClass = (lvl) => {
    if (lvl <= 3) return "beginner";
    if (lvl <= 7) return "amateur";
    return "pro";
  };

  // Reset state when stage changes
  const handleStageChange = (e) => {
    setSelectedStage(e.target.value);
    setLevel(1);
    setQuestions([]);
    setFeedback("");
    setSelectedOption(null);
    setTimeLeft(20);
    setCalcTimer(60);
    setTimeIsRunning(true);
    setShowResult(true);
    setQuizStarted(false);
    setShowContinueScreen(false);
    setCorrectCount(0);
  };

  // Handle level selection click
  const handleLevelClick = (selectedLevel) => {
    const currentStageIndex = stages.indexOf(selectedStage);
    const minLevelForStage = currentStageIndex * 10 + 1;
    const maxLevelForStage = minLevelForStage + 9;
    if (selectedLevel >= minLevelForStage && selectedLevel <= maxLevelForStage) {
      if (selectedLevel <= completedLevels[selectedStage] + 1) {
        if (selectedLevel === level) {
          setQuizStarted(false);
          setQuestions([]);
          setFeedback("");
          setSelectedOption(null);
          setTimeLeft(20);
          setCalcTimer(60);
          setTimeIsRunning(true);
          setShowResult(true);
          setReloadQuiz((prev) => prev + 1);
          setCorrectCount(0);
        } else {
          setLevel(selectedLevel);
          setQuizStarted(false);
          setQuestions([]);
          setFeedback("");
          setSelectedOption(null);
          setTimeLeft(20);
          setCalcTimer(60);
          setTimeIsRunning(true);
          setShowResult(true);
          setCorrectCount(0);
        }
      } else {
        alert("This level is locked. Complete previous levels first.");
      }
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  // Start quiz
  const handleStart = () => {
    setQuizStarted(true);
    setShowContinueScreen(false);
    setCorrectCount(0);
    setTimeLeft(20);
    setCalcTimer(60);
    setTimeIsRunning(true);
  };

  // Process answer and navigate to next question or finish quiz
  const handleNext = () => {
    if (!selectedOption) {
      alert("Please select an answer before proceeding.");
      return;
    }
    if (
      !questions ||
      !questions[questionIndex] ||
      questions[questionIndex].test_answer === undefined
    ) {
      alert("An error occurred. Please restart the quiz.");
      return;
    }
    const normalizedCorrect = questions[questionIndex].answers[
      questions[questionIndex].test_answer
    ]?.toString().trim().toLowerCase();
    const normalizedSelected = selectedOption?.toString().trim().toLowerCase();
    if (normalizedSelected === normalizedCorrect) {
      const points = calculatePoints();
      setScore((prev) => prev + points);
      setCorrectCount((prev) => prev + 1);
      setFeedback(`✅ Correct! (+${points} points)`);
    } else {
      setFeedback("❌ Incorrect!");
    }
    if (questionIndex < questions.length - 1) {
      setTimeout(() => {
        setQuestionIndex(questionIndex + 1);
        setFeedback("");
        setSelectedOption(null);
        setTimeLeft(20);
        setCalcTimer(60);
        setShowResult(true);
        setTimeIsRunning(true);
      }, 500);
    } else {
      handleFinish();
    }
  };

  // Finalize quiz and update levels based on performance
  const handleFinish = () => {
    if (!selectedOption) {
      alert("Please select an answer before proceeding.");
      return;
    }
    if (
      !questions ||
      !questions[questionIndex] ||
      questions[questionIndex].test_answer === undefined
    ) {
      alert("An error occurred. Please restart the quiz.");
      return;
    }
    
    let newCorrectCount = correctCount;
    const normalizedCorrect = questions[questionIndex].answers[
      questions[questionIndex].test_answer
    ]?.toString().trim().toLowerCase();
    const normalizedSelected = selectedOption?.toString().trim().toLowerCase();
  
    if (normalizedSelected === normalizedCorrect) {
      const points = calculatePoints();
      setScore((prev) => prev + points);
      newCorrectCount++;
      setFeedback(`✅ Right Answer! (+${points} points)`);
    } else {
      setFeedback("❌ Wrong Answer!");
    }
  
    setTimeout(() => {
      if (newCorrectCount < 8) {
        setFeedback("You did not pass. Please retry the level.");
      } else {
        let updatedCompletedLevels = { ...completedLevels };
        updatedCompletedLevels[selectedStage] = Math.max(
          updatedCompletedLevels[selectedStage],
          level
        );
        if (level % 10 !== 0) {
          setLevel(level + 1);
        } else {
          const currentStageIndex = stages.indexOf(selectedStage);
          if (currentStageIndex < stages.length - 1) {
            const nextStage = stages[currentStageIndex + 1];
            updatedCompletedLevels[nextStage] = (currentStageIndex + 1) * 10;
            setSelectedStage(nextStage);
            setLevel(updatedCompletedLevels[nextStage] + 1);
          } else {
            alert("🎉 You've completed all stages!");
            setTimeIsRunning(false);
            return;
          }
        }
        if (newCorrectCount === questions.length) {
          setScore((prev) => prev + 100);
          setFeedback((prev) => prev + " + Bonus 100!");
        }
        setCompletedLevels(updatedCompletedLevels);
      }
      
      setQuestionIndex(0);
      setTimeLeft(20);
      setCalcTimer(60);
      setTimeIsRunning(false);
      setSelectedOption(null);
      setCorrectCount(newCorrectCount);
      setShowContinueScreen(true);
      setFeedback("");
    }, 500);
  };
  
  // Continue to next attempt or level
  const handleContinue = () => {
    setShowContinueScreen(false);
    setTimeLeft(20);
    setCalcTimer(60);
    setTimeIsRunning(true);
  };
  
  // Award bonus points for inviting a friend
  const handleInviteBonus = () => {
    setScore((prev) => prev + 100);
    alert("Bonus 100 points for inviting a friend!");
  };

  return (
    <>
      <div className="quiz-container">
        <div className="levels-container">
          <h3>Current Stage</h3>
          <select
            className="form-select"
            value={selectedStage}
            onChange={handleStageChange}
          >
            {stages.map((stage) => (
              <option
                key={stage}
                value={stage}
                disabled={completedLevels[stage] === 0 && stage !== "self-assessment"}
              >
                📌 {stage.charAt(0).toUpperCase() + stage.slice(1).replace(/-/g, " ")}
              </option>
            ))}
          </select>
          <div className="levels-wrapper">
            <div className="legend-container">
              <div className="legend-item">
                <span className="legend-color beginner"></span>
                <span>Beginner</span>
              </div>
              <div className="legend-item">
                <span className="legend-color amateur"></span>
                <span>Intermediate</span>
              </div>
              <div className="legend-item">
                <span className="legend-color pro"></span>
                <span>Pro</span>
              </div>
              <div className="legend-item">
                <span className="legend-color locked"></span>
                <span>Locked</span>
              </div>
            </div>
            <div className="levels-content">
              <h5>Game Levels</h5>
              <div className="levels">
                {[...Array(10)].map((_, i) => {
                  const stageIndex = stages.indexOf(selectedStage);
                  const levelNumber = stageIndex * 10 + i + 1;
                  const isLocked = levelNumber > completedLevels[selectedStage] + 1;
                  return (
                    <button
                      key={i}
                      className={`level-btn ${getLevelClass(levelNumber)} ${isLocked ? "locked" : ""}`}
                      onClick={() => handleLevelClick(levelNumber)}
                      disabled={isLocked}
                    >
                      Level {levelNumber}
                      {isLocked && <span className="lock-icon">🔒</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="quiz-card">
          {!quizStarted ? (
            <div className="start-screen">
              <h3>Ready to start the GUHUZA QUIZ?</h3>
              <div className="start-screen-img">
                <button className="btn btn-success" onClick={handleStart}>
                  Start Quiz
                </button>
                <img src={Mascot_Start} alt="Start Quiz Mascot" className="start-mascot" />
              </div>
            </div>
          ) : showContinueScreen ? (
            <div className="start-screen">
              <h3>
                {correctCount < 8
                  ? "You did not pass. Retry Level?"
                  : `Continue to Level ${level}?`}
              </h3>
              <button className="btn btn-success" onClick={handleContinue}>
                {correctCount < 8 ? "Retry Level" : "Continue"}
              </button>
            </div>
          ) : loading ? (
            <h3 className="mt-3">Loading question...</h3>
          ) : error ? (
            <h3 className="mt-3 text-danger">{error}</h3>
          ) : questions && questions.length > 0 && questions[questionIndex] ? (
            <>
              <div className="d-flex justify-content-between align-items-center">
                <span className="current-status">
                  {selectedStage.replace(/-/g, " ")} &gt; Level {level} &gt; Q{questionIndex + 1}
                </span>
                <span className="timer-badge">⏳ {timeLeft}s</span>
              </div>
              <h3 className="mt-3">{questions[questionIndex].question}</h3>
              <div className="mt-4">
                {questions[questionIndex].answers.map((option, idx) => (
                  <label key={idx} className="radio-label">
                    <input
                      type="radio"
                      name="answer"
                      value={option}
                      checked={selectedOption === option}
                      onChange={() => handleOptionClick(option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
              {showResult && <p className="fw-bold">{feedback}</p>}
              {questionIndex < questions.length - 1 ? (
                <button className="next-btn" onClick={handleNext} disabled={!selectedOption}>
                  Next
                </button>
              ) : (
                <button className="next-btn" onClick={handleFinish} disabled={!selectedOption}>
                  Finish
                </button>
              )}
            </>
          ) : (
            <div>No questions available for this level.</div>
          )}
        </div>

        <div className="right-panel">
          <div className="score-container">
            <h4>Current Score</h4>
            <p>{score}</p>
          </div>
          <div className="actions-container">
          <button className="leaderboard-btn" onClick={() => navigate("/Leaderboard")}>
  See Leaderboard
</button>

            <Invite>
              <button className="invite-btn"> Invite Friends</button>
            </Invite>
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;
