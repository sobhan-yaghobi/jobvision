// Types
import React, { useState } from "react";
import { MenuItemCmsType } from "../../Components/MenuItemCms/MenuItemCms";

// Hooks
import useItemCmsPage from "../../Hooks/useItemCmsPage";
import useAuth from "../../Store/useAuth";

// Components
import { motion } from "framer-motion";
import Button from "../../Components/Button/Button";
import { Outlet } from "react-router-dom";
import QuickAccessSideBar from "../../Components/QuickAccessSideBar/QuickAccessSideBar";
import MenuCms from "../../Components/MenuCms/MenuCms";

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
import { CiEdit } from "react-icons/ci";
import { FaFileCirclePlus } from "react-icons/fa6";
import { MdSettings } from "react-icons/md";

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
    const [isQuickAccessBar, setIsQuickAccessBar] = useState(false);
    return (
        <>
            <div className="w-full h-screen flex justify-between p-4 relative">
                <div className={`w-full h-full absolute top-0 left-0 ${isQuickAccessBar ? "block" : "hidden"}`}>
                    <div
                        className="w-7/12 h-full bg-jv-bgColor z-40 absolute top-0 right-0"
                        onClick={() => setIsQuickAccessBar(false)}
                    ></div>
                    <div className="w-5/12 h-full p-5 bg-jv-light z-50 absolute top-0 left-0">
                        <QuickAccessSideBar quickAccessArray={quickAccessArray} setUserState={setUserInfo} />
                    </div>
                </div>
                <div className="w-3/12 lg:w-2/12 p-1 flex flex-col justify-between text-jv-lightGray2x">
                    <div className="flex items-center justify-between pl-2">
                        <img className="h-10 self-start" src={Logo} alt="" />
                        <div className="lg:hidden" onClick={() => setIsQuickAccessBar(true)}>
                            <MdSettings className="text-2xl" />
                        </div>
                    </div>
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
                <div className="w-9/12 lg:w-7/12 h-full mx-4">
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
                <div className="hidden lg:block w-3/12 h-full">
                    <QuickAccessSideBar quickAccessArray={quickAccessArray} setUserState={setUserInfo} />
                </div>
            </div>
        </>
    );
};

export default CmsEmployer;
