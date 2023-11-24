import React, { useState, useEffect, memo } from "react";

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
    ItemGeneratorPorps,
    LiteralsMainPage,
    MenuItemType,
    SubPageCmsTypes,
} from "./CmsEmployer.type";
import { CheckBox, DateInput, NumberInput, SelectInput, TextInput, TextareaInput } from "../../Components/Input/Input";

// Hook
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useShowMssAndNotif from "../../Hooks/useShowMssAndNotif";

// Components
import { motion } from "framer-motion";
import Button from "../../Components/Button/Button";
import { Link } from "react-router-dom";
import { ConfigProvider, Progress } from "antd";

// Animations
import { ShortShowFromBottom, ShortShowFromTop, SpringBackOutVeryShortly } from "../../Animations/UtilsAnimation";

// Date Picker
import { DateObject } from "react-multi-date-picker";
import Persian_cl from "react-date-object/calendars/persian";

// Icons
import { GoHomeFill } from "react-icons/go";
import { CgFileDocument } from "react-icons/cg";
import { BiGitPullRequest, BiMap, BiLinkAlt, BiComment, BiTimer, BiTrip } from "react-icons/bi";
import { BsCheckAll, BsImages } from "react-icons/bs";
import { RxLapTimer } from "react-icons/rx";
import { TbGitPullRequestClosed } from "react-icons/tb";
import { RiGitPullRequestFill } from "react-icons/ri";
import Logo from "/Svg/Logo/PrimaryColorLogo.svg";
import reportIcon from "/images/report.webp";
import { HiOutlineLogout } from "react-icons/hi";
import { CiEdit, CiUser } from "react-icons/ci";
import { AiFillCaretDown, AiOutlineEye } from "react-icons/ai";
import { PiSpeakerHigh, PiStudentDuotone } from "react-icons/pi";
import { FaFileCirclePlus } from "react-icons/fa6";
import { AdvertsingCmsBox } from "../../Components/AdvertisingBox/AdvertisingBox";
import { twMerge } from "tailwind-merge";

