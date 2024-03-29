import React from "react";
// Types
import { ItemGenerator, LinkGenerator, MenuDesktopItemGenerate, SubMenuGenerator } from "../Menu/Menu";

// Animations
import {
    DelayBeforeChilds,
    LongStripVertical_Ex,
    ShowAndHideOpacity_Ex,
    ShowAndHideScale_Ex,
    ShowHideClipFromBottom_Ex,
    ShowOpacity,
    ShowHideMenuItemChildToLeftOrRight,
} from "../../Animations/Animation";

// Hooks
import useMenuFetch from "../../Hooks/useMenuFetch";
import { Link, useNavigate } from "react-router-dom";
import useLoginModal from "../../Store/useLoginModal";
import useShowMenu from "../../Hooks/useShowMenu/useShowMenu";
import useAuth from "../../Store/useAuth";

// Components
import { AnimatePresence, motion } from "framer-motion";
import Button from "../Button/Button";
import Login from "../Login/Login";
import Modal from "../Modal/Modal";
import { SkeletonElm } from "../Skeleton/Skeleton";

// Icons
import WhiteLogo from "/Svg/Logo/WhiteColorLogo.svg";
import PrimaryLogo from "/Svg/Logo/PrimaryColorLogo.svg";
import LeftIcon from "/Svg/Left.svg";
import ArrowLeftIconWhite from "/Svg/ArrowLeftWhiteColor.svg";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { BiUser } from "react-icons/bi";

