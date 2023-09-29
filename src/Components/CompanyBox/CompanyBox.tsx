import React from "react";
// Icons
import StarSvg from "/Svg/Star.svg";
import Button from "../Button/Button";

const CompanyBox: React.FC = () => {
    return (
        <div className="w-full h-full border-2 border-solid border-jv-lightGray3x rounded-xl p-3 flex flex-col justify-between">
            <div className="max-h-10 h-1/4 overflow-hidden">
                <img className="h-full" src="/images/Irancell_logo.webp" alt="" />
            </div>
            <div className="h-3/4 flex flex-col justify-end">
                <p className="danaBold truncate">MTN Irancell</p>
                <span className="my-1 flex items-center">
                    <img src={StarSvg} alt="" />
                    <span className="px-1">4.5</span>
                </span>
                <div className="flex items-center my-3 cursor-pointer hover:text-jv-primary group">
                    <span>23</span>
                    <span className="inline-block mx-1">آگهی شغل فعال</span>
                    <svg
                        className="group-hover:-translate-x-1 group-hover:fill-jv-primary"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M22 12.7499C22.4142 12.7499 22.75 12.4141 22.75 11.9999C22.75 11.5857 22.4142 11.2499 22 11.2499V12.7499ZM11 11.2499C10.5858 11.2499 10.25 11.5857 10.25 11.9999C10.25 12.4141 10.5858 12.7499 11 12.7499V11.2499ZM11 14.8646H10.25H11ZM7.78004 16.4494L8.23753 15.8551L7.78004 16.4494ZM7.78004 7.55046L8.23754 8.14477L7.78004 7.55046ZM11 9.13528H11.75H11ZM4.05876 10.4151L4.51625 11.0094L4.05876 10.4151ZM4.05876 13.5847L3.60126 14.179L4.05876 13.5847ZM22 11.2499L11 11.2499V12.7499L22 12.7499V11.2499ZM4.51625 11.0094L8.23754 8.14477L7.32254 6.95616L3.60126 9.8208L4.51625 11.0094ZM10.25 9.13528L10.25 14.8646H11.75V9.13528H10.25ZM8.23753 15.8551L4.51625 12.9904L3.60126 14.179L7.32254 17.0437L8.23753 15.8551ZM10.25 14.8646C10.25 15.9019 9.0595 16.4878 8.23753 15.8551L7.32254 17.0437C9.13086 18.4357 11.75 17.1466 11.75 14.8646H10.25ZM8.23754 8.14477C9.0595 7.51202 10.25 8.09798 10.25 9.13528H11.75C11.75 6.85322 9.13086 5.56412 7.32254 6.95616L8.23754 8.14477ZM3.60126 9.8208C2.17124 10.9216 2.17124 13.0782 3.60126 14.179L4.51625 12.9904C3.86625 12.49 3.86625 11.5098 4.51625 11.0094L3.60126 9.8208Z" />
                    </svg>
                </div>
                <Button textColor="primary" size="middle" isLoading={false} ClickHandler={() => {}}>
                    دنبال کنید
                </Button>
            </div>
        </div>
    );
};

export default CompanyBox;
