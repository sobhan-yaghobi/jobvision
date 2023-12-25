// Types
import React, { useState, memo, useRef } from "react";
import { ItemGeneratorPorps, MenuItemType, MenuProps } from "./CmsEmployer.type";

// Functions

import { twMerge } from "tailwind-merge";

// Components
import { motion } from "framer-motion";
import Button from "../../Components/Button/Button";
import { Link, NavLink, Outlet } from "react-router-dom";

// Animations
import { ShortShowFromBottom, ShortShowFromTop, SpringBackOutVeryShortly } from "../../Animations/UtilsAnimation";

// Icons
import { GoHomeFill } from "react-icons/go";
import { CgFileDocument } from "react-icons/cg";
import { BiGitPullRequest } from "react-icons/bi";
import { BsCheckAll } from "react-icons/bs";
import { RxLapTimer } from "react-icons/rx";
import { TbGitPullRequestClosed } from "react-icons/tb";
import { RiGitPullRequestFill } from "react-icons/ri";
import Logo from "/Svg/Logo/PrimaryColorLogo.svg";
import reportIcon from "/images/report.webp";
import { HiOutlineLogout } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";
import { AiFillCaretDown } from "react-icons/ai";
import { FaFileCirclePlus } from "react-icons/fa6";
import RequestNotificationBox from "../../Components/RequestNotificationBox/RequestNotificationBox";

const pageItems: MenuItemType[] = [
    {
        label: "خانه",
        key: "Home",
        icon: <GoHomeFill />,
        link: "",
    },
    {
        label: "آگهی ها",
        link: "Advertsisings",
        key: "Advertsisings",
        icon: <CgFileDocument />,
    },
    {
        label: "درخواست ها",
        key: "sub1",
        icon: <BiGitPullRequest />,
        children: [
            {
                parentKey: "sub1",
                label: "قبول شده",
                key: "Request_Accept",
                icon: <BsCheckAll style={{ color: "var(--successColor)" }} />,
            },
            {
                parentKey: "sub1",
                label: "رد شده",
                key: "Request_Rejection",
                icon: <TbGitPullRequestClosed style={{ color: "var(--dangerColor)" }} />,
            },
            {
                parentKey: "sub1",
                label: "در حال انتظار",
                key: "Request_Waiting",
                icon: <RxLapTimer style={{ color: "var(--warningColor)" }} />,
            },
            {
                parentKey: "sub1",
                label: "تمامی درخواست ها",
                key: "Request_All",
                icon: <RiGitPullRequestFill />,
            },
        ],
    },
];

