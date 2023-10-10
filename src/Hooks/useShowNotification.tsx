import { notification } from "antd";

type useShowNotificationProps = {
    placement: "bottomLeft" | "bottom" | "bottomRight" | "top" | "topLeft" | "topRight";
};

const useShowNotification = ({ placement }: useShowNotificationProps) => {
    const [messageApi, contextNotificationHolder] = notification.useNotification();
    const showNotifcation = (type: "error" | "success" | "warning", message: string) =>
        messageApi.open({
            type,
            message,
            placement,
            style: { margin: "1rem" },
        });
    return { contextNotificationHolder, showNotifcation };
};

export default useShowNotification;
