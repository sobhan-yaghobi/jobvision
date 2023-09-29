import uuidGenerator from "../../Utils/UuidGenerator";

const categoryArray: { id: string; title: string; isSub: boolean }[] = [
    { id: uuidGenerator(), title: "دورکاری", isSub: false },
    { id: uuidGenerator(), title: "کارآموزی", isSub: false },
    { id: uuidGenerator(), title: "نوع همکاری", isSub: true },
    { id: uuidGenerator(), title: "زمان انتشار", isSub: true },
    { id: uuidGenerator(), title: "سابقه کاری", isSub: true },
    { id: uuidGenerator(), title: "سطح ارشدیت", isSub: true },
    { id: uuidGenerator(), title: "مزایا و تسهیلات", isSub: true },
    { id: uuidGenerator(), title: "صنعت", isSub: true },
    { id: uuidGenerator(), title: "امکان استخدام معلولین", isSub: false },
    { id: uuidGenerator(), title: "امریه سربازی", isSub: false },
];

export interface SearchFromProps {
    isFilterBarShow: boolean;
}

export { categoryArray };
