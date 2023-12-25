export type MenuItemType = {
    key: React.Key;
    label: string;
    icon?: React.ReactNode;
    link?: string;
    children?: MenuItemType[];
    parentKey?: MenuItemType["key"];
};
export type ItemGeneratorPorps = {
    item: MenuItemType;
};
