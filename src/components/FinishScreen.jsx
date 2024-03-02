function FinishScreen({points, maxPossiblePoints, highScore, dispatchEvent}) {
    const percentage = (points / maxPossiblePoints) * 100;

    let emoji;
    if (percentage === 100) emoji = "🥇";
    if (percentage >= 80 && percentage < 100) emoji = "🎉";
    if (percentage >= 50 && percentage < 80) emoji = "🙃";
    if (percentage > 0 && percentage < 50) emoji = "🤨";
    if (percentage === 0) emoji = "🤦‍♂️";
    
    // localStorage.setItem('highScore', JSON.stringify(points));
    // let highScore = localStorage.getItem('highScore');
    // if(highScore < points) localStorage.setItem('highScore', JSON.stringify(points));
    // ! Bu yolla ozum yazmisdim ama nese yarimciqdir

    return (
        <>
            <p className="result"><span>{emoji}</span> You scored <strong>{points}</strong> out of {maxPossiblePoints} ({Math.ceil(percentage)}%)</p>
            <p className="highscore">Highscore:  {highScore} points</p>
            <button className="btn btn-ui" onClick={()=> dispatchEvent({type : 'restart'})}>Restart</button>
        </>
    )
}

export default FinishScreen;
