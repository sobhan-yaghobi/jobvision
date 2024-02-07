import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import RequestNotificationBox from "../RequestNotificationBox/RequestNotificationBox";
import useAuth, { useAuthActionType, userInfo } from "../../Store/useAuth";
import { HiOutlineLogout } from "react-icons/hi";
import { RiUserReceivedFill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import { SkeletonElm } from "../Skeleton/Skeleton";
type QuickAccessSideBarProps = {
    quickAccessArray: {
        title: string;
        link: string;
        icon: React.ReactNode;
    }[];
    setUserState: useAuthActionType["setUserInfo"];
    setIsClose?: React.Dispatch<React.SetStateAction<boolean>>;
};
const QuickAccessSideBar: React.FC<QuickAccessSideBarProps> = ({ quickAccessArray, setUserState, setIsClose }) => {
    const { userInfo } = useAuth();
    const navigate = useNavigate();
    const [isLogout, setIsLogout] = useState(false);
    return (
        <>
            <div className="h-3/6 flex flex-col items-center">
                <div
                    className={`w-full flex items-center  ${
                        typeof setIsClose !== "undefined" ? "justify-between" : "justify-end"
                    }`}
                >
                    {typeof setIsClose !== "undefined" ? (
                        <button
                            className="button-Cms-type text-jv-danger ml-2 border-jv-lightDanger  hover:bg-jv-lightDanger text-xl"
                            onClick={() => setIsClose(false)}
                        >
                            <IoMdClose />
                        </button>
                    ) : null}

                    <div className="flex items-center">
                        <Link to="/">
                            <span
                                title="خروج از پنل"
                                className="button-Cms-type text-jv-danger ml-2 border-jv-lightDanger  hover:bg-jv-lightDanger text-xl"
                            >
                                <HiOutlineLogout className="text-inherit transition-none" />
                            </span>
                        </Link>
                        <span
                            onClick={() => setIsLogout(true)}
                            title="خروج از حساب"
                            className="button-Cms-type text-jv-danger ml-2 border-jv-lightDanger  hover:bg-jv-lightDanger text-xl"
                        >
                            <RiUserReceivedFill className="text-inherit transition-none" />
                        </span>
                    </div>
                </div>
                {typeof userInfo?.company === "undefined" ? (
                    <>
                        <SkeletonElm className={[{ wrapper: "w-16 h-16 rounded-full" }]} />
                        <SkeletonElm className={[{ wrapper: "w-16 h-5 rounded-md mt-3" }]} />
                    </>
                ) : (
                    <>
                        <img className="rounded-full h-16 shadow-xl" src={userInfo?.company?.logo} alt="" />
                        <h3 className="mt-3 text-jv-lightGray2x">{userInfo?.company?.name}</h3>
                    </>
                )}

                <ul className="w-full my-5 flex items-center justify-evenly">
                    {quickAccessArray.map((item, index) => (
                        <NavLink
                            onClick={() => typeof setIsClose !== "undefined" && setIsClose(false)}
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
            <div className="h-3/6 w-full flex flex-col justify-end">
                <div className="px-1 flex flex-col overflow-y-auto">
                    <h3 className="text-jv-lightGray2x">درخواست های اخیر</h3>
                    <div className="my-1">
                        <span className="text-jv-lightGray2x text-xs pr-1">امروز</span>
                        <ul>
                            {Array(6)
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
            <Modal
                isOpen={isLogout}
                OpenAction={{ mode: "SetState", setState: setIsLogout }}
                centerd
                footer={null}
                height={"auto"}
                width={400}
            >
                <div>از خارج شدن مطمعنی !؟</div>
                <div className="flex my-2 gap-2">
                    <Button
                        ClickHandler={() => {
                            setUserState(undefined);
                            navigate("/");
                        }}
                        ClassName="border-jv-danger text-jv-danger hover:bg-jv-lightDanger"
                        size="small"
                        textColor="primary"
                        isLoading={false}
                    >
                        اره
                    </Button>
                    <Button
                        ClickHandler={() => setIsLogout(false)}
                        ClassName="hover:bg-jv-lightPrimary"
                        size="small"
                        textColor="primary"
                        isLoading={false}
                    >
                        نه باوا
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default QuickAccessSideBar;
