// Types
import React, { useEffect, useState } from "react";
import { MenuItemCmsType } from "../../Components/MenuItemCms/MenuItemCms";

// Hooks
import useItemCmsPage from "../../Hooks/useItemCmsPage";
import useAuth from "../../Store/useAuth";
import { useLocation } from "react-router-dom";

// Components
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../Components/Button/Button";
import { Outlet } from "react-router-dom";
import QuickAccessSideBar from "../../Components/QuickAccessSideBar/QuickAccessSideBar";
import MenuCms from "../../Components/MenuCms/MenuCms";

// Animations
import {
    ShortShowFromBottom,
    ShortShowFromTop,
    ShowAndHideOpacity_Ex,
    ShowOpacity,
    SpringBackOutVeryShortly,
} from "../../Animations/Animation";

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
import { CiMenuKebab } from "react-icons/ci";

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

    const [isMobileMenuOpen, setIsMenuMobileOpen] = useState(false);
    const location = useLocation();
    useEffect(() => {
        setIsMenuMobileOpen(false);
    }, [location]);

    const ItemOfNavbar = ({ showMenu }: { showMenu: boolean }) => (
        <>
            {showMenu ? (
                <>
                    <CiMenuKebab
                        onClick={() => setIsMenuMobileOpen((prev) => !prev)}
                        className={`text-jv-lightGray2x text-xl ${isMobileMenuOpen ? "fill-jv-primary" : ""}`}
                    />
                    {isMobileMenuOpen ? (
                        <motion.div
                            variants={ShowOpacity}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="absolute w-full h-fit rounded-lg top-full mt-5 p-5 shadow-xl shadow-jv-gray bg-jv-light z-50"
                        >
                            <MenuCms pageItems={pageItems}></MenuCms>
                        </motion.div>
                    ) : null}
                </>
            ) : null}
            <img className="h-10 self-start" src={Logo} alt="" />
            <div className="lg:hidden cursor-pointer flex" onClick={() => setIsQuickAccessBar(true)}>
                <MdSettings className="text-2xl text-jv-lightGray2x" />
            </div>
        </>
    );
    return (
        <>
            <div className="w-full h-screen flex justify-between p-4 relative flex-col md:flex-row">
                <div
                    onClick={() => setIsMenuMobileOpen(false)}
                    className={`md:hidden ${
                        isMobileMenuOpen ? "fixed w-full h-full bg-jv-bgColor top-0 left-0 z-40" : ""
                    }`}
                ></div>
                <AnimatePresence>
                    {isQuickAccessBar ? (
                        <motion.div
                            variants={ShowAndHideOpacity_Ex}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className={`w-full h-full fixed top-0 left-0 z-40`}
                        >
                            <div
                                className="w-full h-full bg-jv-bgColor absolute top-0 right-0"
                                onClick={() => setIsQuickAccessBar(false)}
                            ></div>
                            <div className="w-full md:w-5/12 h-full p-5 bg-jv-light absolute top-0 left-0">
                                <QuickAccessSideBar
                                    setIsClose={setIsQuickAccessBar}
                                    quickAccessArray={quickAccessArray}
                                    setUserState={setUserInfo}
                                />
                            </div>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
                {/*  */}
                <div className="hidden md:flex md:w-3/12 lg:w-2/12 p-1 flex-col justify-between text-jv-lightGray2x">
                    <div className="flex items-center justify-between pl-2 relative">
                        <ItemOfNavbar showMenu={false} />
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

                <div className="md:hidden bg-jv-light py-3 px-4 mb-4 rounded-lg">
                    <div className="flex items-center justify-between pl-2 relative">
                        <ItemOfNavbar showMenu={true} />
                    </div>
                </div>
                {/*  */}
                <div className="w-full md:w-9/12 lg:w-7/12 h-full md:mx-4">
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
