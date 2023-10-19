import { message } from "antd";
import { ShowMessType } from "./useShowMssAndNotif";

const useShowMessage = () => {
    const [messageApi, contextMessageHolder] = message.useMessage();
    const showMessage = (type: ShowMessType, content: string) =>
        messageApi.open({
            type,
            content,
        });
    return { contextMessageHolder, showMessage };
};

export default useShowMessage;
