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
    const { companies, isLoading: companiesLoading } = useCompanies({ mode: "array" });
    const { advertisings, isLoading: advertisingsLoading } = useAdvertisings({ mode: "array" });

    const getAdvertisingWithCompany: TypeAdvertising[] = advertisings.map((ads) => ({
        ...ads,
        ...{
            company:
                typeof getItem({ main_id: ads.company_id, array: companies, key: "id" }).at(0) === "undefined"
                    ? ({} as companyType)
                    : getItem({ main_id: ads.company_id, array: companies, key: "id" }).at(0) || ({} as companyType),
        },
    }));

    const mainJobIdFromRoute = route.get("advertisingId");
    const mainJobsFromRoute = getAdvertisingWithCompany.filter((ads) => ads.id === mainJobIdFromRoute).at(0);

    useEffect(() => {
        setBoxList(getAdvertisingWithCompany);
        setMainBox((prev) => ({ ...prev, mainInfo: mainJobsFromRoute }));
    }, [advertisings, companies]);

    return {
        boxList,
        setBoxList,
        getAdvertisingWithCompany,
        mainBox,
        setMainBox,
        isLoading: !companiesLoading && !advertisingsLoading ? false : true,
    };
};

export default useBoxList;