const CmsEmployer: React.FC = () => {
    const [mainSubItem, setMainSubItem] = useState({} as MenuItemType);
    return (
        <>
            <div className="w-full h-screen flex justify-between p-4 relative">
                <div className="w-2/12 p-1 flex flex-col justify-between text-jv-lightGray2x">
                    <img className="h-10 self-start" src={Logo} alt="" />
                    <div className="mt-1 h-full overflow-y-auto no-scrollbar">
                        <Menu mainSubItem={mainSubItem} setMainSubItem={setMainSubItem} />
                    </div>
                    <div className="w-full h-[35%] text-center rounded-lg bg-slate-100 flex flex-col items-center">
                        <img className="h-[45%] mb-2" src={reportIcon} alt="" />
                        <h4>گزارش سالانه</h4>
                        <p className="text-xs my-2">همین الان از گزارش سالیانه مطلع شوید</p>
                        <Button
                            size="small"
                            textColor="light"
                            ClickHandler={() => {}}
                            ClassName="!py-2 px-8 border-none shadow-jv-primary shadow-lg"
                            isLoading={false}
                        >
                            دانلود
                        </Button>
                    </div>
                </div>
                <div className={`w-7/12 h-full mx-4`}>
                    <div className="h-full flex flex-col overflow-hidden">
                        <motion.ul
                            variants={ShortShowFromTop}
                            initial="hidden"
                            animate="visible"
                            transition={SpringBackOutVeryShortly}
                            className="w-full flex bg-jv-white"
                        >
                            {/* {SubPageCms.subPageItem.map((item) =>
                                item.parnetPage === mainPage ? (
                                    <li
                                        key={`${item.subPage}-multiPageItem`}
                                        onClick={() => setMainPage({ mainKey: item.parnetPage, subPage: item.subPage })}
                                        className={`py-2 px-4 cursor-pointer ${
                                            item.subPage === subPage
                                                ? "bg-jv-light rounded-t-lg text-jv-primary"
                                                : "text-jv-lightGray2x"
                                        }`}
                                    >
                                        {item.title}
                                    </li>
                                ) : null
                            )} */}
                        </motion.ul>
                        <motion.div
                            variants={ShortShowFromBottom}
                            initial="hidden"
                            animate="visible"
                            className="w-full h-full text-jv-lightGray2x rounded-lg bg-jv-light p-4 overflow-y-auto no-scrollbar"
                        >
                            {/* <motion.div variants={ShortShowFromTop} initial="hidden" whileInView="visible"> */}
                            <Outlet />
                            {/* </motion.div> */}
                        </motion.div>
                    </div>
                </div>
                <div className="w-3/12 h-full">
                    <div className="h-3/6 flex flex-col items-center">
                        <div className="w-full flex items-center justify-end">
                            <Link to="/">
                                <span
                                    title="خروج از پنل"
                                    className="button-Cms-type text-jv-danger ml-2 border-jv-lightDanger  hover:bg-jv-lightDanger"
                                >
                                    <HiOutlineLogout className="text-inherit transition-none" />
                                </span>
                            </Link>
                        </div>
                        <img className="rounded-full h-16 shadow-xl" src="/images/company-Sheypoor.webp" alt="" />
                        <h3 className="mt-3 text-jv-lightGray2x">شیپور</h3>
                        <ul className="w-full my-5 flex items-center justify-evenly">
                            <li
                                // onClick={() => setMainPage({ mainKey: "Home", subPage: "Home_Edit" })}
                                className="select-none cursor-pointer text-jv-primary flex flex-col items-center justify-center group"
                            >
                                <span className="button-Cms-type border-jv-lightPrimary bg-jv-lightPrimary shadow-jv-primary group-hover:shadow-xl group-active:scale-90">
                                    <CiEdit className="text-inherit transform-none" />
                                </span>
                                <span className="mt-3 text-xs">ویرایش</span>
                            </li>
                            <li
                                // onClick={() => setMainPage({ mainKey: "RqAll", subPage: undefined })}
                                className="select-none cursor-pointer text-jv-primary flex flex-col items-center justify-center group relative"
                            >
                                <span className="button-Cms-type border-jv-lightPrimary bg-jv-lightPrimary shadow-jv-primary group-hover:shadow-xl group-active:scale-90">
                                    <BiGitPullRequest className="text-inherit transform-none" />
                                </span>
                                <span className="mt-3 text-xs">درخواست ها</span>
                            </li>
                            <li
                                // onClick={() =>
                                //     setMainPage({
                                //         mainKey: "Advertsisings",
                                //         subPage: "Advertsisings_Add",
                                //     })
                                // }
                                className="select-none cursor-pointer text-jv-primary flex flex-col items-center justify-center group relative"
                            >
                                <span className="button-Cms-type border-jv-lightPrimary bg-jv-lightPrimary shadow-jv-primary group-hover:shadow-xl group-active:scale-90">
                                    <FaFileCirclePlus className="text-inherit transform-none" />
                                </span>
                                <span className="mt-3 text-xs">آگهی جدید</span>
                            </li>
                        </ul>
                    </div>
                    <div className="h-3/6 w-full">
                        <div className="px-1 h-full flex flex-col overflow-y-auto">
                            <h3 className="text-jv-lightGray2x">درخواست های اخیر</h3>
                            <div className="my-1">
                                <span className="text-jv-lightGray2x text-xs pr-1">امروز</span>
                                <ul>
                                    {Array(2)
                                        .fill("")
                                        .map((item, index) => (
                                            <li key={index}>
                                                <RequestNotificationBox></RequestNotificationBox>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                            <div className="my-1">
                                <span className="text-jv-lightGray2x text-xs pr-1">دیروز</span>
                                <ul>
                                    <RequestNotificationBox></RequestNotificationBox>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const Menu: React.FC<MenuProps> = ({ mainSubItem, setMainSubItem }) => {
    const className = {
        wrapperMenu: "w-full overflow-hidden duration-700 grid",
        wrapperMenuActive: "grid-rows-[1fr] pr-3",
        wrapperMenuDisable: "grid-rows-[0fr]",
        listMenu: "w-full bg-transparent min-h-0 px-1 overflow-hidden",
        itemMenu: "cms_navlink",
        itemMenuActive: "bg-jv-lightPrimary text-jv-primary",
        itemMenuDisable: "hover:text-jv-lightGray hover:bg-jv-light",
        titleItem: "mr-3 truncate transition-none",
        fillCaretDown: "absolute left-2 bg-transparent text-xs transition-none",
    };

    return (
        <div className={className.wrapperMenu}>
            <ul className={className.listMenu}>
                {pageItems.map((item) => (
                    <React.Fragment key={item.key}>
                        {typeof item.children === "undefined" ? (
                            <span onClick={() => setMainSubItem({} as MenuItemType)}>
                                <ItemGenerator item={item} />
                            </span>
                        ) : (
                            <>
                                <div
                                    onClick={() =>
                                        item.key === mainSubItem.key
                                            ? setMainSubItem({} as MenuItemType)
                                            : setMainSubItem(item)
                                    }
                                    className={`${className.itemMenu} ${
                                        item.key === mainSubItem.key
                                            ? className.itemMenuActive
                                            : className.itemMenuDisable
                                    }`}
                                >
                                    <div className="flex">
                                        {item.icon}
                                        <p className={className.titleItem}>{item.label}</p>
                                    </div>
                                    <AiFillCaretDown className={className.fillCaretDown} />
                                </div>
                                <div
                                    className={twMerge(
                                        className.wrapperMenu,
                                        item.key === mainSubItem.key
                                            ? className.wrapperMenuActive
                                            : className.wrapperMenuDisable
                                    )}
                                >
                                    <ul className={className.listMenu}>
                                        {item.children.map((subItem) => (
                                            <ItemGenerator item={subItem} />
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}
                    </React.Fragment>
                ))}
            </ul>
        </div>
    );
};
const ItemGenerator: React.FC<ItemGeneratorPorps> = ({ item }) => {
    return (
        <NavLink
            end={item.link === "" ? true : false}
            to={typeof item.link !== "undefined" ? item.link : item.key.toString()}
            className={`cms_navlink`}
        >
            {item.icon}
            <p className={`mr-3 truncate transition-none`}>{item.label}</p>
        </NavLink>
    );
};

export default CmsEmployer;
