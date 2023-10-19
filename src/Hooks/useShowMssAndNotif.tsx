import React from "react";
import useShowNotification from "./useShowNotification";
import useShowMessage from "./useShowMessage";
import useWindowsSize from "./useWindowsSize";

export type placementNotifType = "bottomLeft" | "bottom" | "bottomRight" | "top" | "topLeft" | "topRight";
export type ShowMessType = "error" | "success" | "warning";

type useShowMssAndNotifProps = {
    placementOfNotif: placementNotifType;
};

export type TypeMessShow = { type: ShowMessType; message: string | undefined };

const useShowMssAndNotif = ({ placementOfNotif }: useShowMssAndNotifProps) => {
    const [windowSize] = useWindowsSize();
    const { contextNotificationHolder, showNotifcation } = useShowNotification({ placement: placementOfNotif });
    const { contextMessageHolder, showMessage } = useShowMessage();
    const showMess = ({ type, message }: TypeMessShow) => {
        if (typeof message !== "undefined") {
            windowSize.innerWidth < 768 ? showMessage(type, message) : showNotifcation(type, message);
        }
    };
    return {
        ShowContext: (
            <>
                {contextNotificationHolder}
                {contextMessageHolder}
            </>
        ),
        showMess,
    };
};

export default useShowMssAndNotif;
