export default function NextButton({dispatchEvent, answer, index, numberQuestions}){
    const hasAnswered = answer !== null;
  
    if(index < numberQuestions - 1)
    return (
      <>
      {hasAnswered && <button className="btn btn-ui" onClick={()=> dispatchEvent({ type : 'nextQuestion'})}> Next</button>}
      </>
    );

    if(index === numberQuestions - 1)
    return (
      <>
      {hasAnswered && <button className="btn btn-ui" onClick={()=> dispatchEvent({ type : 'finish'})}>Finish</button>}
      </>
    );
  }