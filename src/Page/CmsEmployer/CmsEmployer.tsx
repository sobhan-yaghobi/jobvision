import React, { useState, useEffect } from "react";
import { z } from "zod";

// Functions
import {
    messageLengthGenerator,
    messageRequiredGenerator,
    messageSuccess,
    messageUrlNotValid,
} from "../../Utils/Utils";

// Types
import { CmsMenuItem, CmsPageGeneratorProps, HomePageProps, LiteralsMainPage } from "./CmsEmployer.type";
import { DateInput, NumberInput, SelectInput, TextInput, TextareaInput } from "../../Components/Input/Input";
import { TypeOptionInput } from "../../Components/Input/Input.type";

// Hook
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useShowMssAndNotif from "../../Hooks/useShowMssAndNotif";

// Components
import { Menu } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../Components/Button/Button";
import { Link } from "react-router-dom";

// Date Picker
import { DateObject } from "react-multi-date-picker";
import Persian_cl from "react-date-object/calendars/persian";

// Icons
import { GoHomeFill } from "react-icons/go";
import { CgFileDocument } from "react-icons/cg";
import { BiGitPullRequest, BiMap, BiLinkAlt } from "react-icons/bi";
import { BsCheckAll, BsImages } from "react-icons/bs";
import { RxLapTimer } from "react-icons/rx";
import { TbGitPullRequestClosed } from "react-icons/tb";
import { RiGitPullRequestFill } from "react-icons/ri";
import Logo from "/Svg/Logo/PrimaryColorLogo.svg";
import reportIcon from "/images/report.webp";
import { HiOutlineLogout } from "react-icons/hi";
import { CiEdit, CiUser } from "react-icons/ci";
import { AiOutlineEye } from "react-icons/ai";
import { PiSpeakerHigh } from "react-icons/pi";
import { FaFileCirclePlus } from "react-icons/fa6";

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
    const { ShowContext, showMess } = useShowMssAndNotif({ placementOfNotif: "bottomLeft" });

    const [MainPage, setMainPage] = useState<LiteralsMainPage.TypeMainPage>({ mainKey: LiteralsMainPage.Home });

    return (
        <>
            {ShowContext}
            <div className="w-full h-screen flex justify-between p-4 relative">
                <div className="w-2/12 p-1 flex flex-col justify-between">
                    <div>
                        <img className="px-2" src={Logo} alt="" />
                        <Menu
                            key={MainPage.mainKey}
                            className="!border-none rounded-lg my-1"
                            defaultSelectedKeys={[MainPage.mainKey as string]}
                            mode="inline"
                            items={items}
                            onSelect={(props) => setMainPage({ mainKey: props.key })}
                        />
                    </div>
                    <div className="w-full h-[35%] text-center rounded-lg bg-slate-100 flex flex-col items-center ">
                        <img className="h-[45%] mb-2" src={reportIcon} alt="" />
                        <h4>گزارش سالانه</h4>
                        <p className="text-xs my-2">همین الان از گزارش سالیانه مطلع شوید</p>
                        <Button
                            size="small"
                            textColor="light"
                            ClickHandler={() => {}}
                            ClassName="!py-2 px-8 border-none shadow-jv-primary shadow-lg"
                            isLoading={false}
                        >
                            دانلود
                        </Button>
                    </div>
                </div>
                <AnimatePresence>
                    <motion.div
                        className={`w-7/12 h-full rounded-lg mx-4 bg-jv-light p-4 overflow-y-auto no-scrollbar`}
                    >
                        <CmsPageGenerator
                            showMess={showMess}
                            mainPage={MainPage.mainKey}
                            subPage={MainPage.subPage}
                        ></CmsPageGenerator>
                    </motion.div>
                </AnimatePresence>
                <div className="w-3/12 h-full">
                    <div className="h-3/6 flex flex-col items-center">
                        <div className="w-full flex items-center justify-end">
                            <Link to="/">
                                <span
                                    title="خروج از پنل"
                                    className="button-Cms-type text-jv-danger ml-2 border-jv-lightDanger  hover:bg-jv-lightDanger"
                                >
                                    <HiOutlineLogout className="text-inherit transition-none" />
                                </span>
                            </Link>
                        </div>
                        <img className="rounded-full h-16 shadow-xl" src="/images/company-Sheypoor.webp" alt="" />
                        <h3 className="mt-3 text-jv-lightGray2x">شیپور</h3>
                        <ul className="w-full my-5 flex items-center justify-evenly">
                            <li
                                onClick={() => setMainPage({ mainKey: LiteralsMainPage.Home, subPage: "Home_Edit" })}
                                className="select-none cursor-pointer text-jv-primary flex flex-col items-center justify-center group"
                            >
                                <span className="button-Cms-type border-jv-lightPrimary bg-jv-lightPrimary shadow-jv-primary group-hover:shadow-xl group-active:scale-90">
                                    <CiEdit className="text-inherit transform-none" />
                                </span>
                                <span className="mt-3 text-xs font-semibold">ویرایش</span>
                            </li>
                            <li
                                onClick={() => setMainPage({ mainKey: LiteralsMainPage.RqAll })}
                                className="select-none cursor-pointer text-jv-primary flex flex-col items-center justify-center group relative"
                            >
                                <span className="button-Cms-type border-jv-lightPrimary bg-jv-lightPrimary shadow-jv-primary group-hover:shadow-xl group-active:scale-90">
                                    <BiGitPullRequest className="text-inherit transform-none" />
                                </span>
                                <span className="mt-3 text-xs font-semibold">درخواست ها</span>
                            </li>
                        </ul>
                    </div>
                    <div className="h-3/6 w-full">
                        <div className="px-1 h-full flex flex-col overflow-y-auto">
                            <h3 className="text-jv-lightGray2x">درخواست های اخیر</h3>
                            <div className="my-1">
                                <span className="text-jv-lightGray2x text-xs pr-1">امروز</span>
                                <ul>
                                    {Array(2)
                                        .fill("")
                                        .map((item, index) => (
                                            <li
                                                key={index}
                                                className="p-2 mb-2 rounded-lg bg-jv-lightPrimary flex items-center justify-around"
                                            >
                                                <span className="w-2/12 flex items-center justify-start">
                                                    <span className="button-Cms-type cursor-default text-jv-primary border-jv-lightPrimary bg-jv-lightPrimary text-xl rounded-xl shadow-lg">
                                                        <CiUser />
                                                    </span>
                                                </span>
                                                <span className="w-8/12 text-jv-lightGray2x">
                                                    <p className="text-sm truncate">سبحان یعقوبی</p>
                                                    <p className="text-xs truncate">توسعه دهنده فرانت اند</p>
                                                </span>
                                                <span className="w-2/12 flex items-center justify-end">
                                                    <span className="button-Cms-type border-jv-lightGray3x bg-jv-lightGray3x text-jv-lightGray2x shadow-lg hover:shadow-none">
                                                        <AiOutlineEye />
                                                    </span>
                                                </span>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                            <div className="my-1">
                                <span className="text-jv-lightGray2x text-xs pr-1">دیروز</span>
                                <ul>
                                    <li className="p-2 mb-2 rounded-lg bg-jv-lightPrimary flex items-center justify-around">
                                        <span className="w-2/12 flex items-center justify-start">
                                            <span className="button-Cms-type cursor-default text-jv-primary border-jv-lightPrimary bg-jv-lightPrimary text-xl rounded-xl shadow-lg">
                                                <CiUser />
                                            </span>
                                        </span>
                                        <span className="w-8/12 text-jv-lightGray2x">
                                            <p className="text-sm truncate">سبحان یعقوبی</p>
                                            <p className="text-xs truncate">توسعه دهنده فرانت اند</p>
                                        </span>
                                        <span className="w-2/12 flex items-center justify-end">
                                            <span className="button-Cms-type border-jv-lightGray3x bg-jv-lightGray3x text-jv-lightGray2x shadow-lg hover:shadow-none">
                                                <AiOutlineEye />
                                            </span>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CmsEmployer;

const CmsPageGenerator: React.FC<CmsPageGeneratorProps> = ({ mainPage, subPage, showMess }) => {
    const HomePage: React.FC<HomePageProps> = ({ isEditShow }) => {
        const CompanyFormSchema = z.object({
            name: z
                .string({ required_error: messageRequiredGenerator("نام شرکت") })
                .trim()
                .min(3, messageLengthGenerator("Min", "نام شرکت", 3)),
            location: z
                .string({ required_error: messageRequiredGenerator("مکان شرکت") })
                .trim()
                .min(10, messageLengthGenerator("Min", "موقعیت مکانی", 10)),
            logo: z
                .string({ required_error: messageRequiredGenerator("لینک لوگو شرکت") })
                .trim()
                .url(messageUrlNotValid("لوگو شرکت")),
            website: z
                .string({ required_error: messageRequiredGenerator("لینک وب سایت") })
                .trim()
                .url(messageUrlNotValid("وب سایت شرکت")),
            desc: z
                .string({ required_error: messageRequiredGenerator("درباره شرکت") })
                .trim()
                .max(500, messageLengthGenerator("Max", "درباره شرکت", 500)),
            CompanySlogan: z
                .string({ required_error: messageRequiredGenerator("شعار شرکت") })
                .trim()
                .max(50, messageLengthGenerator("Max", "شعار شرکت شما", 50)),
            establishedyear: z.date({ required_error: messageRequiredGenerator("سال تاسیس شرکت") }),
            OrganizationEmploy: z.string({ required_error: messageRequiredGenerator("تعداد کارکنان") }),
            ownership: z.string({ required_error: "انتخاب نوع شرکت اجباری است" }).trim(),
        });

        type TypeCompanyFormSchema = z.infer<typeof CompanyFormSchema>;

        const ownershipOptions: TypeOptionInput[] = [
            {
                value: "Private",
                label: "خصوصی",
            },
            {
                value: "Government",
                label: "دولتی",
            },
        ];

        const {
            register,
            setValue,
            handleSubmit,
            reset,
            formState: { errors, isSubmitting },
        } = useForm<TypeCompanyFormSchema>({ resolver: zodResolver(CompanyFormSchema) });

        useEffect(() => {
            showMess({ type: "error", message: errors.name?.message });
            showMess({ type: "error", message: errors.location?.message });
            showMess({ type: "error", message: errors.logo?.message });
            showMess({ type: "error", message: errors.website?.message });
            showMess({ type: "error", message: errors.desc?.message });
            showMess({ type: "error", message: errors.CompanySlogan?.message });
            showMess({ type: "error", message: errors.establishedyear?.message });
            showMess({ type: "error", message: errors.OrganizationEmploy?.message });
            showMess({ type: "error", message: errors.ownership?.message });
        }, [errors]);

        const setEstablishDate = (date: number) => setValue("establishedyear", new Date(date));

        const submitAction = (data: TypeCompanyFormSchema) => {
            return new Promise<void>((resolve) => {
                setTimeout(() => {
                    showMess({ type: "success", message: messageSuccess("آپدیت اطلاعات شرکت") });
                    reset();
                    resolve();
                }, 2000);
            });
        };
        return (
            <>
                <div>
                    <h3>ویرایش اطلاعات شرکت</h3>
                    <form onSubmit={handleSubmit(submitAction)} className="my-10">
                        <section>
                            <h5 className="mr-2">لوگو</h5>
                            <div className="flex mt-2">
                                <img
                                    className="rounded-full h-20 shadow-xl ml-5"
                                    src="/images/company-Sheypoor.webp"
                                    alt=""
                                />
                                <div className="w-full">
                                    <TextInput
                                        icon={<BsImages></BsImages>}
                                        placeholder="...لینک لوگو شرکت"
                                        register={register("logo")}
                                        className={[{ inputClassName: "text-left" }]}
                                    ></TextInput>
                                    <p className="mt-2 text-xs text-jv-lightGray2x w-1/2">
                                        پیشنهاد میشود مقدار پیکسل لوگو شرکت 800 * 800 و فرمت عکس JPG یا PNG باشد و
                                        همچنین فرمت GIF نامعتبر میباشد
                                    </p>
                                </div>
                            </div>
                        </section>
                        <section className="my-5">
                            <h5 className="mr-2">نام شرکت</h5>
                            <TextInput placeholder="برای مثال جاب ویژن" register={register("name")}></TextInput>
                        </section>
                        <section>
                            <h5 className="mr-2">موقعیت شرکت</h5>
                            <TextInput
                                placeholder="برای مثال تهران ، بهارستان"
                                register={register("location")}
                                icon={<BiMap></BiMap>}
                                iconSide="Right"
                            ></TextInput>
                        </section>
                        <section className="my-5">
                            <h5 className="mr-2">وب سایت شرکت</h5>
                            <TextInput
                                placeholder="برای مثال www.jobvision.ir"
                                register={register("website")}
                                icon={<BiLinkAlt></BiLinkAlt>}
                                className={[{ inputClassName: "text-left" }]}
                            ></TextInput>
                        </section>
                        <section>
                            <h5 className="mr-2"> درباره شرکت</h5>
                            <TextareaInput placeholder="درباره شرکت..." register={register("desc")}></TextareaInput>
                        </section>
                        <section className="my-5">
                            <h5 className="mr-2">شعار شرکت</h5>
                            <TextInput
                                placeholder="برای مثال : متفاوت بیندیشید"
                                register={register("CompanySlogan")}
                                icon={<PiSpeakerHigh></PiSpeakerHigh>}
                                iconSide="Right"
                            ></TextInput>
                        </section>
                        <section>
                            <h5 className="mr-2">تعداد کارکنان شرکت</h5>
                            <NumberInput
                                register={register("OrganizationEmploy")}
                                placeholder="برای مثال 13"
                                min={1}
                            ></NumberInput>
                        </section>
                        <section className="my-5">
                            <h5 className="mr-2">سال تاسیس</h5>
                            <DateInput
                                placeholder={`برای مثال ${new DateObject().convert(Persian_cl)}`}
                                setDate={setEstablishDate}
                            ></DateInput>
                        </section>
                        <section>
                            <h5 className="mr-2">نوع شرکت</h5>
                            <SelectInput
                                label="نوع شرکت"
                                options={ownershipOptions}
                                register={register("ownership")}
                                className="border-jv-lightGray3x"
                            ></SelectInput>
                        </section>
                        <Button
                            ClassName="mt-5 w-full"
                            textColor="primary"
                            size="middle"
                            ClickHandler={() => {}}
                            isLoading={isSubmitting}
                        >
                            آپدیت
                        </Button>
                    </form>
                </div>
            </>
        );
    };

    if (mainPage === "Home" || subPage === "Home_Edit") {
        return <HomePage isEditShow={subPage === "Home_Edit" ? true : false}></HomePage>;
    } else if (mainPage === "Request_All") {
        return <div>Request_All</div>;
    }
};
