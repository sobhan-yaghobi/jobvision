import React, { useState, useEffect } from "react";

// Functions
import {
    messageLengthGenerator,
    messageRequiredGenerator,
    messageSuccess,
    messageUrlNotValid,
} from "../../Utils/Utils";
import { z } from "zod";

// Types
import {
    CmsPageGeneratorProps,
    EditHomePageProps,
    HomePageProps,
    LiteralsMainPage,
    TypeSubPageItem,
} from "./CmsEmployer.type";
import { DateInput, NumberInput, SelectInput, TextInput, TextareaInput } from "../../Components/Input/Input";
import { TypeOptionInput } from "../../Components/Input/Input.type";
import { MenuItemType, MenuProps } from "../../Components/Menu/Menu.type";

// Hook
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useShowMssAndNotif from "../../Hooks/useShowMssAndNotif";

// Components
import { motion } from "framer-motion";
import Button from "../../Components/Button/Button";
import { Link } from "react-router-dom";
import Menu from "../../Components/Menu/Menu";

// Animations
import { ShortShowFromBottom, ShortShowFromTop, SpringBackOutVeryShortly } from "../../Animations/UtilsAnimation";

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

const pageItems: MenuItemType[] = [
    {
        label: "خانه",
        key: LiteralsMainPage.Home,
        icon: <GoHomeFill />,
        mainSubPage: "Home_Main",
    },
    { label: "آگهی ها", key: LiteralsMainPage.Advertsisings, icon: <CgFileDocument /> },
    {
        label: "درخواست ها",
        key: "sub1",
        icon: <BiGitPullRequest />,
        children: [
            {
                parentKey: "sub1",
                label: "قبول شده",
                key: LiteralsMainPage.RqAccept,
                icon: <BsCheckAll style={{ color: "var(--successColor)" }} />,
            },
            {
                parentKey: "sub1",
                label: "رد شده",
                key: LiteralsMainPage.RqRejection,
                icon: <TbGitPullRequestClosed style={{ color: "var(--dangerColor)" }} />,
            },
            {
                parentKey: "sub1",
                label: "در حال انتظار",
                key: LiteralsMainPage.RqWaiting,
                icon: <RxLapTimer style={{ color: "var(--warningColor)" }} />,
            },
            {
                parentKey: "sub1",
                label: "تمامی درخواست ها",
                key: LiteralsMainPage.RqAll,
                icon: <RiGitPullRequestFill />,
            },
        ],
    },
];

