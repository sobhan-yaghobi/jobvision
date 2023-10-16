import React, { useState, useEffect } from "react";

// Types
import { CmsMenuItem, LiteralsMainPage } from "./CmsEmployer.type";

// Hook
import { useForm } from "react-hook-form";

// Components
import { Menu } from "antd";
import { motion, AnimatePresence } from "framer-motion";

// Icons
import { GoHomeFill } from "react-icons/go";
import { CgFileDocument } from "react-icons/cg";
import { BiGitPullRequest } from "react-icons/bi";
import { BsCheckAll } from "react-icons/bs";
import { RxLapTimer } from "react-icons/rx";
import { TbGitPullRequestClosed } from "react-icons/tb";
import { RiGitPullRequestFill } from "react-icons/ri";
import { z } from "zod";
import { SelectInput } from "../../Components/Input/Input";
import { TypeOptionInput } from "../../Components/Input/Input.type";
import { register } from "swiper/element";

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
    const [MainPage, setMainPage] = useState<{ mainKey: React.Key }>({ mainKey: LiteralsMainPage.Home });

    return (
        <>
            <div className="w-full h-screen flex justify-between p-4 relative">
                <Menu
                    className="w-2/12 p-1 ml-4 rounded-lg"
                    defaultSelectedKeys={[LiteralsMainPage.Home]}
                    defaultOpenKeys={["sub1"]}
                    mode="inline"
                    items={items}
                    onSelect={(props) => setMainPage({ mainKey: props.key })}
                />
                <AnimatePresence>
                    <motion.div className={`w-10/12 h-full rounded-lg bg-jv-light`}>
                        <CmsPageGenerator type={MainPage.mainKey as LiteralsMainPage.AllPage}></CmsPageGenerator>
                    </motion.div>
                </AnimatePresence>
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
        ownership: z.string({ required_error: "انتخاب نوع شرکت اجباری است" }).trim(),
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
            handleSubmit,
        } = useForm<TypeCompanyFormSchema>({});
        const submitAction = (data: TypeCompanyFormSchema) => {
            console.log("Okkkkkkkkkk", data);
        };
        return (
            <div className="flex h-full">
                <form action="" onSubmit={handleSubmit(submitAction)}>
                    <SelectInput
                        label="
                    نوع شرکت"
                        register={register("ownership")}
                        options={ownershipOptions}
                    />
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
