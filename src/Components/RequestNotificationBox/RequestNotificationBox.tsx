import React from "react";

import { AiOutlineEye } from "react-icons/ai";
import { CiUser } from "react-icons/ci";

const RequestNotificationBox: React.FC = () => {
    return (
        <div className="p-2 mb-2 rounded-lg bg-jv-lightPrimary flex items-center justify-around">
            <span className="w-2/12 flex items-center justify-start">
                <span className="button-Cms-type cursor-default text-jv-primary border-jv-lightPrimary bg-jv-lightPrimary text-xl rounded-xl shadow-lg">
                    <CiUser />
                </span>
            </span>
            <span className="w-8/12 text-jv-lightGray2x">
                <p className="text-sm truncate">سبحان یعقوبی</p>
                <p className="text-xs truncate">توسعه دهنده فرانت اند</p>
            </span>
            <span className="w-2/12 flex items-center justify-end">
                <span className="button-Cms-type border-jv-lightGray3x bg-jv-lightGray3x text-jv-lightGray2x shadow-lg hover:shadow-none">
                    <AiOutlineEye />
                </span>
            </span>
        </div>
    );
};

export default RequestNotificationBox;
