import React, { useState, useEffect } from "react";
import useSearchForm from "../../Hooks/useSearchForm";

//  Types
import {
    selectedFiltersType,
    removeFilterActionTypes,
    isDublicateTypes,
    FilterContentGeneratorProps,
    FilterGeneratorProps,
    JobsFilterProps,
    MenuSettingProps,
    TypeFilterTypes,
    Type_category_merged_array,
} from "./JobsFilter.type";

// Animations
import { ShowAndHideOpacity_Ex, ShowFromBottom_EX, ShowOpacity } from "../../Animations/Animation";

// Functions
import { includes } from "lodash";

// Hooks
import useWindowsSize from "../../Hooks/useWindowsSize";
import useAdsFilterCategories from "../../Hooks/useAdsFilterCategories";

// Components
import { motion, AnimatePresence } from "framer-motion";
import Button from "../Button/Button";

// Icons
import { AiOutlineDown } from "react-icons/ai";
import { isArray } from "lodash";
import { AiOutlineClose } from "react-icons/ai";
import { GoTrash } from "react-icons/go";
import { SkeletonElm } from "../Skeleton/Skeleton";

const JobsFilter: React.FC<JobsFilterProps> = ({ setSelectedFilter, isFilterOnProMode, setIsFilterOnProMode }) => {
    const { clearForm: clearRouteParams } = useSearchForm();
    const [WindowsSize] = useWindowsSize();
    const { categoryMergeArray, isLoading } = useAdsFilterCategories();
    const [menuMobile, setMenuMobile] = useState<{ mode: "ShowSettingFilter" | "ShowFilter"; isShow: boolean }>({
        mode: "ShowFilter",
        isShow: false,
    });
    const [selectedFilters, setSelectedFilters] = useState<selectedFiltersType[]>([]);

    const [mainFilterMenu, setMainFilterMenu] = useState<{
        data: Type_category_merged_array;
        position: {
            x: number | undefined;
            y: number | undefined;
            width: number | undefined;
            height: number | undefined;
        };
    }>({
        data: {} as Type_category_merged_array,
        position: { x: undefined, y: undefined, width: undefined, height: undefined },
    });

    useEffect(() => {
        const mainSelectedFilters: string[] = [];
        selectedFilters.map((selectedFilter) => mainSelectedFilters.push(selectedFilter.type));
        setSelectedFilter(mainSelectedFilters);
    }, [selectedFilters]);

    const removeAllFillterAction = () => {
        clearRouteParams();
        setSelectedFilters([]);
    };

    const diActiveMenu = () =>
        setMainFilterMenu({
            data: {} as Type_category_merged_array,
            position: { x: undefined, y: undefined, width: undefined, height: undefined },
        });

    const removeFilterAction = (param: removeFilterActionTypes) => {
        const newSelectedFilters =
            param.mode === "RemoveType"
                ? selectedFilters.filter((selectedFilter) => selectedFilter.type !== param.mainType)
                : param.mode === "RemoveCategory"
                ? selectedFilters.filter((selectedFilter) => selectedFilter.category !== param.mainType)
                : [...selectedFilters];
        setSelectedFilters(newSelectedFilters);
        param.isClose ? diActiveMenu() : null;
    };

    const filterAction = (
        Item: Type_category_merged_array,
        SubItem: TypeFilterTypes | undefined,
        event: React.MouseEvent<HTMLSpanElement, MouseEvent>
    ) => {
        setSelectedFilters((prev) => {
            if (!Item.is_multiple) {
                if (Item.sub.length === 0) {
                    return isDublicate({ mode: "FilterType", ItemType: Item.category_type })
                        ? [...prev.filter((filterItem) => filterItem.type !== Item.category_type)]
                        : [
                              ...prev,
                              {
                                  title: Item.title,
                                  type: Item.category_type,
                                  category: Item.category_type ? Item.category_type : "",
                              },
                          ];
                } else {
                    return typeof SubItem !== "undefined"
                        ? isDublicate({ mode: "CategoryType", ItemType: SubItem.category })
                            ? [
                                  ...prev.filter((filterItem) => filterItem.category !== Item.category_type),
                                  { title: SubItem.title, type: SubItem.type, category: SubItem.category },
                              ]
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
        if (WindowsSize.innerWidth >= 768) {
            const isExsist = Boolean(mainFilterMenu.data.category_type === Item.category_type);
            if (isExsist && !Item.is_multiple) {
                diActiveMenu();
            } else if (!isExsist) {
                setMainFilterAction(event, Item);
            }
        } else {
            if (Item.sub.length > 0) {
                setMenuMobile({ mode: "ShowFilter", isShow: true });
                setMainFilterAction(event, Item);
            }
        }
    };

    const setMainFilterAction = (
        event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
        Item: Type_category_merged_array
    ) => {
        Item.sub.length > 0
            ? setMainFilterMenu({
                  data: Item,
                  position: {
                      x: event.currentTarget.offsetLeft,
                      y: event.currentTarget.offsetTop,
                      height: event.currentTarget.clientHeight,
                      width: event.currentTarget.clientWidth,
                  },
              })
            : null;
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

    const FilterContentGenerator: React.FC<FilterContentGeneratorProps> = (props: FilterContentGeneratorProps) => {
        const mainFilterSelect = (): selectedFiltersType[] => {
            return props.mode !== "NORMAL" && typeof props.ItemType !== "undefined"
                ? selectedFilters.filter((selectedFilter) => selectedFilter.category === props.ItemType)
                : [];
        };

        const titleClassName = `text-jv-primary ml-1`;
        const iconClassName = `mr-1 text-jv-white text-xl p-1 bg-jv-primary rounded-full`;

        if (props.mode === "SUB_FALSE_MULTIPLE_FALSE") {
            return (
                <>
                    <span className={titleClassName}>{props.ItemType.title}</span>
                    <AiOutlineClose className={iconClassName} />
                </>
            );
        } else if (props.mode === "SUB_TRUE_MULTIPLE_FALSE") {
            const mainFilter = mainFilterSelect();
            return (
                <>
                    <span className={titleClassName}>{mainFilter[0].title}</span>
                    <AiOutlineClose className={iconClassName} />
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
                            removeFilterAction({
                                mode: "RemoveCategory",
                                mainType: mainFilter[0].category,
                                isClose: true,
                            });
                        }}
                        className="flex items-center"
                    >
                        <AiOutlineClose className={iconClassName} />
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
                                    mainFilterMenu.data.category_type === props.Item.category_type ? "rotate-180" : ""
                                }`}
                            ></AiOutlineDown>
                        </>
                    ) : null}
                </>
            );
        } else {
            return <></>;
        }
    };

    const FilterGenerator: React.FC<FilterGeneratorProps> = (props) => {
        if (props.mode === "ShowFilter") {
            const filterSelectAction = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                if (
                    !isDublicate({ mode: "CategoryType", ItemType: props.item.category_type }) ||
                    props.item.is_multiple
                ) {
                    filterAction(props.item, undefined, e);
                }
                if (
                    isDublicate({ mode: "CategoryType", ItemType: props.item.category_type }) &&
                    typeof props.item.category_type !== "undefined" &&
                    !props.item.is_multiple
                ) {
                    removeFilterAction({ mode: "RemoveCategory", mainType: props.item.category_type, isClose: true });
                }
                if (mainFilterMenu.data.category_type === props.item.category_type) {
                    diActiveMenu();
                }
            };
            const FilterItemClassName = `filtredItem select-none box-info-type text-sm flex items-center px-4 py-2 rounded-2xl cursor-pointer relative ${
                isDublicate({ mode: "FilterType", ItemType: props.item.category_type }) ||
                isDublicate({ mode: "CategoryType", ItemType: props.item.category_type })
                    ? "text-jv-primary bg-jv-lightPrimary"
                    : ""
            }`;
            return (
                <>
                    <div
                        key={`FilterGenerator-${props.item.category_type}`}
                        onClick={filterSelectAction}
                        className={FilterItemClassName}
                    >
                        {isDublicate({ mode: "FilterType", ItemType: props.item.category_type }) ? (
                            <FilterContentGenerator
                                mode="SUB_FALSE_MULTIPLE_FALSE"
                                ItemType={props.item}
                            ></FilterContentGenerator>
                        ) : typeof props.item.category_type !== "undefined" &&
                          isDublicate({ mode: "CategoryType", ItemType: props.item.category_type }) ? (
                            <>
                                {props.item.is_multiple ? (
                                    <FilterContentGenerator
                                        mode="SUB_&_MULTIPLE_TRUE"
                                        ItemType={props.item.category_type}
                                        Item={props.item}
                                    ></FilterContentGenerator>
                                ) : (
                                    <FilterContentGenerator
                                        mode="SUB_TRUE_MULTIPLE_FALSE"
                                        ItemType={props.item.category_type}
                                    ></FilterContentGenerator>
                                )}
                            </>
                        ) : (
                            <FilterContentGenerator mode="NORMAL" Item={props.item}></FilterContentGenerator>
                        )}
                    </div>
                </>
            );
        } else if (props.mode === "ShowFilterIcon") {
            return (
                <div
                    onClick={() => setMenuMobile({ mode: "ShowSettingFilter", isShow: true })}
                    title="تنظیمات فیلتر"
                    className="group filtredItem select-none box-info-type py-2 px-4 rounded-2xl bg-jv-lightPrimary cursor-pointer relative fill-jv-primary flex items-center"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.25 12C8.25 12.4142 8.58579 12.75 9 12.75C9.41421 12.75 9.75 12.4142 9.75 12H8.25ZM9.75 6C9.75 5.58579 9.41421 5.25 9 5.25C8.58579 5.25 8.25 5.58579 8.25 6H9.75ZM15.75 12C15.75 11.5858 15.4142 11.25 15 11.25C14.5858 11.25 14.25 11.5858 14.25 12H15.75ZM14.25 18C14.25 18.4142 14.5858 18.75 15 18.75C15.4142 18.75 15.75 18.4142 15.75 18H14.25ZM5.06107 20.0451L5.50191 19.4383L5.06107 20.0451ZM3.95491 18.9389L4.56168 18.4981L3.95491 18.9389ZM20.0451 18.9389L19.4383 18.4981L20.0451 18.9389ZM18.9389 20.0451L18.4981 19.4383L18.9389 20.0451ZM18.9389 3.95491L18.4981 4.56168L18.9389 3.95491ZM20.0451 5.06107L19.4383 5.50191L20.0451 5.06107ZM5.06107 3.95491L5.50191 4.56168L5.06107 3.95491ZM3.95491 5.06107L4.56168 5.50191L3.95491 5.06107ZM9.75 12L9.75 6H8.25L8.25 12H9.75ZM14.25 12V18H15.75V12H14.25ZM8.99995 18.75C10.5187 18.75 11.7499 17.5187 11.7499 16H10.2499C10.2499 16.6903 9.6903 17.25 8.99995 17.25V18.75ZM11.7499 16C11.7499 14.4812 10.5187 13.25 8.99995 13.25V14.75C9.6903 14.75 10.2499 15.3096 10.2499 16H11.7499ZM8.99995 13.25C7.48117 13.25 6.24995 14.4812 6.24995 16H7.74995C7.74995 15.3096 8.30959 14.75 8.99995 14.75V13.25ZM6.24995 16C6.24995 17.5187 7.48117 18.75 8.99995 18.75V17.25C8.30959 17.25 7.74995 16.6903 7.74995 16H6.24995ZM14.9999 5.24996C13.4812 5.24996 12.2499 6.48118 12.2499 7.99996H13.7499C13.7499 7.3096 14.3096 6.74996 14.9999 6.74996V5.24996ZM12.2499 7.99996C12.2499 9.51874 13.4812 10.75 14.9999 10.75V9.24996C14.3096 9.24996 13.7499 8.69032 13.7499 7.99996H12.2499ZM14.9999 10.75C16.5187 10.75 17.7499 9.51874 17.7499 7.99996H16.2499C16.2499 8.69032 15.6903 9.24996 14.9999 9.24996V10.75ZM17.7499 7.99996C17.7499 6.48118 16.5187 5.24996 14.9999 5.24996V6.74996C15.6903 6.74996 16.2499 7.30961 16.2499 7.99996H17.7499ZM12 20.25C10.1084 20.25 8.74999 20.249 7.69804 20.135C6.66013 20.0225 6.00992 19.8074 5.50191 19.4383L4.62023 20.6518C5.42656 21.2377 6.37094 21.5 7.53648 21.6263C8.68798 21.751 10.1418 21.75 12 21.75V20.25ZM2.25 12C2.25 13.8582 2.24897 15.312 2.37373 16.4635C2.50001 17.6291 2.76232 18.5734 3.34815 19.3798L4.56168 18.4981C4.19259 17.9901 3.97745 17.3399 3.865 16.302C3.75103 15.25 3.75 13.8916 3.75 12H2.25ZM5.50191 19.4383C5.14111 19.1762 4.82382 18.8589 4.56168 18.4981L3.34815 19.3798C3.70281 19.8679 4.13209 20.2972 4.62023 20.6518L5.50191 19.4383ZM20.25 12C20.25 13.8916 20.249 15.25 20.135 16.302C20.0225 17.3399 19.8074 17.9901 19.4383 18.4981L20.6518 19.3798C21.2377 18.5734 21.5 17.6291 21.6263 16.4635C21.751 15.312 21.75 13.8582 21.75 12H20.25ZM12 21.75C13.8582 21.75 15.312 21.751 16.4635 21.6263C17.6291 21.5 18.5734 21.2377 19.3798 20.6518L18.4981 19.4383C17.9901 19.8074 17.3399 20.0225 16.302 20.135C15.25 20.249 13.8916 20.25 12 20.25V21.75ZM19.4383 18.4981C19.1762 18.8589 18.8589 19.1762 18.4981 19.4383L19.3798 20.6518C19.8679 20.2972 20.2972 19.8679 20.6518 19.3798L19.4383 18.4981ZM12 3.75C13.8916 3.75 15.25 3.75103 16.302 3.865C17.3399 3.97745 17.9901 4.19259 18.4981 4.56168L19.3798 3.34815C18.5734 2.76232 17.6291 2.50001 16.4635 2.37373C15.312 2.24897 13.8582 2.25 12 2.25V3.75ZM21.75 12C21.75 10.1418 21.751 8.68798 21.6263 7.53648C21.5 6.37094 21.2377 5.42656 20.6518 4.62023L19.4383 5.50191C19.8074 6.00992 20.0225 6.66013 20.135 7.69804C20.249 8.74999 20.25 10.1084 20.25 12H21.75ZM18.4981 4.56168C18.8589 4.82382 19.1762 5.14111 19.4383 5.50191L20.6518 4.62023C20.2972 4.13209 19.8679 3.70281 19.3798 3.34815L18.4981 4.56168ZM12 2.25C10.1418 2.25 8.68798 2.24897 7.53648 2.37373C6.37094 2.50001 5.42656 2.76232 4.62023 3.34815L5.50191 4.56168C6.00992 4.19259 6.66013 3.97745 7.69804 3.865C8.74999 3.75103 10.1084 3.75 12 3.75V2.25ZM3.75 12C3.75 10.1084 3.75103 8.74999 3.865 7.69804C3.97745 6.66013 4.19259 6.00992 4.56168 5.50191L3.34815 4.62023C2.76232 5.42656 2.50001 6.37094 2.37373 7.53648C2.24897 8.68798 2.25 10.1418 2.25 12H3.75ZM4.62023 3.34815C4.13209 3.70281 3.70281 4.13209 3.34815 4.62023L4.56168 5.50191C4.82382 5.14111 5.14111 4.82382 5.50191 4.56168L4.62023 3.34815Z" />
                    </svg>
                    <MenuSetting mode="Desktop" />
                </div>
            );
        } else {
            return <></>;
        }
    };

    const MenuSetting: React.FC<MenuSettingProps> = ({ mode }) => {
        const itemClassName = `cursor-pointer py-2 flex items-center justify-between ${
            mode === "Desktop" ? "px-3" : "px-5 md:px-10"
        }`;
        return (
            <div
                className={`${
                    mode === "Desktop"
                        ? "absolute w-[10.5rem] top-full z-10 invisible opacity-0 right-5 group-hover:visible group-hover:opacity-100 group-hover:right-0 md:hidden xl:block"
                        : ""
                } `}
            >
                <ul
                    className={`${
                        mode === "Desktop"
                            ? "mt-2 shadow-xl rounded-xl border-solid border-[1px] border-jv-lightGray3x bg-jv-light overflow-hidden"
                            : "py-5"
                    }`}
                >
                    <li
                        onClick={removeAllFillterAction}
                        className={`${itemClassName} text-jv-danger hover:bg-jv-lightDanger`}
                    >
                        <span>حذف همه</span>
                        <GoTrash />
                    </li>
                    <li
                        onClick={() => setIsFilterOnProMode((prev) => !prev)}
                        className={`${itemClassName} hover:bg-jv-lightPrimary hover:text-jv-primary`}
                    >
                        <span>فیلتر پیشرفته</span>
                        <div
                            className={`w-8 h-4 rounded-lg relative flex items-center ${
                                isFilterOnProMode ? "bg-jv-lightPrimary" : "bg-jv-lightGray3x "
                            }`}
                        >
                            <span
                                className={`absolute mx-1 w-2 h-2 rounded-full ${
                                    isFilterOnProMode ? "left-0 bg-jv-primary" : "right-0 bg-jv-lightGray2x"
                                }`}
                            ></span>
                        </div>
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <div
            className={`overflow-y-hidden pb-3 overflow-x-auto whitespace-nowrap flex 
            items-center md:pb-0 md:whitespace-normal md:flex-wrap md:overflow-y-visible md:overflow-x-visible`}
        >
            <div>
                <FilterGenerator mode="ShowFilterIcon"></FilterGenerator>
            </div>

            {isLoading
                ? Array(8)
                      .fill("")
                      .map((item, index) => (
                          <SkeletonElm
                              key={`category_filter_${index}`}
                              className={[{ wrapper: "w-20 h-10 ml-1 mt-2 rounded-2xl" }]}
                          ></SkeletonElm>
                      ))
                : categoryMergeArray.map((item) => (
                      <motion.div
                          variants={ShowOpacity}
                          transition={{ duration: 2 }}
                          initial="hidden"
                          animate="visible"
                          key={`category-item-${item.category_type}`}
                      >
                          <FilterGenerator mode="ShowFilter" item={{ ...item }}></FilterGenerator>
                      </motion.div>
                  ))}
            {/*//! -------------------------------------- Filter Desktop Menu -------------------------------------- */}
            <AnimatePresence>
                {Object.entries(mainFilterMenu).length &&
                typeof mainFilterMenu.data.sub !== "undefined" &&
                Array.isArray(mainFilterMenu.data.sub) ? (
                    <motion.div
                        variants={ShowAndHideOpacity_Ex}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="min-h-fit absolute z-10 transition-all duration-500 hidden md:block"
                        style={{
                            width: mainFilterMenu.position.width,
                            marginTop: mainFilterMenu.position.height ? mainFilterMenu.position.height + 10 : undefined,
                            top: mainFilterMenu.position.y,
                            left: mainFilterMenu.position.x,
                        }}
                    >
                        <ul className="absolute min-w-[15rem] max-h-60 overflow-y-auto top-full right-0 bg-jv-light py-3 px-4 shadow-xl border-[1px] border-solid border-jv-lightGray3x rounded-xl">
                            {mainFilterMenu.data.sub.map((subItem) => (
                                <li
                                    onClick={(e) => filterAction(mainFilterMenu.data, subItem, e)}
                                    key={`subitem-${subItem.type}`}
                                    className="py-2 flex items-center cursor-pointer"
                                >
                                    <div
                                        className={`w-4 h-4 ${
                                            isDublicate({ mode: "FilterType", ItemType: subItem.type })
                                                ? "bg-jv-primary"
                                                : "bg-jv-lightGray3x"
                                        } ${mainFilterMenu.data.is_multiple ? "rounded-sm" : "rounded-full"}`}
                                    ></div>

                                    <span className="mr-2">{subItem.title}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ) : null}
            </AnimatePresence>
            {/*//? -------------------------------------- Filter Desktop Menu -------------------------------------- */}

            <AnimatePresence>
                {menuMobile.isShow ? (
                    <motion.div
                        className={`w-full h-d-screen fixed bg-jv-bgColor lg:hidden bottom-0 right-0 text-right ${
                            menuMobile ? "z-20" : "z-10"
                        }`}
                        variants={ShowAndHideOpacity_Ex}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.4 }}
                    >
                        <div
                            onClick={() => {
                                setMenuMobile({ mode: "ShowFilter", isShow: false });
                                diActiveMenu();
                            }}
                            className="w-full h-full top-0 left-0 fixed bg-jv-bgColor"
                        >
                            hellow world
                        </div>
                        <motion.div
                            className="w-full pt-5 fixed overflow-hidden bottom-0 right-0 rounded-t-xl bg-jv-white"
                            variants={ShowFromBottom_EX}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ delay: 0.4 }}
                        >
                            {Object.entries(mainFilterMenu).length &&
                            typeof mainFilterMenu.data.sub !== "undefined" &&
                            Array.isArray(mainFilterMenu.data.sub) &&
                            menuMobile.mode === "ShowFilter" ? (
                                <>
                                    <div
                                        className="px-3 py-2 flex items-center justify-between"
                                        onClick={() => {
                                            setMenuMobile({ mode: "ShowFilter", isShow: false });
                                            diActiveMenu();
                                        }}
                                    >
                                        <h3>{mainFilterMenu.data.title}</h3>
                                        <AiOutlineClose className="text-jv-black text-2xl" />
                                    </div>
                                    <div className="max-h-full pb-10 overflow-y-auto no-scrollbar">
                                        <ul className="mb-2 py-3 px-4 max-h-52 overflow-y-auto">
                                            {mainFilterMenu.data.sub.map((subItem) => (
                                                <li
                                                    onClick={(e) => filterAction(mainFilterMenu.data, subItem, e)}
                                                    key={`main_filter-${subItem.type}`}
                                                    className="py-2 flex items-center cursor-pointer text-jv-black"
                                                >
                                                    <div
                                                        className={`w-4 h-4 ${
                                                            isDublicate({ mode: "FilterType", ItemType: subItem.type })
                                                                ? "bg-jv-primary"
                                                                : "bg-jv-lightGray3x"
                                                        } ${
                                                            mainFilterMenu.data.is_multiple
                                                                ? "rounded-sm"
                                                                : "rounded-full"
                                                        }`}
                                                    ></div>

                                                    <span className="mr-2">{subItem.title}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="flex items-center px-1">
                                            <Button
                                                isLoading={false}
                                                ClassName="w-1/2 ml-1 !text-jv-danger !border-jv-danger"
                                                textColor="primary"
                                                size="small"
                                                ClickHandler={() =>
                                                    typeof mainFilterMenu.data.category_type !== "undefined" &&
                                                    removeFilterAction({
                                                        mode: "RemoveCategory",
                                                        mainType: mainFilterMenu.data.category_type,
                                                        isClose: false,
                                                    })
                                                }
                                                DoubleClickHandler={() => diActiveMenu()}
                                            >
                                                حذف فیلترها
                                            </Button>
                                            <Button
                                                isLoading={false}
                                                ClassName="w-1/2 mr-1 border-jv-primary"
                                                textColor="light"
                                                size="small"
                                                ClickHandler={() => {
                                                    setMenuMobile({ mode: "ShowFilter", isShow: false });
                                                    diActiveMenu();
                                                }}
                                            >
                                                مشاهده نتایج
                                            </Button>
                                        </div>
                                    </div>
                                </>
                            ) : null}

                            {menuMobile.mode === "ShowSettingFilter" ? (
                                <>
                                    <div
                                        className="px-5 md:px-10 py-2 flex items-center"
                                        onClick={() => {
                                            setMenuMobile({ mode: "ShowFilter", isShow: false });
                                            diActiveMenu();
                                        }}
                                    >
                                        <h3>{mainFilterMenu.data.title}</h3>
                                        <AiOutlineClose className="text-jv-black text-2xl" />
                                    </div>
                                    <MenuSetting mode="Mobile" />
                                </>
                            ) : null}
                        </motion.div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    );
};

export default JobsFilter;
