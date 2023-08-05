import {useState, useEffect, useRef, React} from "react";
import '/home/coder/project/workspace/reactapp/src/App.css';
import { act } from '@testing-library/react';

export default function Stopwatch(props) {
    const[time,setTime] = useState(0);
    const[isActive,setIsActive] = useState(false);
    const[isPaused,setIsPaused] = useState(false);
    const [isResetDisabled, setIsResetDisabled] = useState(true);
    const increased = useRef(null);

    useEffect(() => {
        if (isActive) {
            increased.current = setInterval(() => {
                act(() => {
                  setTime(prevTime => prevTime + 1);
                });
            }, 1000);
        } else {
            clearInterval(increased.current);
        }
    }, [isActive, increased]);

    const initiateStart = () => {
        setIsActive(true);
        setIsResetDisabled(false);
    };

    const initiatePause = () => {
        clearInterval(increased.current);
        setIsActive(false);
        setIsPaused(true);
    };

    const initiateResume = () => {
        setIsRunning(true);
        setIsPaused(false);
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