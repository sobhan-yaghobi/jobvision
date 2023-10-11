import React, { useEffect } from "react";

// Types
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import Input from "../Input/Input";
import Button from "../Button/Button";

// Functions
import { useForm, FieldErrors } from "react-hook-form";

// Hooks
import useShowNotification from "../../Hooks/useShowNotification";
import useShowMessage from "../../Hooks/useShowMessage";

// Icons
import Logo from "/Svg/Logo/PrimaryLogoNoShape.svg";
import { FcGoogle } from "react-icons/fc";
import { LuLinkedin } from "react-icons/lu";
import useWindowsSize from "../../Hooks/useWindowsSize";

export type TypeLoginFormSchema = z.infer<typeof loginFormSchema>;
const loginFormSchema = z.object({
    username_OR_email: z.union([
        z.string().email("ایمیل یا تلفن همراه معتبر نمیباشد"),
        z.string().regex(/^(\+98|0)?9\d{9}$/g, "ایمیل یا تلفن همراه معتبر نمیباشد"),
    ]),
    password: z.string().min(8, "حداقل 8 کارکتر برای رمز عبور نیاز داریم"),
});

const Login: React.FC = () => {
    const { contextNotificationHolder, showNotifcation } = useShowNotification({ placement: "bottomLeft" });
    const { contextMessageHolder, showMessage } = useShowMessage();
    const [windowSize] = useWindowsSize();

    const {
        register,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm<TypeLoginFormSchema>({ resolver: zodResolver(loginFormSchema) });

    const submitAction = () => {
        windowSize.innerWidth < 768
            ? showMessage("success", "ثبت نام با موفقیت به اتمام رسید")
            : showNotifcation("success", "ثبت نام با موفقیت به اتمام رسید");
        reset();
    };

    const showErrorHandler = (typeErr: "Pass" | "email_Number") => {
        const mainErr =
            typeErr === "Pass"
                ? { ...errors.password }
                : typeErr === "email_Number"
                ? { ...errors.username_OR_email }
                : undefined;
        if (typeof mainErr !== "undefined" && typeof mainErr.message !== "undefined") {
            windowSize.innerWidth < 768
                ? showMessage("error", mainErr.message)
                : showNotifcation("error", mainErr.message);
        }
    };

    useEffect(() => {
        console.log("Error => ", errors);
        showErrorHandler("Pass");
        showErrorHandler("email_Number");
    }, [errors]);

    return (
        <div className="w-full h-full py-5 flex flex-col items-center">
            {contextNotificationHolder}
            {contextMessageHolder}
            <div className="h-6">
                <img className="h-full" src={Logo} alt="" />
            </div>
            <div className="mt-6 text-xl flex">
                <div style={{ wordSpacing: -3 }} className="ml-2 font-semibold">
                    ورود | ثبت نام
                </div>
                <div>کارجو</div>
            </div>
            <form onSubmit={handleSubmit(submitAction)} className="mt-6 w-full flex flex-col items-center">
                <Input
                    Type="TEXT"
                    Register={{ ...register("username_OR_email") }}
                    Placeholder="ایمیل یا  شماره تلفن"
                    ClassName="mb-3"
                ></Input>
                <Input
                    Type="PASSWORD"
                    Register={{ ...register("password") }}
                    Placeholder="رمر عبور"
                    ClassName="mb-3"
                ></Input>
                <Button size="middle" textColor="light" ClickHandler={() => {}} isLoading={false} ClassName="w-full">
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