const CmsEmployer: React.FC = () => {
    const { ShowContext, showMess } = useShowMssAndNotif({ placementOfNotif: "bottomLeft" });

    const [MainPage, setMainPage] = useState<LiteralsMainPage.TypeMainPage>({
        mainKey: LiteralsMainPage.Home,
        subPage: "Home_Main",
    } as LiteralsMainPage.TypeMainPage);

    const setMainPageAction: MenuProps["onSelect"] = ({ mainItem, mainItemSelected }) => {
        typeof mainItem !== "undefined" ? setMainPage({ mainKey: mainItem.key, subPage: mainItem.mainSubPage }) : null;
    };

    return (
        <>
            {ShowContext}
            <div className="w-full h-screen flex justify-between p-4 relative">
                <div className="w-2/12 p-1 flex flex-col justify-between text-jv-lightGray2x">
                    <img className="h-10 self-start" src={Logo} alt="" />
                    <div className="mt-1 h-full overflow-y-auto no-scrollbar">
                        <Menu
                            defaultItem={MainPage.mainKey}
                            onSelect={setMainPageAction}
                            isOpen
                            items={pageItems}
                        ></Menu>
                    </div>
                    <div className="w-full h-[35%] text-center rounded-lg bg-slate-100 flex flex-col items-center">
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
                <div className={`w-7/12 h-full mx-4`}>
                    <CmsPageGenerator
                        showMess={showMess}
                        mainPage={MainPage.mainKey as LiteralsMainPage.AllPage}
                        setMainPage={setMainPage}
                        subPage={MainPage.subPage}
                    ></CmsPageGenerator>
                </div>
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
                                <span className="mt-3 text-xs">ویرایش</span>
                            </li>
                            <li
                                onClick={() => setMainPage({ mainKey: LiteralsMainPage.RqAll })}
                                className="select-none cursor-pointer text-jv-primary flex flex-col items-center justify-center group relative"
                            >
                                <span className="button-Cms-type border-jv-lightPrimary bg-jv-lightPrimary shadow-jv-primary group-hover:shadow-xl group-active:scale-90">
                                    <BiGitPullRequest className="text-inherit transform-none" />
                                </span>
                                <span className="mt-3 text-xs">درخواست ها</span>
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

namespace SubPageCms {
    export const subPageItem: TypeSubPageItem[] = [
        {
            parnetPage: "Home",
            subPage: "Home_Main",
            title: "صفحه اصلی",
        },
        {
            parnetPage: "Home",
            subPage: "Home_Edit",
            title: "درباره شرکت",
        },
    ];

    export const EditHomePage: React.FC<EditHomePageProps> = ({ showMess }) => {
        const CompanyFormSchema = z.object({
            name: z.string().min(3, messageLengthGenerator("Min", "نام شرکت", 3)).trim(),
            location: z.string().min(10, messageLengthGenerator("Min", "موقعیت مکانی", 10)).trim(),
            logo: z
                .string()
                .min(1, messageRequiredGenerator("لینک لوگو شرکت"))
                .url(messageUrlNotValid("لوگو شرکت"))
                .trim(),
            website: z.string().url(messageUrlNotValid("وب سایت شرکت")).trim(),
            desc: z.string().min(1, messageRequiredGenerator("درباره ی شرکت")).trim(),
            CompanySlogan: z
                .string()
                .min(1, messageRequiredGenerator("شعار شرکت"))
                .max(50, messageLengthGenerator("Max", "شعار شرکت شما", 50))
                .trim(),
            establishedyear: z.date({ required_error: messageRequiredGenerator("سال تاسیس شرکت") }),
            OrganizationEmploy: z.string().min(1, messageRequiredGenerator("تعداد کارکنان")),
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
            getValues,
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
                            <TextareaInput
                                placeholder="سخنی از سمت شرکت شما برای جویندگان شغل..."
                                register={register("desc")}
                            ></TextareaInput>
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

    export const MainHomePage: React.FC = () => {
        return <>Main Home Page</>;
    };
}

const CmsPageGenerator: React.FC<CmsPageGeneratorProps> = ({ mainPage, setMainPage, subPage, showMess }) => {
    const HomePage: React.FC<HomePageProps> = ({ isEditShow }) => {
        return isEditShow ? (
            <SubPageCms.EditHomePage showMess={showMess}></SubPageCms.EditHomePage>
        ) : (
            <SubPageCms.MainHomePage></SubPageCms.MainHomePage>
        );
    };
    return (
        <div className="h-full flex flex-col overflow-hidden">
            {mainPage === "Home" ? (
                <motion.ul
                    variants={ShortShowFromTop}
                    initial="hidden"
                    animate="visible"
                    transition={SpringBackOutVeryShortly}
                    className="w-full flex bg-jv-white"
                >
                    {SubPageCms.subPageItem.map(
                        (item) =>
                            item.parnetPage === mainPage && (
                                <li
                                    key={item.subPage}
                                    onClick={() => setMainPage({ mainKey: item.parnetPage, subPage: item.subPage })}
                                    className={`py-2 px-4 cursor-pointer ${
                                        item.subPage === subPage
                                            ? "bg-jv-light rounded-t-lg text-jv-primary"
                                            : "text-jv-lightGray2x"
                                    }`}
                                >
                                    {item.title}
                                </li>
                            )
                    )}
                </motion.ul>
            ) : null}
            <motion.div
                key={mainPage}
                variants={ShortShowFromBottom}
                initial="hidden"
                animate="visible"
                className="w-full h-full rounded-lg bg-jv-light p-4 overflow-y-auto no-scrollbar"
            >
                {mainPage === "Home" || subPage === "Home_Edit" ? (
                    <HomePage isEditShow={subPage === "Home_Edit" ? true : false}></HomePage>
                ) : mainPage === "Request_All" ? (
                    <div>Request_All</div>
                ) : mainPage === "Advertsisings" ? (
                    <div>Advertsisings</div>
                ) : mainPage === "Request_Accept" ? (
                    <div>Request_Accept</div>
                ) : mainPage === "Request_Rejection" ? (
                    <div>Request_Rejection</div>
                ) : mainPage === "Request_Waiting" ? (
                    <div>Request_Waiting</div>
                ) : (
                    <></>
                )}
            </motion.div>
        </div>
    );
};
