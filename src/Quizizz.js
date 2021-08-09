import { useRef, useState } from "react";
import QuestionContent from "./components/QuestionContent";
import GameStats from "./components/GameStats";
import BeginGameCountdown from "./components/BeginGameCountdown";

import backgroundImage from "./images/background.jpg";

import { QUESTIONS } from "./data/data";

const TIME_BEGIN_GAME = 3;
const TIME_TO_NEXT_QUESTION = 2000;
const TIME_LIMIT = 1000;

function shuffeQuestionsList(array) {
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
function checkMultiCondition(choices, answer) {
  let result = true;
  for (let i = 0; i < choices.length; i++) {
    if (
      answer.filter((item) => item.id === choices[i] && item.isCorrect)
        .length === 0
    ) {
      result = false;
      break;
    }
  }
  return result;
}

const newArr = shuffeQuestionsList(QUESTIONS);

export default function Quizizz() {
  const [listQuestions, setListQuestions] = useState(newArr); // list question đã được đảo
  const [currentQuestion, setQuestion] = useState(null); // index của current question

  const [timer, setTimer] = useState(TIME_LIMIT); // đếm time để chuyển câu hỏi

  const [countBeginGame, setCountBeginGame] = useState(null);

  const [score, setScore] = useState(0); // Lưu điểm
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [streak, setStreak] = useState(0);
  const [countStreak, setCountStreak] = useState(0);

  const [completeGame, setCompleteGame] = useState(false);

  const [choices, setChoices] = useState([]); // Mảng lưu id các đáp án được chọn
  const [checked, setChecked] = useState(false); // True khi đã chọn đủ đáp án
  const [checkedResult, setCheckedResult] = useState(false); // True khi lựa chọn các đáp án đúng
  const [chosenAnswer, setChosenAnswer] = useState(false);

  const [playCountDownTimerMusic, setPlayCountDownTimerMusic] = useState(false);

  let beginCountDown = useRef(null);
  let timerCountDown = useRef(null);

  let content = "";

  function startGame() {
    setCountBeginGame(TIME_BEGIN_GAME);
    setPlayCountDownTimerMusic(true);

    beginCountDown.current = setInterval(() => {
      setCountBeginGame((prevTimer) => {
        if (prevTimer === null) {
          clearInterval(beginCountDown.current);
          setPlayCountDownTimerMusic(false);
        } else {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            setQuestion(0);
            resetState();
            countTimer();
            clearInterval(beginCountDown.current);
            setPlayCountDownTimerMusic(false);
            return null;
          }
        }
        return countBeginGame;
      });
    }, 1000);
  }
  function countTimer() {
    timerCountDown.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(timerCountDown.current);
          setQuestion((prevQuestion) => {
            if (prevQuestion < listQuestions.length - 1) {
              setStateWhenNextQuestion();
              countTimer();
              return prevQuestion + 1;
            } else {
              setCompleteGame(true);
              return prevQuestion;
            }
          });
          return TIME_LIMIT;
        } else {
          return prevTimer - 1;
        }
      });
    }, 10);
  }

  function getNextQuestion() {
    setTimeout(() => {
      clearInterval(timerCountDown.current);
      if (currentQuestion === listQuestions.length - 1) {
        setCompleteGame(true);
      } else {
        setStateWhenNextQuestion();
        countTimer();
        setQuestion(currentQuestion + 1);
      }
    }, TIME_TO_NEXT_QUESTION);
  }

  function handleChooseAnswer(id, question) {
    let answer = question.answerOptions.filter((answer) => answer.id == id)[0];
    let remainingTime = timer;

    clearInterval(timerCountDown.current);

    if (!question.isMultiple) {
      // One correct answer
      setChecked(true);
      setChosenAnswer(true);
      setChoices([Number(id)]);
      checkAnswerResult(answer.isCorrect, remainingTime);
    } else {
      // Multi correct answer
      const countRightAnswer = question.answerOptions.filter(
        (item) => item.isCorrect
      ).length;
      let arrChoices = [...choices];

      setChosenAnswer(true);

      if (arrChoices.includes(Number(id))) {
        // đã có trong mảng choice > uncheck
        arrChoices.splice(arrChoices.indexOf(Number(id)), 1);
        setChoices(arrChoices);
      } else {
        // chưa có > check
        arrChoices.push(Number(id));
        setChoices(arrChoices);
        if (arrChoices.length === countRightAnswer) {
          setChecked(true);
          // đủ đáp án
          checkAnswerResult(
            checkMultiCondition(arrChoices, question.answerOptions),
            remainingTime
          );
        }
      }
    }
  }
  function resetState() {
    setScore(0);
    setCompleteGame(false);
    setChoices([]);
    setChecked(false);
    setCheckedResult(false);
    setChosenAnswer(false);
    setPlayCountDownTimerMusic(false);
    setCorrectAnswer(0);
    clearInterval(timerCountDown.current);
    timerCountDown.current = null;
  }
  function resetGame() {
    setCountBeginGame(null);
    setTimer(TIME_LIMIT);
    setListQuestions(newArr);
    setQuestion(null);
    setStreak(0);
    setCountStreak(0);
    clearInterval(beginCountDown.current);
    beginCountDown.current = null;
    resetState();
  }
  function setStateWhenNextQuestion() {
    clearInterval(timerCountDown.current);
    timerCountDown.current = null;
    setTimer(TIME_LIMIT);
    setChecked(false);
    setCheckedResult(false);
    setChosenAnswer(false);
    setChoices([]);
  }

  function checkAnswerResult(condition, remainingTime) {
    if (condition) {
      calculateScore(remainingTime);
      setCorrectAnswer(correctAnswer + 1);
      setCheckedResult(true);
    } else {
      setStreak(0);
    }
    getNextQuestion();
  }

  function calculateScore(remainingTime) {
    let oldStreak = streak;
    let newScore = score;
    if (oldStreak < 3) {
      setStreak(oldStreak + 1);
      if (oldStreak === 2) setCountStreak(countStreak + 1);
    }
    setScore(newScore + remainingTime + (oldStreak + 1) * 100);
  }

  if (completeGame) {
    content = (
      <GameStats
        score={score}
        correctAnswer={correctAnswer}
        questionsLength={listQuestions.length}
        countStreak={countStreak}
        resetGame={resetGame}
      />
    );
  } else {
    content = (
      <QuestionContent
        questions={listQuestions}
        currentQuestion={currentQuestion}
        timer={timer}
        score={score}
        streak={streak}
        checked={checked}
        checkedResult={checkedResult}
        chosenAnswer={chosenAnswer}
        choices={choices}
        playMusic={playCountDownTimerMusic}
        handleChooseAnswer={handleChooseAnswer}
      />
    );
  }
  return (
    <div className="quizizzGame">
      {currentQuestion === null ? (
        <div
          className="quizizzGame__start h-100"
          style={{
            background:
              "url(" + backgroundImage + ") no-repeat center center fixed",
            backgroundSize: "cover",
          }}
        >
          <div className=" d-flex justify-content-center align-items-center w-100 h-100 overlay">
            {countBeginGame === null ? (
              <button
                onClick={startGame}
                className="quizizzGame__start--button"
              >
                Start
              </button>
            ) : (
              <BeginGameCountdown countBeginGame={countBeginGame} />
            )}
          </div>
        </div>
      ) : (
        content
      )}
    </div>
  );
}
