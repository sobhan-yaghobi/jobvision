import React from "react";
import Button from "../Button/Button";

import { CiUser } from "react-icons/ci";
import { BiComment } from "react-icons/bi";

export type ReqeustBoxProps = {
    status?: "waiting" | "reject" | "accept";
};

const RequestBox: React.FC<ReqeustBoxProps> = ({ status }) => {
    return (
        <div
            className={`mb-2 h-36 bg-jv-white py-4 px-3 rounded-lg border-solid border-[1px] ${
                status === "waiting"
                    ? "border-jv-warning"
                    : status === "reject"
                    ? "border-jv-danger"
                    : status === "accept"
                    ? "border-jv-success"
                    : "border-transparent"
            }`}
        >
            <div className="h-1/3 flex justify-between">
                <section className="h-full flex">
                    <span className="ml-2 text-2xl text-jv-lightGray w-10 h-10 border-2 border-solid border-jv-lightGray rounded-full flex items-center justify-center">
                        <CiUser />
                    </span>
                    <span>
                        <p className="text-base text-jv-lightGray">سبحان یعقوبی</p>
                        <p className="text-xs">توسعه دهنده فرانت اند</p>
                    </span>
                </section>
                <section className="h-full">
                    <p className="box-info-type m-0">4 روز پیش</p>
                </section>
            </div>
            <div className="h-2/3 mt-2 text-xs flex flex-col">
                <p className="text-base pb-2 text-jv-lightGray w-full truncate" title="متن کامل">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                </p>
                <div className="h-full flex items-end justify-between">
                    <span>6 اسفند 1400 - 7 اسفند 1400</span>
                    <div className="flex items-center">
                        <Button
                            isLoading={false}
                            ClickHandler={() => {}}
                            textColor="primary"
                            size="small"
                            ClassName="!py-2 mx-1 bg-jv-lightPrimary !border-transparent"
                        >
                            <BiComment className="text-base" />
                        </Button>
                        <Button
                            isLoading={false}
                            ClickHandler={() => {}}
                            textColor="primary"
                            size="small"
                            ClassName="!py-2 mx-1 bg-jv-lightPrimary !border-transparent"
                        >
                            قبول
                        </Button>
                        <Button
                            isLoading={false}
                            ClickHandler={() => {}}
                            textColor="primary"
                            size="small"
                            ClassName="!py-2 mx-1 !bg-jv-lightDanger !text-jv-danger !border-jv-lightDanger"
                        >
                            رد
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestBox;
