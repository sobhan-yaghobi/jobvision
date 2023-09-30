import uuidGenerator from "../../Utils/UuidGenerator";

type TELECOMMUTING = "TELECOMMUTING";
type INTERSHIP = "INTERSHIP";
type TYPE_OF_COOPERTION = "TYPE_OF_COOPERTION";
type RIGHTS = "RIGHTS";
type PUBLICATION_DATE = "PUBLICATION_DATE";
type WORK_EXPERIENCE = "WORK_EXPERIENCE";
type SENIORITY_LEVEL = "SENIORITY_LEVEL";
type BENEFITS_AND_FACILITIES = "BENEFITS_AND_FACILITIES";
type IS_EMPLOYMENT_OF_THE_DISABLED = "IS_EMPLOYMENT_OF_THE_DISABLED";
type MILITARY_ORDER = "MILITARY_ORDER";

type TYPE_OF_COOPERTION_FULL_TIME = "TYPE_OF_COOPERTION_FULL_TIME";
type TYPE_OF_COOPERTION_CONTRACTUAL_TIME = "TYPE_OF_COOPERTION_CONTRACTUAL_TIME";
type TYPE_OF_COOPERTION_PART_TIME = "TYPE_OF_COOPERTION_PART_TIME";

type RIGHTS_UNDER_4_MILLION = "RIGHTS_UNDER_4_MILLION";
type RIGHTS_AMONG_4_8_MILLION = "RIGHTS_AMONG_4_8_MILLION";
type RIGHTS_AMONG_8_12_MILLION = "RIGHTS_AMONG_8_12_MILLION";
type RIGHTS_AMONG_12_20_MILLION = "RIGHTS_AMONG_12_20_MILLION";
type RIGHTS_OVER_60_MILLION = "RIGHTS_OVER_60_MILLION";

type PUBLICATION_DATE_LAST_3_DAY = "PUBLICATION_DATE_LAST_3_DAY";
type PUBLICATION_DATE_LAST_1_WEEK = "PUBLICATION_DATE_LAST_1_WEEK";
type PUBLICATION_DATE_LAST_15_DAY = "PUBLICATION_DATE_LAST_15_DAY";
type PUBLICATION_DATE_LAST_1_MONTH = "PUBLICATION_DATE_LAST_1_MONTH";

type WORK_EXPERIENCE_UNDER_2_YR = "WORK_EXPERIENCE_UNDER_2_YR";
type WORK_EXPERIENCE_AMONG_2_5_YR = "WORK_EXPERIENCE_AMONG_2_5_YR";
type WORK_EXPERIENCE_AMONG_5_8_YR = "WORK_EXPERIENCE_AMONG_5_8_YR";
type WORK_EXPERIENCE_AMONG_8_12_YR = "WORK_EXPERIENCE_AMONG_8_12_YR";
type WORK_EXPERIENCE_OVER_12_YR = "WORK_EXPERIENCE_OVER_12_YR";

type SENIORITY_LEVEL_MANUAL_WORKER = "SENIORITY_LEVEL_MANUAL_WORKER";
type SENIORITY_LEVEL_EMPLOYEE = "SENIORITY_LEVEL_EMPLOYEE";
type SENIORITY_LEVEL_EXPERT = "SENIORITY_LEVEL_EXPERT";
type SENIORITY_LEVEL_MA = "SENIORITY_LEVEL_MA";
type SENIORITY_LEVEL_MID_LEVEL_MANAGER = "SENIORITY_LEVEL_MID_LEVEL_MANAGER";
type SENIORITY_LEVEL_ASSISTANCE = "SENIORITY_LEVEL_ASSISTANCE";
type SENIORITY_LEVEL_CHIEF = "SENIORITY_LEVEL_CHIEF";

type BENEFITS_AND_FACILITIES_LOAN = "BENEFITS_AND_FACILITIES_LOAN";
type BENEFITS_AND_FACILITIES_REWARD = "BENEFITS_AND_FACILITIES_REWARD";
type BENEFITS_AND_FACILITIES_PARKING = "BENEFITS_AND_FACILITIES_PARKING";

