import React, { useState, useEffect } from "react";

// Types
import { CmsMenuItem, LiteralsMainPage } from "./CmsEmployer.type";

import { Menu } from "antd";
import { motion, AnimatePresence } from "framer-motion";

import { GoHomeFill } from "react-icons/go";
import { CgFileDocument } from "react-icons/cg";
import { BiGitPullRequest } from "react-icons/bi";
import { BsCheckAll } from "react-icons/bs";
import { RxLapTimer } from "react-icons/rx";
import { TbGitPullRequestClosed } from "react-icons/tb";
import { RiGitPullRequestFill } from "react-icons/ri";

const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: CmsMenuItem[],
    type?: "group"
): CmsMenuItem => {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as CmsMenuItem;
};

const items: CmsMenuItem[] = [
    getItem("خانه", LiteralsMainPage.Home, <GoHomeFill />),
    getItem("آگهی ها", LiteralsMainPage.Advertsisings, <CgFileDocument />),
    getItem("درخواست ها", "sub1", <BiGitPullRequest />, [
        getItem("قبول شده", LiteralsMainPage.RqAccept, <BsCheckAll style={{ color: "var(--successColor)" }} />),
        getItem(
            "رد شده",
            LiteralsMainPage.RqRejection,
            <TbGitPullRequestClosed style={{ color: "var(--dangerColor)" }} />
        ),
        getItem("در حال انتظار", LiteralsMainPage.RqWaiting, <RxLapTimer style={{ color: "var(--warningColor)" }} />),
        getItem("تمامی درخواست ها", LiteralsMainPage.RqAll, <RiGitPullRequestFill />),
    ]),
];

const CmsEmployer: React.FC = () => {
    const [MainPage, setMainPage] = useState<{ mainKey: React.Key }>({ mainKey: LiteralsMainPage.Home });

    return (
        <>
            <div className="w-full h-screen flex justify-between p-4 relative">
                <Menu
                    className="w-2/12 p-1 ml-4 rounded-lg"
                    defaultSelectedKeys={[LiteralsMainPage.Home]}
                    defaultOpenKeys={["sub1"]}
                    mode="inline"
                    items={items}
                    onSelect={(props) => setMainPage({ mainKey: props.key })}
                />
                <AnimatePresence>
                    <motion.div className={`w-10/12 h-full rounded-lg bg-jv-light`}>
                        <CmsPageGenerator type={MainPage.mainKey as LiteralsMainPage.AllPage}></CmsPageGenerator>
                    </motion.div>
                </AnimatePresence>
            </div>
        </>
    );
};

export default CmsEmployer;

type CmsPageGeneratorProps = {
    type: LiteralsMainPage.AllPage;
};

const CmsPageGenerator: React.FC<CmsPageGeneratorProps> = ({ type }) => {
    console.log("CmsPageGenerator", type);

    return <></>;
};
