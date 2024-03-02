import { useEffect } from "react"

function Timer({secondsRemaining, dispatchEvent}) {
const min = Math.floor(secondsRemaining / 60);
const sec = secondsRemaining % 60;

    useEffect(()=>{
        const alarm = setInterval(() => {
            dispatchEvent({type : 'tick'})
        }, 1000);

        return ()=> clearInterval(alarm);
    }, [dispatchEvent])
    return (
        <div className="timer">
            {min < 10 ? `0${min}` : min } : {sec < 10 ? `0${sec}` : sec}
        </div>
    )
}

export default Timer
