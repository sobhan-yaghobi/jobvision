export type MenuItemType = {
  id: string;
  title: string;
  href: string;
  subMenu?: MenuItemType[];
  mega?: boolean;
};

export const MenusItems: MenuItemType[] = [
  {
    mega: true,
    id: "1",
    href: "",
    title: "فرصت های شغلی",
    subMenu: [
      {
        id: "2",
        title: "برنامه نویسی فرانت اند",
        href: "Front",
        subMenu: [
          {
            id: "3",
            title: "برنامه نویسی ری اکت",
            href: "React",
          },
          {
            id: "4",
            title: "برنامه نویسی ویو",
            href: "Vue",
          },
          {
            id: "5",
            title: "برنامه نویسی  انگیولار",
            href: "Angular",
            subMenu: [
              {
                id: "6",
                title: "برنامه ماژولار",
                href: "Angular",
              },
            ],
          },
        ],
      },
      {
        id: "7",
        title: "برنامه نویسی بک اند",
        href: "Back",
      },
      {
        id: "8",
        title: "برنامه نویسی هوش مصنوعی",
        href: "AI",
      },
    ],
  },
  {
    mega: false,
    id: "9",
    href: "",
    title: "محصولات",
    subMenu: [
      { id: "10", href: "", title: "ماشین حساب حقوق و دستمزد" },
      {
        id: "11",
        href: "",
        title: "خودت رو بشناس",
        subMenu: [
          {
            id: "12",
            href: "",
            title: "آزمون شخصیت شناسی MBTI",
          },
          {
            id: "13",
            href: "",
            title: "آزمون تیپ سنجی شغلی Holland",
          },
          { id: "14", href: "", title: "آزمون شخصیت شناسی NEO" },
          { id: "15", href: "", title: "آزمون هوش های چندگانه" },
          {
            id: "16",
            href: "",
            title: "آزمون هوش هیجانی Bar-On",
          },
        ],
      },
      { id: "17", href: "", title: "توانمندتر شو" },
      { id: "18", href: "", title: "داده های بازار کار" },
      { id: "19", href: "", title: "بلاگ" },
    ],
  },
  { mega: false, id: "20", href: "", title: "رده بندی شرکت ها" },
  { mega: false, id: "21", href: "", title: "رزومه ساز" },
];
