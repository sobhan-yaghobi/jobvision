import React from "react";
// Types
import { AdvertisingBoxProps } from "./AdvertisingBox.type";

// Functions
import { TimeType, getTime } from "../../Utils/Utils";
import { includes } from "lodash";

// Components
import { Link } from "react-router-dom";
import { TimeGenerator } from "../../Utils/UtilsComponent";

// Icons
import Button from "../Button/Button";
import StarSvg from "/Svg/Star.svg";
import { CiMenuKebab } from "react-icons/ci";

const AdvertisingBox: React.FC<AdvertisingBoxProps> = (props) => {
    const jobData = props.data;
    const jobInfo = jobData.jobInfo;
    const jobCompany = jobData.company;
    const jobStatus = jobData.status;
    const AdvertisingPublisTime: TimeType = getTime(jobData.CreateAt);
    const className = {
        wrapperBoxClass: `cursor-pointer w-full h-full max-h-[13rem] border-2 border-solid rounded-xl py-3 px-3 bg-transparent grid ${
            props.isActive ? "border-jv-primary" : "border-jv-lightGray3x"
        } ${props.type === "ShowSendCv" ? "grid-rows-3" : "grid-rows-4"}`,
        wrapperContentClass: `text-inherit grid grid-cols-12 ${
            props.type === "ShowSendCv" ? "row-span-2" : "row-span-4"
        }`,
    };

    const BoxContentElm: React.FC = () => {
        return (
            <>
                <div
                    id="LogoCompany"
                    className="col-span-3 sm:col-span-2 h-full flex flex-col items-center justify-start p-1"
                >
                    <img className="px-1 w-auto max-w-full h-auto max-h-20 rounded-lg" src={jobCompany.logo} alt="" />
                    {typeof jobCompany.score !== "undefined" ? (
                        <span className="mt-2 text-xs flex justify-center gap-1 items-center">
                            <span id="ScoreSvg" className="w-5">
                                <img className="w-full " src={StarSvg} alt="" />
                            </span>
                            <span id="Score">{jobCompany.score.companyScore}</span>
                        </span>
                    ) : null}
                </div>
                <div id="Content" className="text-sm px-1 col-span-9 sm:col-span-10 overflow-hidden">
                    <p id="AdvertisingTitle" className="danaBold truncate">
                        {jobData.title}
                    </p>
                    <p id="AdvertisingDesc" className="my-1 truncate">
                        {jobCompany.name}
                    </p>
                    <div className={`text-jv-lightGray2x truncate flex`}>
                        <span id="CompanyLocation" className="text-sm">
                            {jobCompany.location}
                        </span>
                        {jobInfo.rightsPrice !== "NOT_SET_PRICE" ? (
                            <>
                                <span className="inline-block mx-2 w-[2px] h-4 bg-jv-lightGray3x"></span>
                                <span id="SalaryOffer">
                                    {Array.isArray(jobInfo.rightsPrice)
                                        ? `${jobInfo.rightsPrice[0]} - ${jobInfo.rightsPrice[1]}`
                                        : jobInfo.rightsPrice}
                                    <span className="mr-1">میلیون تومان</span>
                                </span>
                            </>
                        ) : null}
                    </div>
                    <div className="flex items-center mb-3 flex-nowrap">
                        {jobStatus.acceptTelecommuting ? (
                            <div className="box-info-type text-jv-lightGray2x truncate">امکان دورکاری</div>
                        ) : null}
                        {jobStatus.acceptTrainees ? (
                            <div className="box-info-type text-jv-lightGray2x truncate">امکان جذب کارآموز</div>
                        ) : null}
                    </div>
                    {props.type === "ShowSendCv" ? null : (
                        <div className="text-xs text-jv-lightGray2x ">
                            <TimeGenerator dateInfo={AdvertisingPublisTime}></TimeGenerator>
                        </div>
                    )}
                </div>
            </>
        );
    };

    if (props.type === "ShowSendCv") {
        return (
            <>
                <div id="Box" className={className.wrapperBoxClass}>
                    <Link to="/jobs" className={className.wrapperContentClass}>
                        <BoxContentElm />
                    </Link>

                    <div className="row-span-1 border-t-[1px] border-solid border-jv-lightGray3x pt-2 text-xs flex items-center justify-between">
                        <div className="flex items-center">
                            {jobStatus.isImportant ? (
                                <>
                                    <div className="text-jv-danger text-xs bg-jv-lightDanger py-1 px-2 rounded-xl">
                                        فوری
                                    </div>
                                    <span className="w-5 h-[2px] bg-jv-primary -rotate-[75deg] rounded-xl"></span>
                                </>
                            ) : null}
                            <div className="text-xs text-jv-lightGray2x" id="PublishTime">
                                <TimeGenerator dateInfo={AdvertisingPublisTime}></TimeGenerator>
                            </div>
                        </div>
                        <Button
                            textColor="primary"
                            size="small"
                            ClassName="!py-0 h-full"
                            isLoading={false}
                            ClickHandler={() => {}}
                        >
                            ارسال رزومه
                        </Button>
                    </div>
                </div>
            </>
        );
    } else if (props.type === "HideSendCv") {
        return (
            <>
                <div onClick={() => props.clickHandler(props.data.id)} id="Box" className={className.wrapperBoxClass}>
                    {includes(jobStatus, true) ? (
                        <div className="w-full flex items-center whitespace-nowrap overflow-x-auto no-scrollbar">
                            {jobStatus.isImportant ? (
                                <span className="ml-1 text-jv-danger text-xs px-2 py-1 rounded-xl bg-jv-lightDanger inline-block">
                                    فوری
                                </span>
                            ) : null}
                            {jobStatus.cvPending ? (
                                <span className="ml-1 text-jv-primary text-xs px-2 py-1 rounded-xl bg-jv-lightPrimary inline-block">
                                    در حال بررسی روزمه
                                </span>
                            ) : null}
                            {jobStatus.responsibleEmployer ? (
                                <span className="ml-1 text-jv-primary text-xs px-2 py-1 rounded-xl bg-jv-lightPrimary inline-block">
                                    کارفرمای پاسخگو
                                </span>
                            ) : null}
                        </div>
                    ) : null}

                    <div className={className.wrapperContentClass}>
                        <BoxContentElm />
                    </div>
                </div>
            </>
        );
    }
};

