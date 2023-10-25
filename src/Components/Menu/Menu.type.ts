import { LiteralsMainPage } from "../../Page/CmsEmployer/CmsEmployer.type";

export type mainItemType = {
    mainItem: MenuItemType | undefined;
    mainItemSelected: MenuItemType["key"] | undefined;
};
export type MenuItemType = {
    key: React.Key;
    label: string;
    icon?: React.ReactNode;
    mainSubPage?: LiteralsMainPage.TypeSubMainPage;
    children?: MenuItemType[];
    parentKey?: MenuItemType["key"];
};

type setType = {
    key: LiteralsMainPage.TypeMainPage;
};

export type MenuProps = {
    defaultItem?: MenuItemType["key"];
    // setDefaultAction: ({}: setType) => void;
    items: MenuItemType[];
    className?: string;
    onSelect: (mainItem: MenuItemType) => void;
};
export namespace MenuClassNames {
    export const className = {
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
}
