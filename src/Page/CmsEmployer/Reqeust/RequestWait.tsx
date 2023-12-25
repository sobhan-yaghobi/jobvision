import React from "react";
import RequestBox from "../../../Components/RequestBox/RequestBox";

const RequestWait: React.FC = () => {
    return (
        <>
            <h3>درخواست های در حال انتظار</h3>
            <div className="mt-3">
                {Array(1)
                    .fill("")
                    .map((value, index) => (
                        <RequestBox key={`ReqeustBox-${index}`}></RequestBox>
                    ))}
            </div>
        </>
    );
};

export default RequestWait;