type TypeAndTitleOfFilterTypes =
    | {
          title: "دورکاری";
          type: TELECOMMUTING;
      }
    | {
          title: "کارآموزی";
          type: INTERSHIP;
      }
    | {
          title: "نوع همکاری";
          type: TYPE_OF_COOPERTION;
      }
    | {
          title: "حقوق";
          type: RIGHTS;
      }
    | {
          title: "زمان انتشار";
          type: PUBLICATION_DATE;
      }
    | {
          title: "سابقه کاری";
          type: WORK_EXPERIENCE;
      }
    | {
          title: "سطح ارشدیت";
          type: SENIORITY_LEVEL;
      }
    | {
          title: "مزایا و تسهیلات";
          type: BENEFITS_AND_FACILITIES;
      }
    | {
          title: "امکان استخدام معلولین";
          type: IS_EMPLOYMENT_OF_THE_DISABLED;
      }
    | {
          title: "امریه سربازی";
          type: MILITARY_ORDER;
      };

type TypeAndTitleOfChildFilterTypes =
    | { type: TYPE_OF_COOPERTION_FULL_TIME; title: "تمام وقت"; parentType: TYPE_OF_COOPERTION }
    | { type: TYPE_OF_COOPERTION_CONTRACTUAL_TIME; title: "قراردای / پروژه ای"; parentType: TYPE_OF_COOPERTION }
    | { type: TYPE_OF_COOPERTION_PART_TIME; title: "نیمه وقت"; parentType: TYPE_OF_COOPERTION }
    | { type: RIGHTS_UNDER_4_MILLION; title: "زیر 4 میلیون تومان"; parentType: RIGHTS }
    | { type: RIGHTS_AMONG_4_8_MILLION; title: "بین 4 تا 8 میلیون تومان"; parentType: RIGHTS }
    | { type: RIGHTS_AMONG_8_12_MILLION; title: "بین 8 تا 12 میلیون تومان"; parentType: RIGHTS }
    | { type: RIGHTS_AMONG_12_20_MILLION; title: "بین 12 تا 20 میلیون تومان"; parentType: RIGHTS }
    | { type: RIGHTS_OVER_60_MILLION; title: "بالای 60 میلیون تومان"; parentType: RIGHTS }
    | { type: PUBLICATION_DATE_LAST_3_DAY; title: "3 روز اخیر"; parentType: PUBLICATION_DATE }
    | { type: PUBLICATION_DATE_LAST_1_WEEK; title: "1 هفته اخیر"; parentType: PUBLICATION_DATE }
    | { type: PUBLICATION_DATE_LAST_15_DAY; title: "15 روز اخیر"; parentType: PUBLICATION_DATE }
    | { type: PUBLICATION_DATE_LAST_1_MONTH; title: "1 ماه اخیر"; parentType: PUBLICATION_DATE }
    | { type: WORK_EXPERIENCE_UNDER_2_YR; title: "کمتر از 2 سال"; parentType: WORK_EXPERIENCE }
    | { type: WORK_EXPERIENCE_AMONG_2_5_YR; title: "بین 2 تا 5 سال"; parentType: WORK_EXPERIENCE }
    | { type: WORK_EXPERIENCE_AMONG_5_8_YR; title: "بین 5 تا 8 سال"; parentType: WORK_EXPERIENCE }
    | { type: WORK_EXPERIENCE_AMONG_8_12_YR; title: "بین 8 تا 12 سال"; parentType: WORK_EXPERIENCE }
    | { type: WORK_EXPERIENCE_OVER_12_YR; title: "بالای 12 سال"; parentType: WORK_EXPERIENCE }
    | { type: SENIORITY_LEVEL_MANUAL_WORKER; title: "کارگر"; parentType: SENIORITY_LEVEL }
    | { type: SENIORITY_LEVEL_EMPLOYEE; title: "کارمند"; parentType: SENIORITY_LEVEL }
    | { type: SENIORITY_LEVEL_EXPERT; title: "کارشناس"; parentType: SENIORITY_LEVEL }
    | { type: SENIORITY_LEVEL_MA; title: "کارشناس ارشد"; parentType: SENIORITY_LEVEL }
    | { type: SENIORITY_LEVEL_MID_LEVEL_MANAGER; title: "مدیر میانی"; parentType: SENIORITY_LEVEL }
    | { type: SENIORITY_LEVEL_ASSISTANCE; title: "معاونت"; parentType: SENIORITY_LEVEL }
    | { type: SENIORITY_LEVEL_CHIEF; title: "مدیرارشد"; parentType: SENIORITY_LEVEL }
    | { type: BENEFITS_AND_FACILITIES_LOAN; title: "وام"; parentType: BENEFITS_AND_FACILITIES }
    | { type: BENEFITS_AND_FACILITIES_REWARD; title: "پاداش"; parentType: BENEFITS_AND_FACILITIES }
    | { type: BENEFITS_AND_FACILITIES_PARKING; title: "پارکینگ"; parentType: BENEFITS_AND_FACILITIES };

