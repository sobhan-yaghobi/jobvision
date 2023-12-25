import React from "react";
import { AdvertsingCmsBox } from "../../../Components/AdvertisingBox/AdvertisingBox";

const MainAdvertising: React.FC = () => {
    return (
        <>
            <h3>تمامی آگهی ها شما</h3>
            <div className="mt-3">
                <AdvertsingCmsBox></AdvertsingCmsBox>
            </div>
        </>
    );
};

export default MainAdvertising;
