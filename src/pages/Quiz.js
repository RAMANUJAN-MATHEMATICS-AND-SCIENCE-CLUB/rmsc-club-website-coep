import React, { useState, useEffect, useCallback } from "react";
import "./Quiz.css";

const quizDataByLevel = {
  easy: [
    {
      question: "What is the value of π (pi) to 2 decimal places?",
      options: ["3.14", "3.16", "3.12", "3.18"],
      correct: 0,
      explanation:
        "π (pi) is approximately 3.14159..., so to 2 decimal places it's 3.14",
      difficulty: "Easy",
    },
    {
      question: "What is the derivative of x²?",
      options: ["x", "2x", "x²", "2x²"],
      correct: 1,
      explanation: "Using the power rule: d/dx(x²) = 2x¹ = 2x",
      difficulty: "Easy",
    },
    {
      question: "Which programming language was developed by Guido van Rossum?",
      options: ["Java", "C++", "Python", "JavaScript"],
      correct: 2,
      explanation:
        "Python was created by Guido van Rossum and first released in 1991.",
      difficulty: "Easy",
    },
    {
      question: "What is 2 + 2 × 3?",
      options: ["12", "8", "6", "10"],
      correct: 1,
      explanation:
        "Following order of operations (PEMDAS): 2 + (2 × 3) = 2 + 6 = 8",
      difficulty: "Easy",
    },
    {
      question: "What is the square root of 64?",
      options: ["6", "7", "8", "9"],
      correct: 2,
      explanation: "8 × 8 = 64, so √64 = 8",
      difficulty: "Easy",
    },
    {
      question:
        "In a right triangle, what is the relationship between the sides?",
      options: ["a² + b² = c²", "a + b = c", "a² - b² = c²", "a × b = c"],
      correct: 0,
      explanation:
        "The Pythagorean theorem states that a² + b² = c² where c is the hypotenuse",
      difficulty: "Easy",
    },
    {
      question: "What is the result of 5!?",
      options: ["25", "120", "20", "15"],
      correct: 1,
      explanation: "5! = 5 × 4 × 3 × 2 × 1 = 120",
      difficulty: "Easy",
    },
    {
      question: "What is the binary representation of decimal 5?",
      options: ["101", "110", "100", "111"],
      correct: 0,
      explanation: "5 in binary is 101 (1×2² + 0×2¹ + 1×2⁰ = 4 + 0 + 1 = 5)",
      difficulty: "Easy",
    },
  ],
  medium: [
    {
      question: "Who is known as the 'Man Who Knew Infinity'?",
      options: [
        "Albert Einstein",
        "Isaac Newton",
        "Srinivasa Ramanujan",
        "Leonhard Euler",
      ],
      correct: 2,
      explanation:
        "Srinivasa Ramanujan was called 'The Man Who Knew Infinity' due to his extraordinary mathematical intuition.",
      difficulty: "Medium",
    },
    {
      question: "What is the binary representation of the decimal number 8?",
      options: ["1000", "1001", "1010", "1100"],
      correct: 0,
      explanation: "8 in binary is 1000 (1×2³ + 0×2² + 0×2¹ + 0×2⁰ = 8)",
      difficulty: "Medium",
    },
    {
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      correct: 1,
      explanation:
        "Binary search has O(log n) time complexity as it divides the search space in half with each iteration.",
      difficulty: "Medium",
    },
    {
      question: "What is the integral of 2x?",
      options: ["x²", "x² + C", "2x²", "x² + 2C"],
      correct: 1,
      explanation: "∫2x dx = x² + C, where C is the constant of integration",
      difficulty: "Medium",
    },
    {
      question: "In programming, what does 'recursion' mean?",
      options: [
        "A loop that never ends",
        "A function calling itself",
        "A type of variable",
        "A sorting algorithm",
      ],
      correct: 1,
      explanation:
        "Recursion is when a function calls itself to solve a smaller instance of the same problem.",
      difficulty: "Medium",
    },
    {
      question: "What is the derivative of sin(x)?",
      options: ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"],
      correct: 0,
      explanation: "The derivative of sin(x) is cos(x)",
      difficulty: "Medium",
    },
    {
      question: "Which data structure follows LIFO principle?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      correct: 1,
      explanation: "Stack follows Last In, First Out (LIFO) principle",
      difficulty: "Medium",
    },
    {
      question: "What is the sum of interior angles in a hexagon?",
      options: ["540°", "720°", "900°", "1080°"],
      correct: 1,
      explanation:
        "Sum of interior angles = (n-2) × 180°. For hexagon: (6-2) × 180° = 720°",
      difficulty: "Medium",
    },
  ],
  hard: [
    {
      question:
        "In quantum mechanics, what does the Schrödinger equation describe?",
      options: [
        "The position of particles",
        "The wave function of quantum systems",
        "The speed of light",
        "Gravitational forces",
      ],
      correct: 1,
      explanation:
        "The Schrödinger equation is the fundamental equation that describes how the quantum state of a physical system changes over time.",
      difficulty: "Hard",
    },
    {
      question:
        "Which mathematician proved that there are infinitely many prime numbers?",
      options: ["Pythagoras", "Euclid", "Archimedes", "Fibonacci"],
      correct: 1,
      explanation:
        "Euclid proved the infinitude of primes around 300 BCE using a elegant proof by contradiction.",
      difficulty: "Hard",
    },
    {
      question: "What is the limit of (sin x)/x as x approaches 0?",
      options: ["0", "1", "∞", "Does not exist"],
      correct: 1,
      explanation:
        "This is a fundamental limit in calculus: lim(x→0) (sin x)/x = 1",
      difficulty: "Hard",
    },
    {
      question:
        "What is the time complexity of the worst-case scenario for quicksort?",
      options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
      correct: 1,
      explanation:
        "In the worst case (already sorted array with poor pivot), quicksort has O(n²) complexity",
      difficulty: "Hard",
    },
    {
      question: "What is Euler's identity?",
      options: ["e^(iπ) + 1 = 0", "e^π = i", "π = e", "e + π = 1"],
      correct: 0,
      explanation:
        "Euler's identity: e^(iπ) + 1 = 0, considered one of the most beautiful equations in mathematics",
      difficulty: "Hard",
    },
    {
      question: "In machine learning, what does 'overfitting' mean?",
      options: [
        "Model is too simple",
        "Model performs well on training but poorly on test data",
        "Model has too few parameters",
        "Model trains too slowly",
      ],
      correct: 1,
      explanation:
        "Overfitting occurs when a model learns the training data too well, including noise, leading to poor generalization",
      difficulty: "Hard",
    },
    {
      question: "What is the Riemann Hypothesis about?",
      options: [
        "Prime number distribution",
        "Geometry of space",
        "Quantum mechanics",
        "Calculus fundamentals",
      ],
      correct: 0,
      explanation:
        "The Riemann Hypothesis concerns the distribution of prime numbers and the zeros of the Riemann zeta function",
      difficulty: "Hard",
    },
    {
      question: "In graph theory, what is a Hamiltonian path?",
      options: [
        "A path that visits every edge once",
        "A path that visits every vertex once",
        "The shortest path",
        "A circular path",
      ],
      correct: 1,
      explanation:
        "A Hamiltonian path visits every vertex in a graph exactly once",
      difficulty: "Hard",
    },
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
        return "#48bb78";
      case "medium":
        return "#ed8936";
      case "hard":
        return "#e53e3e";
      default:
        return "#667eea";
    }
  };

  if (!quizStarted) {
    return (
      <div className="quiz-page">
        <div className="quiz-container">
          <h1>🧠 RMSC Knowledge Challenge</h1>
          <div className="quiz-intro">
            <p>
              Test your knowledge in Mathematics, Science, and Computer Science!
            </p>
            <div className="level-selection">
              <h3>Choose Your Challenge Level:</h3>
              <div className="level-options">
                <div className="level-card" onClick={() => startQuiz("easy")}>
                  <div className="level-icon">🌱</div>
                  <h4>Easy</h4>
                  <p>Perfect for beginners</p>
                  <div className="level-details">
                    <span>8 Questions</span>
                    <span>Basic concepts</span>
                  </div>
                </div>
                <div className="level-card" onClick={() => startQuiz("medium")}>
                  <div className="level-icon">🔥</div>
                  <h4>Medium</h4>
                  <p>For intermediate learners</p>
                  <div className="level-details">
                    <span>8 Questions</span>
                    <span>Applied knowledge</span>
                  </div>
                </div>
                <div className="level-card" onClick={() => startQuiz("hard")}>
                  <div className="level-icon">💎</div>
                  <h4>Hard</h4>
                  <p>Expert level challenges</p>
                  <div className="level-details">
                    <span>8 Questions</span>
                    <span>Advanced concepts</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="quiz-info">
              <div className="info-item">
                <strong>⏱️ Time Limit</strong>
                <p>45 seconds per question</p>
              </div>
              <div className="info-item">
                <strong>📊 Scoring</strong>
                <p>1 point per correct answer</p>
              </div>
              <div className="info-item">
                <strong>💡 Explanations</strong>
                <p>Learn from detailed explanations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="quiz-page">
        <div className="quiz-container">
          <div className="quiz-result">
            <h2>🏆 Quiz Complete!</h2>
            <div className="score-display">
              <div className="score-circle">
                <div className="score-text">
                  {score}/{quizData.length}
                </div>
              </div>
              <div className="score-details">
                You scored {((score / quizData.length) * 100).toFixed(1)}%
              </div>
              <div
                className={`result-status ${
                  (score / quizData.length) * 100 >= 70 ? "passed" : "failed"
                }`}
              >
                {getScoreMessage()}
              </div>
              <div className="performance-message">
                Level:{" "}
                {selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)}
              </div>
            </div>

            <div className="quiz-statistics">
              <h3>📈 Your Performance</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-number">{score}</span>
                  <span className="stat-label">Correct</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{quizData.length - score}</span>
                  <span className="stat-label">Incorrect</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{quizStats.averageTime}s</span>
                  <span className="stat-label">Avg Time</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{quizStats.maxStreak}</span>
                  <span className="stat-label">Best Streak</span>
                </div>
              </div>
            </div>

            <div className="result-actions">
              <button className="quiz-button" onClick={resetQuiz}>
                🏠 Back to Levels
              </button>
              <button
                className="quiz-button"
                onClick={() => startQuiz(selectedLevel)}
              >
                🔄 Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        <div className="quiz-header">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${((currentQuestion + 1) / quizData.length) * 100}%`,
              }}
            ></div>
          </div>
          <div className="quiz-info-bar">
            <div className="question-counter">
              Question {currentQuestion + 1} of {quizData.length}
            </div>
            <div
              className="difficulty-badge"
              style={{ background: getDifficultyColor(selectedLevel) }}
            >
              {selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)}{" "}
              Level
            </div>
            <div className={`timer ${timeLeft <= 10 ? "warning" : ""}`}>
              ⏱️ {timeLeft}s
            </div>
          </div>
        </div>

        <div className="question-section">
          <div className="question">{quizData[currentQuestion]?.question}</div>
          <div className="options">
            {quizData[currentQuestion]?.options.map((option, index) => (
              <div
                key={index}
                className={`option ${
                  selectedAnswer === index ? "selected" : ""
                } ${
                  showExplanation && index === quizData[currentQuestion].correct
                    ? "correct"
                    : ""
                } ${
                  showExplanation &&
                  selectedAnswer === index &&
                  index !== quizData[currentQuestion].correct
                    ? "incorrect"
                    : ""
                }`}
                onClick={() => handleAnswerClick(index)}
              >
                <div className="option-letter">
                  {String.fromCharCode(65 + index)}
                </div>
                <div className="option-text">{option}</div>
                {showExplanation &&
                  index === quizData[currentQuestion].correct && (
                    <div className="correct-indicator">✓</div>
                  )}
              </div>
            ))}
          </div>
        </div>

        {showExplanation && (
          <div className="explanation-section">
            <h4>💡 Explanation</h4>
            <p>{quizData[currentQuestion]?.explanation}</p>
          </div>
        )}

        <div className="quiz-actions">
          <div className="action-buttons">
            {!showExplanation && selectedAnswer !== null && (
              <button
                className="quiz-button explanation-btn"
                onClick={toggleExplanation}
              >
                💡 Show Explanation
              </button>
            )}
            {(showExplanation || selectedAnswer !== null) && (
              <button className="quiz-button next-button" onClick={handleNext}>
                {currentQuestion + 1 === quizData.length
                  ? "🏁 Finish Quiz"
                  : "➡️ Next Question"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
