import React from "react";
import RequestBox from "../../../Components/RequestBox/RequestBox";
import { ConfigProvider, Progress } from "antd";
import { Link } from "react-router-dom";

export type ProgressBarCardType = {
    percent: number;
    userCount: number;
    title: string;
    userCountRecommend: number;
};
export const ProgressCardArray: ProgressBarCardType[] = [
    { percent: 75, userCount: 3, title: "سازنده محتوا", userCountRecommend: 1 },
    { percent: 0, userCount: 1, title: "طراح ارشد رابط کاربری", userCountRecommend: 4 },
    { percent: 25, userCount: 9, title: "برنامه نویس node js", userCountRecommend: 20 },
    { percent: 45, userCount: 2, title: "مدیر بازاریابی", userCountRecommend: 2 },
];

const MainHome: React.FC = () => {
    const progressColorGenerator = (precent: number): string => {
        return `${
            precent >= 60 && precent <= 100
                ? "#5660f2"
                : precent >= 40 && precent < 60
                ? "#e1bc29"
                : precent >= 1 && precent < 40
                ? "#fa5555"
                : "#8e9cb2"
        }`;
    };
    return (
        <>
            <section className="w-full group mt-8 md:py-2 pt-4 md:pt-0 px-4 h-fit md:h-36 rounded-lg bg-jv-primary relative flex flex-col-reverse">
                <div className="md:absolute flex flex-row-reverse w-full md:w-5/12 bottom-0 left-4 overflow-hidden group">
                    <img
                        className="w-full md:w-10/12 md:group-hover:w-full duration-700 ease-in-out"
                        src="/images/cmsHome.webp"
                        alt=""
                    />
                </div>
                <div className="w-full md:w-6/12 h-full pb-4 md:pb-0 text-jv-light flex flex-col justify-evenly">
                    <h4>سلامم کارفرمای عزیز</h4>
                    <p className="text-xs">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
                        چاپگرها و متون بلکه روزنامه استفاده قرار گیرد.
                    </p>
                    <Link
                        to="#"
                        className="decoration-jv-light underline-offset-2 w-fit text-jv-light hover:opacity-50 text-sm"
                    >
                        اطلاعات بیشتر...
                    </Link>
                </div>
            </section>
            <section className="my-6">
                <div className="flex items-center justify-between">
                    <h3 className="cursor-default">شما باید استخدام کنید</h3>
                    <Link
                        to="#"
                        className=" decoration-jv-lightGray2x text-jv-lightGray2x underline-offset-2 w-fit hover:opacity-80 text-sm"
                    >
                        مشاهده همه
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2">
                    {ProgressCardArray.map((item, index) => (
                        <div
                            key={`jobs-hire-box-${index}`}
                            className="bg-jv-lightPrimary py-2 px-5 md:m-2 my-2 rounded-lg flex items justify-between"
                        >
                            <div className="flex items-center">
                                <h1 className="ml-5 text-3xl text-jv-lightGray">{item.userCount}</h1>
                                <section className="leading-tight">
                                    <p className="text-jv-lightGray font-semibold">{item.title}</p>
                                    <span className="text-xs">({item.userCountRecommend} نفر دیگر توصیه میشود)</span>
                                </section>
                            </div>
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Progress: {
                                            colorText: progressColorGenerator(item.percent),
                                        },
                                    },
                                }}
                            >
                                <Progress
                                    type="dashboard"
                                    status="normal"
                                    percent={item.percent}
                                    strokeLinecap="round"
                                    strokeColor={progressColorGenerator(item.percent)}
                                    size="small"
                                />
                            </ConfigProvider>
                        </div>
                    ))}
                </div>
            </section>
            <section>
                <h3>آخرین رزومه های فرستاده شده</h3>
                <div className="my-2 px-2">
                    {Array(3)
                        .fill("")
                        .map((value, index) => (
                            <RequestBox key={`ReqeustBox-${index + 1}`}></RequestBox>
                        ))}
                </div>
            </section>
        </>
    );
};

export default MainHome;
