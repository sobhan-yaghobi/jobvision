import { Transition, Variants } from "framer-motion";

// Ex = isExit
// Var = isVariable

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
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            scale: { delay: 0.3 },
        },
    },
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
        transition: {
            type: "spring",
            duration: 0.1,
            ease: "backOut",
            opacity: {
                delay: 0.1,
            },
        },
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
    hidden: {
        y: "100vh",
    },
    visible: (i) => ({ y: 0, transition: { delay: i } }),
};

const ShowFromRight: Variants = {
    hidden: { opacity: 0, x: "100%" },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            ease: "linear",
            bounce: 9,
        },
    },
};

const ShowFromLeft: Variants = {
    hidden: { opacity: 0, x: "-100%" },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            ease: "linear",
            bounce: 9,
        },
    },
};

const ShowFromTop: Variants = {
    hidden: { opacity: 0, y: "-100%" },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            ease: "linear",
            bounce: 9,
        },
    },
};
const ShowFromBottom: Variants = {
    hidden: { opacity: 0, y: "100%" },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            ease: "linear",
            bounce: 9,
        },
    },
};

// TRANSITION

const TweenEaseOutVeryShortly: Transition = {
    duration: 0.01,
    ease: "easeOut",
    type: "tween",
};

const DelayBeforeChilds: Transition = {
    staggerChildren: 1.4,
    when: "beforeChildren",
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
    ShowHideClipFromBottom_Ex,
    ShowFromBottom_Var,
    ShowFromRight,
    ShowFromLeft,
    ShowFromTop,
    ShowFromBottom,
    // Transition
    TweenEaseOutVeryShortly,
    DelayBeforeChilds,
};
