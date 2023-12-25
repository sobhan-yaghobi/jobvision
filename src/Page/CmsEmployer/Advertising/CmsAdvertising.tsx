import React from "react";
import useItemCmsPage from "../../../Hooks/useItemCmsPage";
import AddAdvertising from "./AddAdvertising";
import MainAdvertising from "./MainAdvertising";
import ErrorBox from "../../../Components/ErrorBox/ErrorBox";

const CmsAdvertising: React.FC = () => {
    const { mainItemKey } = useItemCmsPage();
    return mainItemKey === "add_advertising" ? (
        <AddAdvertising />
    ) : mainItemKey === "main_advertising" ? (
        <MainAdvertising />
    ) : (
        <ErrorBox errTitle="صفحه ای یافت نشد" />
    );
};

export default CmsAdvertising;
