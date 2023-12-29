import supabase from "../Services/supabase";
import { userInfo } from "../Store/useAuth";
type postActionProps = {
    userInfo: userInfo;
    successFunctionHandler: Function;
};
const usePostUserToApi = () => {
    const postAction = async ({ userInfo, successFunctionHandler }: postActionProps) => {
        const { error } = await supabase.from("users").insert([{ ...userInfo }]);
        if (typeof error !== "undefined") {
            successFunctionHandler();
        }
    };
    return { postAction };
};
export default usePostUserToApi;
