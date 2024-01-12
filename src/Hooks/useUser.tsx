import { useMutation } from "@tanstack/react-query";
import supabase from "../Services/supabase";
import { userInfo } from "../Store/useAuth";
import useCompanies, { companyType } from "./useCompanies";
import { pick } from "lodash";
type TypeUserFormApi = Omit<userInfo, "company"> & { company_id: string | null };

const useUser = () => {
    const { data, mutateAsync, mutate } = useMutation({
        mutationKey: ["user"],
        mutationFn: async (param: string) => {
            const { data: users } = await supabase
                .from("users")
                .select("*")
                .eq("email_or_phoneNumber", param)
                .returns<TypeUserFormApi[]>();
            const { data: companies } = await supabase
                .from("companies")
                .select("*")
                .eq("id", users ? users[0]?.company_id : "")
                .returns<companyType[]>();

            const userObj: userInfo =
                users && typeof users[0] !== "undefined"
                    ? {
                          ...pick(users[0], ["password", "email_or_phoneNumber"]),
                          company: (companies && companies[0]) ?? ({} as companyType),
                      }
                    : ({} as userInfo);

            return userObj;
        },
    });
    return { data, mutateAsync, mutate };
};

export default useUser;
