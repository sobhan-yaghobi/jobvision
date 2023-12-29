import { useMutation } from "@tanstack/react-query";
import supabase from "../Services/supabase";
import { userInfo } from "../Store/useAuth";

const useUser = () => {
    const { data, mutateAsync, mutate } = useMutation({
        mutationKey: ["user"],
        mutationFn: async (param: string) => {
            const { data: user } = await supabase
                .from("users")
                .select("*")
                .eq("email_or_phoneNumber", param)
                .returns<userInfo[]>();
            return user?.at(0);
        },
    });
    return { data, mutateAsync, mutate };
};

export default useUser;
