import {useState, useEffect, useRef, React} from "react";
import '/home/coder/project/workspace/reactapp/src/App.css';

export default function Stopwatch(props) {
    const[time,setTime] = useState(0)
    const[isActive,setIsActive] = useState(false)
    const[isPaused,setIsPaused] = useState(false)
    const increased = useRef(null)

    const initiateStart = () => {
        setIsActive(true);
        setIsPaused(false);

        increased.current = setInterval(() => {
            setTime((time) => time + 1000)
        },1000)
    };

    const initiatePause = () => {
        clearInterval(increased.current);
        setIsPaused(!isPaused);
    };

    const initiateResume = () => {
        setIsPaused(!isPaused);
        increased.current = setInterval(() => {
            setTime((time) => time + 1000)
        },1000)
    };

    const initiateReset = () => {
        clearInterval(increased.current)
        setIsActive(false)
        setIsPaused(false)
        setTime(0)
    };

    return(
        <section id='stopwatch'>
            <div className='inner'>
                <p> React Stopwatch </p>
                <p id='time' data-testid='time'>
                    {`0${Math.floor(time%360000)}`.slice(-2)} : {`0${Math.floor(time/60000)%60}`.slice(-2)} : {`0${Math.floor(time/1000)%60}`.slice(-2)}
                </p>

                <div className='buttons'>
                    {
                        !isActive&&!isPaused?<button onClick={initiateStart} data-testid='start'>Start</button>:(!isPaused?<button data-testid='pause' onClick={initiatePause}>Pause</button>:<button data-testid='resume' onClick={initiateResume}>Resume</button>)
                    }
                    <button id='reset'data-testid='reset' onClick={initiateReset} disabled={!isActive}>Reset</button>
                </div>
            </div>
        </section>
    )
}