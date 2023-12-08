import { isForLinks } from "../../Hooks/useShowMenu/useShowMenu.type";

export interface tagType extends mainType {
    category_id: string;
}
export interface cityType extends mainType {
    link: string;
    province_id: string;
}
type mainType = {
    created_at: string;
    id: string;
    title: string;
};
export interface Type_Link extends mainType {
    item_id: string;
    link: string;
}
export interface link extends Type_Link {
    sublinks: (tagType | cityType)[];
}
export interface Type_Item extends mainType {
    link: string;
    menu_id: string;
}
export interface itemLinks extends Type_Item {
    links: link[];
}
export interface Type_Menu extends mainType {
    link: string;
    megaMenu: boolean;
}
export interface menuItems extends Type_Menu {
    items: itemLinks[];
}
export interface MenuDesktopItemGenerateProps {
    onClose: () => void;
    menuData: menuItems;
}
export type SubMenuGeneratorMain = {
    className: [
        {
            ClassWhenActive?: string;
            ParentClassName?: string;
            ChildClassName?: string;
        }
    ];
    Data: menuItems[];
    ClickHandler: Function;
    Ref?: React.RefObject<HTMLLIElement>;
    children?: React.ReactNode;
    IsAnimation?: boolean;
};
export type SubMenuGeneratorTypes =
    | {
          Type: "Desktop";
          DesktopVarient?: {};
          mainMenuDesktop?: menuItems;
      }
    | {
          Type: "Mobile";
          MobileVarient?: {};
      };

export type SubMenuGeneratorProps = SubMenuGeneratorMain & SubMenuGeneratorTypes;
export type ItemGeneratorMain = {
    className: [
        {
            ParentClassName: string;
            ChildClassName: string;
            ChildClassActivion?: string;
        }
    ];
    Data: menuItems;
    IsAnimation?: boolean;
};
export type ItemGeneratorTypes =
    | {
          Type: "Desktop";
          DesktopVarient?: {};
          mainItemData?: itemLinks;
          ClickHandler: (item: itemLinks) => void;
      }
    | {
          Type: "Mobile";
          MobileVarient?: {};
          children: React.ReactNode;
          ClickHandler: ({}: isForLinks) => void;
      };
export type ItemGeneratorProps = ItemGeneratorMain & ItemGeneratorTypes;
export interface LinkGeneratorProps {
    IsAnimation?: boolean;
    MobileVarient?: {};
    DesktopVarient?: {};
    Type: "Desktop" | "Mobile";
    className: [
        {
            ParentClassName: string;
            ChildClassName: string;
            LinksWrapperClassName: string;
            LinksTitleClassName?: string;
            SublinkParentClassName: string;
            SublinkChildClassName: string;
            SublinkLinkWrapperClassName: string;
        }
    ];
    children?: React.ReactNode;
    Data: link[];
    onClose: MenuDesktopItemGenerateProps["onClose"];
    mainItem: itemLinks;
    isChildrenShow?: boolean;
}
