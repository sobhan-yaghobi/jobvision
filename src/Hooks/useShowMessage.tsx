import { message } from "antd";

const useShowMessage = () => {
    const [messageApi, contextMessageHolder] = message.useMessage();
    const showMessage = (type: "error" | "success" | "warning", content: string) =>
        messageApi.open({
            type,
            content,
        });
    return { contextMessageHolder, showMessage };
};

export default useShowMessage;
