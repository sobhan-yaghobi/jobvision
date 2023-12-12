import { TypeMessShow } from "../../Hooks/useShowMssAndNotif";
import { TypeOptionInput } from "../../Components/Input/Input.type";

export namespace LiteralsMainPage {
    export type TypeMainPage = {
        mainKey: React.Key;
        subPage?: LiteralsMainPage.TypeSubMainPage;
    };
    export type Home = "Home";
    export type Advertsisings = "Advertsisings";
    export type Request_Accept = "Request_Accept";
    export type Request_Rejection = "Request_Rejection";
    export type Request_Waiting = "Request_Waiting";
    export type Request_All = "Request_All";
    export type AllPage = Home | Advertsisings | Request_Accept | Request_Rejection | Request_Waiting | Request_All;
    export const Home: Home = "Home";
    export const Advertsisings: Advertsisings = "Advertsisings";
    export const RqAccept: Request_Accept = "Request_Accept";
    export const RqRejection: Request_Rejection = "Request_Rejection";
    export const RqWaiting: Request_Waiting = "Request_Waiting";
    export const RqAll: Request_All = "Request_All";
    export type TypeSubMainPage = "Home_Edit" | "Home_Main" | "Advertsisings_Main" | "Advertsisings_Add";
}

export type MenuItemType = {
    key: React.Key;
    label: string;
    icon?: React.ReactNode;
    mainSubPage?: LiteralsMainPage.TypeSubMainPage;
    children?: MenuItemType[];
    parentKey?: MenuItemType["key"];
};

export type ItemGeneratorPorps = {
    item: MenuItemType;
};

export type CmsPageGeneratorProps = {
    mainPage: LiteralsMainPage.AllPage;
    subPage?: LiteralsMainPage.TypeMainPage["subPage"];
    showMess: ({}: TypeMessShow) => void;
    setMainPage: React.Dispatch<React.SetStateAction<LiteralsMainPage.TypeMainPage>>;
};

export namespace SubPageCmsTypes {
    //? Global Types
    export type TypeSubPageItem = {
        parnetPage: LiteralsMainPage.AllPage;
        subPage: LiteralsMainPage.TypeSubMainPage;
        title: string;
    };
    export type ProgressBarCardType = {
        percent: number;
        userCount: number;
        title: string;
        userCountRecommend: number;
    };

    //? Home Types
    export type EditHomePageProps = {
        showMess: CmsPageGeneratorProps["showMess"];
    };
    export const ownershipOptions: TypeOptionInput[] = [
        {
            value: "Private",
            label: "خصوصی",
        },
        {
            value: "Government",
            label: "دولتی",
        },
    ];
    export const ProgressCardArray: ProgressBarCardType[] = [
        { percent: 75, userCount: 3, title: "سازنده محتوا", userCountRecommend: 1 },
        { percent: 0, userCount: 1, title: "طراح ارشد رابط کاربری", userCountRecommend: 4 },
        { percent: 25, userCount: 9, title: "برنامه نویس node js", userCountRecommend: 20 },
        { percent: 45, userCount: 2, title: "مدیر بازاریابی", userCountRecommend: 2 },
    ];

    //? Request Types
    export type RequestPageProps = {
        page:
            | LiteralsMainPage.Request_Accept
            | LiteralsMainPage.Request_Rejection
            | LiteralsMainPage.Request_All
            | LiteralsMainPage.Request_Waiting;
    };
    export type ReqeustBoxProps = {
        status?: "waiting" | "reject" | "accept";
    };

    //? Advertising Types
    export type AdvertisingAddProps = EditHomePageProps;
    type TypeAdSelectForm = {
        label: string;
        value: string;
    };
    export const typeOfCooperationOption: TypeOptionInput[] = [
        { label: "تمام وقت", value: "TYPE_OF_COOPERTION_FULL_TIME" },
        { label: "پاره وقت", value: "TYPE_OF_COOPERTION_PART_TIME" },
        { label: "قراردادی", value: "TYPE_OF_COOPERTION_CONTRACTUAL_TIME" },
    ];
    export const genderOption: TypeOptionInput[] = [
        { label: "تفاوتی ندارد", value: "NotImportant" },
        { label: "مرد", value: "Male" },
        { label: "زن", value: "Female" },
    ];
    export const BenefitsTypeArray: TypeAdSelectForm[] = [
        { label: "وام", value: "BENEFITS_AND_FACILITIES_LOAN" },
        { label: "پارکینگ", value: "BENEFITS_AND_FACILITIES_PARKING" },
        { label: "پاداش", value: "BENEFITS_AND_FACILITIES_REWARD" },
    ];
    export const seniorityLevelArray: TypeAdSelectForm[] = [
        { label: "کارگر", value: "SENIORITY_LEVEL_MANUAL_WORKER" },
        { label: "کارمند", value: "SENIORITY_LEVEL_EMPLOYEE" },
        { label: "کارشناس", value: "SENIORITY_LEVEL_EXPERT" },
        { label: "کارشناس ارشد", value: "SENIORITY_LEVEL_MA" },
        { label: "مدیر میانی", value: "SENIORITY_LEVEL_MID_LEVEL_MANAGER" },
        { label: "معاونت", value: "SENIORITY_LEVEL_ASSISTANCE" },
        { label: "مدیرارشد", value: "SENIORITY_LEVEL_CHIEF" },
    ];
    export const workExperienceArray: TypeAdSelectForm[] = [
        { label: "کمتر از دو سال", value: "WORK_EXPERIENCE_UNDER_2_YR" },
        { label: "بین دو تا پنج سال", value: "WORK_EXPERIENCE_AMONG_2_5_YR" },
        { label: "بین پنج تا هشت سال", value: "WORK_EXPERIENCE_AMONG_5_8_YR" },
        { label: "بین هشت تا دوازده سال", value: "WORK_EXPERIENCE_AMONG_8_12_YR" },
        { label: "بالای دوازده سال", value: "WORK_EXPERIENCE_OVER_12_YR" },
    ];
}
