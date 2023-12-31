import supabase from "../Services/supabase";
import { companyType } from "./useCompanies";
export type companyPostType = Omit<companyType, "created_at" | "id">;
type postActionProps = {
    newCompany: companyPostType;
    successFunctionHandler: (data: companyType | null) => void;
};
type updateActionProps = Omit<postActionProps, "newCompany"> & {
    company: companyPostType;
    id: string;
};
const usePostCompanyToApi = () => {
    const postAction = async ({ newCompany, successFunctionHandler }: postActionProps) => {
        const { error, data } = await supabase
            .from("companies")
            .insert([{ ...newCompany }])
            .select()
            .returns<companyType>();
        if (typeof error !== "undefined") {
            successFunctionHandler(data);
        }
    };
    const updateAction = async ({ id, company, successFunctionHandler }: updateActionProps) => {
        const { data, error } = await supabase
            .from("companies")
            .update({ ...company })
            .eq("id", id)
            .select()
            .returns<companyType>();
        if (typeof error !== "undefined") {
            successFunctionHandler(data);
        }
    };
    return { postAction, updateAction };
};
export default usePostCompanyToApi;
