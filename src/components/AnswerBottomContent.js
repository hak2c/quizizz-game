export default function AnswerBottomContent({ checked, checkedResult }) {
  let bgColor = "";
  if (checked) {
    bgColor = checkedResult ? " right-answer" : " wrong-answer";
  }
  let text = checkedResult ? "Correct" : "Incorrect";
  return (
    <div
      className={
        "col-12 quizizzGame__result text-center text-uppercase" + bgColor
      }
    >
      {checked && text}
    </div>
  );
}
