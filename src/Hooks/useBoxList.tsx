import React, { useEffect, useState } from "react";
import useCompanies, { companyType } from "./useCompanies";
import useAdvertisings from "./useAdvertisings";
import { TypeAdvertising } from "../Components/AdvertisingBox/AdvertisingBox.type";
import { getItem } from "../Utils/Utils";
import { mainJobInfoType } from "../Page/Jobs/Jobs.type";
import useSearchForm from "./useSearchForm";

const useBoxList = () => {
    const { route } = useSearchForm();
    const [boxList, setBoxList] = useState<TypeAdvertising[]>([] as TypeAdvertising[]);
    const [mainBox, setMainBox] = useState<mainJobInfoType>({ isShow: false, mainInfo: {} as TypeAdvertising });
    const { companies } = useCompanies({ mode: "array" });
    const { advertisings } = useAdvertisings({ mode: "array" });
    const getAdvertisingWithCompany = () =>
        advertisings.map((ads) => ({
            ...ads,
            ...{
                company:
                    typeof getItem({ main_id: ads.company_id, array: companies, key: "id" }).at(0) === "undefined"
                        ? ({} as companyType)
                        : getItem({ main_id: ads.company_id, array: companies, key: "id" }).at(0) ||
                          ({} as companyType),
            },
        }));

    const mainJobIdFromRoute = route.get("advertisingId");
    const mainJobsFromRoute = getAdvertisingWithCompany()
        .filter((ads) => ads.id === mainJobIdFromRoute)
        .at(0);

    useEffect(() => {
        setBoxList(getAdvertisingWithCompany());
    }, [advertisings]);
    useEffect(() => {
        setMainBox((prev) => ({ ...prev, mainInfo: mainJobsFromRoute }));
    }, [advertisings]);

    return { boxList, setBoxList, getAdvertisingWithCompany, mainBox, setMainBox };
};

export default useBoxList;