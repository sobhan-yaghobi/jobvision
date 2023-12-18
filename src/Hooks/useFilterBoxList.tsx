import React, { useEffect } from "react";
import { toLowerCaseAction } from "../Utils/Utils";
import { TypeAdvertising } from "../Components/AdvertisingBox/AdvertisingBox.type";
import useSearchForm from "./useSearchForm";
import { TypeRoutes } from "../Page/Jobs/Jobs.type";
import { pull, includes as includes_lodash } from "lodash";

type useFilterBoxListProps = {
    filter_selection: string[];
    pro_mode: boolean;
    box_list: TypeAdvertising[];
    boxs: TypeAdvertising[];
    set_box_list: React.Dispatch<React.SetStateAction<TypeAdvertising[]>>;
};

const useFilterBoxList = ({ filter_selection, pro_mode, box_list, boxs, set_box_list }: useFilterBoxListProps) => {
    const { route, routeCity, routeJobsTag, routeTitle } = useSearchForm();
    const isTitle = (title: string, name: string): TypeRoutes => ({
        isRouteValue: Boolean(routeTitle.length),
        isValueExist: routeTitle.length
            ? toLowerCaseAction(title).includes(toLowerCaseAction(routeTitle)) ||
              toLowerCaseAction(name).includes(toLowerCaseAction(routeTitle))
            : false,
    });
    const isTag = (tags: string[] | undefined): TypeRoutes => ({
        isRouteValue: Boolean(routeJobsTag.length),
        isValueExist: routeJobsTag.length
            ? Boolean(tags?.filter((tag) => toLowerCaseAction(tag).includes(toLowerCaseAction(routeJobsTag))).length)
            : false,
    });
    const isCity = (city: string): TypeRoutes => ({
        isRouteValue: Boolean(routeCity.length),
        isValueExist: routeCity.length ? toLowerCaseAction(city).includes(toLowerCaseAction(routeCity)) : false,
    });
    const boxByFilterSelction = (array: TypeAdvertising[]) =>
        array.filter((ads) => {
            const isExist = filter_selection.map((filter) => includes_lodash(ads.ads_types, filter));
            if (pro_mode) {
                if (pull(isExist, false).length >= filter_selection.length) {
                    return ads;
                }
            } else {
                if (includes_lodash(isExist, true)) {
                    return ads;
                }
            }
        });
    const boxBySearchAds = (array: TypeAdvertising[]) =>
        array.filter((ads) =>
            (isTitle(ads.title, ads.company.name).isValueExist || !isTitle(ads.title, ads.company.name).isRouteValue) &&
            (isTag(ads.ads_tags).isValueExist || !isTag(ads.ads_tags).isRouteValue) &&
            (isCity(ads.company.location).isValueExist || !isCity(ads.company.location).isRouteValue)
                ? ads
                : null
        );
    const mergeFilters = () => {
        let mainBoxList: TypeAdvertising[] = [];
        if ((routeTitle.length || routeJobsTag.length || routeCity.length) && filter_selection.length === 0) {
            mainBoxList = boxBySearchAds(boxs);
        }
        if (filter_selection.length > 0) {
            mainBoxList = boxByFilterSelction(boxBySearchAds(boxs));
        }
        if (!routeTitle.length && !routeJobsTag.length && !routeCity.length && !filter_selection.length) {
            mainBoxList = [...boxs];
        }
        set_box_list(mainBoxList);
    };

    useEffect(() => mergeFilters(), [route, pro_mode, filter_selection]);
    return { mergeFilters };
};

export default useFilterBoxList;
