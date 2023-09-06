import React, { useState } from "react";
import PrimaryLogo from "/Svg/Logo/PrimaryColorLogo.svg";
import WhiteLogo from "/Svg/Logo/WhiteColorLogo.svg";
import MenuIcon from "/Svg/Menu.svg";
import Button from "../Button/Button";
import MegaMenu from "../MegaMenu/MegaMenu";
import { MenusItems } from "../MegaMenu/menuItem.type";
import { AnimatePresence, motion } from "framer-motion";

//? -------------------- Start Mobile Header DropDown Animation --------------------
const containerVariants = {
  hidden: {
    clipPath: "inset(10% 50% 90% 50% round 10px)",
    transition: {
      staggerChildren: 2.5,
    },
  },
  visible: {
    clipPath: "inset(0% 0% 0% 0% round 0px)",
    transition: {
      staggerChildren: 1.4,
      when: "beforeChildren",
    },
  },
  exit: {
    clipPath: "inset(10% 50% 90% 50% round 10px)",
  },
};

const childVariants = {
  hidden: {
    opacity: 0,
    x: "100%",
  },
  visible: {
    x: 0,
    opacity: 1,
  },
};
//? -------------------- Finish Mobile Header DropDown Animation --------------------

const Header: React.FC = () => {
  const [isMenuMobile, setIsMenuMobile] = useState(false);

  const menuMobileFire = () => {
    setIsMenuMobile((prev) => (prev = !prev));
  };

  return (
    <>
      {/*//? -------------------- Start Mobile Header DropDown -------------------- */}
      <AnimatePresence>
        {isMenuMobile ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="header-dropwodn-mobile w-full h-full fixed lg:hidden top-0 right-0 bg-jv-primary z-10 text-right"
          >
            <div className="p-2 sm:px-5 w-full flex flex-row-reverse items-center justify-between">
              <Button
                noBorder
                ClickHandler={menuMobileFire}
                textColor="light"
                isLoading={false}
              >
                <img src={MenuIcon} alt="" />
              </Button>
              <div>
                <img src={WhiteLogo} alt="" />
              </div>
            </div>

            <motion.div className="px-5" variants={childVariants}>
              <MegaMenu type="Mobile" menuData={MenusItems}></MegaMenu>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {/*//? -------------------- Finish Mobile Header DropDown -------------------- */}

      <div className="w-full h-20 relative">
        <header className="fixed w-full px-0 bg-jv-primary lg:bg-jv-light">
          {/*//? -------------------- Start Mobile Header -------------------- */}
          <div className="header-mobile  w-full h-full p-2 lg:hidden flex items-center justify-between">
            <div className="w-5/12 sm:w-4/12 text-center flex items-center sm:text-left">
              <Button
                noBorder
                ClickHandler={() => {}}
                textColor="light"
                size="small"
                ClassName="text-xs px-1 sm:text-base sm:px-3"
                isLoading={false}
              >
                ورود/ثبت نام کارجو
              </Button>
            </div>

            <div className="w-4/12 sm:px-3 flex items-center justify-center">
              <img className="w-7/12 md:w-5/12 " src={WhiteLogo} alt="" />
            </div>

            <div className="w-4/12 sm:px-3 flex items-center justify-end">
              <Button
                noBorder
                ClickHandler={menuMobileFire}
                textColor="light"
                isLoading={false}
              >
                <img src={MenuIcon} alt="" />
              </Button>
            </div>
          </div>
          {/*//? -------------------- Finish Mobile Header -------------------- */}

          {/*//? -------------------- Start Desktop Header -------------------- */}
          <div className="header-desktop w-full h-full py-4 px-24 hidden lg:flex items-center justify-between">
            <div className="header-desktop-left w-5/12 mx-2 flex items-center">
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
            <div className="header-desktop-right w-6/12 mx-2  flex items-center">
              <section className="flex w-full">
                <Button
                  noBorder
                  size="middle"
                  textColor="light"
                  ClassName="!bg-jv-danger mx-2"
                  ClickHandler={() => {}}
                  isLoading={false}
                >
                  گزارش کارنامه بازار
                </Button>
                <div className="w-10/12 bg-red-50 flex items-center">
                  <MegaMenu type="Desktop" menuData={MenusItems}></MegaMenu>
                </div>
              </section>
            </div>
          </div>
          {/*//? -------------------- Finish Desktop Header -------------------- */}
        </header>
      </div>
    </>
  );
};

export default Header;
