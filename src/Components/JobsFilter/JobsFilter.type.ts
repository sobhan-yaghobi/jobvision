export type TYPE_OF_COOPERTION_FULL_TIME = "TYPE_OF_COOPERTION_FULL_TIME";
export type TYPE_OF_COOPERTION_CONTRACTUAL_TIME = "TYPE_OF_COOPERTION_CONTRACTUAL_TIME";
export type TYPE_OF_COOPERTION_PART_TIME = "TYPE_OF_COOPERTION_PART_TIME";

export type Type_category_filter = {
    category_type: string;
    title: string;
    is_multiple: boolean;
};

export type TypeFilterTypes = {
    category: Type_category_filter["category_type"];
    title: string;
    type: string;
};

export interface Type_category_merged_array extends Type_category_filter {
    sub: TypeFilterTypes[];
}

export interface selectedFiltersType {
    title: string;
    type: string;
    category: string;
}

export interface JobsFilterProps {
    setSelectedFilter: React.Dispatch<React.SetStateAction<string[]>>;
    isFilterOnProMode: boolean;
    setIsFilterOnProMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export type removeFilterActionTypes =
    | { mode: "RemoveType"; mainType: string; isClose: boolean }
    | { mode: "RemoveCategory"; mainType: string; isClose: boolean };

export type isDublicateTypes =
    | { mode: "FilterType"; ItemType: string | undefined }
    | { mode: "CategoryType"; ItemType: Type_category_filter["category_type"] | undefined };

export type FilterContentGeneratorProps =
    | { mode: "SUB_FALSE_MULTIPLE_FALSE"; ItemType: Type_category_merged_array }
    | { mode: "SUB_TRUE_MULTIPLE_FALSE"; ItemType: Type_category_filter["category_type"] }
    | { mode: "SUB_&_MULTIPLE_TRUE"; Item: Type_category_merged_array; ItemType: Type_category_filter["category_type"] }
    | { mode: "NORMAL"; Item: Type_category_merged_array };

export type FilterGeneratorProps =
    | {
          mode: "ShowFilter";
          item: Type_category_merged_array;
      }
    | {
          mode: "ShowFilterIcon";
      };

export type MenuSettingProps = {
    mode: "Mobile" | "Desktop";
};
