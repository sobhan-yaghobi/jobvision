// Types
import React, { useState } from "react";
import MenuItemCms, { MenuItemCmsType } from "../../Components/MenuItemCms/MenuItemCms";

// Functions

import { twMerge } from "tailwind-merge";

// Hooks
import useItemCmsPage from "../../Hooks/useItemCmsPage";

// Components
import { motion } from "framer-motion";
import Button from "../../Components/Button/Button";
import { Link, NavLink, Outlet } from "react-router-dom";
import RequestNotificationBox from "../../Components/RequestNotificationBox/RequestNotificationBox";

// Animations
import { ShortShowFromBottom, ShortShowFromTop, SpringBackOutVeryShortly } from "../../Animations/UtilsAnimation";

// Icons
import { GoHomeFill } from "react-icons/go";
import { CgFileDocument } from "react-icons/cg";
import { BiGitPullRequest } from "react-icons/bi";
import { BsCheckAll } from "react-icons/bs";
import { RxLapTimer } from "react-icons/rx";
import { TbGitPullRequestClosed } from "react-icons/tb";
import { RiGitPullRequestFill, RiUserReceivedFill } from "react-icons/ri";
import Logo from "/Svg/Logo/PrimaryColorLogo.svg";
import reportIcon from "/images/report.webp";
import { HiOutlineLogout } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";
import { FaFileCirclePlus } from "react-icons/fa6";
import useAuth from "../../Store/useAuth";
import MenuCms from "../../Components/MenuCms/MenuCms";

const pageItems: MenuItemCmsType[] = [
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

const quickAccessArray = [
    {
        title: "آگهی جدید",
        link: "/cmsEmployer/Advertsisings?page=add_advertising",
        icon: <FaFileCirclePlus className="text-inherit transform-none" />,
    },
    {
        title: "درخواست ها",
        link: "/cmsEmployer/Request_All",
        icon: <BiGitPullRequest className="text-inherit transform-none" />,
    },
    {
        title: "ویرایش",
        link: "/cmsEmployer?page=edit_home",
        icon: <CiEdit className="text-inherit transform-none" />,
    },
];

const CmsEmployer: React.FC = () => {
    const { setUserInfo } = useAuth();
    const { list, mainItemKey, clickItemHandler } = useItemCmsPage();
    return (
        <>
            <div className="w-full h-screen flex justify-between p-4 relative">
                <div className="w-2/12 p-1 flex flex-col justify-between text-jv-lightGray2x">
                    <img className="h-10 self-start" src={Logo} alt="" />
                    <div className="mt-1 h-full overflow-y-auto no-scrollbar">
                        <MenuCms pageItems={pageItems} />
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
                            key={`main_item_list_${mainItemKey}`}
                            transition={SpringBackOutVeryShortly}
                            className="w-full flex bg-jv-white mr-5"
                        >
                            {list.map((item) => (
                                <li
                                    onClick={() => clickItemHandler({ key: item.key })}
                                    key={`${item.key}-multiPageItem`}
                                    className={`select-none py-2 px-4 cursor-pointer ${
                                        item.key === mainItemKey
                                            ? "bg-jv-light rounded-t-lg text-jv-primary"
                                            : "text-jv-lightGray2x"
                                    }`}
                                >
                                    {item.label}
                                </li>
                            ))}
                        </motion.ul>
                        <motion.div
                            variants={ShortShowFromBottom}
                            initial="hidden"
                            animate="visible"
                            key={`main_item_page_${mainItemKey}`}
                            className="w-full h-full text-jv-lightGray2x rounded-lg bg-jv-light p-4 overflow-y-auto no-scrollbar"
                        >
                            <Outlet />
                        </motion.div>
                    </div>
                </div>
                <div className="w-3/12 h-full">
                    <div className="h-3/6 flex flex-col items-center">
                        <div className="w-full flex items-center justify-end">
                            <Link to="/">
                                <span
                                    title="خروج از پنل"
                                    className="button-Cms-type text-jv-danger ml-2 border-jv-lightDanger  hover:bg-jv-lightDanger text-xl"
                                >
                                    <HiOutlineLogout className="text-inherit transition-none" />
                                </span>
                            </Link>
                            <Link to="/" onClick={() => setUserInfo(undefined)}>
                                <span
                                    title="خروج از حساب"
                                    className="button-Cms-type text-jv-danger ml-2 border-jv-lightDanger  hover:bg-jv-lightDanger text-xl"
                                >
                                    <RiUserReceivedFill className="text-inherit transition-none" />
                                </span>
                            </Link>
                        </div>
                        <img className="rounded-full h-16 shadow-xl" src="/images/company-Sheypoor.webp" alt="" />
                        <h3 className="mt-3 text-jv-lightGray2x">شیپور</h3>
                        <ul className="w-full my-5 flex items-center justify-evenly">
                            {quickAccessArray.map((item, index) => (
                                <NavLink
                                    key={`quick_access_item_${index}`}
                                    to={item.link}
                                    className="select-none cursor-pointer text-jv-primary flex flex-col items-center justify-center group relative"
                                >
                                    <span className="button-Cms-type border-jv-lightPrimary bg-jv-lightPrimary shadow-jv-primary group-hover:shadow-xl group-active:scale-90">
                                        {item.icon}
                                    </span>
                                    <span className="mt-3 text-xs">{item.title}</span>
                                </NavLink>
                            ))}
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

export default CmsEmployer;
