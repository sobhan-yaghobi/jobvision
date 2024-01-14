import React, { useEffect, useContext } from "react";

// Types
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Components
import { TextInput } from "../Input/Input";
import PasswordInput from "../Input/PasswordInput";
import Button from "../Button/Button";

// Functions
import { messageSuccess } from "../../Utils/Utils";

// Hooks
import { SubmitHandler, useForm } from "react-hook-form";
import useShowMssAndNotif from "../../Hooks/useShowMssAndNotif";
import useAuth, { userInfo } from "../../Store/useAuth";
import useLoginModal from "../../Store/useLoginModal";

// Icons
import Logo from "/Svg/Logo/PrimaryLogoNoShape.svg";
import { FcGoogle } from "react-icons/fc";
import { LuLinkedin } from "react-icons/lu";
import useUser from "../../Hooks/useUser";
import usePostUserToApi from "../../Hooks/usePostUserToApi";

export type TypeLoginFormSchema = z.infer<typeof loginFormSchema>;
const loginFormSchema = z.object({
    username_OR_email: z.union([
        z.string().email("ایمیل یا تلفن همراه معتبر نمیباشد"),
        z.string().regex(/^(\+98|0)?9\d{9}$/g, "ایمیل یا تلفن همراه معتبر نمیباشد"),
    ]),
    password: z
        .string()
        .regex(/^[-_.\/<>?a-zA-Z0-9-]+$/, "پسورد باید با حروف اینگلیسی نوشته بشه")
        .min(8, "حداقل 8 کارکتر برای رمز عبور نیاز داریم"),
});

const Login: React.FC = () => {
    const { setUserInfo } = useAuth();
    const { postAction: postUserToApi } = usePostUserToApi();
    const { setIsShow } = useLoginModal();
    const { mutateAsync: getUser } = useUser();
    const { ShowContext, showMess } = useShowMssAndNotif({ placementOfNotif: "bottomLeft" });

    const {
        register,
        reset,
        formState: { errors, isSubmitting },
        handleSubmit,
    } = useForm<TypeLoginFormSchema>({ resolver: zodResolver(loginFormSchema) });

    const submitAction: SubmitHandler<TypeLoginFormSchema> = async (formData) => {
        const newUser: userInfo = {
            email_or_phoneNumber: formData.username_OR_email,
            password: formData.password,
            company: null,
        };
        try {
            const user = await getUser(formData.username_OR_email);
            if (typeof user === "undefined") {
                setUserInfo(newUser);
                postUserToApi({
                    userInfo: newUser,
                    successFunctionHandler: () => showMess({ type: "success", message: messageSuccess("ثبت نام") }),
                });
                reset();
                setIsShow(false);
            } else {
                if (formData.password === user.password) {
                    setUserInfo(user);
                    showMess({ type: "success", message: messageSuccess("ثبت نام") });
                    reset();
                    setIsShow(false);
                } else {
                    showMess({ type: "error", message: "پسورد یا نام کاربری صحیح نمیباشد" });
                }
            }
        } catch (error) {
            showMess({ type: "error", message: "در روند ثبت نام خطایی رخ داد" });
        }
    };

    useEffect(() => {
        showMess({ type: "error", message: errors.password?.message });
        showMess({ type: "error", message: errors.username_OR_email?.message });
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
                    isError={errors?.username_OR_email?.message}
                ></TextInput>
                <PasswordInput
                    placeholder="رمز عبور"
                    register={{ ...register("password") }}
                    className={[{ inputwrapperClassName: "mb-3" }]}
                    isError={errors?.password?.message}
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
