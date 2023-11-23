import { useSearchParams } from "react-router-dom";

const useSearchForm = () => {
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
    const setValue = (name: "title" | "jobsGroup" | "city" | "advertisingId", value: string): void => {
        setRoute((prev) => {
            prev.set(name, value);
            return prev;
        });
    };

    return { route, routeTitle, routeJobsTag, routeCity, setRoute, getForm, setValue, clearForm };
};

export default useSearchForm;
