import React from "react";
import Button from "../Button/Button";
import StarSvg from "/Svg/Star.svg";
import { Link } from "react-router-dom";

interface AdvertisingBoxMainProps {
    data: {
        id: string;
    };
    IsResponsive?: boolean;
    IsImportant?: boolean;
}
type AdvertisingBoxTypesProps = { type: "HideSendCv"; clickHandler: Function } | { type: "ShowSendCv" };

type AdvertisingBoxProps = AdvertisingBoxMainProps & AdvertisingBoxTypesProps;

const AdvertisingBox: React.FC<AdvertisingBoxProps> = (props) => {
    const wrapperBoxClass = `cursor-default w-full h-full max-h-[11.5rem] border-2 border-solid border-jv-lightGray3x rounded-xl py-3 px-3 bg-transparent grid ${
        props.type === "ShowSendCv" ? "grid-rows-3" : "grid-rows-4"
    }`;

    const wrapperContentClass = `text-inherit grid grid-cols-12 ${
        props.type === "ShowSendCv" ? "row-span-2" : "row-span-4"
    }`;

    const BoxContentElm: React.FC = () => {
        return (
            <>
                <div
                    id="LogoCompany"
                    className="col-span-3 sm:col-span-2 h-full flex flex-col items-center justify-start p-1"
                >
                    <img
                        className="px-1 w-auto max-w-full h-auto max-h-20 rounded-lg"
                        src="/images/CompanyLogo.webp"
                        alt=""
                    />
                    <span className="mt-2 text-xs flex justify-center gap-1 items-center">
                        <span id="ScoreSvg" className="w-5">
                            <img className="w-full " src={StarSvg} alt="" />
                        </span>
                        <span id="Score">4.8</span>
                    </span>
                </div>
                <div id="Content" className="text-sm px-1 col-span-9 sm:col-span-10 overflow-hidden">
                    <p id="AdvertisingTitle" className="danaBold truncate">
                        برنامه نویسی php
                    </p>
                    <p id="AdvertisingDesc" className="my-1 truncate">
                        کانون تبلیغاتی ایران نوین
                    </p>
                    <div className={`text-jv-lightGray2x mb-3 truncate flex`}>
                        <span id="CompanyLocation" className="text-sm">
                            تهران ، پاک وی
                        </span>
                        <span className="inline-block mx-2 w-[2px] h-4 bg-jv-lightGray3x"></span>
                        <span id="SalaryOffer">20 - 15 میلیون تومان</span>
                    </div>
                    <div className="text-xs text-jv-lightGray2x mb-2 flex items-center">
                        <div>امکان دور کاری</div>
                        <div className="w-1 h-1 rounded-full bg-jv-li2xtext-lightGray2x mx-2"></div>
                        <div>امکان جذب کارآموز</div>
                    </div>
                    {props.type === "ShowSendCv" ? null : (
                        <div className="text-xs text-jv-lightGray2x ">26 روز پیش</div>
                    )}
                </div>
            </>
        );
    };

    if (props.type === "ShowSendCv") {
        return (
            <>
                <div id="Box" className={wrapperBoxClass}>
                    <Link to="/jobs" className={wrapperContentClass}>
                        <BoxContentElm />
                    </Link>

                    <div className="row-span-1 border-t-[1px] border-solid border-jv-lightGray3x pt-2 text-xs flex items-center justify-between">
                        <div className="flex items-center">
                            {props.IsImportant ? (
                                <>
                                    <div className="text-jv-danger text-xs bg-jv-lightDanger py-1 px-2 rounded-xl">
                                        فوری
                                    </div>
                                    <span className="w-5 h-[2px] bg-jv-primary -rotate-[75deg] rounded-xl"></span>
                                </>
                            ) : null}
                            <div id="PublishTime">دیروز</div>
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
                <div onClick={() => props.clickHandler(props.data.id)} id="Box" className={wrapperBoxClass}>
                    <div className="w-full flex items-center whitespace-nowrap overflow-x-auto no-scrollbar">
                        <span className="ml-1 text-jv-danger text-xs px-2 py-1 rounded-xl bg-jv-lightDanger inline-block">
                            فوری
                        </span>
                        <span className="ml-1 text-jv-primary text-xs px-2 py-1 rounded-xl bg-jv-lightPrimary inline-block">
                            کارفرمای پاسخگو
                        </span>
                        <span className="ml-1 text-jv-primary text-xs px-2 py-1 rounded-xl bg-jv-lightPrimary inline-block">
                            در حال بررسی روزمه
                        </span>
                    </div>
                    <div className={wrapperContentClass}>
                        <BoxContentElm />
                    </div>
                </div>
            </>
        );
    }
};

export default AdvertisingBox;
