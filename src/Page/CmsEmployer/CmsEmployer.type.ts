import { MenuProps } from "antd";
import { TypeMessShow } from "../../Hooks/useShowMssAndNotif";

export type CmsMenuItem = Required<MenuProps>["items"][number];

export namespace LiteralsMainPage {
    export type TypeMainPageItem = {
        label: React.ReactNode;
        key: React.Key;
        icon?: React.ReactNode;
        mainsubpage?: LiteralsMainPage.TypeSubMainPage;
        children?: CmsMenuItem[];
        type?: "group";
    };
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
    export type TypeSubMainPage = "Home_Edit" | "Home_Main";
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

export type EditHomePageProps = {
    showMess: CmsPageGeneratorProps["showMess"];
};
