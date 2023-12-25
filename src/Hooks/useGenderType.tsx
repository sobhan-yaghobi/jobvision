import supabaseFetch from "../Services/supabaseFetch";
import { TypeOptionInput } from "../Components/Input/Input.type";
import { useQuery } from "@tanstack/react-query";
type genderType = {
    gender: string;
};
const useGenderType = () => {
    const { data } = useQuery({
        queryKey: ["gender_type"],
        queryFn: async () => (await supabaseFetch.get<genderType[]>("gender_type?select=*")).data,
    });
    const options: TypeOptionInput[] =
        data?.map((item) => ({ label: item.gender, value: item.gender })) ?? ([] as TypeOptionInput[]);
    return { data: typeof data !== "undefined" ? data : ([] as genderType[]), options };
};
export default useGenderType;
