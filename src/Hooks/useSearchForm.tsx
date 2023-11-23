import { useSearchParams, useNavigate } from "react-router-dom";

type setValueType = {
    name: "title" | "jobsGroup" | "city" | "advertisingId";
    value: string;
};

type navigate_SetValueType = {
    to: string;
} & setValueType;

const useSearchForm = () => {
    const navigate = useNavigate();
    const [route, setRoute] = useSearchParams({ title: "", jobsGroup: "", city: "", advertisingId: "" });
    const routeTitle = route.get("title") ?? "";
    const routeJobsTag = route.get("jobsGroup") ?? "";
    const routeCity = route.get("city") ?? "";

    const getForm = (): { title: string; jobsGroup: string; city: string } => ({
        title: routeTitle,
        jobsGroup: routeJobsTag,
        city: routeCity,
    });
    const clearForm = () => setRoute((prev) => ({ ...prev, title: "", jobsGroup: "", city: "" }));
    const setValue = ({ name, value }: setValueType): void => {
        setRoute((prev) => {
            prev.set(name, value);
            return prev;
        });
    };
    const navigate_SetValue = ({ to, name, value }: navigate_SetValueType): void => {
        navigate(`${to}?${name}=${value}`);
    };

    return { route, routeTitle, routeJobsTag, routeCity, setRoute, getForm, setValue, navigate_SetValue, clearForm };
};

export default useSearchForm;
