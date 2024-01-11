import { Transition, Variants } from "framer-motion";

// Ex = isExit
// Var = isVariable

// TRANSITION

const TweenEaseOutVeryShortly: Transition = {
    duration: 0.01,
    ease: "easeOut",
    type: "tween",
};

const SpringBackOutVeryShortly: Transition = {
    type: "spring",
    duration: 0.1,
    ease: "backOut",
    opacity: {
        delay: 0.1,
    },
};

const DelayBeforeChilds: Transition = {
    staggerChildren: 1.4,
    when: "beforeChildren",
};

// Animations

const ShortStripVerticalAnimation_Ex_Var: Variants = {
    hidden: (i: number) => ({ y: 100 * i }),
    visible: { y: 0 },
    exit: (i: number) => ({ y: 100 * i }),
};

const LongStripVertical_Ex: Variants = {
    hidden: {
        opacity: 0,
        y: "-100dvh",
    },
    visible: {
        y: 0,
        opacity: 1,
    },
    exit: {
        opacity: 0,
        y: "-100dvh",
    },
};

const ShowAndHideScale_Ex: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
};

const ShowOpacity: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

const ShowAndHideOpacity_Ex: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
};

const ShowItemsDelay_Var: Variants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
        opacity: 1,
        transition: {
            ease: "linear",
            bounce: 9,
            delay: i * 0.2,
        },
    }),
    exit: { opacity: 0, scale: 0.6 },
};

const ShowSvgPath: Variants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: {
        opacity: 1,
        pathLength: 1,
        transition: {
            opacity: {
                duration: 0.1,
            },
            pathLength: {
                duration: 4,
                yoyo: Infinity,
                ease: "easeInOut",
            },
        },
    },
};

const ShortShowFromBottom: Variants = {
    hidden: { y: 30, opacity: 0.1, zIndex: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: SpringBackOutVeryShortly,
    },
};

const ShortShowFromTop: Variants = {
    hidden: { y: -30, opacity: 0.1, zIndex: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: SpringBackOutVeryShortly,
    },
};

const ShowHideClipFromBottom_Ex: Variants = {
    hidden: {
        clipPath: "inset(100% 50% 0% 50% round 10px)",
    },
    visible: {
        clipPath: "inset(0% 0% 0% 0% round 0px)",
    },
    exit: {
        clipPath: "inset(100% 50% 0% 50% round 10px)",
    },
};

const ShowFromBottom_Var: Variants = {
    hidden: { y: "100vh" },
    visible: (i) => ({ y: 0, transition: { delay: i } }),
};

const ShowFromRight: Variants = {
    hidden: { opacity: 0, x: "100%" },
    visible: { opacity: 1, x: 0 },
};

const ShowFromRight_Ex: Variants = {
    hidden: { opacity: 0, x: "100%" },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "100%" },
};

const ShowFromLeft: Variants = {
    hidden: { opacity: 0, x: "-100%" },
    visible: { opacity: 1, x: 0 },
};

const ShowFromTop: Variants = {
    hidden: { opacity: 0, y: "-100%" },
    visible: { opacity: 1, y: 0 },
};
const ShowFromBottom: Variants = {
    hidden: { opacity: 0, y: "100%" },
    visible: { opacity: 1, y: 0 },
};

const ShowFromBottom_EX: Variants = {
    hidden: { opacity: 0, y: "100%" },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "100%" },
};

const ShowShortFromBottomHiden_Var: Variants = {
    hidden: { opacity: 0, y: "15%" },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            ease: "linear",
            delay: i,
        },
    }),
};

const ShowHideMenuItemChildToLeftOrRight: Function = (goForward: boolean): Variants => {
    return {
        hidden: {
            opacity: 0,
            scale: 0.8,
            ...(goForward ? { x: "100%" } : { x: "-100%" }),
        },
        visible: {
            x: 0,
            scale: 1,
            opacity: 1,
            transition: {
                scale: { delay: 0.5 },
            },
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            ...(goForward ? { x: "100%" } : { x: "-100%" }),
        },
    };
};

export {
    ShortStripVerticalAnimation_Ex_Var,
    LongStripVertical_Ex,
    ShowAndHideScale_Ex,
    ShowOpacity,
    ShowAndHideOpacity_Ex,
    ShowItemsDelay_Var,
    ShowSvgPath,
    ShortShowFromBottom,
    ShortShowFromTop,
    ShowHideClipFromBottom_Ex,
    ShowFromBottom_Var,
    ShowFromRight,
    ShowFromRight_Ex,
    ShowFromLeft,
    ShowFromTop,
    ShowFromBottom,
    ShowFromBottom_EX,
    ShowShortFromBottomHiden_Var,
    ShowHideMenuItemChildToLeftOrRight,
    // Transition
    TweenEaseOutVeryShortly,
    DelayBeforeChilds,
    SpringBackOutVeryShortly,
};