interface ChildOfFilterMainType {
    id: string;
}

export type ChildOfFilterType = ChildOfFilterMainType & TypeAndTitleOfChildFilterTypes;

interface FilterMainType {
    id: string;
    title: string;
    isMultiple: boolean;
    sub?: ChildOfFilterType | ChildOfFilterType[];
}

export type FilterType = FilterMainType & TypeAndTitleOfFilterTypes;

const categoryArray: FilterType[] = [
    { id: uuidGenerator(), type: "TELECOMMUTING", title: "دورکاری", isMultiple: false },
    { id: uuidGenerator(), type: "INTERSHIP", title: "کارآموزی", isMultiple: false },
    {
        id: uuidGenerator(),
        type: "TYPE_OF_COOPERTION",
        title: "نوع همکاری",
        isMultiple: false,
        sub: [
            {
                id: uuidGenerator(),
                parentType: "TYPE_OF_COOPERTION",
                title: "تمام وقت",
                type: "TYPE_OF_COOPERTION_FULL_TIME",
            },
            {
                id: uuidGenerator(),
                parentType: "TYPE_OF_COOPERTION",
                title: "نیمه وقت",
                type: "TYPE_OF_COOPERTION_PART_TIME",
            },
            {
                id: uuidGenerator(),
                parentType: "TYPE_OF_COOPERTION",
                title: "قراردای / پروژه ای",
                type: "TYPE_OF_COOPERTION_CONTRACTUAL_TIME",
            },
        ],
    },
    {
        id: uuidGenerator(),
        type: "RIGHTS",
        title: "حقوق",
        isMultiple: false,
        sub: [
            { id: uuidGenerator(), parentType: "RIGHTS", title: "زیر 4 میلیون تومان", type: "RIGHTS_UNDER_4_MILLION" },
            {
                id: uuidGenerator(),
                parentType: "RIGHTS",
                title: "بین 4 تا 8 میلیون تومان",
                type: "RIGHTS_AMONG_4_8_MILLION",
            },
            {
                id: uuidGenerator(),
                parentType: "RIGHTS",
                title: "بین 8 تا 12 میلیون تومان",
                type: "RIGHTS_AMONG_8_12_MILLION",
            },
            {
                id: uuidGenerator(),
                parentType: "RIGHTS",
                title: "بین 12 تا 20 میلیون تومان",
                type: "RIGHTS_AMONG_12_20_MILLION",
            },
            {
                id: uuidGenerator(),
                parentType: "RIGHTS",
                title: "بالای 60 میلیون تومان",
                type: "RIGHTS_OVER_60_MILLION",
            },
        ],
    },
    {
        id: uuidGenerator(),
        type: "PUBLICATION_DATE",
        title: "زمان انتشار",
        isMultiple: false,
        sub: [
            {
                id: uuidGenerator(),
                parentType: "PUBLICATION_DATE",
                title: "3 روز اخیر",
                type: "PUBLICATION_DATE_LAST_3_DAY",
            },
            {
                id: uuidGenerator(),
                parentType: "PUBLICATION_DATE",
                title: "1 هفته اخیر",
                type: "PUBLICATION_DATE_LAST_1_WEEK",
            },
            {
                id: uuidGenerator(),
                parentType: "PUBLICATION_DATE",
                title: "15 روز اخیر",
                type: "PUBLICATION_DATE_LAST_15_DAY",
            },
            {
                id: uuidGenerator(),
                parentType: "PUBLICATION_DATE",
                title: "1 ماه اخیر",
                type: "PUBLICATION_DATE_LAST_1_MONTH",
            },
        ],
    },
    {
        id: uuidGenerator(),
        type: "WORK_EXPERIENCE",
        title: "سابقه کاری",
        isMultiple: false,
        sub: [
            {
                id: uuidGenerator(),
                parentType: "WORK_EXPERIENCE",
                title: "کمتر از 2 سال",
                type: "WORK_EXPERIENCE_UNDER_2_YR",
            },
            {
                id: uuidGenerator(),
                parentType: "WORK_EXPERIENCE",
                title: "بین 2 تا 5 سال",
                type: "WORK_EXPERIENCE_AMONG_2_5_YR",
            },
            {
                id: uuidGenerator(),
                parentType: "WORK_EXPERIENCE",
                title: "بین 5 تا 8 سال",
                type: "WORK_EXPERIENCE_AMONG_5_8_YR",
            },
            {
                id: uuidGenerator(),
                parentType: "WORK_EXPERIENCE",
                title: "بین 8 تا 12 سال",
                type: "WORK_EXPERIENCE_AMONG_8_12_YR",
            },
            {
                id: uuidGenerator(),
                parentType: "WORK_EXPERIENCE",
                title: "بالای 12 سال",
                type: "WORK_EXPERIENCE_OVER_12_YR",
            },
        ],
    },
    {
        id: uuidGenerator(),
        type: "SENIORITY_LEVEL",
        title: "سطح ارشدیت",
        isMultiple: false,
        sub: [
            {
                id: uuidGenerator(),
                parentType: "SENIORITY_LEVEL",
                title: "کارگر",
                type: "SENIORITY_LEVEL_MANUAL_WORKER",
            },
            { id: uuidGenerator(), parentType: "SENIORITY_LEVEL", title: "کارمند", type: "SENIORITY_LEVEL_EMPLOYEE" },
            { id: uuidGenerator(), parentType: "SENIORITY_LEVEL", title: "کارشناس", type: "SENIORITY_LEVEL_EXPERT" },
            { id: uuidGenerator(), parentType: "SENIORITY_LEVEL", title: "کارشناس ارشد", type: "SENIORITY_LEVEL_MA" },
            {
                id: uuidGenerator(),
                parentType: "SENIORITY_LEVEL",
                title: "مدیر میانی",
                type: "SENIORITY_LEVEL_MID_LEVEL_MANAGER",
            },
            { id: uuidGenerator(), parentType: "SENIORITY_LEVEL", title: "معاونت", type: "SENIORITY_LEVEL_ASSISTANCE" },
            { id: uuidGenerator(), parentType: "SENIORITY_LEVEL", title: "مدیرارشد", type: "SENIORITY_LEVEL_CHIEF" },
        ],
    },
    {
        id: uuidGenerator(),
        type: "BENEFITS_AND_FACILITIES",
        title: "مزایا و تسهیلات",
        isMultiple: true,
        sub: [
            {
                id: uuidGenerator(),
                parentType: "BENEFITS_AND_FACILITIES",
                title: "وام",
                type: "BENEFITS_AND_FACILITIES_LOAN",
            },
            {
                id: uuidGenerator(),
                parentType: "BENEFITS_AND_FACILITIES",
                title: "پاداش",
                type: "BENEFITS_AND_FACILITIES_REWARD",
            },
            {
                id: uuidGenerator(),
                parentType: "BENEFITS_AND_FACILITIES",
                title: "پارکینگ",
                type: "BENEFITS_AND_FACILITIES_PARKING",
            },
        ],
    },
    {
        id: uuidGenerator(),
        type: "IS_EMPLOYMENT_OF_THE_DISABLED",
        title: "امکان استخدام معلولین",
        isMultiple: false,
    },
    { id: uuidGenerator(), type: "MILITARY_ORDER", title: "امریه سربازی", isMultiple: false },
];

export interface SearchFromProps {
    isFilterBarShow: boolean;
}

export { categoryArray };
