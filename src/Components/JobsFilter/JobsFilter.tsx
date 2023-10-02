import React, { useEffect, useState } from "react";

//  Types
import {
    ChildOfFilterType,
    FilterType,
    categoryArray,
    selectedFiltersType,
    removeFilterActionTypes,
    isDublicateTypes,
    FilterContentGeneratorProps,
    FilterGeneratorProps,
} from "./JobsFilter.type";

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

const JobsFilter: React.FC = () => {
    const [selectedFilters, setSelectedFilterss] = useState<selectedFiltersType[]>([]);
    const [mainFilterMenu, setMainFilterMenu] = useState<{
        data: FilterType;
        position: {
            x: number | undefined;
            y: number | undefined;
            width: number | undefined;
            height: number | undefined;
        };
    }>({
        data: {} as FilterType,
        position: { x: undefined, y: undefined, width: undefined, height: undefined },
    });

    const diActiveMenu = () =>
        setMainFilterMenu({
            data: {} as FilterType,
            position: { x: undefined, y: undefined, width: undefined, height: undefined },
        });

    const removeFilterAction = (param: removeFilterActionTypes) => {
        const newSelectedFilters =
            param.mode === "RemoveType"
                ? selectedFilters.filter((selectedFilter) => selectedFilter.type !== param.mainType)
                : param.mode === "RemoveCategory"
                ? selectedFilters.filter((selectedFilter) => selectedFilter.category !== param.mainType)
                : [...selectedFilters];
        setSelectedFilterss(newSelectedFilters);
        diActiveMenu();
    };

    const filterAction = (
        Item: FilterType,
        SubItem: ChildOfFilterType | undefined,
        event: React.MouseEvent<HTMLSpanElement, MouseEvent>
    ) => {
        setSelectedFilterss((prev) => {
            if (!Item.isMultiple) {
                if (typeof Item.type !== "undefined" && typeof Item.sub === "undefined") {
                    return isDublicate({ mode: "FilterType", ItemType: Item.type })
                        ? [...prev.filter((filterItem) => filterItem.type !== Item.type)]
                        : [
                              ...prev,
                              { title: Item.title, type: Item.type, category: Item.category ? Item.category : "" },
                          ];
                } else {
                    return typeof SubItem !== "undefined"
                        ? isDublicate({ mode: "CategoryType", ItemType: SubItem.category })
                            ? [...prev.filter((filterItem) => filterItem.category !== Item.category)]
                            : [...prev, { title: SubItem.title, type: SubItem.type, category: SubItem.category }]
                        : [...prev];
                }
            } else {
                return typeof SubItem !== "undefined"
                    ? prev.some((filterItem) => filterItem.type === SubItem.type)
                        ? [...prev.filter((filterItem) => filterItem.type !== SubItem.type)]
                        : [...prev, { title: SubItem.title, type: SubItem.type, category: SubItem.category }]
                    : [...prev];
            }
        });
        // FOR MENU
        const isExsist = Boolean(mainFilterMenu.data.id === Item.id);
        if (isExsist && !Item.isMultiple) {
            diActiveMenu();
        } else if (!isExsist) {
            setMainFilterMenu({
                data: Item,
                position: {
                    x: event.currentTarget.offsetLeft,
                    y: event.currentTarget.offsetTop,
                    height: event.currentTarget.clientHeight,
                    width: event.currentTarget.clientWidth,
                },
            });
        }
    };

    const isDublicate = ({ mode, ItemType }: isDublicateTypes): boolean => {
        if (typeof ItemType !== "undefined") {
            const isTrue: boolean[] = selectedFilters.map((selectedFilter) => {
                return mode === "CategoryType"
                    ? selectedFilter.category === ItemType
                        ? true
                        : false
                    : selectedFilter.type === ItemType
                    ? true
                    : false;
            });
            return includes(isTrue, true) ? true : false;
        }
        return false;
    };
    useEffect(() => {
        console.log(selectedFilters);
    }, [selectedFilters]);

    const FilterContentGenerator: React.FC<FilterContentGeneratorProps> = (props: FilterContentGeneratorProps) => {
        const mainFilterSelect = (): selectedFiltersType[] => {
            return props.mode !== "NORMAL" && typeof props.ItemType !== "undefined"
                ? selectedFilters.filter((selectedFilter) => selectedFilter.category === props.ItemType)
                : [];
        };

        if (props.mode === "SUB_FALSE_MULTIPLE_FALSE") {
            return (
                <>
                    <span className="text-jv-white ml-1">{props.ItemType.title}</span>
                    <AiOutlineClose className="mr-1 text-jv-white text-xl" />
                </>
            );
        } else if (props.mode === "SUB_TRUE_MULTIPLE_FALSE") {
            const mainFilter = mainFilterSelect();
            return (
                <>
                    <span className="text-jv-white ml-1">{mainFilter[0].title}</span>
                    <AiOutlineClose className="mr-1 text-jv-white text-xl" />
                </>
            );
        } else if (props.mode === "SUB_&_MULTIPLE_TRUE") {
            const mainFilter = mainFilterSelect();
            return (
                <>
                    <span>{props.Item.title}</span>
                    <span className="mx-2">{mainFilter.length}</span>
                    <span
                        onClick={(e) => {
                            e.stopPropagation();
                            removeFilterAction({ mode: "RemoveCategory", mainType: mainFilter[0].category });
                        }}
                        className="flex items-center"
                    >
                        <AiOutlineClose className="mr-1 text-jv-white text-xl" />
                    </span>
                </>
            );
        } else if (props.mode === "NORMAL") {
            return (
                <>
                    <span>{props.Item.title}</span>
                    {typeof props.Item.sub !== "undefined" && isArray(props.Item.sub) && props.Item.sub.length ? (
                        <>
                            <AiOutlineDown
                                className={`mr-1 transition-all ${
                                    mainFilterMenu.data.id === props.Item.id ? "rotate-180" : ""
                                }`}
                            ></AiOutlineDown>
                        </>
                    ) : null}
                </>
            );
        }
    };

    const FilterGenerator: React.FC<FilterGeneratorProps> = ({ item }) => {
        const filterSelectAction = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (!isDublicate({ mode: "CategoryType", ItemType: item.category }) || item.isMultiple) {
                filterAction(item, undefined, e);
            }
            if (
                isDublicate({ mode: "CategoryType", ItemType: item.category }) &&
                typeof item.category !== "undefined" &&
                !item.isMultiple
            ) {
                removeFilterAction({ mode: "RemoveCategory", mainType: item.category });
            }
            if (mainFilterMenu.data.id === item.id) {
                diActiveMenu();
            }
        };
        const FilterItemClassName = `filtredItem select-none box-info-type text-sm flex items-center px-4 py-2 rounded-2xl cursor-pointer relative ${
            isDublicate({ mode: "FilterType", ItemType: item.type }) ||
            isDublicate({ mode: "CategoryType", ItemType: item.category })
                ? "text-jv-white bg-jv-primary"
                : ""
        }`;
        return (
            <>
                <div key={item.id} onClick={filterSelectAction} className={FilterItemClassName}>
                    {isDublicate({ mode: "FilterType", ItemType: item.type }) ? (
                        <FilterContentGenerator
                            mode="SUB_FALSE_MULTIPLE_FALSE"
                            ItemType={item}
                        ></FilterContentGenerator>
                    ) : typeof item.category !== "undefined" &&
                      isDublicate({ mode: "CategoryType", ItemType: item.category }) ? (
                        <>
                            {item.isMultiple ? (
                                <FilterContentGenerator
                                    mode="SUB_&_MULTIPLE_TRUE"
                                    ItemType={item.category}
                                    Item={item}
                                ></FilterContentGenerator>
                            ) : (
                                <FilterContentGenerator
                                    mode="SUB_TRUE_MULTIPLE_FALSE"
                                    ItemType={item.category}
                                ></FilterContentGenerator>
                            )}
                        </>
                    ) : (
                        <FilterContentGenerator mode="NORMAL" Item={item}></FilterContentGenerator>
                    )}
                </div>
            </>
        );
    };

    return (
        <div
            className={`no-scrollbar overflow-x-auto whitespace-nowrap flex 
            items-center md:whitespace-normal md:flex-wrap md:overflow-x-visible`}
        >
            {categoryArray.map((item) => (
                <FilterGenerator key={item.id} item={{ ...item }}></FilterGenerator>
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
                        className="min-h-fit absolute z-10 transition-all duration-500"
                        style={{
                            width: mainFilterMenu.position.width,
                            marginTop: mainFilterMenu.position.height ? mainFilterMenu.position.height + 10 : undefined,
                            top: mainFilterMenu.position.y,
                            left: mainFilterMenu.position.x,
                        }}
                    >
                        <ul className="absolute min-w-[15rem] top-full right-0 bg-jv-light py-3 px-4 shadow-xl border-[1px] border-solid border-jv-lightGray3x rounded-xl">
                            {mainFilterMenu.data.sub.map((subItem) => (
                                <li
                                    onClick={(e) => filterAction(mainFilterMenu.data, subItem, e)}
                                    key={subItem.id}
                                    className="py-2 flex items-center cursor-pointer"
                                >
                                    <div
                                        className={`w-4 h-4 ${
                                            isDublicate({ mode: "FilterType", ItemType: subItem.type })
                                                ? "bg-jv-primary"
                                                : "bg-jv-lightGray3x"
                                        } ${mainFilterMenu.data.isMultiple ? "rounded-sm" : "rounded-full"}`}
                                    ></div>

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
