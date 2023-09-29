import { Variants } from "framer-motion";

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

export { ShowHideMenuItemChildToLeftOrRight };
