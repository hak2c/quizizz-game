export default function AnswerTopContent({
  timer,
  score,
  currentQuestion,
  totalLength,
}) {
  return (
    <div className="col-12 quizizzGame__top">
      <div className="quizizzGame__top--inner">
        <div className="quizizzGame__top--timer">
          <div className="quizizzGame__top--timer-total">
            <div
              className="quizizzGame__top--timer-progress"
              style={{ width: timer / 10 + "%" }}
            ></div>
          </div>
        </div>
        <div className="quizizzGame__top--inner d-flex justify-content-between align-items-center">
          <div className="quizizzGame__top--step">
            <span id="current">{currentQuestion + 1}</span>
            <span id="total">/{totalLength}</span>
          </div>

          <div className="quizizzGame__top--score">Score: {score}</div>
        </div>
      </div>
    </div>
  );
}