const pageItems: MenuItemType[] = [
    {
        label: "خانه",
        key: LiteralsMainPage.Home,
        icon: <GoHomeFill />,
        mainSubPage: "Home_Main",
    },
    {
        label: "آگهی ها",
        mainSubPage: "Advertsisings_Main",
        key: LiteralsMainPage.Advertsisings,
        icon: <CgFileDocument />,
    },
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

namespace SubPageCms {
    export const subPageItem: SubPageCmsTypes.TypeSubPageItem[] = [
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
        { parnetPage: "Advertsisings", subPage: "Advertsisings_Main", title: "آگهی ها" },
        { parnetPage: "Advertsisings", subPage: "Advertsisings_Add", title: "آگهی جدید" },
    ];

    // Components

    export const ReqeustBox: React.FC<SubPageCmsTypes.ReqeustBoxProps> = ({ status }) => {
        return (
            <div
                className={`mb-2 h-36 bg-jv-white py-4 px-3 rounded-lg border-solid border-[1px] ${
                    status === "waiting"
                        ? "border-jv-warning"
                        : status === "reject"
                        ? "border-jv-danger"
                        : status === "accept"
                        ? "border-jv-success"
                        : "border-transparent"
                }`}
            >
                <div className="h-1/3 flex justify-between">
                    <section className="h-full flex">
                        <span className="ml-2 text-2xl text-jv-lightGray w-10 h-10 border-2 border-solid border-jv-lightGray rounded-full flex items-center justify-center">
                            <CiUser />
                        </span>
                        <span>
                            <p className="text-base text-jv-lightGray">سبحان یعقوبی</p>
                            <p className="text-xs">توسعه دهنده فرانت اند</p>
                        </span>
                    </section>
                    <section className="h-full">
                        <p className="box-info-type m-0">4 روز پیش</p>
                    </section>
                </div>
                <div className="h-2/3 mt-2 text-xs flex flex-col">
                    <p className="text-base pb-2 text-jv-lightGray w-full truncate" title="متن کامل">
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                    </p>
                    <div className="h-full flex items-end justify-between">
                        <span>6 اسفند 1400 - 7 اسفند 1400</span>
                        <div className="flex items-center">
                            <Button
                                isLoading={false}
                                ClickHandler={() => {}}
                                textColor="primary"
                                size="small"
                                ClassName="!py-2 mx-1 bg-jv-lightPrimary !border-transparent"
                            >
                                <BiComment className="text-base" />
                            </Button>
                            <Button
                                isLoading={false}
                                ClickHandler={() => {}}
                                textColor="primary"
                                size="small"
                                ClassName="!py-2 mx-1 bg-jv-lightPrimary !border-transparent"
                            >
                                قبول
                            </Button>
                            <Button
                                isLoading={false}
                                ClickHandler={() => {}}
                                textColor="primary"
                                size="small"
                                ClassName="!py-2 mx-1 !bg-jv-lightDanger !text-jv-danger !border-jv-lightDanger"
                            >
                                رد
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    export const RequsetNotifBox: React.FC = () => {
        return (
            <div className="p-2 mb-2 rounded-lg bg-jv-lightPrimary flex items-center justify-around">
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
            </div>
        );
    };

    //? Pages
    export const EditHomePage: React.FC<SubPageCmsTypes.EditHomePageProps> = ({ showMess }) => {
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
        const {
            register,
            setValue,
            handleSubmit,
            getFieldState,
            reset,
            formState: { errors, isSubmitting },
        } = useForm<TypeCompanyFormSchema>({ resolver: zodResolver(CompanyFormSchema) });

        useEffect(() => {
            Object.keys(errors).map((item) => {
                showMess({
                    type: "error",
                    message: getFieldState(item as keyof TypeCompanyFormSchema).error?.message,
                });
            });
        }, [errors]);

        const setEstablishDate = (date: number) => setValue("establishedyear", new Date(date));
        const submitAction = (data: TypeCompanyFormSchema) => {
            console.log(data);
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
                                    isError={errors.logo?.message}
                                ></TextInput>
                                <p className="mt-2 text-xs text-jv-lightGray2x w-1/2">
                                    پیشنهاد میشود مقدار پیکسل لوگو شرکت 800 * 800 و فرمت عکس JPG یا PNG باشد و همچنین
                                    فرمت GIF نامعتبر میباشد
                                </p>
                            </div>
                        </div>
                    </section>
                    <section className="my-5">
                        <h5 className="mr-2">نام شرکت</h5>
                        <TextInput
                            placeholder="برای مثال جاب ویژن"
                            register={register("name")}
                            isError={errors.name?.message}
                        ></TextInput>
                    </section>
                    <section>
                        <h5 className="mr-2">موقعیت شرکت</h5>
                        <TextInput
                            placeholder="برای مثال تهران ، بهارستان"
                            register={register("location")}
                            icon={<BiMap></BiMap>}
                            iconSide="Right"
                            isError={errors.location?.message}
                        ></TextInput>
                    </section>
                    <section className="my-5">
                        <h5 className="mr-2">وب سایت شرکت</h5>
                        <TextInput
                            placeholder="برای مثال www.jobvision.ir"
                            register={register("website")}
                            icon={<BiLinkAlt></BiLinkAlt>}
                            className={[{ inputClassName: "text-left" }]}
                            isError={errors.website?.message}
                        ></TextInput>
                    </section>
                    <section>
                        <h5 className="mr-2"> درباره شرکت</h5>
                        <TextareaInput
                            placeholder="سخنی از سمت شرکت شما برای جویندگان شغل..."
                            register={register("desc")}
                            isError={errors.desc?.message}
                        ></TextareaInput>
                    </section>
                    <section className="my-5">
                        <h5 className="mr-2">شعار شرکت</h5>
                        <TextInput
                            placeholder="برای مثال : متفاوت بیندیشید"
                            register={register("CompanySlogan")}
                            icon={<PiSpeakerHigh></PiSpeakerHigh>}
                            iconSide="Right"
                            isError={errors.CompanySlogan?.message}
                        ></TextInput>
                    </section>
                    <section>
                        <h5 className="mr-2">تعداد کارکنان شرکت</h5>
                        <NumberInput
                            register={register("OrganizationEmploy")}
                            placeholder="برای مثال 13"
                            min={1}
                            isError={errors.OrganizationEmploy?.message}
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
                            mode="Single"
                            label="نوع شرکت"
                            options={SubPageCmsTypes.ownershipOptions}
                            register={register("ownership")}
                            className="border-jv-lightGray3x"
                            isError={errors.ownership?.message}
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
            </>
        );
    };
    export const MainHomePage: React.FC = () => {
        const progressColorGenerator = (precent: number): string => {
            return `${
                precent >= 60 && precent <= 100
                    ? "#5660f2"
                    : precent >= 40 && precent < 60
                    ? "#e1bc29"
                    : precent >= 1 && precent < 40
                    ? "#fa5555"
                    : "#8e9cb2"
            }`;
        };
        return (
            <>
                <section className="w-full group mt-8 py-2 px-4 h-36 rounded-lg bg-jv-primary relative">
                    <img
                        className="w-6/12 scale-90 absolute -bottom-[2.4rem] left-0 group-hover:scale-100 group-hover:-bottom-[1.83rem] duration-700 ease-in-out"
                        src="/images/cmsHome.webp"
                        alt=""
                    />
                    <div className="w-6/12 h-full text-jv-light flex flex-col justify-evenly">
                        <h4>سلامم کارفرمای عزیز</h4>
                        <p className="text-xs">
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک
                            است، چاپگرها و متون بلکه روزنامه استفاده قرار گیرد.
                        </p>
                        <Link
                            to="#"
                            className="decoration-jv-light underline-offset-2 w-fit text-jv-light hover:opacity-50 text-sm"
                        >
                            اطلاعات بیشتر...
                        </Link>
                    </div>
                </section>
                <section className="my-6">
                    <div className="flex items-center justify-between">
                        <h3 className="cursor-default">شما باید استخدام کنید</h3>
                        <Link
                            to="#"
                            className=" decoration-jv-lightGray2x text-jv-lightGray2x underline-offset-2 w-fit hover:opacity-80 text-sm"
                        >
                            مشاهده همه
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 grid-rows-2">
                        {SubPageCmsTypes.ProgressCardArray.map((item, index) => (
                            <div
                                key={`jobs-hire-box-${index}`}
                                className="bg-jv-lightPrimary py-2 px-5 m-2 rounded-lg flex items justify-between"
                            >
                                <div className="flex items-center">
                                    <h1 className="ml-5 text-3xl text-jv-lightGray">{item.userCount}</h1>
                                    <section className="leading-tight">
                                        <p className="text-jv-lightGray font-semibold">{item.title}</p>
                                        <span className="text-xs">
                                            ({item.userCountRecommend} نفر دیگر توصیه میشود)
                                        </span>
                                    </section>
                                </div>
                                <ConfigProvider
                                    theme={{
                                        components: {
                                            Progress: {
                                                colorText: progressColorGenerator(item.percent),
                                            },
                                        },
                                    }}
                                >
                                    <Progress
                                        type="dashboard"
                                        status="normal"
                                        percent={item.percent}
                                        strokeLinecap="round"
                                        strokeColor={progressColorGenerator(item.percent)}
                                        size="small"
                                    />
                                </ConfigProvider>
                            </div>
                        ))}
                    </div>
                </section>
                <section>
                    <h3>آخرین رزومه های فرستاده شده</h3>
                    <div className="my-2 px-2">
                        {Array(3)
                            .fill("")
                            .map((value, index) => (
                                <SubPageCms.ReqeustBox key={`ReqeustBox-${index + 1}`}></SubPageCms.ReqeustBox>
                            ))}
                    </div>
                </section>
            </>
        );
    };

    export const Advertising_Main: React.FC = () => {
        return (
            <>
                <h3>تمامی آگهی ها شما</h3>
                <div className="mt-3">
                    <AdvertsingCmsBox></AdvertsingCmsBox>
                </div>
            </>
        );
    };

    export const Advertising_Add: React.FC<SubPageCmsTypes.AdvertisingAddProps> = ({ showMess }) => {
        const mainAddFormSchema = z.object({
            workTime: z.string().min(1, messageRequiredGenerator("زمان کار")),
            typeOfCooperation: z.string(),
            businessTrips: z.string().optional(),
            benefitsAndFacilities: z.string().optional(),
            keyIndicators: z.array(z.string()),
            // jobDuties: z.string().min(1, messageRequiredGenerator("وظایف شغلی")),
            Softwares: z.array(z.string()).min(1, messageRequiredGenerator("مهارت های نرم افزاری")),
            gender: z.string(),
            education: z.array(z.string()),
            adTags: z.array(z.string()).min(1, messageRequiredGenerator("تگ های آگهی")),
            isImportant: z.boolean().optional(),
            responsibleEmployer: z.boolean().optional(),
            acceptTrainees: z.boolean().optional(),
            acceptTelecommuting: z.boolean().optional(),
            type: z.object({
                BENEFITS_AND_FACILITIES: z.array(z.string()),
                MILITARY_ORDER: z.boolean().optional(),
            }),
            price: z.object({
                isRightPriceArray: z.boolean().optional(),
                from: z.string().min(1, messageRequiredGenerator("حداقل حقوق")),
                to: z.string(),
            }),
            oldYears: z.object({
                isYearArray: z.boolean().optional(),
                yearFrom: z.string().min(1, messageRequiredGenerator("حداقل سن")),
                yearTo: z.string(),
            }),
        });

        type TypeMainAddFormSchema = z.infer<typeof mainAddFormSchema>;

        const {
            register,
            watch,
            control,
            handleSubmit,
            setValue,
            reset,
            getFieldState,
            formState: { errors },
        } = useForm<TypeMainAddFormSchema>({
            resolver: zodResolver(mainAddFormSchema),
        });

        const submitAction = () => {
            return new Promise<void>((resolve) => {
                setTimeout(() => {
                    showMess({ type: "success", message: messageSuccess("ثبت آگهی") });
                    reset();
                    resolve();
                }, 2000);
            });
        };
        useEffect(() => {
            Object.keys(errors).map((item) => {
                showMess({
                    type: "error",
                    message: getFieldState(item as keyof TypeMainAddFormSchema).error?.message,
                });
            });
            showMess({
                type: "error",
                message: errors.price?.from?.message,
            });
            showMess({
                type: "error",
                message: errors.oldYears?.yearFrom?.message,
            });
        }, [errors]);

        const isRightPriceArray = watch("price.isRightPriceArray");
        const isYearArray = watch("oldYears.isYearArray");

        return (
            <>
                <h3>فرم ثبت آگهی تازه</h3>
                <form onSubmit={handleSubmit(submitAction)} className="my-10">
                    <section>
                        <h5 className="mr-2">حقوق ماهانه</h5>
                        <NumberInput
                            min={0}
                            className="block w-full"
                            placeholder="برای مثال : 7 میلیون تومان"
                            register={register("price.from")}
                            isError={errors.price?.from?.message}
                        />
                        <div
                            className={`overflow-hidden grid transition-all duration-700 delay-100 mb-2 ${
                                isRightPriceArray ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                            }`}
                        >
                            <div className="min-h-0">
                                <p className="my-2 pr-2 text-xs">تا</p>
                                <NumberInput
                                    min={0}
                                    className="block w-full"
                                    placeholder="20 میلیون تومان"
                                    register={register("price.to")}
                                />
                            </div>
                        </div>
                        <CheckBox
                            label="نوشتن حداقل و حداکثر حقوق"
                            name={register("price.isRightPriceArray").name}
                            control={control}
                        />
                    </section>
                    <section className="my-5">
                        <h5 className="mr-2">زمان کار</h5>
                        <TextInput
                            placeholder="برای مثال : از شنبه تا چهارشنبه ساعت 7 صبح تا 5 عصر"
                            register={register("workTime")}
                            icon={<BiTimer></BiTimer>}
                            iconSide="Right"
                            isError={errors.workTime?.message}
                        ></TextInput>
                    </section>
                    <section>
                        <h5 className="mr-2">مزایای مسافرتی</h5>
                        <TextInput
                            placeholder="برای مثال : سفر به جزیره کیش"
                            register={register("businessTrips")}
                            icon={<BiTrip></BiTrip>}
                            iconSide="Right"
                        ></TextInput>
                    </section>
                    <section className="my-5">
                        <h5 className="mr-2">مزایا و تحصیلات</h5>
                        <TextInput
                            icon={<PiStudentDuotone />}
                            iconSide="Right"
                            placeholder="برای مثال : پورسانت ، جوایز سال تحویل و ..."
                            register={register("benefitsAndFacilities")}
                        ></TextInput>
                    </section>
                    <section>
                        <h5 className="mr-2">شرایط سنی</h5>
                        <NumberInput
                            min={10}
                            className="block w-full"
                            placeholder="برای مثال : 18 سال"
                            register={register("oldYears.yearFrom")}
                            isError={errors.oldYears?.yearFrom?.message}
                        ></NumberInput>
                        <div
                            className={`overflow-hidden grid transition-all duration-700 delay-100 mb-2 ${
                                isYearArray ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                            }`}
                        >
                            <div className="min-h-0">
                                <p className="my-2 pr-2 text-xs">تا</p>
                                <NumberInput
                                    min={10}
                                    className="block"
                                    placeholder="25 سال"
                                    register={register("oldYears.yearTo")}
                                />
                            </div>
                        </div>
                        <CheckBox
                            label="نوشتن حداقل و حداکثر سن"
                            name={register("oldYears.isYearArray").name}
                            control={control}
                        />
                    </section>
                    <section className="my-5">
                        <h5 className="mr-2">تحصیلات</h5>
                        <SelectInput
                            placeholder="برای مثال : لیسانس دکترا ، مدرک زبان معتبر و..."
                            id="Edicu"
                            mode="Multiple"
                            callBackFn={(param: string[]) => {
                                setValue("education", param);
                            }}
                            register={register("education")}
                            className="border-jv-lightGray3x"
                        ></SelectInput>
                    </section>
                    <section>
                        <h5 className="mr-2">شاخص های کلیدی</h5>
                        <SelectInput
                            placeholder="برای مثال : 3 سال سابقه کار و react - پیشرفته و..."
                            id="keyIndicatorsMenu"
                            mode="Multiple"
                            callBackFn={(param: string[]) => {
                                setValue("keyIndicators", param);
                            }}
                            register={register("keyIndicators")}
                            className="border-jv-lightGray3x"
                        ></SelectInput>
                    </section>
                    <section className="my-5">
                        <h5 className="mr-2">مهارت های نرم افزاری</h5>
                        <SelectInput
                            placeholder="برای مثال : react - متوسط و..."
                            id="SoftwaresMenu"
                            mode="Multiple"
                            callBackFn={(param: string[]) => {
                                setValue("Softwares", param);
                            }}
                            register={register("Softwares")}
                            className="border-jv-lightGray3x"
                            isError={errors.Softwares?.message}
                        ></SelectInput>
                    </section>
                    <section>
                        <h5 className="mr-2">تگ های آگهی</h5>
                        <SelectInput
                            placeholder="برای مثال : برنامه نویسی فرانت اند ، برنامه نویسی ری اکت و ..."
                            id="adTags"
                            mode="Multiple"
                            callBackFn={(param: string[]) => {
                                setValue("adTags", param);
                            }}
                            register={register("adTags")}
                            className="border-jv-lightGray3x"
                            isError={errors.adTags?.message}
                        ></SelectInput>
                    </section>
                    <section className="my-5">
                        <h5 className="mb-2">دسته بندی آگهی</h5>
                        <div className="my-1">
                            <h6>مزایا</h6>
                            <SelectInput
                                id="BENEFITS_AND_FACILITIES"
                                placeholder="مزایا و امکانات اراعه دهنده خود را انتخاب کنید"
                                mode="Multiple_Option"
                                register={register("type.BENEFITS_AND_FACILITIES")}
                                options={SubPageCmsTypes.BenefitsTypeArray}
                                callBackFn={(param: string[]) => {
                                    setValue("type.BENEFITS_AND_FACILITIES", param);
                                }}
                                className="mb-2"
                            ></SelectInput>
                        </div>
                        <div className="my-1">
                            <h6>سطح ارشدیت</h6>
                            <SelectInput
                                id=""
                                placeholder="سطح ارشدیت مورد  نیاز خود را انتخاب کنید"
                                mode="Multiple_Option"
                                register={register("type.BENEFITS_AND_FACILITIES")}
                                options={SubPageCmsTypes.seniorityLevelArray}
                                callBackFn={(param: string[]) => {
                                    setValue("type.BENEFITS_AND_FACILITIES", param);
                                }}
                                className="mb-2"
                            ></SelectInput>
                        </div>
                        <div className="my-1">
                            <h6>سابقه کار</h6>
                            <SelectInput
                                id="BENEFITS_AND_FACILITIES"
                                placeholder="سابقه کار مورد نیاز خود را انتخاب کنید"
                                mode="Multiple_Option"
                                register={register("type.BENEFITS_AND_FACILITIES")}
                                options={SubPageCmsTypes.workExperienceArray}
                                callBackFn={(param: string[]) => {
                                    setValue("type.BENEFITS_AND_FACILITIES", param);
                                }}
                                className="mb-2"
                            ></SelectInput>
                        </div>
                    </section>
                    <section>
                        <h5 className="mr-2">جنسیت</h5>
                        <SelectInput
                            mode="Single"
                            label="نوع همکاری"
                            options={SubPageCmsTypes.genderOption}
                            register={register("gender")}
                            className="border-jv-lightGray3x"
                        ></SelectInput>
                    </section>
                    <section className="my-5">
                        <h5 className="mr-2">نوع همکاری</h5>
                        <SelectInput
                            mode="Single"
                            label="نوع همکاری"
                            options={SubPageCmsTypes.typeOfCooperationOption}
                            register={register("typeOfCooperation")}
                            className="border-jv-lightGray3x"
                        ></SelectInput>
                    </section>
                    <section>
                        <h5>وضعیت آگهی</h5>
                        <div className="my-2 flex flex-col">
                            <CheckBox
                                control={control}
                                label="این آگهی فوری میباشد"
                                name={register("isImportant").name}
                            />
                            <CheckBox
                                control={control}
                                label="پاسخگویی در اصرع وقت"
                                name={register("responsibleEmployer").name}
                            />
                            <CheckBox
                                control={control}
                                label="امکان دریافت کارآموز"
                                name={register("acceptTrainees").name}
                            />
                            <CheckBox
                                control={control}
                                label="امکان دورکاری"
                                name={register("acceptTelecommuting").name}
                            />
                            <CheckBox
                                control={control}
                                label="امریه سربازی"
                                name={register("type.MILITARY_ORDER").name}
                            />
                        </div>
                    </section>

                    <Button
                        ClassName="mt-5 w-full"
                        textColor="primary"
                        size="middle"
                        ClickHandler={() => {}}
                        isLoading={false}
                    >
                        ایجاد آگهی
                    </Button>
                </form>
            </>
        );
    };
}

const CmsEmployer: React.FC = () => {
    const { ShowContext, showMess } = useShowMssAndNotif({ placementOfNotif: "bottomLeft" });

    const [MainPage, setMainPage] = useState<LiteralsMainPage.TypeMainPage>({
        mainKey: LiteralsMainPage.Home,
        subPage: "Home_Main",
    } as LiteralsMainPage.TypeMainPage);

    const Menu: React.FC = memo(() => {
        const [mainSelectMenuItem, setMainSelectMenuItem] = useState({} as MenuItemType);
        const isItemIsSub = (item: MenuItemType): boolean =>
            Boolean(
                typeof item.children !== "undefined"
                    ? item.children.filter((mainItem) => mainItem.key === MainPage.mainKey).length
                    : false
            );

        const className = {
            wrapperMenu: "w-full overflow-hidden duration-700 grid",
            wrapperMenuActive: "grid-rows-[1fr]",
            wrapperMenuDisable: "grid-rows-[0fr]",
            listMenu: "w-full bg-transparent min-h-0 px-1 overflow-hidden",
            itemMenu:
                "w-full text-sm my-1 pl-10 pr-2 py-2 rounded-lg flex items-center transition-none relative cursor-pointer",
            itemMenuActive: "bg-jv-lightPrimary text-jv-primary",
            itemMenuDisable: "hover:text-jv-lightGray hover:bg-jv-light",
            titleItem: "mr-3 truncate transition-none",
            fillCaretDown: "absolute left-2 bg-inherit text-xs transition-none",
        };
        const ItemGenerator: React.FC<ItemGeneratorPorps> = ({ item }) => {
            return (
                <li
                    onClick={() => {
                        setMainPage({ mainKey: item.key, subPage: item.mainSubPage });
                    }}
                    className={`w-full text-sm my-1 pl-10 pr-2 py-2 rounded-lg flex items-center transition-none relative cursor-pointer ${
                        item.key === MainPage.mainKey || item.key === MainPage.subPage
                            ? `bg-jv-lightPrimary text-jv-primary`
                            : `hover:text-jv-lightGray hover:bg-jv-light`
                    }`}
                >
                    {item.icon}
                    <p className={`mr-3 truncate transition-none`}>{item.label}</p>
                </li>
            );
        };

        return (
            <div className={className.wrapperMenu}>
                <ul className={className.listMenu}>
                    {pageItems.map((item) => (
                        <React.Fragment key={item.key}>
                            {typeof item.children === "undefined" ? (
                                <ItemGenerator item={item} />
                            ) : (
                                <>
                                    <div
                                        onClick={() => {
                                            setMainSelectMenuItem((prev) =>
                                                prev.key === item.key ? ({} as MenuItemType) : item
                                            );
                                        }}
                                        className={`${className.itemMenu} ${
                                            isItemIsSub(item)
                                                ? "text-jv-primary border-r-2 border-solid border-jv-lightPrimary"
                                                : ""
                                        }`}
                                    >
                                        <div className="flex">
                                            {item.icon}
                                            <p className={className.titleItem}>{item.label}</p>
                                        </div>
                                        <AiFillCaretDown className={className.fillCaretDown} />
                                    </div>
                                    <div
                                        className={twMerge(
                                            className.wrapperMenu,
                                            item.key === mainSelectMenuItem.key
                                                ? className.wrapperMenuActive
                                                : className.wrapperMenuDisable
                                        )}
                                    >
                                        <ul className={className.listMenu}>
                                            {item.children.map((subItem) => (
                                                <ItemGenerator item={subItem} />
                                            ))}
                                        </ul>
                                    </div>
                                </>
                            )}
                        </React.Fragment>
                    ))}
                </ul>
            </div>
        );
    });

    return (
        <>
            {ShowContext}
            <div className="w-full h-screen flex justify-between p-4 relative">
                <div className="w-2/12 p-1 flex flex-col justify-between text-jv-lightGray2x">
                    <img className="h-10 self-start" src={Logo} alt="" />
                    <div className="mt-1 h-full overflow-y-auto no-scrollbar">
                        <Menu />
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
                                onClick={() => setMainPage({ mainKey: LiteralsMainPage.RqAll, subPage: undefined })}
                                className="select-none cursor-pointer text-jv-primary flex flex-col items-center justify-center group relative"
                            >
                                <span className="button-Cms-type border-jv-lightPrimary bg-jv-lightPrimary shadow-jv-primary group-hover:shadow-xl group-active:scale-90">
                                    <BiGitPullRequest className="text-inherit transform-none" />
                                </span>
                                <span className="mt-3 text-xs">درخواست ها</span>
                            </li>
                            <li
                                onClick={() =>
                                    setMainPage({
                                        mainKey: LiteralsMainPage.Advertsisings,
                                        subPage: "Advertsisings_Add",
                                    })
                                }
                                className="select-none cursor-pointer text-jv-primary flex flex-col items-center justify-center group relative"
                            >
                                <span className="button-Cms-type border-jv-lightPrimary bg-jv-lightPrimary shadow-jv-primary group-hover:shadow-xl group-active:scale-90">
                                    <FaFileCirclePlus className="text-inherit transform-none" />
                                </span>
                                <span className="mt-3 text-xs">آگهی جدید</span>
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
                                            <li key={index}>
                                                <SubPageCms.RequsetNotifBox></SubPageCms.RequsetNotifBox>
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

const CmsPageGenerator: React.FC<CmsPageGeneratorProps> = ({ mainPage, setMainPage, showMess, subPage }) => {
    const ShowFromTopComponent: React.FC<React.PropsWithChildren> = ({ children }) => {
        return (
            <motion.div variants={ShortShowFromTop} initial="hidden" whileInView="visible">
                {children}
            </motion.div>
        );
    };

    //? MainPages
    const RequestAll: React.FC = () => {
        return (
            <>
                <div className="flex items-start justify-between">
                    <h3>تمامی درخواست ها</h3>
                    <ul>
                        <li className="flex items-center justify-between">
                            <span className="text-xs">قبول شده</span>
                            <div className="mr-3 w-3 h-3 rounded-full bg-jv-success"></div>
                        </li>
                        <li className="flex items-center justify-between">
                            <span className="text-xs">در حال انتظار</span>
                            <div className="mr-3 w-3 h-3 rounded-full bg-jv-warning"></div>
                        </li>
                        <li className="flex items-center justify-between">
                            <span className="text-xs">رد شده</span>
                            <div className="mr-3 w-3 h-3 rounded-full bg-jv-danger"></div>
                        </li>
                    </ul>
                </div>
                <div className="mt-3">
                    {Array(10)
                        .fill("")
                        .map((value, index) => (
                            <SubPageCms.ReqeustBox
                                key={`ReqeustBox-${index}`}
                                status={index === 2 || index === 5 ? "reject" : index === 7 ? "waiting" : "accept"}
                            ></SubPageCms.ReqeustBox>
                        ))}
                </div>
            </>
        );
    };
    const RequsetAccept: React.FC = () => {
        return (
            <>
                <h3>درخواست های تایید شده</h3>
                <div className="mt-3">
                    {Array(7)
                        .fill("")
                        .map((value, index) => (
                            <SubPageCms.ReqeustBox key={`ReqeustBox-${index}`}></SubPageCms.ReqeustBox>
                        ))}
                </div>
            </>
        );
    };
    const RequsetReject: React.FC = () => {
        return (
            <>
                <h3>درخواست های رد شده</h3>
                <div className="mt-3">
                    {Array(2)
                        .fill("")
                        .map((value, index) => (
                            <SubPageCms.ReqeustBox key={`ReqeustBox-${index}`}></SubPageCms.ReqeustBox>
                        ))}
                </div>
            </>
        );
    };
    const RequsetWait: React.FC = () => {
        return (
            <>
                <h3>درخواست های در حال انتظار</h3>
                <div className="mt-3">
                    {Array(1)
                        .fill("")
                        .map((value, index) => (
                            <SubPageCms.ReqeustBox key={`ReqeustBox-${index}`}></SubPageCms.ReqeustBox>
                        ))}
                </div>
            </>
        );
    };

    return (
        <div className="h-full flex flex-col overflow-hidden">
            <motion.ul
                key={`${mainPage}-multiPageList`}
                variants={ShortShowFromTop}
                initial="hidden"
                animate="visible"
                transition={SpringBackOutVeryShortly}
                className="w-full flex bg-jv-white"
            >
                {SubPageCms.subPageItem.map((item) =>
                    item.parnetPage === mainPage ? (
                        <li
                            key={`${item.subPage}-multiPageItem`}
                            onClick={() => setMainPage({ mainKey: item.parnetPage, subPage: item.subPage })}
                            className={`py-2 px-4 cursor-pointer ${
                                item.subPage === subPage
                                    ? "bg-jv-light rounded-t-lg text-jv-primary"
                                    : "text-jv-lightGray2x"
                            }`}
                        >
                            {item.title}
                        </li>
                    ) : null
                )}
            </motion.ul>
            <motion.div
                key={`${mainPage}-Page`}
                variants={ShortShowFromBottom}
                initial="hidden"
                animate="visible"
                className="w-full h-full text-jv-lightGray2x rounded-lg bg-jv-light p-4 overflow-y-auto no-scrollbar"
            >
                <ShowFromTopComponent key={`show${mainPage}-${subPage}`}>
                    {mainPage === "Home" || subPage === "Home_Edit" ? (
                        subPage === "Home_Edit" ? (
                            <SubPageCms.EditHomePage showMess={showMess}></SubPageCms.EditHomePage>
                        ) : (
                            <SubPageCms.MainHomePage />
                        )
                    ) : mainPage === "Advertsisings" ? (
                        subPage === "Advertsisings_Add" ? (
                            <SubPageCms.Advertising_Add showMess={showMess} />
                        ) : (
                            <SubPageCms.Advertising_Main />
                        )
                    ) : mainPage === "Request_All" ? (
                        <RequestAll></RequestAll>
                    ) : mainPage === "Request_Accept" ? (
                        <RequsetAccept></RequsetAccept>
                    ) : mainPage === "Request_Rejection" ? (
                        <RequsetReject></RequsetReject>
                    ) : mainPage === "Request_Waiting" ? (
                        <RequsetWait></RequsetWait>
                    ) : (
                        <></>
                    )}
                </ShowFromTopComponent>
            </motion.div>
        </div>
    );
};

export default CmsEmployer;