const Header: React.FC = () => {
    const { isLoggedIn } = useAuth();
    const { isShow: isShowLoginModal, setIsShow: setIsShowLoginModal } = useLoginModal();
    const { menuMergeArray: menu, isLoading } = useMenuFetch();
    const navigate = useNavigate();

    const {
        elm,
        menuDesktop,
        menuDesktopFire,
        closeMenuDesktop,
        menuMobile,
        menuMobileFire,
        closeMenuMobile,
        menuMobileToggle,
        backButtonAcion,
    } = useShowMenu(menu);

    const megaBgClickAction = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = event.target as HTMLDivElement;
        if (target.id === "MegaBg") {
            menuDesktopFire("", false);
        }
    };
    // Login
    const closeLoginModalAction = () => setIsShowLoginModal(false);
    return (
        <>
            <div className="w-full h-20 relative">
                <header className="fixed h-20 w-full px-0 rounded-b-xl bg-jv-primary shadow-lg lg:bg-jv-white z-40">
                    {/*//? -------------------- Start Mobile Header -------------------- */}
                    <div className="header-mobile  w-full h-full p-2 lg:hidden flex items-center justify-between">
                        <div className="flex">
                            <div className="w-fit sm:px-3 ml-5 flex items-center justify-start">
                                <Button noBorder ClickHandler={menuMobileToggle} textColor="light" isLoading={false}>
                                    {menuMobile.isOpen ? (
                                        <AiOutlineClose />
                                    ) : (
                                        <HiOutlineMenuAlt1 className="rotate-180" />
                                    )}
                                </Button>
                            </div>

                            <div className="w-fit sm:px-3 flex items-center justify-center">
                                <Link to={"/"}>
                                    <img className="w-full scale-150 md:w-5/12 " src={WhiteLogo} alt="" />
                                </Link>
                            </div>
                        </div>

                        <div className="w-5/12 sm:w-4/12 text-center flex items-center justify-end">
                            {isLoggedIn ? (
                                <Button
                                    ClickHandler={() => navigate("/cmsEmployer")}
                                    textColor="light"
                                    size="middle"
                                    ClassName="py-2 px-4 shadow-lg border-none hover:shadow-jv-bgColor"
                                    isLoading={false}
                                >
                                    <BiUser className="text-xl ml-2" />
                                    پنل کارفرما
                                </Button>
                            ) : (
                                <Button
                                    ClickHandler={() => setIsShowLoginModal(true)}
                                    textColor="light"
                                    size="small"
                                    ClassName="text-xs sm:text-base px-3 shadow-lg border-none hover:shadow-jv-bgColor"
                                    isLoading={false}
                                >
                                    ورود/ثبت نام کارجو
                                </Button>
                            )}
                        </div>
                    </div>
                    {/*//? -------------------- Finish Mobile Header -------------------- */}

                    {/*//? -------------------- Start Desktop Header -------------------- */}
                    <div className="header-desktop w-full h-full px-24 hidden lg:flex items-center justify-between">
                        <div className="header-desktop-right w-6/12 h-full flex items-center">
                            <section className="flex w-full h-full justify-around">
                                <div className="lg:w-full flex items-center">
                                    {isLoading ? (
                                        Array(4)
                                            .fill("")
                                            .map((item, index) => (
                                                <motion.div
                                                    key={`SkeletonElm_submenu_${index}`}
                                                    variants={ShowAndHideScale_Ex}
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="exit"
                                                >
                                                    <SkeletonElm
                                                        key={`SkeletonElm_${index}`}
                                                        className={[{ wrapper: "w-20 h-8 mx-2 rounded-md" }]}
                                                    ></SkeletonElm>
                                                </motion.div>
                                            ))
                                    ) : (
                                        <motion.div
                                            variants={ShowOpacity}
                                            transition={{ duration: 2 }}
                                            initial="hidden"
                                            animate="visible"
                                        >
                                            <SubMenuGenerator
                                                Type="Desktop"
                                                className={[
                                                    {
                                                        ParentClassName: "h-full flex",
                                                        ChildClassName: "menu__item border-transparent",
                                                        ClassWhenActive: "!border-jv-primary",
                                                    },
                                                ]}
                                                ClickHandler={menuDesktopFire}
                                                Data={menu}
                                                Ref={elm}
                                                mainMenuDesktop={menuDesktop.mainItem}
                                            ></SubMenuGenerator>
                                        </motion.div>
                                    )}
                                    <li className="hidden items-center xl:flex">
                                        <Button
                                            size="middle"
                                            textColor="light"
                                            ClassName="!bg-transparent !text-jv-danger !border-jv-danger mx-2"
                                            ClickHandler={() => {}}
                                            isLoading={false}
                                        >
                                            گزارش کارنامه بازار
                                        </Button>
                                    </li>
                                </div>
                            </section>
                        </div>
                        <div className="header-desktop-left w-6/12 flex items-center justify-end">
                            <div className="mx-5 flex border-l-[1px] border-jv-primary border-solid">
                                {isLoggedIn ? (
                                    <Button
                                        ClickHandler={() => navigate("/cmsEmployer")}
                                        textColor="light"
                                        size="middle"
                                        ClassName="py-2 px-4"
                                        isLoading={false}
                                    >
                                        <BiUser className="text-xl ml-2" />
                                        پنل کارفرما
                                    </Button>
                                ) : (
                                    <Button
                                        ClickHandler={() => setIsShowLoginModal(true)}
                                        textColor="light"
                                        size="middle"
                                        isLoading={false}
                                    >
                                        ورود/ثبت نام کارجو
                                    </Button>
                                )}

                                <Button
                                    ClickHandler={() => {}}
                                    textColor="primary"
                                    size="middle"
                                    ClassName="!bg-transparent !border-none"
                                    isLoading={false}
                                >
                                    بخش کارفرمایان
                                </Button>
                            </div>
                            <Link to={"/"}>
                                <img src={PrimaryLogo} alt="" />
                            </Link>
                        </div>
                    </div>
                    {/*//? -------------------- Finish Desktop Header -------------------- */}
                </header>
            </div>
            {/*//? -------------------- Start Desktop Header DropDown -------------------- */}
            <AnimatePresence>
                {menuDesktop.isShow && menuDesktop.mainItem ? (
                    <motion.div
                        variants={ShowAndHideOpacity_Ex}
                        transition={DelayBeforeChilds}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        id="MegaBg"
                        onClick={(event) => megaBgClickAction(event)}
                        className={`current-mega-height bg-jv-bgColor fixed w-full z-20 hidden lg:flex ${
                            menuDesktop.isMega ? "flex justify-center" : ""
                        }`}
                    >
                        <motion.div
                            style={
                                menuDesktop.isMega
                                    ? {}
                                    : {
                                          width: `${menuDesktop.width}px`,
                                          left: `${menuDesktop.x}px`,
                                          top: `${menuDesktop.y}px`,
                                      }
                            }
                            className={`absolute ${
                                menuDesktop.isMega ? "w-11/12 h-[95%] bg-jv-light rounded-b-lg p-2" : ""
                            }`}
                            variants={LongStripVertical_Ex}
                        >
                            <MenuDesktopItemGenerate
                                onClose={closeMenuDesktop}
                                menuData={menuDesktop.mainItem}
                            ></MenuDesktopItemGenerate>
                        </motion.div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
            {/*//? -------------------- Finish Desktop Header DropDown -------------------- */}
            {/*//? -------------------- Start Mobile Header DropDown -------------------- */}
            <AnimatePresence>
                {menuMobile.isOpen ? (
                    <>
                        <motion.div
                            onClick={closeMenuMobile}
                            variants={ShowAndHideOpacity_Ex}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="bg-jv-bgColor fixed top-0 right-0 w-full h-full z-30 lg:hidden"
                        ></motion.div>
                        <motion.div
                            variants={ShowHideClipFromBottom_Ex}
                            transition={DelayBeforeChilds}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className={`header-dropwodn-mobile w-full h-4/6 rounded-t-3xl fixed lg:hidden bottom-0 right-0 bg-jv-primary  text-right ${
                                menuMobile.isOpen ? "z-30" : "z-10"
                            }`}
                        >
                            <motion.div
                                variants={ShowHideMenuItemChildToLeftOrRight(
                                    Boolean(menuMobile.goAnimationTo === "Forward")
                                )}
                                transition={DelayBeforeChilds}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                className="py-6 px-5 h-full"
                            >
                                {menuMobile.isShow.SubMenu ? null : (
                                    <div className="h-1/6 mb-2 flex route Navigation">
                                        <Button
                                            noBorder
                                            isLoading={false}
                                            textColor="light"
                                            ClickHandler={backButtonAcion}
                                            size="large"
                                            ClassName="w-full flex flex-row-reverse justify-between items-center border-b-2 border-solid border-jv-light"
                                            IconType="JSX_ICON"
                                            Icon={<img className="rotate-180" src={ArrowLeftIconWhite} alt="" />}
                                        >
                                            <span>{menuMobile.goButtonTitle}</span>
                                        </Button>
                                    </div>
                                )}
                                <div className="h-full overflow-y-auto px-4 no-scrollbar">
                                    {menuMobile.isShow.SubMenu ? (
                                        <SubMenuGenerator
                                            Type="Mobile"
                                            Data={menu}
                                            MobileVarient={ShowHideMenuItemChildToLeftOrRight(
                                                Boolean(menuMobile.goAnimationTo === "Forward")
                                            )}
                                            className={[
                                                {
                                                    ChildClassName:
                                                        "cursor-pointer text-xl text-jv-light my-5 flex items-center justify-between",
                                                },
                                            ]}
                                            ClickHandler={menuMobileFire}
                                        >
                                            <img src={ArrowLeftIconWhite} alt="" />
                                        </SubMenuGenerator>
                                    ) : menuMobile.isShow.Item ? (
                                        <ItemGenerator
                                            Type="Mobile"
                                            Data={menuMobile.menuData.SubMenu}
                                            MobileVarient={ShowHideMenuItemChildToLeftOrRight(
                                                Boolean(menuMobile.goAnimationTo === "Forward")
                                            )}
                                            className={[
                                                {
                                                    ParentClassName: "h-5/6 overflow-y-auto px-4",
                                                    ChildClassName:
                                                        "cursor-pointer text-xl text-jv-light my-5 flex items-center justify-between",
                                                },
                                            ]}
                                            ClickHandler={menuMobileFire}
                                        >
                                            <img src={ArrowLeftIconWhite} alt="" />
                                        </ItemGenerator>
                                    ) : menuMobile.isShow.Links ? (
                                        <LinkGenerator
                                            Type="Mobile"
                                            Data={menuMobile.menuData.Links}
                                            mainItem={menuMobile.menuData.Item}
                                            isChildrenShow
                                            MobileVarient={ShowHideMenuItemChildToLeftOrRight(
                                                Boolean(menuMobile.goAnimationTo === "Forward")
                                            )}
                                            className={[
                                                {
                                                    ParentClassName: "w-full h-full",
                                                    ChildClassName:
                                                        "cursor-pointer text-xl text-jv-light flex flex-col my-3",
                                                    LinksWrapperClassName: "flex items-start flex-col",
                                                    SublinkParentClassName: "flex items-start flex-col",
                                                    SublinkChildClassName: "mr-5 flex text-base items-center mt-2",
                                                    SublinkLinkWrapperClassName: "text-jv-light opacity-70",
                                                },
                                            ]}
                                            onClose={closeMenuMobile}
                                        >
                                            <img src={LeftIcon} alt="" />
                                        </LinkGenerator>
                                    ) : null}
                                </div>
                            </motion.div>
                            <div
                                onClick={menuMobileToggle}
                                className="w-10 h-1 bg-jv-light rounded-3xl absolute -translate-x-1/2 -translate-y-1/2 top-3 left-1/2"
                            ></div>
                        </motion.div>
                    </>
                ) : null}
            </AnimatePresence>
            {/*//? -------------------- Finish Mobile Header DropDown -------------------- */}
            <Modal
                isOpen={isShowLoginModal}
                OpenAction={{ mode: "Functional", function: closeLoginModalAction }}
                centerd
                footer={null}
                height={"auto"}
                width={400}
            >
                <Login></Login>
            </Modal>
        </>
    );
};

export default Header;
