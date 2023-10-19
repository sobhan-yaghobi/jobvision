import { notification } from "antd";
import { ShowMessType, placementNotifType } from "./useShowMssAndNotif";

export type useShowNotificationProps = {
    placement: placementNotifType;
};

const useShowNotification = ({ placement }: useShowNotificationProps) => {
    const [messageApi, contextNotificationHolder] = notification.useNotification();
    const showNotifcation = (type: ShowMessType, message: string) =>
        messageApi.open({
            type,
            message,
            placement,
            style: { margin: "1rem" },
        });
    return { contextNotificationHolder, showNotifcation };
};

export default useShowNotification;
