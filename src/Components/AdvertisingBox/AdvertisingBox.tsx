import React from "react";
import Button from "../Button/Button";
import StarSvg from "/Svg/Star.svg";
import { Link } from "react-router-dom";

interface AdvertisingBoxProps {
    data: [];
    IsResponsive?: boolean;
    IsImportant?: boolean;
}

const AdvertisingBox: React.FC<AdvertisingBoxProps> = ({ data, IsResponsive, IsImportant }) => {
    IsResponsive;

    return (
        <div
            id="Box"
            className={`cursor-default w-full h-full min-h-[10rem] border-2 border-solid border-[#dde1e6] rounded-xl py-2 px-3 bg-transparent flex flex-col justify-between`}
        >
            <Link to={`/jobs`} id="ContentBox" className="text-inherit flex h-4/6">
                <div id="LogoCompany" className="w-2/12 h-full flex flex-col items-center justify-between p-1">
                    <div className="w-full h-full">
                        <img className="h-1/2 rounded-lg" src="/images/CompanyLogo.webp" alt="" />
                        <span className="flex justify-start gap-1 items-center text-xs">
                            <span id="ScoreSvg" className="w-5">
                                <img className="w-full " src={StarSvg} alt="" />
                            </span>
                            <span id="Score">4.8</span>
                        </span>
                    </div>
                </div>
                <div id="Content" className="w-10/12 px-1 ">
                    <p id="AdvertisingTitle" className="danaBold truncate">
                        برنامه نویسی php
                    </p>
                    <p id="AdvertisingDesc" className="text-sm my-1 truncate">
                        کانون تبلیغاتی ایران نوین
                    </p>
                    <div className="text-xs my-1 truncate">
                        <span id="CompanyLocation" className="mx-1">
                            تهران ، پاک وی
                        </span>
                        <span id="SalaryOffer" className="mx-1">
                            20 - 15 میلیون تومان
                        </span>
                    </div>
                </div>
            </Link>
            <div className="h-2/6 border-t-[1px] border-solid border-[#dde1e6] pt-2 text-xs flex items-center justify-between">
                <div className="flex items-center">
                    {IsImportant ? (
                        <>
                            <div className="text-jv-light text-xs bg-jv-danger py-1 px-2 rounded-xl"> فوری </div>
                            <span className="w-5 h-1 bg-jv-primary -rotate-[75deg] rounded-xl"></span>
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
    );
};

export default AdvertisingBox;
