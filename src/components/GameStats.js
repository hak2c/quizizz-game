import backgroundImage from "../images/background.jpg";

export default function GameStats({
  score,
  correctAnswer,
  questionsLength,
  resetGame,
}) {
  console.log(correctAnswer);
  return (
    <div
      className="quizizzGame__stats"
      style={{
        background:
          "url(" + backgroundImage + ") no-repeat center center fixed",
        backgroundSize: "cover",
      }}
    >
      <div className="quizizzGame__stats--inner overlay text-center d-flex flex-wrap flex-column justify-content-center">
        <p>Summary</p>
        <div className="quizizzGame__stats--accuracy">
          <div className="quizizzGame__stats--accuracy-total">
            <div
              className="quizizzGame__stats--accuracy-progress"
              style={{
                width: Math.floor(correctAnswer / questionsLength) * 100 + "%",
              }}
            ></div>
          </div>
        </div>
        <div>
          <h1>
            Your score: {score}/{questionsLength}
          </h1>
        </div>
        <div>
          <button onClick={resetGame}>Play again</button>
        </div>
      </div>
    </div>
  );
}
