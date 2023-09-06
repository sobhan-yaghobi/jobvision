import React, { useMemo, useState } from "react";
import PrimaryLogo from "/Svg/Logo/PrimaryColorLogo.svg";
import WhiteLogo from "/Svg/Logo/WhiteColorLogo.svg";
import MenuIcon from "/Svg/Menu.svg";
import Button from "../Button/Button";

const Header: React.FC = () => {
  return (
    <div className="w-full fixed top-0 right-0">
      <header className="w-full px-0 bg-jv-primary lg:bg-jv-light">
        <div className="header-mobile  w-full h-full p-2 lg:hidden flex items-center justify-between">
          <div className="w-4/12 text-center flex items-center sm:text-left">
            <Button
              ClickHandler={() => {}}
              textColor="primary"
              size="small"
              ClassName="!text-xs text-jv-white !bg-transparent !border-none md:text-left hover:!text-jv-white"
              isLoading={false}
            >
              ورود/ثبت نام کارجو
            </Button>
          </div>

          <div className="w-4/12 px-3 flex items-center justify-center">
            <img src={WhiteLogo} alt="" />
          </div>

          <div className="w-4/12 px-3 flex items-center justify-end">
            <Button
              ClickHandler={() => {}}
              textColor="primary"
              ClassName="!bg-transparent"
              isLoading={false}
            >
              <img src={MenuIcon} alt="" />
            </Button>
          </div>
        </div>
        <div className="header-desktop w-full h-full p-4 hidden lg:flex items-center justify-between">
          <div className="w-5/12 mx-2 flex items-center">
            <img src={PrimaryLogo} alt="" />
            <div className="mx-5 flex">
              <Button
                ClickHandler={() => {}}
                textColor="primary"
                size="middle"
                ClassName="!bg-transparent !border-none"
                isLoading={false}
              >
                بخش کارفرمایان
              </Button>
              <Button
                ClickHandler={() => {
                  console.log("click");
                }}
                textColor="light"
                size="middle"
                isLoading={false}
              >
                ورود/ثبت نام کارجو
              </Button>
            </div>
          </div>
          <div className="w-7/12 mx-2 flex items-center">
            <section></section>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
