import React, { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const quizDataByLevel = {
  // ... (same as before)
  easy: [
    // ... (same as before)
  ],
  medium: [
    // ... (same as before)
  ],
  hard: [
    // ... (same as before)
  ],
};

function Quiz() {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizStats, setQuizStats] = useState({
    totalTime: 0,
    averageTime: 0,
    correctStreak: 0,
    maxStreak: 0,
  });

  const startQuiz = (level) => {
    setSelectedLevel(level);
    setQuizData(quizDataByLevel[level]);
    setQuizStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setTimeLeft(45);
    setShowExplanation(false);
    setQuizStats({
      totalTime: 0,
      averageTime: 0,
      correctStreak: 0,
      maxStreak: 0,
    });
  };

  const resetQuiz = () => {
    setSelectedLevel(null);
    setQuizData([]);
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setTimeLeft(45);
    setShowExplanation(false);
    setQuizStats({
      totalTime: 0,
      averageTime: 0,
      correctStreak: 0,
      maxStreak: 0,
    });
  };

  const handleNext = useCallback(() => {
    const isCorrect = selectedAnswer === quizData[currentQuestion].correct;
    const timeSpent = 45 - timeLeft;

    setQuizStats((prev) => {
      const newCorrectStreak = isCorrect ? prev.correctStreak + 1 : 0;
      const newMaxStreak = isCorrect
        ? Math.max(prev.maxStreak, newCorrectStreak)
        : prev.maxStreak;
      const newTotalTime = prev.totalTime + timeSpent;
      return {
        ...prev,
        correctStreak: newCorrectStreak,
        maxStreak: newMaxStreak,
        totalTime: newTotalTime,
      };
    });

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setTimeLeft(45);
      setShowExplanation(false);
    } else {
      setQuizStats((prev) => {
        const finalTotalTime = prev.totalTime;
        const averageTime = Math.round(finalTotalTime / quizData.length);
        return { ...prev, averageTime };
      });
      setShowResult(true);
    }
  }, [selectedAnswer, currentQuestion, timeLeft, quizData]);

  const handleAnswerClick = (answerIndex) => {
    if (!showExplanation) {
      setSelectedAnswer(answerIndex);
    }
  };

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  useEffect(() => {
    let interval;
    if (quizStarted && !showResult && timeLeft > 0 && !showExplanation) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0 && !showExplanation) {
      handleNext();
    }

    return () => clearInterval(interval);
  }, [quizStarted, showResult, timeLeft, showExplanation, handleNext]);

  const getScoreMessage = () => {
    const percentage = (score / quizData.length) * 100;
    if (percentage >= 90) return "🌟 Outstanding! You're a true genius!";
    if (percentage >= 80) return "🎉 Excellent work! Very impressive!";
    if (percentage >= 70) return "👏 Great job! Well done!";
    if (percentage >= 60) return "👍 Good effort! Keep practicing!";
    return "📚 Keep studying and you'll improve!";
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case "easy":
        return "#d4edda";
      case "medium":
        return "#fff3cd";
      case "hard":
        return "#f8d7da";
      default:
        return "#e2e3e5";
    }
  };

  if (!quizStarted) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow">
              <div className="card-body">
                <h1 className="card-title text-center mb-4">
                  🧠 RMSC Knowledge Challenge
                </h1>
                <p className="text-center">
                  Test your knowledge in Mathematics, Science, and Computer
                  Science!
                </p>
                <h3 className="text-center mt-4">
                  Choose Your Challenge Level:
                </h3>
                <div className="row my-4">
                  <div className="col-4">
                    <div
                      className="card text-center border-success mb-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => startQuiz("easy")}
                    >
                      <div className="card-body">
                        <div style={{ fontSize: "2rem" }}>🌱</div>
                        <h5 className="card-title">Easy</h5>
                        <p className="card-text">Perfect for beginners</p>
                        <div>
                          <span className="badge bg-success me-1">
                            8 Questions
                          </span>
                          <span className="badge bg-light text-success border border-success">
                            Basic
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div
                      className="card text-center border-warning mb-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => startQuiz("medium")}
                    >
                      <div className="card-body">
                        <div style={{ fontSize: "2rem" }}>🔥</div>
                        <h5 className="card-title">Medium</h5>
                        <p className="card-text">For intermediate learners</p>
                        <div>
                          <span className="badge bg-warning text-dark me-1">
                            8 Questions
                          </span>
                          <span className="badge bg-light text-warning border border-warning">
                            Applied
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div
                      className="card text-center border-danger mb-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => startQuiz("hard")}
                    >
                      <div className="card-body">
                        <div style={{ fontSize: "2rem" }}>💎</div>
                        <h5 className="card-title">Hard</h5>
                        <p className="card-text">Expert level challenges</p>
                        <div>
                          <span className="badge bg-danger me-1">
                            8 Questions
                          </span>
                          <span className="badge bg-light text-danger border border-danger">
                            Advanced
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row text-center mt-4">
                  <div className="col">
                    <div className="mb-2">
                      <strong>⏱️ Time Limit</strong>
                      <p className="mb-0">45 seconds per question</p>
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-2">
                      <strong>📊 Scoring</strong>
                      <p className="mb-0">1 point per correct answer</p>
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-2">
                      <strong>💡 Explanations</strong>
                      <p className="mb-0">Learn from detailed explanations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow">
              <div className="card-body text-center">
                <h2 className="mb-4">🏆 Quiz Complete!</h2>
                <div className="mb-3">
                  <div
                    className="rounded-circle border border-3 border-primary d-inline-flex align-items-center justify-content-center"
                    style={{ width: 100, height: 100, fontSize: "2rem" }}
                  >
                    <span>
                      {score}/{quizData.length}
                    </span>
                  </div>
                  <div className="mt-2">
                    You scored {((score / quizData.length) * 100).toFixed(1)}%
                  </div>
                  <div
                    className={`fw-bold mt-2 ${
                      (score / quizData.length) * 100 >= 70
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >
                    {getScoreMessage()}
                  </div>
                  <div className="text-muted mt-1">
                    Level:{" "}
                    {selectedLevel.charAt(0).toUpperCase() +
                      selectedLevel.slice(1)}
                  </div>
                </div>
                <h4 className="mt-4 mb-3">📈 Your Performance</h4>
                <div className="row mb-4">
                  <div className="col-6 col-md-3">
                    <div className="border rounded p-2">
                      <div className="fw-bold">{score}</div>
                      <div className="small text-muted">Correct</div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="border rounded p-2">
                      <div className="fw-bold">{quizData.length - score}</div>
                      <div className="small text-muted">Incorrect</div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3 mt-2 mt-md-0">
                    <div className="border rounded p-2">
                      <div className="fw-bold">{quizStats.averageTime}s</div>
                      <div className="small text-muted">Avg Time</div>
                    </div>
                  </div>
                  <div className="col-6 col-md-3 mt-2 mt-md-0">
                    <div className="border rounded p-2">
                      <div className="fw-bold">{quizStats.maxStreak}</div>
                      <div className="small text-muted">Best Streak</div>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-center gap-2">
                  <button className="btn btn-secondary" onClick={resetQuiz}>
                    🏠 Back to Levels
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => startQuiz(selectedLevel)}
                  >
                    🔄 Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body">
              <div className="mb-3">
                <div className="progress" style={{ height: "8px" }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: `${
                        ((currentQuestion + 1) / quizData.length) * 100
                      }%`,
                    }}
                    aria-valuenow={currentQuestion + 1}
                    aria-valuemin={0}
                    aria-valuemax={quizData.length}
                  ></div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <div>
                    <span className="badge bg-primary">
                      Question {currentQuestion + 1} of {quizData.length}
                    </span>
                  </div>
                  <div>
                    <span
                      className="badge"
                      style={{
                        background: getDifficultyColor(selectedLevel),
                        color: "#333",
                      }}
                    >
                      {selectedLevel.charAt(0).toUpperCase() +
                        selectedLevel.slice(1)}{" "}
                      Level
                    </span>
                  </div>
                  <div>
                    <span
                      className={`badge ${
                        timeLeft <= 10 ? "bg-danger" : "bg-secondary"
                      }`}
                    >
                      ⏱️ {timeLeft}s
                    </span>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <h5>{quizData[currentQuestion]?.question}</h5>
                <div className="list-group mt-3">
                  {quizData[currentQuestion]?.options.map((option, index) => (
                    <button
                      key={index}
                      className={
                        "list-group-item list-group-item-action d-flex align-items-center " +
                        (selectedAnswer === index ? "active " : "") +
                        (showExplanation &&
                        index === quizData[currentQuestion].correct
                          ? "list-group-item-success "
                          : "") +
                        (showExplanation &&
                        selectedAnswer === index &&
                        index !== quizData[currentQuestion].correct
                          ? "list-group-item-danger "
                          : "")
                      }
                      disabled={showExplanation}
                      onClick={() => handleAnswerClick(index)}
                    >
                      <span className="me-2 fw-bold">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-grow-1">{option}</span>
                      {showExplanation &&
                        index === quizData[currentQuestion].correct && (
                          <span className="ms-2 text-success fw-bold">✓</span>
                        )}
                    </button>
                  ))}
                </div>
              </div>
              {showExplanation && (
                <div className="alert alert-info">
                  <h6 className="mb-1">💡 Explanation</h6>
                  <p className="mb-0">
                    {quizData[currentQuestion]?.explanation}
                  </p>
                </div>
              )}
              <div className="d-flex justify-content-end gap-2">
                {!showExplanation && selectedAnswer !== null && (
                  <button
                    className="btn btn-outline-info"
                    onClick={toggleExplanation}
                  >
                    💡 Show Explanation
                  </button>
                )}
                {(showExplanation || selectedAnswer !== null) && (
                  <button className="btn btn-primary" onClick={handleNext}>
                    {currentQuestion + 1 === quizData.length
                      ? "🏁 Finish Quiz"
                      : "➡️ Next Question"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
