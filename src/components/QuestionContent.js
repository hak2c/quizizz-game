import AnswerTopContent from "./AnswerTopContent";
import AnswerContent from "./AnswerContent";
import AnswerBottomContent from "./AnswerBottomContent";

import countDownTimerMusic from "../audio/countDownTimer.mp3";

export default function QuestionContent({
  questions,
  currentQuestion,
  timer,
  score,
  checked,
  checkedResult,
  choices,
  playMusic,
  chooseAnswer,
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
      chooseAnswer={chooseAnswer}
      key={answer.id}
    />
  ));

  return (
    <div className="quizizzGame__question h-100">
      <div className="row h-100">
        <AnswerTopContent
          timer={timer}
          score={score}
          currentQuestion={currentQuestion}
          totalLength={questions.length}
        />
        <div className="col-12 animate__animated animate__slideInLeft quizizzGame__question--main-content">
          <div className="quizizzGame__question--main-inner d-flex flex-wrap justify-content-between h-100">
            <div className="quizizzGame__question--text w-100">
              <div className="d-flex flex-wrap justify-content-center align-items-center h-100 overlay">
                <h3>{question.questionText}</h3>
                {question.isMultiple && (
                  <p>(Choose {countRightAnswer} correct answer(s))</p>
                )}
              </div>
            </div>
            <div className="quizizzGame__answers w-100 ">
              <div className="quizizzGame__answers--inner d-flex flex-wrap justify-content-between">
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