export const AdvertsingCmsBox: React.FC = () => {
    return (
        <div className={`mb-2 bg-jv-white py-5 px-3 rounded-lg`}>
            <div className="flex justify-between">
                <section className="h-full">
                    <p className="text-base text-jv-lightGray">Front End Developer (React.js)</p>
                    <div className="text-xs flex flex-nowrap overflow-x-hidden">
                        <div className="box-info-type">امکان جذب کارآموز</div>
                        <div className="box-info-type">امکان دورکاری</div>
                    </div>
                    <p className="truncate text-xs my-2">8 - 6 میلیون تومان</p>
                    <div className="truncate text-xs">6 اسفند 1400 - 7 اسفند 1400</div>
                </section>
                <section className="h-full flex items-start">
                    <p className="box-info-type m-0">4 روز پیش</p>
                    <div className="mt-1 mr-2 flex items-center justify-center cursor-pointer">
                        <CiMenuKebab />
                    </div>
                </section>
            </div>
            <div className="mt-4 text-xs grid grid-cols-2 grid-rows-2">
                <div>
                    <span className="font-semibold text-jv-gray">شرح شغل و وظایف</span>
                    <p className="w-10/12">
                        پروژه برنامه نویسی اختصاصی وب اپلیکیشن برای برند بسیار معروف می باشد. نیاز به فرانت کار ماهر جهت
                        ادامه ی پروژه. تسویه 15 روزه
                    </p>
                </div>
                <div>
                    <span className="font-semibold text-jv-gray">نوع همکاری</span>
                    <p>قراردادی / پروژه ای</p>
                </div>
                <div className="col-span-2">
                    <span className="font-semibold text-jv-gray">شاخص های کلیدی</span>
                    <div className="flex flex-wrap">
                        <div className="box-info-type">2 سال سابقه کار در گروه شغلی مشابه</div>
                        <div className="box-info-type">React - پیشرفته</div>
                        <div className="box-info-type">ترجیحا ساکن اصفهان</div>
                        <div className="box-info-type">شاخص های کلیدی 1</div>
                        <div className="box-info-type">شاخص های کلیدی 2</div>
                        <div className="box-info-type">شاخص های کلیدی 3</div>
                        <div className="box-info-type">شاخص های کلیدی 4</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvertisingBox;
