import AnswerTopContent from "./AnswerTopContent";
import AnswerContent from "./AnswerContent";
import AnswerBottomContent from "./AnswerBottomContent";

import countDownTimerMusic from "../audio/countDownTimer.mp3";
import backgroundImage from "../images/background.jpg";

export default function QuestionContent({
  questions,
  currentQuestion,
  timer,
  score,
  streak,
  checked,
  checkedResult,
  chosenAnswer,
  choices,
  playMusic,
  handleChooseAnswer,
}) {
  const question = questions[currentQuestion];
  const countRightAnswer = question.answerOptions.filter(
    (item) => item.isCorrect
  ).length;
  const listAnswer = question.answerOptions.map((answer) => (
    <AnswerContent
      answer={answer}
      question={question}
      choices={choices}
      checked={checked}
      handleChooseAnswer={handleChooseAnswer}
      key={answer.id}
    />
  ));

  return (
    <div className="quizizzGame__question h-100">
      <div className="row h-100">
        <AnswerTopContent
          timer={timer}
          score={score}
          streak={streak}
          chosenAnswer={chosenAnswer}
          currentQuestion={currentQuestion}
          totalLength={questions.length}
        />
        <div className="col-12 animate__animated animate__slideInLeft quizizzGame__question--main-content">
          <div
            className="quizizzGame__question--main-inner d-flex flex-column justify-content-lg-between h-100"
            style={{
              background:
                "url(" + backgroundImage + ") no-repeat center center fixed",
              backgroundSize: "cover",
            }}
          >
            <div className="quizizzGame__question--text w-100">
              <div className="d-flex flex-column justify-content-center align-items-center text-center overlay">
                <h3>{question.questionText}</h3>
                {question.isMultiple && (
                  <h4>
                    <em>(Choose {countRightAnswer} correct answer(s))</em>
                  </h4>
                )}
              </div>
            </div>
            <div className="quizizzGame__answers w-100 ">
              <div className="quizizzGame__answers--inner d-flex flex-column flex-lg-row justify-content-lg-between">
                {listAnswer}
              </div>
            </div>
          </div>
        </div>
        <AnswerBottomContent checked={checked} checkedResult={checkedResult} />
      </div>
      {playMusic && (
        <audio autoPlay={true}>
          <source type="audio/mp3" src={countDownTimerMusic} />
        </audio>
      )}
    </div>
  );
}
