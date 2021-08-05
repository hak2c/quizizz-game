export default function PrintScore({ score, questionsLength, resetGame }) {
  return (
    <div className="quizizzGame__score text-center">
      <div className="quizizzGame__score--inner">
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
