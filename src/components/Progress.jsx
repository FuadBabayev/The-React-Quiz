function Progress({ index, points, maxPossiblePoints, numberQuestions, answer }) {
    // console.log(answer);
  return (
    <header className="progress">
        
        <progress value={answer !==null ? index + 1 : index} max={numberQuestions}/>


          <p>Question <strong>{index + 1}/{numberQuestions}</strong> </p>
          <p><strong>Points:</strong> {points}/{maxPossiblePoints}</p>
      
    </header>
  );
}

export default Progress;
