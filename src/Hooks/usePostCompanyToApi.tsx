import supabase from "../Services/supabase";
import { companyType } from "./useCompanies";
export type companyPostType = Omit<companyType, "created_at" | "id">;
type postActionProps = {
    newCompany: companyPostType;
    successFunctionHandler: () => void;
};
const usePostCompanyToApi = () => {
    const postAction = async ({ newCompany, successFunctionHandler }: postActionProps) => {
        const { error } = await supabase.from("companies").insert([{ ...newCompany }]);
        if (typeof error !== "undefined") {
            successFunctionHandler();
        }
    };
    return { postAction };
};
export default usePostCompanyToApi;
