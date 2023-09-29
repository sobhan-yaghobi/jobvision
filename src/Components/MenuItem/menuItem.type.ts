import uuidGenerator from "../../Utils/UuidGenerator";

export interface SubLink {
    id: string;
    title: string;
    link: string;
}

export interface Link extends SubLink {
    sublinks: SubLink[];
}

export interface Item extends SubLink {
    links: Link[];
}

export interface SubMenu extends SubLink {
    megaMenu: boolean;
    items: Item[];
}

export interface MenuDesktopItemGenerateProps {
    menuData: SubMenu;
}
export interface SubMenuGeneratorProps {
    IsAnimation?: boolean;
    MobileVarient?: {};
    DesktopVarient?: {};
    Type: "Desktop" | "Mobile";
    ClassWhenActive?: String;
    ParentClassName: string;
    ChildClassName: string;
    Data: SubMenu[];
    ClickHandler: Function;
    // Mobile Type
    children?: React.ReactNode;
    // Desktop Type
    mainMenuDesktop?: SubMenu;
    Ref?: React.RefObject<HTMLLIElement>;
}
export interface ItemGeneratorProps {
    IsAnimation?: boolean;
    MobileVarient?: {};
    DesktopVarient?: {};
    Type: "Desktop" | "Mobile";
    ParentClassName: string;
    ChildClassName: string;
    Data: SubMenu;
    ClickHandler: Function;
    children?: React.ReactNode;
    ChildClassActivion?: string;
    mainItemData?: Item;
}
export interface LinkGeneratorProps {
    IsAnimation?: boolean;
    MobileVarient?: {};
    DesktopVarient?: {};
    Type: "Desktop" | "Mobile";
    ParentClassName: string;
    ChildClassName: string;
    LinksWrapperClassName: string;
    SublinkParentClassName: string;
    SublinkChildClassName: string;
    SublinkLinkWrapperClassName: string;
    children?: React.ReactNode;
    Data: Link[];
    ClickHandler: Function;
    isChildrenShow?: boolean;
}

