import { useEffect, useState } from "react";
import QuestionContent from "./components/QuestionContent";
import GameStats from "./components/GameStats";

import countDownBeginMusic from "./audio/countDownBegin.mp3";
import backgroundImage from "./images/background.jpg";

const QUESTIONS = [
  {
    id: 1,
    questionText: "Covid-19 xuất hiện lần đầu tiên ở nước nào ?",
    isMultiple: false,
    answerOptions: [
      { id: 1, isCorrect: false, answerText: "Viet Nam" },
      { id: 2, isCorrect: false, answerText: "USA" },
      { id: 3, isCorrect: true, answerText: "China" },
      { id: 4, isCorrect: false, answerText: "India" },
    ],
  },
  {
    id: 2,
    questionText: "Khẩu hiệu 5K là gì ? ?",
    isMultiple: false,
    answerOptions: [
      { id: 1, isCorrect: false, answerText: "Không đeo khẩu trang" },
      { id: 2, isCorrect: false, answerText: "Không tụ tập nơi đông người " },
      { id: 3, isCorrect: false, answerText: "Không ra đường" },
      {
        id: 4,
        isCorrect: true,
        answerText:
          "Khoảng cách - Khẩu trang - Khử khuẩn - Khai báo y tế - Khử khuẩn",
      },
    ],
  },
  {
    id: 3,
    isMultiple: false,
    questionText: "Thực hiện giãn cách xã hội tối thiểu trong bao nhiêu ngày ?",
    answerOptions: [
      { id: 1, isCorrect: false, answerText: "15 ngày" },
      { id: 2, isCorrect: true, answerText: "7 ngày" },
      { id: 3, isCorrect: false, answerText: "21 ngày" },
      { id: 4, isCorrect: false, answerText: "1 tháng" },
    ],
  },
  {
    id: 4,
    isMultiple: true,
    questionText:
      "Hiện tại tỉnh thành nào ở Việt Nam có số ca mắc nhiều nhất ?",
    answerOptions: [
      { id: 1, isCorrect: false, answerText: "Hà Nội" },
      { id: 2, isCorrect: true, answerText: "Hồ Chí Minh" },
      { id: 3, isCorrect: true, answerText: "Bắc Giang" },
      { id: 4, isCorrect: false, answerText: "Bắc Ninh " },
    ],
  },
];

const TIME_BEGIN_GAME = 3;
const TIME_TO_NEXT_QUESTION = 2;
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
  let [listQuestions, setListQuestions] = useState(newArr); // list question đã được đảo
  let [currentQuestion, setQuestion] = useState(null); // index của current question

  let [timer, setTimer] = useState(TIME_LIMIT); // đếm time để chuyển câu hỏi
  let [stopTimer, setStopTimer] = useState(false);

  let [countBeginGame, setCountBeginGame] = useState(null);

  let [score, setScore] = useState(0); // Lưu điểm
  let [correctAnswer, setCorrectAnswer] = useState(0);
  let [streak, setStreak] = useState(0);
  let [countStreak, setCountStreak] = useState(0);

  let [completeGame, setCompleteGame] = useState(false);

  let [choices, setChoices] = useState([]); // Mảng lưu id các đáp án được chọn
  let [checked, setChecked] = useState(false); // True khi đã chọn đủ đáp án
  let [checkedResult, setCheckedResult] = useState(false); // True khi lựa chọn các đáp án đúng
  let [chosenAnswer, setChosenAnswer] = useState(false);

  let [playCountDownTimerMusic, setPlayCountDownTimerMusic] = useState(false);

  let content = "";

  function startGame() {
    setCountBeginGame(TIME_BEGIN_GAME);
    setPlayCountDownTimerMusic(true);
    const countDown = setInterval(() => {
      setCountBeginGame((prevTimer) => {
        if (prevTimer === null) {
          clearInterval(countDown);
          setPlayCountDownTimerMusic(false);
        } else {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            setQuestion(0);
            resetState();
            // countTimer();
            clearInterval(countDown);
            setPlayCountDownTimerMusic(false);
            return null;
          }
        }
        return countBeginGame;
      });
    }, 1000);
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
    setStopTimer(false);
  }
  function resetGame() {
    setCountBeginGame(null);
    setTimer(TIME_LIMIT);
    setListQuestions(newArr);
    setQuestion(null);
    setStreak(0);
    setCountStreak(0);
    resetState();
  }
  function setStateWhenNextQuestion() {
    setTimer(TIME_LIMIT);
    setChecked(false);
    setCheckedResult(false);
    setChosenAnswer(false);
    setChoices([]);
  }
  function countTimer() {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          setQuestion((prevQuestion) => {
            if (prevQuestion < listQuestions.length - 1) {
              setStateWhenNextQuestion();
              return prevQuestion + 1;
            } else {
              setCompleteGame(true);
              clearInterval(interval);
            }
          });
          return TIME_LIMIT;
        }
      });
    }, 10);
    if (stopTimer) return clearInterval(interval);
  }
  function getNextQuestion() {
    let timeCounter = TIME_TO_NEXT_QUESTION;
    const interval = setInterval(() => {
      if (timeCounter == 0) {
        setQuestion((prevQuestion) => {
          if (prevQuestion < listQuestions.length - 1) {
            setStateWhenNextQuestion();
            setStopTimer(false);
            // countTimer();
            return prevQuestion + 1;
          } else {
            setCompleteGame(true);
            return prevQuestion;
          }
        });
        clearInterval(interval);
      } else {
        timeCounter--;
      }
    }, 1000);
  }

  function handleChooseAnswer(id, question) {
    let answer = question.answerOptions.filter((answer) => answer.id == id)[0];
    let remainingTime = timer;
    console.log(remainingTime);
    setStopTimer(true);
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
              <div className="quizizzGame__start--countdown w-100 text-center">
                <p className={"mb-0 animate__animated animate__zoomIn"}>
                  {countBeginGame === 0 ? "GO!" : countBeginGame}
                </p>
                <audio autoPlay={true}>
                  <source type="audio/mp3" src={countDownBeginMusic} />
                </audio>
              </div>
            )}
          </div>
        </div>
      ) : (
        content
      )}
    </div>
  );
}
