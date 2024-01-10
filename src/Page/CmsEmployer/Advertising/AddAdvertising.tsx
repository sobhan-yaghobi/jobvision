// Types
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Hooks
import useShowMssAndNotif from "../../../Hooks/useShowMssAndNotif";
import useGenderType from "../../../Hooks/useGenderType";
import { FieldError, FieldErrorsImpl, Merge, SubmitHandler, useForm } from "react-hook-form";
import useAdsFilterCategories from "../../../Hooks/useAdsFilterCategories";

// Functions
import { checkRefine, getItem, messageRequiredGenerator, messageSuccess } from "../../../Utils/Utils";

import { CheckBox, NumberInput, TextInput } from "../../../Components/Input/Input";
import SelectInput from "../../../Components/Input/SelectInput";
import Button from "../../../Components/Button/Button";
import { TypeOptionInput } from "../../../Components/Input/Input.type";

import { BiTimer, BiTrip } from "react-icons/bi";
import usePostAdsToApi, { adsBoxPostType } from "../../../Hooks/usePostAdsToApi";
import { TypeFilterTypes } from "../../../Components/JobsFilter/JobsFilter.type";
import useAuth from "../../../Store/useAuth";
import { message } from "antd";
import { CiWarning } from "react-icons/ci";
import { Link } from "react-router-dom";

const AddAdsFormSchema = z.object({
    title: z.string().min(1, messageRequiredGenerator("عنوان آگهی")),
    work_time: z.string().min(1, messageRequiredGenerator("زمان کار")),
    cooperation_ads_type: z.string().min(1, messageRequiredGenerator("نوع همکاری")),
    business_trips: z.string().optional(),
    key_indicators: z.array(z.string()).min(1, messageRequiredGenerator("شاخص های کلیدی")),
    employment_conditions_softwares: z.array(z.string()).min(1, messageRequiredGenerator("مهارت های نرم افزاری")),
    employment_conditions_gender: z.string().min(1, messageRequiredGenerator("تایین جنسیت")),
    employment_conditions_education: z.array(z.string()),
    status_is_important: z.boolean().optional(),
    status_responsible_employer: z.boolean().optional(),
    ads_tags: z.array(z.string()).min(1, messageRequiredGenerator("تگ های آگهی")),
    type: z.object({
        INTERSHIP: z.boolean().optional(),
        TELECOMMUTING: z.boolean().optional(),
        benefits_and_facilities: z.array(z.string()),
        MILITARY_ORDER: z.boolean().optional(),
        IS_EMPLOYMENT_OF_THE_DISABLED: z.boolean().optional(),
        seniority_level: z.string().min(1, messageRequiredGenerator("سطح ارشدیت")),
        work_experience: z.string().min(1, messageRequiredGenerator("سابقه کار")),
    }),
    rights_price: z
        .object({
            isTo: z.boolean().optional(),
            from: z.string(),
            to: z.string().optional(),
        })
        .superRefine(({ isTo, from, to }, ctx) =>
            checkRefine({
                isToActive: Boolean(isTo),
                from: {
                    value: from,
                    message: messageRequiredGenerator("حداقل حقوق"),
                    path: ["from"],
                },
                to: {
                    value: to ?? "",
                    message: messageRequiredGenerator("حداکثر حقوق"),
                    path: ["to"],
                },
                both: { message: "حداقل حقوق از حداکثر حقوق بیشتر است" },
                ctx,
            })
        ),
    employment_conditions_years_old: z
        .object({
            isTo: z.boolean().optional(),
            from: z.string().min(1, messageRequiredGenerator("حداقل سن")),
            to: z.string().optional(),
        })
        .superRefine(({ isTo, from, to }, ctx) =>
            checkRefine({
                isToActive: Boolean(isTo),
                from: {
                    value: from,
                    message: messageRequiredGenerator("حداقل سن"),
                    path: ["from"],
                },
                to: {
                    value: to ?? "",
                    message: messageRequiredGenerator("حداکثر سن"),
                    path: ["to"],
                },
                both: { message: "حداقل سن از حداکثر سن بیشتر است" },
                ctx,
            })
        ),
});
type TypeAddAdsFormSchema = z.infer<typeof AddAdsFormSchema>;

