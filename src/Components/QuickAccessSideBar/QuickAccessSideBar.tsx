import React from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { RiUserReceivedFill } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import RequestNotificationBox from "../RequestNotificationBox/RequestNotificationBox";
import { useAuthActionType, userInfo } from "../../Store/useAuth";
type QuickAccessSideBarProps = {
    quickAccessArray: {
        title: string;
        link: string;
        icon: React.ReactNode;
    }[];
    setUserState: useAuthActionType["setUserInfo"];
};
const QuickAccessSideBar: React.FC<QuickAccessSideBarProps> = ({ quickAccessArray, setUserState }) => {
    return (
        <>
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
                    <Link to="/" onClick={() => setUserState(undefined)}>
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
        </>
    );
};

export default QuickAccessSideBar;
