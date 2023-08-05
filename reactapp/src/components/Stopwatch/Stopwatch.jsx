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
                <h1> React Stopwatch </h1>
                <p id='time' data-testid='time'>
                    {`0${Math.floor(time%360000)}`}
                </p>
            </div>
        </section>
    )
}