export const menu: SubMenu[] = [
    {
        id: uuidGenerator(),
        title: "فرصت های شغلی",
        link: "jobs",
        items: [
            {
                id: uuidGenerator(),
                title: "پربازدیدترین شغل ها",
                link: "most-jobs",
                links: [
                    {
                        id: uuidGenerator(),
                        title: "برنامه نویسی و توسعه نرم افزار",
                        link: "programming",
                        sublinks: [
                            {
                                id: uuidGenerator(),
                                title: "فرانت اند",
                                link: "front-end",
                            },
                            {
                                id: uuidGenerator(),
                                title: "بک اند",
                                link: "back-end",
                            },
                            {
                                id: uuidGenerator(),
                                title: "برنامه نویسسی موبایل",
                                link: "mobile-programming",
                            },
                        ],
                    },
                    {
                        id: uuidGenerator(),
                        title: "مدیر محصول / مالک محصول",
                        link: "product-management",
                        sublinks: [],
                    },
                    {
                        id: uuidGenerator(),
                        title: "مهندسی معدن",
                        link: "mine-engineer",
                        sublinks: [],
                    },
                    {
                        id: uuidGenerator(),
                        title: "برنامه نویسی و توسعه نرم افزار",
                        link: "programming",
                        sublinks: [
                            {
                                id: uuidGenerator(),
                                title: "فرانت اند",
                                link: "front-end",
                            },
                            {
                                id: uuidGenerator(),
                                title: "بک اند",
                                link: "back-end",
                            },
                            {
                                id: uuidGenerator(),
                                title: "برنامه نویسسی موبایل",
                                link: "mobile-programming",
                            },
                        ],
                    },
                    {
                        id: uuidGenerator(),
                        title: "مدیر محصول / مالک محصول",
                        link: "product-management",
                        sublinks: [],
                    },
                    {
                        id: uuidGenerator(),
                        title: "مهندسی معدن",
                        link: "mine-engineer",
                        sublinks: [],
                    },
                    {
                        id: uuidGenerator(),
                        title: "مهندسی معدن",
                        link: "mine-engineer",
                        sublinks: [],
                    },
                    {
                        id: uuidGenerator(),
                        title: "برنامه نویسی و توسعه نرم افزار",
                        link: "programming",
                        sublinks: [
                            {
                                id: uuidGenerator(),
                                title: "فرانت اند",
                                link: "front-end",
                            },
                            {
                                id: uuidGenerator(),
                                title: "بک اند",
                                link: "back-end",
                            },
                            {
                                id: uuidGenerator(),
                                title: "برنامه نویسسی موبایل",
                                link: "mobile-programming",
                            },
                        ],
                    },
                    {
                        id: uuidGenerator(),
                        title: "مدیر محصول / مالک محصول",
                        link: "product-management",
                        sublinks: [],
                    },
                    {
                        id: uuidGenerator(),
                        title: "مهندسی معدن",
                        link: "mine-engineer",
                        sublinks: [],
                    },
                    {
                        id: uuidGenerator(),
                        title: "مدیر محصول / مالک محصول",
                        link: "product-management",
                        sublinks: [],
                    },
                    {
                        id: uuidGenerator(),
                        title: "مهندسی معدن",
                        link: "mine-engineer",
                        sublinks: [],
                    },
                    {
                        id: uuidGenerator(),
                        title: "برنامه نویسی و توسعه نرم افزار",
                        link: "programming",
                        sublinks: [
                            {
                                id: uuidGenerator(),
                                title: "فرانت اند",
                                link: "front-end",
                            },
                            {
                                id: uuidGenerator(),
                                title: "بک اند",
                                link: "back-end",
                            },
                            {
                                id: uuidGenerator(),
                                title: "برنامه نویسسی موبایل",
                                link: "mobile-programming",
                            },
                        ],
                    },
                    {
                        id: uuidGenerator(),
                        title: "مدیر محصول / مالک محصول",
                        link: "product-management",
                        sublinks: [],
                    },
                    {
                        id: uuidGenerator(),
                        title: "برنامه نویسی و توسعه نرم افزار",
                        link: "programming",
                        sublinks: [
                            {
                                id: uuidGenerator(),
                                title: "فرانت اند",
                                link: "front-end",
                            },
                            {
                                id: uuidGenerator(),
                                title: "بک اند",
                                link: "back-end",
                            },
                            {
                                id: uuidGenerator(),
                                title: "برنامه نویسسی موبایل",
                                link: "mobile-programming",
                            },
                        ],
                    },
                    {
                        id: uuidGenerator(),
                        title: "مدیر محصول / مالک محصول",
                        link: "product-management",
                        sublinks: [],
                    },
                    {
                        id: uuidGenerator(),
                        title: "برنامه نویسی و توسعه نرم افزار",
                        link: "programming",
                        sublinks: [
                            {
                                id: uuidGenerator(),
                                title: "فرانت اند",
                                link: "front-end",
                            },
                            {
                                id: uuidGenerator(),
                                title: "بک اند",
                                link: "back-end",
                            },
                            {
                                id: uuidGenerator(),
                                title: "برنامه نویسسی موبایل",
                                link: "mobile-programming",
                            },
                        ],
                    },
                    {
                        id: uuidGenerator(),
                        title: "مهندسی معدن",
                        link: "mine-engineer",
                        sublinks: [],
                    },
                    {
                        id: uuidGenerator(),
                        title: "مدیر محصول / مالک محصول",
                        link: "product-management",
                        sublinks: [],
                    },
                    {
                        id: uuidGenerator(),
                        title: "مهندسی معدن",
                        link: "mine-engineer",
                        sublinks: [],
                    },
                    {
                        id: uuidGenerator(),
                        title: "مهندسی معدن",
                        link: "mine-engineer",
                        sublinks: [],
                    },
                    {
                        id: uuidGenerator(),
                        title: "مهندسی معدن",
                        link: "mine-engineer",
                        sublinks: [],
                    },
                    {
                        id: uuidGenerator(),
                        title: "برنامه نویسی و توسعه نرم افزار",
                        link: "programming",
                        sublinks: [
                            {
                                id: uuidGenerator(),
                                title: "فرانت اند",
                                link: "front-end",
                            },
                            {
                                id: uuidGenerator(),
                                title: "بک اند",
                                link: "back-end",
                            },
                            {
                                id: uuidGenerator(),
                                title: "برنامه نویسسی موبایل",
                                link: "mobile-programming",
                            },
                        ],
                    },
                    {
                        id: uuidGenerator(),
                        title: "مهندسی معدن",
                        link: "mine-engineer",
                        sublinks: [],
                    },
                    {
                        id: uuidGenerator(),
                        title: "مهندسی معدن",
                        link: "mine-engineer",
                        sublinks: [],
                    },
                    {
                        id: uuidGenerator(),
                        title: "برنامه نویسی و توسعه نرم افزار",
                        link: "programming",
                        sublinks: [
                            {
                                id: uuidGenerator(),
                                title: "فرانت اند",
                                link: "front-end",
                            },
                            {
                                id: uuidGenerator(),
                                title: "بک اند",
                                link: "back-end",
                            },
                            {
                                id: uuidGenerator(),
                                title: "برنامه نویسسی موبایل",
                                link: "mobile-programming",
                            },
                        ],
                    },
                    {
                        id: uuidGenerator(),
                        title: "مدیر محصول / مالک محصول",
                        link: "product-management",
                        sublinks: [],
                    },
                    {
                        id: uuidGenerator(),
                        title: "مهندسی معدن",
                        link: "mine-engineer",
                        sublinks: [],
                    },
                    {
                        id: uuidGenerator(),
                        title: "مدیر محصول / مالک محصول",
                        link: "product-management",
                        sublinks: [],
                    },
                    {
                        id: uuidGenerator(),
                        title: "مهندسی معدن",
                        link: "mine-engineer",
                        sublinks: [],
                    },
                    {
                        id: uuidGenerator(),
                        title: "برنامه نویسی و توسعه نرم افزار",
                        link: "programming",
                        sublinks: [
                            {
                                id: uuidGenerator(),
                                title: "فرانت اند",
                                link: "front-end",
                            },
                            {
                                id: uuidGenerator(),
                                title: "بک اند",
                                link: "back-end",
                            },
                            {
                                id: uuidGenerator(),
                                title: "برنامه نویسسی موبایل",
                                link: "mobile-programming",
                            },
                        ],
                    },
                    {
                        id: uuidGenerator(),
                        title: "مدیر محصول / مالک محصول",
                        link: "product-management",
                        sublinks: [],
                    },
                    {
                        id: uuidGenerator(),
                        title: "برنامه نویسی و توسعه نرم افزار",
                        link: "programming",
                        sublinks: [
                            {
                                id: uuidGenerator(),
                                title: "فرانت اند",
                                link: "front-end",
                            },
                            {
                                id: uuidGenerator(),
                                title: "بک اند",
                                link: "back-end",
                            },
                            {
                                id: uuidGenerator(),
                                title: "برنامه نویسسی موبایل",
                                link: "mobile-programming",
                            },
                        ],
                    },
                    {
                        id: uuidGenerator(),
                        title: "مدیر محصول / مالک محصول",
                        link: "product-management",
                        sublinks: [],
                    },
                    {
                        id: uuidGenerator(),
                        title: "برنامه نویسی و توسعه نرم افزار",
                        link: "programming",
                        sublinks: [
                            {
                                id: uuidGenerator(),
                                title: "فرانت اند",
                                link: "front-end",
                            },
                            {
                                id: uuidGenerator(),
                                title: "بک اند",
                                link: "back-end",
                            },
                            {
                                id: uuidGenerator(),
                                title: "برنامه نویسسی موبایل",
                                link: "mobile-programming",
                            },
                        ],
                    },
                    {
                        id: uuidGenerator(),
                        title: "مهندسی معدن",
                        link: "mine-engineer",
                        sublinks: [],
                    },
                    {
                        id: uuidGenerator(),
                        title: "مدیر محصول / مالک محصول",
                        link: "product-management",
                        sublinks: [],
                    },
                    {
                        id: uuidGenerator(),
                        title: "مهندسی معدن",
                        link: "mine-engineer",
                        sublinks: [],
                    },
                    {
                        id: uuidGenerator(),
                        title: "مدیر محصول / مالک محصول",
                        link: "product-management",
                        sublinks: [],
                    },
                    {
                        id: uuidGenerator(),
                        title: "مهندسی معدن",
                        link: "mine-engineer",
                        sublinks: [],
                    },
                    {
                        id: uuidGenerator(),
                        title: "مدیر محصول / مالک محصول",
                        link: "product-management",
                        sublinks: [],
                    },
                ],
            },
            {
                id: uuidGenerator(),
                title: "استان و شهر",
                link: "cityes",
                links: [
                    {
                        id: uuidGenerator(),
                        title: "خراسان رضوی",
                        link: "khorasan-razavi",
                        sublinks: [
                            {
                                id: uuidGenerator(),
                                title: "مشهد",
                                link: "mashhad",
                            },
                            {
                                id: uuidGenerator(),
                                title: "نیشابور",
                                link: "neyshaboor",
                            },
                        ],
                    },
                    {
                        id: uuidGenerator(),
                        title: "تهران",
                        link: "tehran",
                        sublinks: [],
                    },
                ],
            },
            {
                id: uuidGenerator(),
                title: "نوع همکاری",
                link: "Cooperation",
                links: [
                    // {
                    //     id: uuidGenerator(),
                    //     title: "دورکاری",
                    //     link: "remote",
                    //     sublinks: [
                    //         {
                    //             id: uuidGenerator(),
                    //             title: "در تهران",
                    //             link: "remote-in-tehran",
                    //         },
                    //         {
                    //             id: uuidGenerator(),
                    //             title: "در مشهد",
                    //             link: "remote-in-mashhad",
                    //         },
                    //         {
                    //             id: uuidGenerator(),
                    //             title: "با بالاترین حقوق",
                    //             link: "remote-max-salary",
                    //         },
                    //     ],
                    // },
                ],
            },
        ],
        megaMenu: true,
    },
    {
        id: uuidGenerator(),
        title: "محصولات",
        link: "prodcutions",
        items: [
            {
                id: uuidGenerator(),
                title: "ماشین حساب حقوق و دستمزد",
                link: "calc",
                links: [],
            },
            {
                id: uuidGenerator(),
                title: "خودت رو بشناس",
                link: "know-yourself",
                links: [
                    { id: uuidGenerator(), title: "آزمون شخصیت شناسی MBTI", link: "test-1", sublinks: [] },
                    { id: uuidGenerator(), title: "آزمون تیپ سنجی شغلی Holland", link: "test-2", sublinks: [] },
                    { id: uuidGenerator(), title: "آزمون شخصیت شناسی NEO", link: "test-3", sublinks: [] },
                    { id: uuidGenerator(), title: "آزمون هوش های چندگانه", link: "test-4", sublinks: [] },
                    { id: uuidGenerator(), title: "آزمون هوش هیجانی Bar-On", link: "test-5", sublinks: [] },
                ],
            },
            { id: uuidGenerator(), title: "توانمندتر شو", link: "go-strong", links: [] },
            { id: uuidGenerator(), title: "داده های بازار کار", link: "data", links: [] },
            { id: uuidGenerator(), title: "بلاگ", link: "blog", links: [] },
        ],
        megaMenu: false,
    },
    {
        id: uuidGenerator(),
        title: "رده بندی شرکت ها",
        link: "company",
        items: [],
        megaMenu: false,
    },
    {
        id: uuidGenerator(),
        title: "رزومه ساز",
        link: "cv",
        items: [],
        megaMenu: false,
    },
];
