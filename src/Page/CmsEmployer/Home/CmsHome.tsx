import React from "react";
import useItemCmsPage from "../../../Hooks/useItemCmsPage";
import EditHome from "./EditHome";
import MainHome from "./MainHome";
import ErrorBox from "../../../Components/ErrorBox/ErrorBox";

const CmsHome: React.FC = () => {
    const { mainItemKey } = useItemCmsPage();
    return mainItemKey === "edit_home" ? (
        <EditHome />
    ) : mainItemKey === "main_home" ? (
        <MainHome />
    ) : (
        <ErrorBox errTitle="صفحه ای یافت نشد" />
    );
};

export default CmsHome;
