function Option({question, dispatchEvent, answer}) {
    const hasAnswered = answer !== null;
    return (
    <>
        <div className="options">
          {question.options.map((item, index) => (
            <button className={`btn btn-option ${answer === index ? 'answer' : ''} ${hasAnswered ? index === question.correctOption ? 'correct' : 'wrong' : ''}`} 
            key={index} onClick={()=>dispatchEvent({ type : 'newAnswer', payload : index})} disabled={hasAnswered} > 
              {item}
            </button>
          ))}
          {/* {hasAnswered && <button className="btn btn-next" >Next</button>} */}
        </div>
    </>
  );
}

export default Option;



