import React, { useEffect, useContext } from "react";

// Types
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import { TextInput, PasswordInput } from "../Input/Input";
import Button from "../Button/Button";

// Functions
import { useForm } from "react-hook-form";

// Hooks
import useShowNotification from "../../Hooks/useShowNotification";
import useShowMessage from "../../Hooks/useShowMessage";

// Icons
import Logo from "/Svg/Logo/PrimaryLogoNoShape.svg";
import { FcGoogle } from "react-icons/fc";
import { LuLinkedin } from "react-icons/lu";
import useWindowsSize from "../../Hooks/useWindowsSize";
import { AuthContext } from "../../Context/AuthContext";
import useShowMssAndNotif from "../../Hooks/useShowMssAndNotif";

export type TypeLoginFormSchema = z.infer<typeof loginFormSchema>;
const loginFormSchema = z.object({
    username_OR_email: z.union([
        z.string().email("ایمیل یا تلفن همراه معتبر نمیباشد"),
        z.string().regex(/^(\+98|0)?9\d{9}$/g, "ایمیل یا تلفن همراه معتبر نمیباشد"),
    ]),
    password: z.string().min(8, "حداقل 8 کارکتر برای رمز عبور نیاز داریم"),
});

const Login: React.FC = () => {
    const authContext = useContext(AuthContext);
    const { ShowContext, showMess } = useShowMssAndNotif({ placementOfNotif: "bottomLeft" });

    const {
        register,
        reset,
        formState: { errors, isSubmitting },
        handleSubmit,
    } = useForm<TypeLoginFormSchema>({ resolver: zodResolver(loginFormSchema) });

    const submitAction = () => {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                showMess("success", "ثبت نام با موفقیت به اتمام رسید");
                reset();
                authContext.setLoginModal(false);
                resolve();
            }, 2000);
        });
    };

    useEffect(() => {
        showMess("error", errors.password?.message);
        showMess("error", errors.username_OR_email?.message);
    }, [errors]);

    return (
        <div className="w-full h-full py-5 flex flex-col items-center">
            {ShowContext}
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
                <TextInput
                    placeholder="ایمیل یا شماره تلفن"
                    register={{ ...register("username_OR_email") }}
                    className={[{ inputwrapperClassName: "mb-3" }]}
                ></TextInput>
                <PasswordInput
                    placeholder="رمر عبور"
                    register={{ ...register("password") }}
                    className={[{ inputwrapperClassName: "mb-3" }]}
                ></PasswordInput>
                <Button
                    size="middle"
                    textColor="light"
                    ClickHandler={() => {}}
                    isLoading={isSubmitting}
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
