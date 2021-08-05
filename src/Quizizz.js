import { useState } from "react";
import QuestionContent from "./components/QuestionContent";
import PrintScore from "./components/PrintScore";

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

function playMusic(filename) {
  let audio = document.createElement("audio");
  audio.src = "../src/quizizz/audio/" + filename;
  document.body.append(audio);
  audio.play();
}
function pauseMusic() {
  let audio = document.getElementById("audio");
  audio.pause();
  audio.remove();
}

const newArr = shuffeQuestionsList(QUESTIONS);

export default function Quizizz() {
  let [listQuestions, setListQuestions] = useState(newArr); // list question đã được đảo
  let [currentQuestion, setQuestion] = useState(null); // index của current question

  let [timer, setTimer] = useState(TIME_LIMIT); // đếm time để chuyển câu hỏi

  let [countBeginGame, setCountBeginGame] = useState(null);

  let [score, setScore] = useState(0); // Lưu số câu trả lời đúng
  let [completeGame, setCompleteGame] = useState(false);

  let [choices, setChoices] = useState([]); // Mảng lưu id các đáp án được chọn
  let [checked, setChecked] = useState(false); // True khi đã chọn đủ đáp án
  let [checkedResult, setCheckedResult] = useState(false); // True khi lựa chọn các đáp án đúng

  let content = "";

  function startGame() {
    setCountBeginGame(TIME_BEGIN_GAME);
    // playMusic("countDownBegin.mp3");
    const countDown = setInterval(() => {
      setCountBeginGame((prevTimer) => {
        if (prevTimer === null) {
          clearInterval(countDown);
          pauseMusic();
        } else {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            setQuestion(0);
            resetState();
            countTimer();
            clearInterval(countDown);
            // pauseMusic();
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
  }
  function resetGame() {
    setCountBeginGame(null);
    setTimer(null);
    setListQuestions(newArr);
    setQuestion(null);
    resetState();
  }
  function countTimer() {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === null) {
          clearInterval(interval);
        } else {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            setQuestion((prevQuestion) => {
              if (prevQuestion < listQuestions.length - 1) {
                setTimer(TIME_LIMIT);
                setChecked(false);
                setCheckedResult(false);
                setChoices([]);
                return prevQuestion + 1;
              } else {
                clearInterval(interval);
                setCompleteGame(true);
                return prevTimer;
              }
            });
          }
        }
        return timer;
      });
    }, 10);
  }
  function getNextQuestion() {
    let timeCounter = TIME_TO_NEXT_QUESTION;
    const interval = setInterval(() => {
      if (timeCounter == 0) {
        setTimer(TIME_LIMIT);
        countTimer();
        setQuestion((prevQuestion) => {
          if (prevQuestion < listQuestions.length - 1) {
            setChecked(false);
            setCheckedResult(false);
            setChoices([]);
            return prevQuestion + 1;
          } else {
            return setCompleteGame(true);
          }
        });
        clearInterval(interval);
      } else {
        timeCounter--;
      }
    }, 1000);
  }

  function chooseAnswer(e, id, question) {
    let answer = question.answerOptions.filter((answer) => answer.id == id)[0];
    let remainingTime = timer;
    setTimer(null);
    if (!question.isMultiple) {
      // One correct answer
      setChecked(true);
      setChoices([Number(id)]);
      if (answer.isCorrect) {
        setScore(score + remainingTime);
        setCheckedResult(true);
      }
      getNextQuestion();
    } else {
      // Multi correct answer
      const countRightAnswer = question.answerOptions.filter(
        (item) => item.isCorrect
      ).length;
      let arrChoices = [...choices];

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
          if (checkMultiCondition(arrChoices, question.answerOptions)) {
            setScore(score + remainingTime);
            setCheckedResult(true);
          }
          getNextQuestion();
        }
      }
    }
  }
  if (completeGame) {
    content = (
      <PrintScore
        score={score}
        questionsLength={listQuestions.length}
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
        checked={checked}
        checkedResult={checkedResult}
        choices={choices}
        chooseAnswer={chooseAnswer}
      />
    );
  }
  return (
    <div className="quizizzGame">
      {currentQuestion === null ? (
        <div className="quizizzGame__start h-100">
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