const AddAdvertising: React.FC = () => {
    const [isMultipleInputArrayReset, setIsMultipleInputArrayReset] = useState(false);
    const { options: genderOption } = useGenderType();
    const { categoryMergeArray } = useAdsFilterCategories();
    const optionGenerator = ({
        main_id,
        value,
        label,
    }: {
        main_id: string;
        value: keyof TypeFilterTypes;
        label: keyof TypeFilterTypes;
    }) =>
        getItem({
            array: categoryMergeArray,
            key: "category_type",
            main_id,
        })
            .at(0)
            ?.sub.map((item) => ({ value: item[value], label: item[label] })) ?? ([] as TypeOptionInput[]);

    const BenefitsTypeArray: TypeOptionInput[] = optionGenerator({
        main_id: "BENEFITS_AND_FACILITIES",
        value: "type",
        label: "title",
    });
    const seniorityLevelArray: TypeOptionInput[] = optionGenerator({
        main_id: "SENIORITY_LEVEL",
        value: "type",
        label: "title",
    });
    const typeOfCooperationOption: TypeOptionInput[] = optionGenerator({
        main_id: "COOPERTION",
        label: "title",
        value: "title",
    });
    const workExperienceArray: TypeOptionInput[] = optionGenerator({
        main_id: "WORK_EXPERIENCE",
        value: "type",
        label: "title",
    });

    const { ShowContext, showMess } = useShowMssAndNotif({ placementOfNotif: "bottomLeft" });
    const {
        register,
        watch,
        handleSubmit,
        setValue,
        reset,
        getFieldState,
        control,
        formState: { errors },
    } = useForm<TypeAddAdsFormSchema>({
        resolver: zodResolver(AddAdsFormSchema),
    });
    const { postAction } = usePostAdsToApi();
    const resetAction = () => {
        reset();
        setIsMultipleInputArrayReset(true);
        setTimeout(() => {
            setIsMultipleInputArrayReset(false);
        }, 1000);
    };
    const { userInfo } = useAuth();
    const submitAction: SubmitHandler<TypeAddAdsFormSchema> = async ({
        title,
        ads_tags,
        business_trips,
        cooperation_ads_type,
        employment_conditions_education,
        employment_conditions_gender,
        employment_conditions_softwares,
        employment_conditions_years_old,
        key_indicators,
        rights_price,
        status_is_important,
        status_responsible_employer,
        type,
        work_time,
    }) => {
        return new Promise<void>((resolve) => {
            if (userInfo?.company_id) {
                const filter_types = Object.entries({ ...type })
                    .map((item) => {
                        if (typeof item[1] === "boolean" && item[1] ? item[0] : null) {
                            return item[0];
                        } else if (typeof item[1] === "string") {
                            return item[1];
                        } else if (Array.isArray(item[1])) {
                            return item[1].map((item) => item);
                        } else {
                            return "";
                        }
                    })
                    .flatMap((item) => (Array.isArray(item) ? item : [item]))
                    .filter((item) => item !== "");

                const newAdsBox: adsBoxPostType = {
                    title,
                    rights_price: [
                        parseInt(rights_price.from),
                        typeof rights_price.to !== "undefined" ? parseInt(rights_price.to) : -1,
                    ],
                    work_time: work_time ?? "",
                    cooperation_ads_type,
                    business_trips: business_trips ?? "",
                    key_indicators,
                    employment_conditions_years_old: [
                        parseInt(employment_conditions_years_old.from),
                        typeof employment_conditions_years_old.to !== "undefined"
                            ? parseInt(employment_conditions_years_old.to)
                            : -1,
                    ],
                    employment_conditions_gender,
                    employment_conditions_softwares,
                    employment_conditions_education,
                    status_is_important: status_is_important ?? false,
                    status_cv_pending: false,
                    status_responsible_employer: status_responsible_employer ?? false,
                    ads_tags,
                    ads_types: filter_types,
                    company_id: "d2ccbf80-0646-46d2-a4da-2f25c5ffc8d3",
                };
                postAction({
                    adsBox: newAdsBox,
                    successFunctionHandler: () => {
                        showMess({ type: "success", message: messageSuccess("ثبت آگهی") });
                        resetAction();
                        resolve();
                    },
                });
            } else {
                showMess({ type: "error", message: "قبل از ساخت آگهی اول شرکت خود را ثبت کنید" });
            }
        });
    };

    const showMultipleError = (
        field: Merge<
            FieldError,
            FieldErrorsImpl<{
                from: string;
                to: string;
                isTo: NonNullable<boolean | undefined>;
            }>
        >
    ) => {
        showMess({
            type: "error",
            message:
                typeof field.root?.message !== "undefined"
                    ? field.root?.message
                    : typeof field.from?.message !== "undefined"
                    ? field.from?.message
                    : typeof field.to?.message !== "undefined"
                    ? field.to?.message
                    : undefined,
        });
    };
    useEffect(() => {
        typeof errors.rights_price !== "undefined" ? showMultipleError(errors.rights_price) : null;
        typeof errors.employment_conditions_years_old !== "undefined"
            ? showMultipleError(errors.employment_conditions_years_old)
            : null;
        Object.keys(errors).map((item) => {
            showMess({
                type: "error",
                message: getFieldState(item as keyof TypeAddAdsFormSchema).error?.message,
            });
        });
    }, [errors]);

    const is_to_rights_price = watch("rights_price.isTo");
    const is_to_employment_conditions_years_old = watch("employment_conditions_years_old.isTo");

    return (
        <>
            {ShowContext}
            {userInfo?.company_id ? null : (
                <div className="text-jv-warning flex items-center justify-between bg-jv-lightDanger p-3 rounded-lg mb-5">
                    <div className="flex items-center gap-2">
                        <CiWarning className="text-2xl" />
                        قبل از ساخت آگهی اول شرکت خود را ثبت کنید
                    </div>
                    <Link
                        style={{ textDecoration: "underline" }}
                        className="text-jv-primary"
                        to="/cmsEmployer?page=edit_home"
                        target="_blank"
                    >
                        برو بریم
                    </Link>
                </div>
            )}
            <h3>فرم ثبت آگهی تازه</h3>

            <form onSubmit={handleSubmit(submitAction)} className="my-10">
                <section>
                    <h5 className="mr-2">عنوان آگهی</h5>
                    <TextInput
                        placeholder="برای مثال : کارآموز طراحی سایت"
                        register={register("title")}
                        icon
                        isError={errors.title?.message}
                    ></TextInput>
                </section>
                <section className="my-5">
                    <h5 className="mr-2">حقوق ماهانه</h5>
                    <NumberInput
                        min={0}
                        className="block w-full"
                        placeholder="برای مثال : 7 میلیون تومان"
                        register={register("rights_price.from")}
                        isError={errors.rights_price?.from?.message || errors.rights_price?.root?.message}
                    />
                    <div
                        className={`overflow-hidden grid transition-all duration-700 delay-100 mb-2 ${
                            is_to_rights_price ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                    >
                        <div className="min-h-0">
                            <p className="my-2 pr-2 text-xs">تا</p>
                            <NumberInput
                                min={0}
                                disabled={!is_to_rights_price}
                                className={`w-full`}
                                placeholder="20 میلیون تومان"
                                register={register("rights_price.to")}
                                isError={errors.rights_price?.to?.message || errors.rights_price?.root?.message}
                            />
                        </div>
                    </div>
                    <CheckBox
                        label="نوشتن حداقل و حداکثر حقوق"
                        name={register("rights_price.isTo").name}
                        control={control}
                    />
                </section>
                <section className="my-5">
                    <h5 className="mr-2">زمان کار</h5>
                    <TextInput
                        placeholder="برای مثال : از شنبه تا چهارشنبه ساعت 7 صبح تا 5 عصر"
                        register={register("work_time")}
                        icon={<BiTimer />}
                        iconSide="Right"
                        isError={errors.work_time?.message}
                    ></TextInput>
                </section>
                <section>
                    <h5 className="mr-2">مزایای مسافرتی</h5>
                    <TextInput
                        placeholder="برای مثال : سفر به جزیره کیش"
                        register={register("business_trips")}
                        icon={<BiTrip />}
                        iconSide="Right"
                    ></TextInput>
                </section>
                <section>
                    <h5 className="mr-2">شرایط سنی</h5>
                    <NumberInput
                        min={10}
                        className="block w-full"
                        placeholder="برای مثال : 18 سال"
                        register={register("employment_conditions_years_old.from")}
                        isError={
                            errors.employment_conditions_years_old?.from?.message ||
                            errors.employment_conditions_years_old?.root?.message
                        }
                    ></NumberInput>
                    <div
                        className={`overflow-hidden grid transition-all duration-700 delay-100 mb-2 ${
                            is_to_employment_conditions_years_old ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                    >
                        <div className="min-h-0">
                            <p className="my-2 pr-2 text-xs">تا</p>
                            <NumberInput
                                min={10}
                                disabled={!is_to_employment_conditions_years_old}
                                className="w-full"
                                placeholder="25 سال"
                                register={register("employment_conditions_years_old.to")}
                                isError={
                                    errors.employment_conditions_years_old?.to?.message ||
                                    errors.employment_conditions_years_old?.root?.message
                                }
                            />
                        </div>
                    </div>
                    <CheckBox
                        label="نوشتن حداقل و حداکثر سن"
                        name={register("employment_conditions_years_old.isTo").name}
                        control={control}
                    />
                </section>
                <section className="my-5">
                    <h5 className="mr-2">تحصیلات</h5>
                    <SelectInput
                        placeholder="برای مثال : لیسانس دکترا ، مدرک زبان معتبر و..."
                        id="Edicu"
                        mode="Multiple"
                        isReset={isMultipleInputArrayReset}
                        callBackFn={(param: string[]) => {
                            setValue("employment_conditions_education", param);
                        }}
                        register={register("employment_conditions_education")}
                        className="border-jv-lightGray3x"
                    ></SelectInput>
                </section>
                <section>
                    <h5 className="mr-2">شاخص های کلیدی</h5>
                    <SelectInput
                        placeholder="برای مثال : 3 سال سابقه کار و react - پیشرفته و..."
                        id="keyIndicatorsMenu"
                        mode="Multiple"
                        isReset={isMultipleInputArrayReset}
                        callBackFn={(param: string[]) => {
                            setValue("key_indicators", param);
                        }}
                        register={register("key_indicators")}
                        className="border-jv-lightGray3x"
                    ></SelectInput>
                </section>
                <section className="my-5">
                    <h5 className="mr-2">مهارت های نرم افزاری</h5>
                    <SelectInput
                        placeholder="برای مثال : react - متوسط و..."
                        id="SoftwaresMenu"
                        mode="Multiple"
                        isReset={isMultipleInputArrayReset}
                        callBackFn={(param: string[]) => {
                            setValue("employment_conditions_softwares", param);
                        }}
                        register={register("employment_conditions_softwares")}
                        className="border-jv-lightGray3x"
                        isError={errors.employment_conditions_softwares?.message}
                    ></SelectInput>
                </section>
                <section>
                    <h5 className="mr-2">تگ های آگهی</h5>
                    <SelectInput
                        placeholder="برای مثال : برنامه نویسی فرانت اند ، برنامه نویسی ری اکت و ..."
                        id="ads_tags"
                        mode="Multiple"
                        isReset={isMultipleInputArrayReset}
                        callBackFn={(param: string[]) => {
                            setValue("ads_tags", param);
                        }}
                        register={register("ads_tags")}
                        className="border-jv-lightGray3x"
                        isError={errors.ads_tags?.message}
                    ></SelectInput>
                </section>
                <section className="my-5">
                    <h5 className="mb-2">دسته بندی آگهی</h5>
                    <div className="my-1">
                        <h6>مزایا</h6>
                        <SelectInput
                            id="benefits_and_facilities"
                            placeholder="مزایا و امکانات اراعه دهنده خود را انتخاب کنید"
                            mode="Multiple_Option"
                            register={register("type.benefits_and_facilities")}
                            options={BenefitsTypeArray}
                            isReset={isMultipleInputArrayReset}
                            callBackFn={(param: string[]) => {
                                setValue("type.benefits_and_facilities", param);
                            }}
                            className="mb-2"
                        ></SelectInput>
                    </div>
                    <div className="my-1">
                        <h6>سطح ارشدیت</h6>
                        <SelectInput
                            mode="Single"
                            label="سطح ارشدیت مورد  نیاز خود را انتخاب کنید"
                            options={seniorityLevelArray}
                            register={register("type.seniority_level")}
                            className="mb-2 border-jv-lightGray3x"
                            isError={errors.type?.seniority_level?.message}
                        ></SelectInput>
                    </div>
                    <div className="my-1">
                        <h6>سابقه کار</h6>
                        <SelectInput
                            mode="Single"
                            label="سابقه کار مورد نیاز خود را انتخاب کنید"
                            options={workExperienceArray}
                            register={register("type.work_experience")}
                            className="mb-2 border-jv-lightGray3x"
                            isError={errors.type?.work_experience?.message}
                        ></SelectInput>
                    </div>
                </section>
                <section>
                    <h5 className="mr-2">جنسیت</h5>
                    <SelectInput
                        mode="Single"
                        label="جنسیت"
                        options={genderOption}
                        register={register("employment_conditions_gender")}
                        className="border-jv-lightGray3x"
                        isError={errors.employment_conditions_gender?.message}
                    ></SelectInput>
                </section>
                <section className="my-5">
                    <h5 className="mr-2">نوع همکاری</h5>
                    <SelectInput
                        mode="Single"
                        label="نوع همکاری"
                        options={typeOfCooperationOption}
                        register={register("cooperation_ads_type")}
                        className="border-jv-lightGray3x"
                        isError={errors.cooperation_ads_type?.message}
                    ></SelectInput>
                </section>
                <section>
                    <h5>وضعیت آگهی</h5>
                    <div className="my-2 flex flex-col">
                        <CheckBox
                            control={control}
                            label="این آگهی فوری میباشد"
                            name={register("status_is_important").name}
                        />
                        <CheckBox
                            control={control}
                            label="پاسخگویی در اصرع وقت"
                            name={register("status_responsible_employer").name}
                        />
                        <CheckBox
                            control={control}
                            label="امکان دریافت کارآموز"
                            name={register("type.INTERSHIP").name}
                        />
                        <CheckBox control={control} label="امکان دورکاری" name={register("type.TELECOMMUTING").name} />
                        <CheckBox
                            control={control}
                            label="امکان استخدام معلولین"
                            name={register("type.IS_EMPLOYMENT_OF_THE_DISABLED").name}
                        />
                        <CheckBox control={control} label="امریه سربازی" name={register("type.MILITARY_ORDER").name} />
                    </div>
                </section>

                <Button
                    ClassName="mt-5 w-full"
                    textColor="primary"
                    size="middle"
                    ClickHandler={() => {}}
                    isLoading={false}
                >
                    ایجاد آگهی
                </Button>
            </form>
        </>
    );
};

export default AddAdvertising;
