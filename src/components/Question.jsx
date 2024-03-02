import Option from "./Option";

function Question({ data, dispatchEvent, answer }) {
  return (
    <>
      <h4>{data.question}</h4>
      <Option question={data} dispatchEvent={dispatchEvent} answer={answer}  />
    </>
  );
}

export default Question;
