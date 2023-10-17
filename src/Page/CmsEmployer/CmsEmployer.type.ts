import { MenuProps } from "antd";

export type CmsMenuItem = Required<MenuProps>["items"][number];

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
    export type TypeSubMainPage = "Home_Edit";
}

export type HomePageProps = {
    isEditShow: boolean;
};
