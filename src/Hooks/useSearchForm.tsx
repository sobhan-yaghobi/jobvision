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

    return { route, setRoute, routeTitle, routeJobsTag, routeCity, getForm };
};

export default useSearchForm;
