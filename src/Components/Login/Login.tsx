import React, { useState } from "react";

// Components
import Input from "../Input/Input";
import Button from "../Button/Button";

// Icons
import Logo from "/Svg/Logo/PrimaryLogoNoShape.svg";
import { FcGoogle } from "react-icons/fc";
import { LuLinkedin } from "react-icons/lu";

const Login: React.FC = () => {
    return (
        <div className="h-full py-5 flex flex-col items-center">
            <div className="h-6">
                <img className="h-full" src={Logo} alt="" />
            </div>
            <div className="mt-6 text-xl flex">
                <div style={{ wordSpacing: -3 }} className="ml-2 font-semibold">
                    ورود | ثبت نام
                </div>
                <div>کارجو</div>
            </div>
            <form className="mt-6 w-full flex flex-col items-center">
                <Input Placeholder="ایمیل یا  شماره تلفن" ClassName="mb-3"></Input>
                <Input Placeholder="رمر عبور" ClassName="mb-3"></Input>
                <Button
                    size="middle"
                    textColor="light"
                    ClickHandler={() => {
                        console.log("Click");
                    }}
                    isLoading={false}
                    ClassName="w-full"
                >
                    ادامه
                </Button>
            </form>
            <div className="my-6 w-full h-[1px] bg-jv-lightGray3x flex items-center justify-center relative">
                <p className="font-bold bg-jv-white px-4">یا</p>
            </div>
            <div className="w-full">
                <Button
                    size="middle"
                    textColor="primary"
                    ClickHandler={() => {}}
                    isLoading={false}
                    IconType="REACT_ICON"
                    Icon={FcGoogle}
                    ClassName="w-full !border-jv-lightGray2x !text-jv-lightGray2x"
                >
                    ادامه با گوگل
                </Button>
                <Button
                    size="middle"
                    textColor="primary"
                    ClickHandler={() => {}}
                    isLoading={false}
                    IconType="JSX_ICON"
                    Icon={<LuLinkedin className="text-[#007AB1]" />}
                    ClassName="w-full mt-3 mb-6 !border-jv-lightGray2x !text-jv-lightGray2x"
                >
                    ادامه با لینکدین
                </Button>
                <div className="my-6 w-full h-[1px] bg-jv-lightGray3x flex items-center justify-center relative">
                    <p className="font-bold bg-jv-white px-4">یا</p>
                </div>
                <Button
                    size="middle"
                    textColor="primary"
                    ClickHandler={() => {}}
                    isLoading={false}
                    ClassName="w-full mt-3"
                >
                    کارفرما هستید !؟
                </Button>
            </div>
        </div>
    );
};

export default Login;
