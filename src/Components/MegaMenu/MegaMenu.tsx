import React from "react";
import { MenuItemType } from "./menuItem.type";

type MegaMenuProps = {
  type: "Mobile" | "Desktop";
  menuData: MenuItemType[];
};

type DropDownGeneratorProps = {
  menuData: MenuItemType[];
};

const MegaMenu: React.FC<MegaMenuProps> = ({ menuData, type }) => {
  if (type === "Desktop") {
    return (
      <>
        <ul className="w-full flex flex-row-reverse justify-around relative z-40">
          {menuData.map((menuItem) => {
            return (
              <li
                className="cursor-pointer whitespace-nowrap text-sm relative hover:text-jv-primary group"
                key={menuItem.id}
              >
                {menuItem.title}

                {typeof menuItem.subMenu !== "undefined" ? (
                  <DropDownGenerator
                    menuData={menuItem.subMenu}
                  ></DropDownGenerator>
                ) : null}
              </li>
            );
          })}
        </ul>
      </>
    );
  } else {
    return (
      <>
        <div>ddddddddd</div>
      </>
    );
  }
};

export default MegaMenu;

const DropDownGenerator: React.FC<DropDownGeneratorProps> = ({ menuData }) => {
  return (
    <>
      <ul className="hidden absolute group-hover:flex flex-col -bottom-16 origin-bottom">
        {menuData.map((menuItem) => {
          return (
            <li className="ml-10" key={menuItem.id}>
              {menuItem.title}

              {typeof menuItem.subMenu !== "undefined" ? (
                <DropDownGenerator
                  menuData={menuItem.subMenu}
                ></DropDownGenerator>
              ) : null}
            </li>
          );
        })}
      </ul>
    </>
  );
};
