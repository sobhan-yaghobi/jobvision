import uuidGenerator from "../../Utils/UuidGenerator";

export interface TypeCitis {
    id: string;
    name: string;
}

export type TypeGroupsJobs = TypeCitis;

export const citis: TypeCitis[] = [
    { id: uuidGenerator(), name: "مشهد" },
    { id: uuidGenerator(), name: "تهران" },
    { id: uuidGenerator(), name: "نیشابور" },
];

export const groupJobs: TypeGroupsJobs[] = [
    { id: uuidGenerator(), name: "برنامه نویس" },
    { id: uuidGenerator(), name: "برنامه نویس فرانت اند" },
    { id: uuidGenerator(), name: "برنامه نویس بک اند" },
    { id: uuidGenerator(), name: "طراحی گرافیک" },
    { id: uuidGenerator(), name: "طراحی" },
];

export type ItemGeneratorProps = {
    array: TypeCitis[] | TypeGroupsJobs[];
    mainValue: string;
    setMainValue: (value: string) => void;
};
