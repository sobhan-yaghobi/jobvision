import uuidGenerator from "../../Utils/UuidGenerator";

export interface Messages {
    id: string;
    title: string;
}

const MessageArray: Messages[] = [
    { id: uuidGenerator(), title: "رایان گستر" },
    { id: uuidGenerator(), title: "صنعت رایان پارس" },
    { id: uuidGenerator(), title: "از کی وام" },
    { id: uuidGenerator(), title: "بانک خاورمیانه" },
    { id: uuidGenerator(), title: "بازرگانی الماس امید" },
    { id: uuidGenerator(), title: "بینالود" },
    { id: uuidGenerator(), title: "ستاک" },
    { id: uuidGenerator(), title: "خوشگوار" },
    { id: uuidGenerator(), title: "شرکت و صنایع چوبی پاسارگاد" },
];

export interface messageType {
    x: number | undefined;
    y: number | undefined;
    title: string;
    isShow: boolean;
    ArrowIcon: "Top" | "Bottom" | undefined;
}

export { MessageArray };
