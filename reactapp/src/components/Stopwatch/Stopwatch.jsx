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
        setIsPaused()
    }
}