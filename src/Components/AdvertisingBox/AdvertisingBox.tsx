import React from "react";
import Button from "../Button/Button";

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
            <div id="ContentBox" className="flex h-4/6">
                <div id="LogoCompany" className="w-2/12 h-full flex flex-col items-center justify-between p-1">
                    <div className="w-full h-full">
                        <img className="h-1/2 rounded-lg" src="/images/CompanyLogo.png" alt="" />
                        <span className="flex justify-start gap-1 items-center text-xs">
                            <span id="ScoreSvg" className="w-5">
                                <svg className="w-full fill-yellow-400" viewBox="0 0 24 24" fill="none">
                                    <path
                                        className="stroke-jv-black"
                                        d="M13.9999 7.88603C14.3226 8.83867 15.2481 9.48366 16.2924 9.48366M5.09779 7.01471C6.66983 7.01471 8.06308 6.00245 8.54887 4.50736C9.63512 1.16422 14.3648 1.16422 15.451 4.50736C15.9368 6.00245 17.3301 7.01471 18.9021 7.01471C22.4173 7.01471 23.8788 11.5129 21.035 13.579C19.7632 14.5031 19.231 16.1409 19.7168 17.636C20.803 20.9792 16.9767 23.7592 14.1328 21.693C12.861 20.769 11.1389 20.769 9.86706 21.693C7.02322 23.7592 3.19685 20.9792 4.2831 17.636C4.76889 16.1409 4.23671 14.5031 2.96491 13.579C0.121064 11.5129 1.58261 7.01471 5.09779 7.01471Z"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                </svg>
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
            </div>
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
