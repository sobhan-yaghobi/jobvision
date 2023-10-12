import React, { useState } from "react";

import uuidGenerator from "../../Utils/UuidGenerator";
import Button from "../../Components/Button/Button";

import { AiOutlineMenuUnfold } from "react-icons/ai";
import { IconType } from "react-icons";
import { BsFillCaretDownFill } from "react-icons/bs";
import { GoHomeFill } from "react-icons/go";
import { CgFileDocument } from "react-icons/cg";
import { MdOutlineInsertChartOutlined } from "react-icons/md";

interface TypeMenuList {
    id: string;
    title: string;
    icon: IconType;
    subMenu: { id: string; title: string }[];
}

const MenuListArray: TypeMenuList[] = [
    { id: uuidGenerator(), title: "گزینه 1", icon: GoHomeFill, subMenu: [] },
    { id: uuidGenerator(), title: "گزینه 2", icon: CgFileDocument, subMenu: [] },
    {
        id: uuidGenerator(),
        title: "گزینه 3",
        icon: MdOutlineInsertChartOutlined,
        subMenu: [
            { id: uuidGenerator(), title: "گزینه 1 of 3" },
            { id: uuidGenerator(), title: "گزینه 2 of 3" },
            { id: uuidGenerator(), title: "گزینه 3 of 3" },
            { id: uuidGenerator(), title: "گزینه 4 of 3" },
        ],
    },
];

type TypeItemMenu = { id: string; isArrow: boolean; title: string; Icon: IconType };

const CmsEmployer: React.FC = () => {
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
    const [mainItem, setMainItem] = useState<TypeMenuList>({} as TypeMenuList);
    const ItemMenu: React.FC<TypeItemMenu> = ({ id, isArrow, title, Icon }) => {
        const isActive = typeof mainItem !== "undefined" && Boolean(id === mainItem.id);
        return (
            <>
                {isArrow ? (
                    <div className="flex items-center justify-between">
                        <Icon />
                        <span>{title}</span>
                        <BsFillCaretDownFill />
                    </div>
                ) : (
                    <></>
                )}
            </>
        );
    };
    return (
        <>
            <div className="w-full h-screen flex justify-between p-4">
                <div className={`h-full rounded-lg ml-4 bg-jv-lightPrimary ${isMenuCollapsed ? "w-1/12" : "w-2/12"}`}>
                    <Button
                        textColor="primary"
                        ClickHandler={() => setIsMenuCollapsed((prev) => !prev)}
                        isLoading={false}
                        IconType="JSX_ICON"
                        Icon={
                            <AiOutlineMenuUnfold
                                className={`text-base ${isMenuCollapsed ? "rotate-180" : "rotate-0"}`}
                            />
                        }
                        size="small"
                        ClassName={`w-full !px-0`}
                    ></Button>
                    <ul className="mt-3 p-1">
                        {MenuListArray.map((item) => (
                            <li
                                className={`cursor-pointer rounded-lg text-sm text-jv-white p-3 mb-1 bg-jv-primary flex items-center`}
                            >
                                {item.subMenu.length ? (
                                    <div className="w-full">
                                        <span className="flex items-center justify-between">
                                            <span className="flex items-center">
                                                <item.icon className="ml-3" />
                                                {item.title}
                                            </span>
                                            <BsFillCaretDownFill />
                                        </span>
                                        <ul></ul>
                                    </div>
                                ) : (
                                    <>
                                        <item.icon />
                                        <span className="">{item.title}</span>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={`h-full rounded-lg bg-jv-light ${isMenuCollapsed ? "w-11/12" : "w-10/12"}`}></div>
            </div>
        </>
    );
};

export default CmsEmployer;
