// Hooks
import React, { useState, useRef } from "react";
import useSearchForm from "../../Hooks/useSearchForm";
import useBoxList from "../../Hooks/useBoxList";

// Date
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";

// Types
import {
    BoxsOrderType,
    MainItemBoxInfoType,
    BoxInfoCardProps,
    BoxInfoProps,
    boxOrderArray,
    mainItemsBoxInfos,
} from "./Jobs.type";

// Animations
import { ShortShowFromBottom, ShowAndHideOpacity_Ex, ShowFromBottom_EX } from "../../Animations/Animation";

// Components
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import SearchFrom from "../../Components/SearchFrom/SearchForm";
import Button from "../../Components/Button/Button";
import AdvertisingBox from "../../Components/AdvertisingBox/AdvertisingBox";
import Accordion from "../../Components/Accordion/Accordion";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ScoreIconGenerator } from "../../Utils/UtilsComponent";
import JobsFilter from "../../Components/JobsFilter/JobsFilter";
import ErrorBox from "../../Components/ErrorBox/ErrorBox";

// Icons
import { AiFillCaretDown, AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { MdNotificationAdd, MdNotificationsActive } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { GoReport } from "react-icons/go";
import { VscPreview } from "react-icons/vsc";

import useFilterBoxList from "../../Hooks/useFilterBoxList";
import { AdsSkeleton } from "../../Components/Skeleton/Skeleton";
import CompanySlider from "../../Components/CompanySlider/CompanySlider";

const Jobs: React.FC = () => {
    const { setValue } = useSearchForm();
    //? ---------------------------------- Notification
    const [isNotification, setIsNotification] = useState(false);
    const [notifPending, setNotifPending] = useState(isNotification);
    const notificationAction = () => {
        setIsNotification((prev) => !prev);
        setNotifPending((prev) => !prev);
        setTimeout(() => {
            setNotifPending((prev) => !prev);
        }, 2000);
    };
    //! ---------------------------------- Notification

    //? ---------------------------------- Box Order
    const [orderMain, setOrderMain] = useState<BoxsOrderType>(boxOrderArray[0]);
    const orderMenu = useRef<HTMLDivElement>(null);
    const showOrderAction = () => orderMenu.current?.classList.add("active");
    const hideOrderAction = () => orderMenu.current?.classList.remove("active");
    //! ---------------------------------- Box Order

    //? ---------------------------------- Box Lists
    const [proModeFilter, setProModeFilter] = useState(false);
    const [filterSelection, setFilterSelection] = useState<string[]>([]);
    const { boxList, setBoxList, mainBox, setMainBox, getAdvertisingWithCompany, isLoading } = useBoxList();
    const { isFillter } = useFilterBoxList({
        filter_selection: filterSelection,
        pro_mode: proModeFilter,
        box_list: boxList,
        boxs: getAdvertisingWithCompany,
        set_box_list: setBoxList,
    });
    //! ---------------------------------- Box Lists

    //? ---------------------------------- Box Info
    const [mainItemInfo, setMainItemInfo] = useState<MainItemBoxInfoType>(mainItemsBoxInfos[0]);
    //! ---------------------------------- Box Info

    return (
        <>
            <Header></Header>
            {/*//? -------------------------------------- Seacrh -------------------------------------- */}
            <div className="py-8 px-2 md:px-10 lg:px-24 border-b-2 border-solid border-jv-lightGray3x">
                <SearchFrom></SearchFrom>
                <div className="mt-4"></div>
                <JobsFilter
                    setSelectedFilter={setFilterSelection}
                    isFilterOnProMode={proModeFilter}
                    setIsFilterOnProMode={setProModeFilter}
                ></JobsFilter>
            </div>
            {/*//! -------------------------------------- Seacrh -------------------------------------- */}

            <div className="w-full py-5 px-2 md:px-10 lg:px-24 bg-jv-light flex">
                {/*//? -------------------------------------- List Boxs -------------------------------------- */}
                <div className="listBox w-full flex flex-col lg:w-5/12 text-xs xl:text-base">
                    <Button
                        textColor="light"
                        size="middle"
                        isLoading={notifPending}
                        ClickHandler={() => {
                            notificationAction();
                        }}
                        IconType="REACT_ICON"
                        Icon={isNotification ? MdNotificationsActive : MdNotificationAdd}
                    >
                        فعال سازی اطلاع رسانی شغل ها
                    </Button>
                    <div className="p-3 mt-2 rounded-lg bg-jv-white flex items-center justify-between">
                        <section>{boxList?.length} فرصت شغلی فعال</section>
                        {Object.values(orderMain).length ? (
                            <section className="flex items-center">
                                <span>مرتب سازی :</span>
                                <div
                                    onMouseEnter={showOrderAction}
                                    onMouseLeave={hideOrderAction}
                                    className="relative p-2 mx-1 border border-solid border-jv-lightGray3x rounded-lg select-none"
                                >
                                    <span className="cursor-pointer flex items-center">
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
                        {isLoading ? (
                            Array(3)
                                .fill("")
                                .map((item, index) => (
                                    <div key={`AdsSkeleton_${index}`} className="mt-2">
                                        <AdsSkeleton loading></AdsSkeleton>
                                    </div>
                                ))
                        ) : boxList.length ? (
                            boxList?.map((item, index) => (
                                <div key={index + 1} className="mt-2">
                                    <AdvertisingBox
                                        type="HideSendCv"
                                        clickHandler={() => {
                                            setMainBox({ isShow: true, mainInfo: { ...item } });
                                            setValue({ name: "advertisingId", value: item.id });
                                        }}
                                        data={{ ...item }}
                                        isActive={item.id === mainBox.mainInfo?.id ? true : false}
                                    ></AdvertisingBox>
                                </div>
                            ))
                        ) : boxList.length === 0 && !isFillter ? (
                            <div className="mt-3 rounded-lg bg-jv-lightDanger flex items-center justify-center py-10">
                                <p className="text-jv-danger">آگهی مورد نظر یافت نشد</p>
                            </div>
                        ) : null}
                    </div>
                </div>
                {/*//! -------------------------------------- List Boxs -------------------------------------- */}

                {/*//?-------------------------------------- Box Info -------------------------------------- */}
                <div
                    className={`hidden boxInfo mr-2 w-7/12 bg-jv-white sticky top-24 overflow-x-hidden overflow-y-auto h-[82vh] rounded-xl lg:table-column lg:w-7/12 ${
                        typeof mainBox.mainInfo !== "undefined" && Object.values(mainBox.mainInfo).length
                            ? ""
                            : "bg-jv-light"
                    }`}
                >
                    {typeof mainBox.mainInfo !== "undefined" && Object.values(mainBox.mainInfo).length ? (
                        <>
                            <motion.div
                                key={mainBox.mainInfo.id}
                                variants={ShowAndHideOpacity_Ex}
                                transition={{ duration: 0.7 }}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                <BoxInfoCard
                                    mainInfoJob={mainBox.mainInfo}
                                    mainItemInfo={mainItemInfo}
                                    setMainItemInfo={setMainItemInfo}
                                ></BoxInfoCard>
                            </motion.div>
                            <motion.div
                                variants={ShortShowFromBottom}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                key={mainItemInfo.id}
                                className="px-3 py-6 -z-10"
                            >
                                <BoxInfo type={mainItemInfo.type} jobInfo={{ ...mainBox.mainInfo }}></BoxInfo>
                            </motion.div>
                        </>
                    ) : (
                        <ErrorBox
                            titleSize="sm"
                            errTitle="جهت مشاهده اطلاعات آگهی شغلی یکی از موارد را از سمت راست انتخاب کنید."
                        />
                    )}
                </div>

                {/*//! -------------------------------------- Box Info -------------------------------------- */}

                {/*//? -------------------- Start Mobile Header DropDown -------------------- */}
                <AnimatePresence>
                    {typeof mainBox.mainInfo !== "undefined" && mainBox.isShow ? (
                        <motion.div
                            className={`w-full h-screen fixed bg-jv-bgColor lg:hidden bottom-0 right-0 text-right ${
                                mainBox.isShow ? "z-20" : "z-10"
                            }`}
                            variants={ShowFromBottom_EX}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.4 }}
                        >
                            <motion.div
                                className="w-full current-mega-height-svh fixed overflow-hidden -bottom-1 right-0 rounded-t-xl bg-jv-white"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                key={mainBox.mainInfo?.id}
                            >
                                <div
                                    className="px-3 py-2 flex items-center"
                                    onClick={() => setMainBox({ isShow: false, mainInfo: undefined })}
                                >
                                    <AiOutlineClose className="text-jv-black text-2xl" />
                                </div>
                                <div className="max-h-full pb-10 overflow-y-auto no-scrollbar">
                                    <BoxInfoCard
                                        mainInfoJob={mainBox.mainInfo}
                                        mainItemInfo={mainItemInfo}
                                        setMainItemInfo={setMainItemInfo}
                                    ></BoxInfoCard>

                                    <motion.div
                                        variants={ShortShowFromBottom}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        key={mainItemInfo.id}
                                        transition={{ ease: "backOut" }}
                                        className="px-3 py-6"
                                    >
                                        <BoxInfo type={mainItemInfo.type} jobInfo={{ ...mainBox.mainInfo }}></BoxInfo>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
                {/*//? -------------------- Finish Mobile Header DropDown -------------------- */}
            </div>

            <div className="w-full py-10 bg-jv-light">
                {/*//? -------------------------------------- Company Box Slider -------------------------------------- */}
                <CompanySlider></CompanySlider>
                {/*//! -------------------------------------- Company Box Slider -------------------------------------- */}
            </div>
            <Footer></Footer>
        </>
    );
};

const BoxInfoCard: React.FC<BoxInfoCardProps> = ({ mainInfoJob, mainItemInfo, setMainItemInfo }) => {
    return (
        <>
            <div>
                <div
                    style={{
                        backgroundImage: "url('/images/company-image.webp')",
                    }}
                    className="w-full bg-blend-multiply h-36 bg-[#11111165] bg-fixed bg-center bg-no-repeat bg-cover"
                ></div>
            </div>
            <div className="h-28 p-3 bg-jv-white w-full flex justify-between sticky top-0 z-40">
                <div className="w-9/12">
                    <h3 className="mb-3 twoLine">{mainInfoJob.title}</h3>
                    <Link className="text-jv-primary truncate" to="/">
                        {mainInfoJob.company.name}
                    </Link>
                </div>
                <div className="w-2/12 flex items-start justify-end">
                    <Button textColor="light" size="small" isLoading={false} ClickHandler={() => {}}>
                        ارسال رزومه
                    </Button>
                </div>
            </div>
            <div className="px-3 w-full border-b-2">
                <div className="flex flex-col w-full">
                    <p className="text-jv-lightGray2x text-sm">{mainInfoJob.company.location}</p>
                    <div className="mb-2 flex flex-wrap">
                        <div className="box-info-type">امکان جذب کارآموز</div>
                        <div className="box-info-type">امکان دورکاری</div>
                    </div>
                    <div className="my-2 flex items-start justify-between">
                        <div className="flex flex-col gap-3">
                            <p className="text-xs text-jv-lightGray2x">57 روز پیش / 8 - 6 میلیون تومان</p>
                            <Button
                                ClassName="bg-jv-white"
                                textColor="primary"
                                size="small"
                                isLoading={false}
                                ClickHandler={() => {}}
                            >
                                مشاهده حقوق دریافتی افراد در مشاغل مشابه
                            </Button>
                        </div>
                        <div className="flex text-2xl text-jv-primary">
                            <AiOutlineShareAlt className="mr-1"></AiOutlineShareAlt>
                            <AiOutlineHeart className="mr-1"></AiOutlineHeart>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full bg-jv-light p-3 mt-5 border-t-[1px] border-solid border-jv-lightGray3x flex items-center justify-start">
                <div className="w-4/12 flex items-center text-jv-lightGray fill-jv-lightGray2x">
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.25 7.75C14.25 8.99264 13.2426 10 12 10V11.5C14.0711 11.5 15.75 9.82107 15.75 7.75H14.25ZM12 10C10.7574 10 9.75 8.99264 9.75 7.75H8.25C8.25 9.82107 9.92893 11.5 12 11.5V10ZM9.75 7.75C9.75 6.50736 10.7574 5.5 12 5.5V4C9.92893 4 8.25 5.67893 8.25 7.75H9.75ZM12 5.5C13.2426 5.5 14.25 6.50736 14.25 7.75H15.75C15.75 5.67893 14.0711 4 12 4V5.5ZM9 14.5H15V13H9V14.5ZM15 19H9V20.5H15V19ZM9 19C7.75736 19 6.75 17.9926 6.75 16.75H5.25C5.25 18.8211 6.92893 20.5 9 20.5V19ZM17.25 16.75C17.25 17.9926 16.2426 19 15 19V20.5C17.0711 20.5 18.75 18.8211 18.75 16.75H17.25ZM15 14.5C16.2426 14.5 17.25 15.5074 17.25 16.75H18.75C18.75 14.6789 17.0711 13 15 13V14.5ZM9 13C6.92893 13 5.25 14.6789 5.25 16.75H6.75C6.75 15.5074 7.75736 14.5 9 14.5V13Z" />

                        <path d="M7.75214 10.3887C7.59441 10.1353 7.29846 10 7 10C5.75736 10 4.75 8.99264 4.75 7.75C4.75 6.50736 5.75736 5.5 7 5.5C7.29846 5.5 7.59441 5.36473 7.75214 5.11135C7.75912 5.10014 7.76613 5.08896 7.7732 5.07782C8.0358 4.66331 7.90275 4.0764 7.415 4.0227C7.27873 4.0077 7.14027 4 7 4C4.92893 4 3.25 5.67893 3.25 7.75C3.25 9.82107 4.92893 11.5 7 11.5C7.14027 11.5 7.27873 11.4923 7.415 11.4773C7.90275 11.4236 8.0358 10.8367 7.7732 10.4222C7.76614 10.411 7.75912 10.3999 7.75214 10.3887Z" />

                        <path d="M4.70829 18.3169C4.59477 18.1275 4.39439 18 4.17359 18H4C2.75736 18 1.75 16.9926 1.75 15.75C1.75 14.5074 2.75736 13.5 4 13.5H4.17359C4.39439 13.5 4.59477 13.3725 4.70829 13.1831C4.98539 12.7208 4.68468 12 4.14569 12H4C1.92893 12 0.25 13.6789 0.25 15.75C0.25 17.8211 1.92893 19.5 4 19.5H4.14569C4.68469 19.5 4.98539 18.7792 4.70829 18.3169Z" />

                        <path d="M16.2268 10.4222C15.9642 10.8367 16.0973 11.4236 16.585 11.4773C16.7213 11.4923 16.8597 11.5 17 11.5C19.0711 11.5 20.75 9.82107 20.75 7.75C20.75 5.67893 19.0711 4 17 4C16.8597 4 16.7213 4.0077 16.585 4.0227C16.0973 4.0764 15.9642 4.66331 16.2268 5.07782C16.2339 5.08896 16.2409 5.10014 16.2479 5.11134C16.4056 5.36472 16.7015 5.5 17 5.5C18.2426 5.5 19.25 6.50736 19.25 7.75C19.25 8.99264 18.2426 10 17 10C16.7015 10 16.4056 10.1353 16.2479 10.3887C16.2409 10.3999 16.2339 10.411 16.2268 10.4222Z" />

                        <path d="M19.2917 18.3169C19.0146 18.7792 19.3153 19.5 19.8543 19.5H20C22.0711 19.5 23.75 17.8211 23.75 15.75C23.75 13.6789 22.0711 12 20 12H19.8543C19.3153 12 19.0146 12.7208 19.2917 13.1831C19.4052 13.3725 19.6056 13.5 19.8264 13.5H20C21.2426 13.5 22.25 14.5074 22.25 15.75C22.25 16.9926 21.2426 18 20 18H19.8264C19.6056 18 19.4052 18.1275 19.2917 18.3169Z" />
                    </svg>
                    <p className="mr-3 text-xs truncate">{mainInfoJob.company.organization_employ} نفر</p>
                </div>
                <div className="w-8/12 flex items-center text-jv-lightGray">
                    <VscPreview className="text-2xl text-jv-lightGray2x" />
                    <p className="mr-3 text-xs truncate w-10/12">{mainInfoJob.company.compnay_slogan}</p>
                </div>
            </div>
            <div className="w-full sticky top-28 bg-jv-white z-40">
                <ul className="px-3 pt-3 border-b-[1px] border-solid border-jv-lightGray3x flex no-scrollbar overflow-x-auto whitespace-nowrap">
                    {mainItemsBoxInfos.map((item) => (
                        <li
                            key={item.id}
                            onClick={() => setMainItemInfo(item)}
                            className={`ml-3 text-xs py-3 cursor-pointer border-b-2 border-solid lg:text-base ${
                                mainItemInfo.type === item.type
                                    ? "border-jv-primary text-jv-primary"
                                    : "border-transparent hover:border-jv-lightGray2x"
                            }`}
                        >
                            {item.title}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

const BoxInfo: React.FC<BoxInfoProps> = ({ type, jobInfo }) => {
    const jobCompany = jobInfo.company;

    if (type === "INFO_JOB") {
        return (
            <>
                <section className="mb-6">
                    <h2>مشخصات موقعیت شغلی</h2>
                    <div className="text-sm pr-3 flex flex-wrap">
                        <div className="w-1/2 pl-5 mt-5">
                            <h5>روز و ساعت کاری</h5>
                            <p className="truncate text-jv-lightGray2x">{jobInfo.work_time}</p>
                        </div>
                        <div className="w-1/2 pl-5 mt-5">
                            <h5>نوع همکاری</h5>
                            <p className="truncate text-jv-lightGray2x">{jobInfo.cooperation_ads_type}</p>
                        </div>
                        <div className="w-1/2 pl-5 mt-5">
                            <h5>سفرهای کاری</h5>
                            <p className="truncate text-jv-lightGray2x">{jobInfo.business_trips ?? "-"}</p>
                        </div>
                        <div className="w-1/2 pl-5 mt-5">
                            <h5>مزایا و تسهیلات</h5>
                            <p className="truncate text-jv-lightGray2x">---</p>
                        </div>
                    </div>
                </section>
                {typeof jobInfo.key_indicators !== "undefined" ? (
                    <section className="mb-6">
                        <h2>شاخص های کلیدی از نظر کارفرما</h2>
                        <div className="pr-3 pt-2 text-jv-lightGray2x flex flex-col">
                            {jobInfo.key_indicators.map((item, index) => (
                                <div
                                    key={index + 1}
                                    className={`mt-5 w-fit ${item.includes("-") ? "box-info-type" : "text-sm"}`}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null}
                <section className="mb-6 pb-6 border-b-[1px] border-solid border-jv-lightGray3x">
                    <h2>شرایط احراز شغل</h2>
                    <div className="text-sm pr-3 flex flex-wrap">
                        <div className="w-full pl-5 mt-5">
                            <h4>سن</h4>
                            <p className="truncate text-jv-lightGray2x">
                                {`${jobInfo.employment_conditions_years_old.at(0)} -
                                    ${jobInfo.employment_conditions_years_old.at(1)} `}
                                سال
                            </p>
                        </div>
                        <div className="w-full pl-5 mt-5">
                            <h4>جنسیت</h4>
                            <p className="truncate text-jv-lightGray2x">{jobInfo.employment_conditions_gender}</p>
                        </div>
                        <div className="w-full pl-5 mt-5">
                            <h4>تحصیلات</h4>
                            <div className="text-jv-lightGray2x flex flex-row flex-wrap">
                                {jobInfo.employment_conditions_education.map((item, index) => (
                                    <span key={index + 1} className="box-info-type">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="w-full pl-5 mt-5">
                            <h4>نرم افزارها</h4>
                            <div className="text-jv-lightGray2x flex flex-row flex-wrap">
                                {jobInfo.employment_conditions_softwares.map((item, index) => (
                                    <span key={index + 1} className="box-info-type">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="mb-6">
                    <Button
                        size="middle"
                        textColor="light"
                        ClassName="w-full !bg-jv-light !text-jv-danger rounded-lg !border-jv-danger"
                        ClickHandler={() => {}}
                        isLoading={false}
                        Icon={GoReport}
                    >
                        ثبت مشکل و تخلف آگهی
                    </Button>
                </section>
            </>
        );
    } else if (type === "ABOUT_COMPANY") {
        const ScoreTitle: React.FC = () => (
            <div className="flex items-center text-lg text-jv-golden">
                <p className="text-jv-lightGray ml-3">{jobCompany.score_company.toFixed(1)}</p>

                <ScoreIconGenerator
                    key={`score_icon_${jobInfo.id}`}
                    score={jobCompany.score_company}
                ></ScoreIconGenerator>
            </div>
        );
        return (
            <>
                <section className="mb-6">
                    <h2>امتیاز سازمان</h2>
                    <div className="mt-2">
                        <div>
                            <Accordion
                                type="Children"
                                title={<ScoreTitle />}
                                index={1}
                                isResponsive
                                listStyle="Ul"
                                theme="Light"
                                noSpace
                                isOpen
                            >
                                <div className="flex flex-wrap text-sm py-3">
                                    <div className="w-full mb-2 lg:w-1/2 lg:mb-0">
                                        <span className="danaBold">
                                            {jobCompany.score_popularity.toFixed(1)}
                                            <FaStar className="text-jv-golden mx-1 inline-block" />
                                        </span>
                                        <span>محبوبیت (براساس بازدید کارجویان)</span>
                                    </div>
                                    <div className="w-full mb-2 lg:w-1/2 lg:mb-0">
                                        <span className="danaBold">
                                            {jobCompany.score_responsiveness.toFixed(1)}
                                            <FaStar className="text-jv-golden mx-1 inline-block" />
                                        </span>
                                        <span>پاسخگویی به رزومه‌های دریافتی</span>
                                    </div>
                                    <div className="w-full mb-2 lg:w-1/2 lg:mb-0">
                                        <span className="danaBold">
                                            {jobCompany.score_experience_of_job_seekers.toFixed(1)}
                                            <FaStar className="text-jv-golden mx-1 inline-block" />
                                        </span>
                                        <span>تجربه کارجویان از جلسه مصاحبه</span>
                                    </div>
                                </div>
                            </Accordion>
                        </div>
                    </div>
                </section>
                <section className="mb-6">
                    <div className="flex items-center justify-between">
                        <h2 className="w-6/12 truncate">درباره {jobCompany.name}</h2>
                        <Link to="/" className="w-4/12 truncate text-left">
                            {jobCompany.website}
                        </Link>
                    </div>
                    <div className="my-6 text-jv-lightGray2x text-sm">
                        <p>{jobCompany.desc}</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <Button textColor="primary" size="middle" isLoading={false} ClickHandler={() => {}}>
                            مشاهده سایر موقعیت های شغلی این سازمان
                        </Button>
                    </div>
                </section>
                <section className="mb-6">
                    <h2>مزایا و امکانات رفاهی</h2>
                    <div className="flex flex-wrap py-3">---</div>
                </section>
                <div className="min-h-fit">
                    <h3>در یک نگاه</h3>
                    <div className="text-sm pr-3 flex flex-wrap">
                        <div className="min-w-[50%] pl-5 mt-5">
                            <h5>سال تاسیس</h5>
                            <p className="truncate text-jv-lightGray2x">
                                {new DateObject({
                                    date: new Date(jobCompany?.established_year),
                                    calendar: persian,
                                }).format()}
                            </p>
                        </div>
                        <div className="min-w-[50%] pl-5 mt-5">
                            <h5>اندازه سازمان</h5>
                            <p className="truncate text-jv-lightGray2x">{jobCompany.organization_employ}</p>
                        </div>
                        <div className="min-w-[50%] pl-5 mt-5">
                            <h5>نوع فعالیت</h5>
                            <p className="truncate text-jv-lightGray2x">{jobCompany.type_of_activity}</p>
                        </div>
                        <div className="min-w-[50%] pl-5 mt-5">
                            <h5>صنعت</h5>
                            <p className="truncate text-jv-lightGray2x">{jobCompany.industry}</p>
                        </div>
                    </div>
                </div>
            </>
        );
    } else if (type === "RELATED_ADS") {
        const { boxList } = useBoxList();
        return (
            <>
                <section className="mb-6">
                    {boxList?.map((item, index) => (
                        <div key={index + 1} className="mt-3">
                            <AdvertisingBox
                                type="HideSendCv"
                                data={{ ...item }}
                                clickHandler={() => {}}
                            ></AdvertisingBox>
                        </div>
                    ))}
                </section>
            </>
        );
    } else if (type === "RESUME_RECRRDS") {
        return (
            <>
                <section>
                    <h2>سوابق ارسال رزومه برای این شرکت</h2>
                    <div className="pt-24 text-center">
                        <p className="text-jv-lightGray2x">
                            برای دیدن سوابق ارسال رزومه، لطفا وارد حساب کاربری خود شوید.
                        </p>
                    </div>
                </section>
            </>
        );
    } else {
        return <></>;
    }
};

export default Jobs;
