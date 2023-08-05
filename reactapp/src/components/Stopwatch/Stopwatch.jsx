import {useState, useEffect, useRef, React} from "react";
import '/home/coder/project/workspace/reactapp/src/App.css';

export default function Stopwatch(props) {
    const[time,setTime] = useState(0)
    const[isActive,setIsActive] = useState(false)
    const[isPaused,setIsPaused] = useState(false)
    
}