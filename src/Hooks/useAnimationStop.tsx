import { useRef, useState, useEffect, useCallback } from "react";
import useWindowsSize from "./useWindowsSize";

interface useAnimationStopType {
    screen: "sm" | "md" | "lg" | "xl" | "xxl";
    diActiveAnimation: Function;
    animation: Function;
    intervalTime: number;
}

const useAnimationStop = ({ screen, diActiveAnimation, animation, intervalTime }: useAnimationStopType) => {
    const breakPointSize: number =
        screen === "sm"
            ? 640
            : screen === "md"
            ? 768
            : screen === "lg"
            ? 1024
            : screen === "xl"
            ? 1280
            : screen === "xxl"
            ? 1536
            : 1536;

    const [WindowsSize] = useWindowsSize();
    const myInterval = useRef(0);
    const [runAnimation, setRunAnimation] = useState(false);

    const animationAction = useCallback(() => {
        myInterval.current = setInterval(() => {
            animation();
        }, intervalTime);
    }, [runAnimation]);

    const showWhyUs = () => {
        if (!runAnimation) {
            animationAction();
            setRunAnimation(true);
        }
        return () => clearInterval(myInterval.current);
    };

    useEffect(() => {
        const isRun = WindowsSize.innerWidth > breakPointSize ? true : false;

        if (WindowsSize.innerWidth > breakPointSize && isRun) {
            showWhyUs();
        } else if (WindowsSize.innerWidth <= breakPointSize && isRun) {
            setRunAnimation(false);
            showWhyUs()();
            diActiveAnimation();
        }
    }, [WindowsSize]);
};

export default useAnimationStop;
