import supabase from "../Services/supabase";
import { userInfo } from "../Store/useAuth";
type postActionProps = {
    userInfo: userInfo;
    successFunctionHandler: Function;
};
type updateActionProps = {
    userId: userInfo["email_or_phoneNumber"];
    companyId: string;
    successFunctionHandler?: (data: userInfo | undefined) => void;
};
const usePostUserToApi = () => {
    const postAction = async ({ userInfo, successFunctionHandler }: postActionProps) => {
        const { error } = await supabase.from("users").insert([{ ...userInfo }]);
        if (typeof error !== "undefined") {
            successFunctionHandler();
        }
    };
    const updateAction = async ({ companyId, userId, successFunctionHandler }: updateActionProps) => {
        const { error, data: dataQuery } = await supabase
            .from("users")
            .update({ company_id: companyId })
            .eq("email_or_phoneNumber", userId)
            .select()
            .returns<[userInfo]>();

        const data = dataQuery ? dataQuery.at(0) : ({} as userInfo);
        if (typeof error !== "undefined" && typeof successFunctionHandler !== "undefined") {
            successFunctionHandler(data);
        }
    };
    return { postAction, updateAction };
};
export default usePostUserToApi;
