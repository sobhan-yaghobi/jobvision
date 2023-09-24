import React, { useState, useRef } from "react";
import SearchFrom from "../../Components/SearchFrom/SearchFrom";
import Button from "../../Components/Button/Button";
import { MdNotificationAdd, MdNotificationsActive } from "react-icons/md";
import { AiFillCaretDown } from "react-icons/ai";
import uuidGenerator from "../../Utils/UuidGenerator";
import AdvertisingBox from "../../Components/AdvertisingBox/AdvertisingBox";

interface BoxsOrderType {
    id: string;
    title: string;
    order: "RELATED" | "NEW" | "HIGHEST_SALARY";
}

const boxOrderArray: BoxsOrderType[] = [
    { id: uuidGenerator(), title: "مرتبط ترین ها", order: "RELATED" },
    { id: uuidGenerator(), title: "جدید ترین ها", order: "NEW" },
    { id: uuidGenerator(), title: "بیشترین حقوق", order: "HIGHEST_SALARY" },
];

const Jobs: React.FC = () => {
    //? ---------------------------------- WHY Us
    const [isNotification, setIsNotification] = useState(false);
    const [notifPending, setNotifPending] = useState(isNotification);
    const notificationAction = () => {
        setIsNotification((prev) => !prev);
        setNotifPending((prev) => !prev);
        setTimeout(() => {
            setNotifPending((prev) => !prev);
        }, 2000);
    };
    //! ---------------------------------- WHY Us

    //? ---------------------------------- Box Order
    const [orderMain, setOrderMain] = useState<BoxsOrderType>(boxOrderArray[0]);
    const orderMenu = useRef<HTMLDivElement>(null);
    const showOrderAction = () => orderMenu.current?.classList.add("active");
    const hideOrderAction = () => orderMenu.current?.classList.remove("active");
    //! ---------------------------------- Box Order

    return (
        <>
            {/*//? -------------------------------------- Seacrh -------------------------------------- */}
            <div className="py-8 px-2 md:px-10 lg:px-24 border-b-2 border-solid border-jv-lightGray3x">
                <SearchFrom isFilterBarShow></SearchFrom>
            </div>
            {/*//! -------------------------------------- Seacrh -------------------------------------- */}

            <div className="py-5 px-2 md:px-10 lg:px-24 bg-jv-light relative flex">
                {/*//? -------------------------------------- List Boxs -------------------------------------- */}
                <div className="listBox ml-2 w-5/12 flex flex-col">
                    <Button
                        textColor="light"
                        size="middle"
                        isLoading={notifPending}
                        ClickHandler={() => {
                            notificationAction();
                        }}
                        Icon={isNotification ? MdNotificationsActive : MdNotificationAdd}
                    >
                        فعال سازی اطلاع رسانی شغل ها
                    </Button>
                    <div className="p-3 my-2 rounded-lg bg-jv-white flex items-center justify-between">
                        <section>37524 فرصت شغلی فعال</section>
                        {Object.values(orderMain).length ? (
                            <section className="flex items-center">
                                <span>مرتب سازی :</span>
                                <div
                                    onMouseEnter={showOrderAction}
                                    onMouseLeave={hideOrderAction}
                                    className="relative p-2 mx-1 border border-solid border-jv-lightGray3x rounded-lg "
                                >
                                    <span className="cursor-pointer flex items-center select-none">
                                        {orderMain.title}
                                        <AiFillCaretDown className="mr-2"></AiFillCaretDown>
                                    </span>
                                    <div
                                        ref={orderMenu}
                                        className="showFromTop w-full min-h-fit py-3 duration-300 absolute top-full right-0"
                                    >
                                        <ul className="bg-jv-white p-2 rounded-lg transition-none">
                                            {boxOrderArray.map((item) => (
                                                <li
                                                    onClick={() => setOrderMain(item)}
                                                    className={`cursor-pointer p-1 rounded-md my-2 ${
                                                        item.order === orderMain.order
                                                            ? "text-jv-white bg-jv-primary"
                                                            : ""
                                                    }`}
                                                    key={item.id}
                                                >
                                                    {item.title}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </section>
                        ) : null}
                    </div>
                    <div className="wrapper flex flex-col">
                        {Array(13)
                            .fill("")
                            .map((item, index) => (
                                <div className="mb-2">
                                    <AdvertisingBox
                                        showSendCv={false}
                                        IsImportant={index === 2 ? true : false}
                                        key={index + 1}
                                        data={[]}
                                    ></AdvertisingBox>
                                </div>
                            ))}
                    </div>
                </div>
                {/*//! -------------------------------------- List Boxs -------------------------------------- */}

                {/*//?-------------------------------------- Box Info -------------------------------------- */}
                <div className="boxInfo mr-2 w-7/12"></div>
                {/*//! -------------------------------------- Box Info -------------------------------------- */}
            </div>
        </>
    );
};

export default Jobs;
