export type MenuItemType = {
    key: React.Key;
    label: string;
    icon?: React.ReactNode;
    link?: string;
    children?: MenuItemType[];
    parentKey?: MenuItemType["key"];
};
export type MenuProps = {
    mainSubItem: MenuItemType;
    setMainSubItem: React.Dispatch<React.SetStateAction<MenuItemType>>;
};
export type ItemGeneratorPorps = {
    item: MenuItemType;
};
