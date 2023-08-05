import {useState, useEffect, useRef, React} from "react";
import '/home/coder/project/workspace/reactapp/src/App.css';

// export default function Stopwatch(props) {
//     const[time,setTime] = useState(0)
//     const[isActive,setIsActive] = useState(false)
//     const[isPaused,setIsPaused] = useState(false)
//     const increased = useRef(null)

//     const initiateStart = () => {
//         setIsActive(true);
//         setIsPaused(false);

//         increased.current = setInterval(() => {
//             setTime((time) => time + 1000)
//         },1000)
//     };

//     const initiatePause = () => {
//         clearInterval(increased.current);
//         setIsPaused(!isPaused);
//     };

//     const initiateResume = () => {
//         setIsPaused(!isPaused);
//         increased.current = setInterval(() => {
//             setTime((time) => time + 1000)
//         },1000)
//     };

//     const initiateReset = () => {
//         clearInterval(increased.current)
//         setIsActive(false)
//         setIsPaused(false)
//         setTime(0)
//     };

//     return(
//         <section id='stopwatch'>
//             <div className='inner'>
//                 <h1> React Stopwatch </h1>
//                 <p id='time' data-testid='time'>
//                     {`0${Math.floor(time%360000)}`.slice(-2)} : {`0${Math.floor(time/60000)%60}`.slice(-2)} : {`0${Math.floor(time/1000)%60}`.slice(-2)}
//                 </p>

//                 <div className='buttons'>
//                     {
//                         !isActive&&!isPaused?<button onClick={initiateStart} data-testid='start'>Start</button>:(!isPaused?<button data-testid='pause' onClick={initiatePause}>Pause</button>:<button data-testid='resume' onClick={initiateResume}>Resume</button>)
//                     }
//                     <button id='reset'data-testid='reset' onClick={initiateReset} disabled={!isActive}>Reset</button>
//                 </div>
//             </div>
//         </section>
//     )
// }


function Stopwatch() {
    const [time, setTime] = useState(0);
    const intervalRef = useRef(null);
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isResetDisabled, setIsResetDisabled] = useState(true);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                act(() => {
                  setTime(prevTime => prevTime + 1);
                });
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }
    }, [isRunning, intervalRef]);
    

    function handleStart() {
        setIsRunning(true);
        setIsResetDisabled(false);
    }

    function handlePause() {
        clearInterval(intervalRef.current);
        setIsRunning(false);
        setIsPaused(true);
    }

    function handleReset() {
        clearInterval(intervalRef.current);
        setTime(0);
        setIsRunning(false);
        setIsPaused(false);
        setIsResetDisabled(true);
    }

    function handleResume() {
        setIsRunning(true);
        setIsPaused(false);
    }
    const formatTime = (seconds) => {
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let remainingMinutes = minutes % 60;
        let remainingSeconds = seconds % 60;
        return `${hours.toString().padStart(2, "0")} : ${remainingMinutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
    }

    return (
        <div className="stopwatch-container">
            <p id="header-text">React Stopwatch</p>
            <p id="time" data-testid="time" className="time-text">{formatTime(time)}</p>
            {isRunning ? <button id="pause" data-testid="pause" className="button" onClick={handlePause}>Pause</button>
                : !isPaused ? <button id="start" data-testid="start" className="button" onClick={handleStart}>Start</button>
                    : <button id="resume" data-testid="resume" className="button" onClick={handleResume}>Resume</button>}
            <button id="reset" data-testid="reset" className="button" disabled={isResetDisabled} onClick={handleReset}>Reset</button>
        </div>
    );
}

export default Stopwatch;