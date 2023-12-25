import React from "react";
import RequestBox from "../../../Components/RequestBox/RequestBox";

const ReqeustAll: React.FC = () => {
    return (
        <>
            <div className="flex items-start justify-between">
                <h3>تمامی درخواست ها</h3>
                <ul>
                    <li className="flex items-center justify-between">
                        <span className="text-xs">قبول شده</span>
                        <div className="mr-3 w-3 h-3 rounded-full bg-jv-success"></div>
                    </li>
                    <li className="flex items-center justify-between">
                        <span className="text-xs">در حال انتظار</span>
                        <div className="mr-3 w-3 h-3 rounded-full bg-jv-warning"></div>
                    </li>
                    <li className="flex items-center justify-between">
                        <span className="text-xs">رد شده</span>
                        <div className="mr-3 w-3 h-3 rounded-full bg-jv-danger"></div>
                    </li>
                </ul>
            </div>
            <div className="mt-3">
                {Array(10)
                    .fill("")
                    .map((value, index) => (
                        <RequestBox
                            key={`ReqeustBox-${index}`}
                            status={index === 2 || index === 5 ? "reject" : index === 7 ? "waiting" : "accept"}
                        ></RequestBox>
                    ))}
            </div>
        </>
    );
};

export default ReqeustAll;
