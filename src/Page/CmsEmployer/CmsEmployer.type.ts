import { TypeMessShow } from "../../Hooks/useShowMssAndNotif";

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
    //
    export type TypeSubMainPage = "Home_Edit" | "Home_Main" | "Advertsisings_Main" | "Advertsisings_Add";
}

export type CmsPageGeneratorProps = {
    mainPage: LiteralsMainPage.AllPage;
    subPage?: LiteralsMainPage.TypeMainPage["subPage"];
    showMess: ({}: TypeMessShow) => void;
    setMainPage: React.Dispatch<React.SetStateAction<LiteralsMainPage.TypeMainPage>>;
};

export type TypeSubPageItem = {
    parnetPage: LiteralsMainPage.AllPage;
    subPage: LiteralsMainPage.TypeSubMainPage;
    title: string;
};

export type HomePageProps = {
    isEditShow: boolean;
};
export type AdvertsisingsPageProps = {
    isAddShow: boolean;
};

export type EditHomePageProps = {
    showMess: CmsPageGeneratorProps["showMess"];
};

export type ProgressBarCardType = {
    percent: number;
    userCount: number;
    title: string;
    userCountRecommend: number;
};

export const ProgressCardArray: ProgressBarCardType[] = [
    { percent: 75, userCount: 3, title: "سازنده محتوا", userCountRecommend: 1 },
    { percent: 0, userCount: 1, title: "طراح ارشد رابط کاربری", userCountRecommend: 4 },
    { percent: 25, userCount: 9, title: "برنامه نویس node js", userCountRecommend: 20 },
    { percent: 45, userCount: 2, title: "مدیر بازاریابی", userCountRecommend: 2 },
];
