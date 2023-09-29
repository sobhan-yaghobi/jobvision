interface AdvertisingBoxMainProps {
    data: {
        id: string;
    };
    IsResponsive?: boolean;
    IsImportant?: boolean;
}
type AdvertisingBoxTypesProps = { type: "HideSendCv"; clickHandler: Function } | { type: "ShowSendCv" };

export type AdvertisingBoxProps = AdvertisingBoxMainProps & AdvertisingBoxTypesProps;
