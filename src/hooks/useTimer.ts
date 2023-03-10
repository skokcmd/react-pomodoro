import {useEffect, useMemo, useState} from "react";

/**
 * A custom hook that provides a timer logic and a timer in the format of mm:ss
 * @return {TimerHook}
 */
export function useTimer(defaultValue: number) {
  const [timer, setTimer] = useState<number>(defaultValue * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // runs on component mount or if timer or isRunning changes
  // if isRunning is true and timer > 0, start the timer
  useEffect(() => {
    if (isRunning && timer > 0) {
      const timeoutId = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [isRunning, timer]);

  /**
   * Memoized timer in the format of mm:ss
   * @return {string} the timer in the format of mm:ss
   */
  const formattedTimer = useMemo(() => {
    const minutes = Math.floor(timer / 60);
    const formattedSeconds = (timer - minutes * 60).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });

    const formattedMinutes = minutes.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });

    return `${formattedMinutes}:${formattedSeconds}`;
  }, [timer]);

  function start(): void {
    setIsRunning(true);
  }

  function pause(): void {
    setIsRunning(false);
  }

  return {
    isRunning,
    formattedTimer,
    setTimer,
    setIsRunning,
    start,
    pause,
  };
}
