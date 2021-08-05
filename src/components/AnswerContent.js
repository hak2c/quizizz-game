export default function AnswerContent({
  answer,
  question,
  choices,
  checked,
  chooseAnswer,
}) {
  let { id, answerText, isCorrect } = answer;
  let answerLength = question.answerOptions.length;
  let hideAnswer =
    !choices.includes(id) && checked && !isCorrect ? " d-none" : "";

  let checkedBackgroundColor = "";
  if (checked && choices.includes(id)) {
    if (isCorrect) checkedBackgroundColor = " right-answer";
    else checkedBackgroundColor = " wrong-answer";
  }

  let hover = choices.includes(id) && !checked ? " hover" : "";

  let showResultBg = "";
  if (checked && !choices.includes(id)) {
    if (isCorrect) showResultBg = " right-answer";
  }

  // let itemWidth = "calc((100% - (20px + " + (answerLength - 1) * 10 + "px))";
  return (
    <div
      className="quizizzGame__answer--item"
      style={{
        width:
          "calc((100% - (20px + " +
          (answerLength - 1) * 10 +
          "px)) /" +
          answerLength +
          ")",
      }}
    >
      <div
        onClick={!checked ? (e) => chooseAnswer(e, id, question) : undefined}
        className={
          "quizizzGame__answer--item-inner overlay d-flex justify-content-center align-items-center text-center" +
          hideAnswer +
          checkedBackgroundColor +
          hover +
          showResultBg
        }
        data-id={id}
      >
        {answerText}
      </div>
    </div>
  );
}
