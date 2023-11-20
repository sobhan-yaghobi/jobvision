import { useSearchParams } from "react-router-dom";

const useSearchForm = () => {
    const [route, setRoute] = useSearchParams({ title: "", jobsGroup: "", city: "" });
    const routeTitle = route.get("title") ?? "";
    const routeJobsTag = route.get("jobsGroup") ?? "";
    const routeCity = route.get("city") ?? "";

    return { route, setRoute, routeTitle, routeJobsTag, routeCity };
};

export default useSearchForm;
