import React from "react";
import { twMerge } from "tailwind-merge";

type SkeletonElmProps = {
    className: [
        {
            wrapper?: string;
            elem?: string;
        }
    ];
};
const SkeletonElm: React.FC<SkeletonElmProps> = ({ className }) => (
    <div className={twMerge(`overflow-hidden relative ${className[0]?.wrapper}`)}>
        <div className={twMerge(`animate-pulse bg-gray-300 h-full w-full absolute ${className[0]?.elem}`)}></div>
    </div>
);

type AdsSkeletonProps = {
    loading: boolean;
};
const AdsSkeleton: React.FC<React.PropsWithChildren<AdsSkeletonProps>> = ({ loading, children }) => {
    console.log("loading", loading);

    if (loading) {
        return (
            <>
                <div className="cursor-pointer w-full h-full max-h-[13rem] border-2 border-solid rounded-xl py-3 px-3 bg-transparent grid border-jv-lightGray3x grid-rows-3">
                    <div className="text-inherit grid grid-cols-12 row-span-2">
                        <div className="col-span-3 gap-2 sm:col-span-2 h-full flex flex-col items-center justify-start">
                            <SkeletonElm className={[{ wrapper: "w-12 h-12 rounded-lg" }]}></SkeletonElm>
                            <SkeletonElm className={[{ wrapper: "w-10 h-5 rounded-lg" }]}></SkeletonElm>
                        </div>
                        <div className="text-sm px-1 flex flex-col gap-2 col-span-9 sm:col-span-10 overflow-hidden pb-2">
                            <SkeletonElm className={[{ wrapper: "w-8/12 h-5 rounded-lg" }]}></SkeletonElm>
                            <SkeletonElm className={[{ wrapper: "w-4/12 h-5 rounded-lg" }]}></SkeletonElm>
                            <SkeletonElm className={[{ wrapper: "w-10/12 h-5 rounded-lg" }]}></SkeletonElm>
                            <div className="flex gap-2">
                                <SkeletonElm className={[{ wrapper: "w-4/12 h-5 rounded-lg" }]}></SkeletonElm>
                                <SkeletonElm className={[{ wrapper: "w-4/12 h-5 rounded-lg" }]}></SkeletonElm>
                                <SkeletonElm className={[{ wrapper: "w-4/12 h-5 rounded-lg" }]}></SkeletonElm>
                            </div>
                        </div>
                    </div>
                    <div className="row-span-1 border-t-[1px] border-solid border-jv-lightGray3x pt-2 text-xs flex items-center justify-between">
                        <div className="flex gap-2">
                            <SkeletonElm className={[{ wrapper: "w-10 h-5 rounded-lg" }]}></SkeletonElm>
                            <SkeletonElm className={[{ wrapper: "w-16 h-5 rounded-lg" }]}></SkeletonElm>
                        </div>
                        <SkeletonElm className={[{ wrapper: "w-16 h-full rounded-lg" }]}></SkeletonElm>
                    </div>
                </div>
            </>
        );
    } else {
        return children;
    }
};

type CustomSkeletonProps = {
    className: SkeletonElmProps["className"];
    loading: boolean;
};
const CustomSkeleton: React.FC<React.PropsWithChildren<CustomSkeletonProps>> = ({ className, loading, children }) => {
    if (loading) {
        <SkeletonElm className={className}></SkeletonElm>;
    } else {
        return children;
    }
};

export { SkeletonElm, AdsSkeleton, CustomSkeleton };
