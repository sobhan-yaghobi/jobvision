import React, { useEffect, useState } from "react";

//  Types
import { CategoryTypes, ChildOfFilterType, FilterType, FiltreTypes, categoryArray } from "./JobsFilter.type";

// Animations
import { ShowAndHideOpacity_Ex } from "../../Animations/UtilsAnimation";

// Functions
import { includes } from "lodash";

// Components
import { motion, AnimatePresence } from "framer-motion";

// Icons
import { AiOutlineDown } from "react-icons/ai";
import { isArray } from "lodash";
import { AiOutlineClose } from "react-icons/ai";

interface selectedFiltersType {
    title: string;
    type: string;
    category: string;
}

const JobsFilter: React.FC = () => {
    const [selectedFilters, setSelectedFilterss] = useState<selectedFiltersType[]>([]);
    const [mainFilterMenu, setMainFilterMenu] = useState<{
        data: FilterType;
        position: { x: number | undefined; y: number | undefined; width: number | undefined };
    }>({
        data: {} as FilterType,
        position: { x: undefined, y: undefined, width: undefined },
    });

    const diActiveMenu = () =>
        setMainFilterMenu({ data: {} as FilterType, position: { x: undefined, y: undefined, width: undefined } });

    const filterAction = (
        Item: FilterType,
        SubItem: ChildOfFilterType | undefined,
        event: React.MouseEvent<HTMLSpanElement, MouseEvent>
    ) => {
        setSelectedFilterss((prev) => {
            if (!Item.isMultiple && typeof Item.sub === "undefined" && typeof Item.type !== "undefined") {
                if (goCheck(Item.type)) {
                    return [...prev.filter((filterItem) => filterItem.type !== Item.type)];
                } else {
                    return [
                        ...prev,
                        { title: Item.title, type: Item.type, category: Item.category ? Item.category : "" },
                    ];
                }
            } else {
                if (!Item.isMultiple && typeof Item.sub !== "undefined" && typeof SubItem !== "undefined") {
                    if (goCheckCategory(SubItem?.category)) {
                        return [...prev.filter((filterItem) => filterItem.category !== Item.category)];
                    } else {
                        return [...prev, { title: SubItem.title, type: SubItem.type, category: SubItem.category }];
                    }
                } else if (Item.isMultiple && typeof Item.sub !== "undefined" && typeof SubItem !== "undefined") {
                    if (prev.some((filterItem) => filterItem.type === SubItem.type)) {
                        return [...prev.filter((filterItem) => filterItem.type !== SubItem.type)];
                    } else {
                        return [...prev, { title: SubItem.title, type: SubItem.type, category: SubItem.category }];
                    }
                }

                return [...prev];
            }
        });

        // FOR MENU
        const isExsist = Boolean(mainFilterMenu.data.id === Item.id);
        if (isExsist && !Item.isMultiple) {
            diActiveMenu();
        } else if (!isExsist) {
            const elmPosition = event.currentTarget.getBoundingClientRect();
            setMainFilterMenu({
                data: Item,
                position: { x: elmPosition.left, y: elmPosition.bottom, width: elmPosition.width },
            });
        }
    };

    type removeFilterActionTypes =
        | { mode: "RemoveType"; mainType: string }
        | { mode: "RemoveCategory"; mainType: string };

    const removeFilterAction = (param: removeFilterActionTypes) => {
        let newSelectedFilters;
        if (param.mode === "RemoveType") {
            newSelectedFilters = selectedFilters.filter((selectedFilter) => selectedFilter.type !== param.mainType);
        } else if (param.mode === "RemoveCategory") {
            newSelectedFilters = selectedFilters.filter((selectedFilter) => selectedFilter.category !== param.mainType);
        } else {
            newSelectedFilters = [...selectedFilters];
        }
        setSelectedFilterss(newSelectedFilters);
        diActiveMenu();
    };

    useEffect(() => {
        console.log(selectedFilters);
    }, [selectedFilters]);

    const goCheck = (ItemType: FiltreTypes | undefined): boolean => {
        if (typeof ItemType !== "undefined") {
            const isTrue: boolean[] = selectedFilters.map((selectedFilter) => {
                if (selectedFilter.type === ItemType) {
                    return true;
                } else {
                    return false;
                }
            });

            if (includes(isTrue, true)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    const goCheckCategory = (ItemType: CategoryTypes | undefined): boolean => {
        if (typeof ItemType !== "undefined") {
            const isTrue: boolean[] = selectedFilters.map((selectedFilter) => {
                if (selectedFilter.category === ItemType) {
                    return true;
                } else {
                    return false;
                }
            });

            if (includes(isTrue, true)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    interface GoGetCategoryProps {
        isMultiple: boolean;
        Item?: FilterType;
        ItemType: CategoryTypes;
    }

    const GoGetCategory: React.FC<GoGetCategoryProps> = ({ isMultiple, Item, ItemType }) => {
        const mainFilterSelect = selectedFilters.filter((selectedFilter) => selectedFilter.category === ItemType);

        if (isMultiple && typeof Item !== "undefined") {
            return (
                <>
                    <span>{Item.title}</span>
                    <span className="mx-2">{mainFilterSelect.length}</span>
                    <span
                        onClick={() =>
                            removeFilterAction({ mode: "RemoveCategory", mainType: mainFilterSelect[0].category })
                        }
                        className="flex items-center"
                    >
                        <AiOutlineClose className="mr-1 text-jv-white text-xl" />
                    </span>
                </>
            );
        } else {
            return (
                <>
                    <span className="text-jv-white ml-1">{mainFilterSelect[0].title}</span>
                    <span
                        onClick={() => removeFilterAction({ mode: "RemoveType", mainType: mainFilterSelect[0].type })}
                        className="flex items-center"
                    >
                        <AiOutlineClose className="mr-1 text-jv-white text-xl" />
                    </span>
                </>
            );
        }
    };
    return (
        <div className=" no-scrollbar overflow-x-auto whitespace-nowrap flex items-center md:whitespace-normal md:flex-wrap md:overflow-x-visible">
            {categoryArray.map((item) => (
                <div
                    key={item.id}
                    onClick={(e) => {
                        if (!goCheckCategory(item.category) || item.isMultiple) {
                            filterAction(item, undefined, e);
                        }
                        if (Object.values(mainFilterMenu.data).length) {
                            diActiveMenu();
                        }
                    }}
                    className={`filtredItem select-none box-info-type text-sm flex items-center px-4 py-2 rounded-2xl cursor-pointer relative ${
                        goCheck(item.type) || goCheckCategory(item.category) ? "text-jv-white bg-jv-primary" : ""
                    }`}
                >
                    {goCheck(item.type) ? (
                        <>
                            <span className="text-jv-white ml-1">{item.title}</span>
                            <AiOutlineClose className="mr-1 text-jv-white text-xl" />
                        </>
                    ) : typeof item.category !== "undefined" && goCheckCategory(item.category) && !item.isMultiple ? (
                        <GoGetCategory isMultiple={false} ItemType={item.category}></GoGetCategory>
                    ) : typeof item.category !== "undefined" && goCheckCategory(item.category) && item.isMultiple ? (
                        <GoGetCategory isMultiple={true} ItemType={item.category} Item={item}></GoGetCategory>
                    ) : (
                        <>
                            <span>{item.title}</span>
                            {typeof item.sub !== "undefined" && isArray(item.sub) && item.sub.length ? (
                                <>
                                    <AiOutlineDown
                                        className={`mr-1 ${mainFilterMenu.data.id === item.id ? "rotate-180" : ""}`}
                                    ></AiOutlineDown>
                                </>
                            ) : null}
                        </>
                    )}
                </div>
            ))}
            <AnimatePresence>
                {Object.entries(mainFilterMenu).length &&
                typeof mainFilterMenu.data.sub !== "undefined" &&
                Array.isArray(mainFilterMenu.data.sub) ? (
                    <motion.div
                        variants={ShowAndHideOpacity_Ex}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="min-h-fit absolute z-20 transition-all duration-500"
                        style={{
                            width: mainFilterMenu.position.width,
                            top: mainFilterMenu.position.y,
                            left: mainFilterMenu.position.x,
                        }}
                    >
                        <ul className="absolute min-w-[15rem] top-3 right-0 bg-jv-light py-3 px-4 shadow-xl border-[1px] border-solid border-jv-lightGray3x rounded-xl">
                            {mainFilterMenu.data.sub.map((subItem) => (
                                <li
                                    onClick={(e) => filterAction(mainFilterMenu.data, subItem, e)}
                                    key={subItem.id}
                                    className="py-2 flex items-center cursor-pointer"
                                >
                                    <div className={`${goCheck(subItem.type) ? "bg-jv-primary" : "bg-jv-lightGray3x"}`}>
                                        {mainFilterMenu.data.isMultiple ? (
                                            <div className="w-4 h-4 bg-inherit rounded-sm"></div>
                                        ) : (
                                            <div className="w-4 h-4 bg-inherit rounded-full"></div>
                                        )}
                                    </div>

                                    <span className="mr-2">{subItem.title}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    );
};

export default JobsFilter;
