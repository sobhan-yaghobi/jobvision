import React, { useState } from "react";
import { z } from "zod";

// Types
import { CmsMenuItem, LiteralsMainPage } from "./CmsEmployer.type";
import { SelectInput } from "../../Components/Input/Input";
import { TypeOptionInput } from "../../Components/Input/Input.type";

// Hook
import { useForm } from "react-hook-form";

// Components
import { Menu } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../Components/Button/Button";

// Icons
import { GoHomeFill } from "react-icons/go";
import { CgFileDocument } from "react-icons/cg";
import { BiGitPullRequest } from "react-icons/bi";
import { BsCheckAll } from "react-icons/bs";
import { RxLapTimer } from "react-icons/rx";
import { TbGitPullRequestClosed } from "react-icons/tb";
import { RiGitPullRequestFill } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import Logo from "/Svg/Logo/PrimaryColorLogo.svg";
import reportIcon from "/images/report.webp";
import { HiOutlineLogout } from "react-icons/hi";
import { CiEdit, CiUser } from "react-icons/ci";
import { AiOutlineEye } from "react-icons/ai";

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
    const [isShowCompanyProfile, setIsShowCompanyProfile] = useState(true);
    const [MainPage, setMainPage] = useState<{ mainKey: React.Key }>({ mainKey: LiteralsMainPage.Home });

    return (
        <>
            <div className="w-full h-screen flex justify-between p-4 relative">
                <div className="w-2/12 p-1 flex flex-col justify-between">
                    <div>
                        <img className="px-2" src={Logo} alt="" />
                        <Menu
                            className="!border-none rounded-lg my-1"
                            defaultSelectedKeys={[LiteralsMainPage.Home]}
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
                        className={`${
                            isShowCompanyProfile ? "w-7/12" : "w-10/12"
                        } h-full rounded-lg mx-4 bg-jv-light p-4`}
                    >
                        <CmsPageGenerator type={MainPage.mainKey as LiteralsMainPage.AllPage}></CmsPageGenerator>
                    </motion.div>
                </AnimatePresence>
                <div className="w-3/12 h-full">
                    <div className="h-3/6 flex flex-col items-center">
                        <div className="w-full flex items-center justify-end">
                            <span
                                title="خروج از پنل"
                                className="button-Cms-type text-jv-danger ml-2 border-jv-lightDanger  hover:bg-jv-lightDanger"
                            >
                                <HiOutlineLogout className="text-inherit transition-none" />
                            </span>
                            <span
                                title="بستن پروفایل"
                                className="button-Cms-type text-jv-lightGray2x p-2 border-jv-lightGray3x hover:bg-jv-lightGray3x"
                            >
                                <AiOutlineClose className="text-inherit transition-none" />
                            </span>
                        </div>
                        <img className="rounded-full h-16 shadow-xl" src="/images/company-Sheypoor.webp" alt="" />
                        <h3 className="mt-3 text-jv-lightGray2x">شیپور</h3>
                        <ul className="w-full my-5 flex items-center justify-around">
                            <li className="select-none cursor-pointer text-jv-primary flex flex-col items-center justify-center group">
                                <span className="button-Cms-type border-jv-lightPrimary bg-jv-lightPrimary shadow-jv-primary group-hover:shadow-xl group-active:scale-90">
                                    <CiEdit className="text-inherit transform-none" />
                                </span>
                                <span className="mt-3 text-xs font-semibold">ویرایش اطلاعات</span>
                            </li>
                            <li className="select-none cursor-pointer text-jv-primary flex flex-col items-center justify-center group relative">
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
                                    {Array(3)
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

type CmsPageGeneratorProps = {
    type: LiteralsMainPage.AllPage;
};

const CmsPageGenerator: React.FC<CmsPageGeneratorProps> = ({ type }) => {
    console.log("CmsPageGenerator", type);

    const messageLengthGenerator = (type: "Min" | "Max", name: string, length: number): string =>
        `${type === "Min" ? "حداقل" : type === "Max" ? "حداکثر" : null} ${length} کاکرتر برای ${name} ${
            type === "Min" ? "مورد نیاز است" : type === "Max" ? "مجاز میباشد" : null
        }`;
    const messageUrlNotValid = (name: string): string => `لینک ${name} معتبر نمیباشد`;

    const CompanyFormSchema = z.object({
        name: z.string().trim().min(3, messageLengthGenerator("Min", "نام شرکت", 3)),
        location: z.string().trim().min(10, messageLengthGenerator("Min", "موقعیت مکانی", 10)),
        logo: z.string().trim().url(messageUrlNotValid("لوگو شرکت")),
        website: z.string().trim().url(messageUrlNotValid("وب سایت شرکت")),
        desc: z.string().trim().max(500, messageLengthGenerator("Max", "درباره شرکت", 500)),
        CompanySlogan: z.string().trim().max(50, messageLengthGenerator("Max", "شعار شرکت شما", 50)),
        Benefits: z.string().trim().optional(),
        establishedyear: z.date(),
        OrganizationEmploy: z.number(),
        ownership: z.string({ invalid_type_error: "انتخاب نوع شرکت اجباری است" }).trim(),
        // ownership: z.object({
        //     value: z.string(),
        //     label: z.string(),
        // }),
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

    if (type === "Home") {
        const {
            formState: { isSubmitting },
            register,
            getValues,
            handleSubmit,
        } = useForm<TypeCompanyFormSchema>({});
        const submitAction = (data: TypeCompanyFormSchema) => {
            console.log("Okkkkkkkkkk", data);
        };
        const go = () => console.log(getValues());

        return (
            <div className="flex h-full">
                <form action="" onSubmit={handleSubmit(submitAction)}>
                    <SelectInput
                        label="
                    نوع شرکت"
                        register={register("ownership")}
                        options={ownershipOptions}
                    />
                    <button onClick={() => go()}>Click</button>
                </form>
            </div>
        );
    }
};

type dd = {
    company: {
        name: string;
        location: string;
        logo: string;
        score?: {
            companyScore: number;
            popularityScore: number;
            experienceOfJobSeekersScore: number;
            responsivenessScore: number;
        };
        website: string;
        desc: string;
        CompanySlogan: string;
        Benefits?: string[];
        establishedyear: number;
        OrganizationEmploy: number;
        ownership?: "Government" | "Private";
        typeOfActivity?: string;
        industry?: string;
    };
};
