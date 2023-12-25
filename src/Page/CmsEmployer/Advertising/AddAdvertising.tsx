import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { FieldError, FieldErrorsImpl, Merge, useForm } from "react-hook-form";
import { z } from "zod";
import { checkRefine, messageRequiredGenerator, messageSuccess } from "../../../Utils/Utils";
import { CheckBox, NumberInput, SelectInput, TextInput } from "../../../Components/Input/Input";
import { BiTimer, BiTrip } from "react-icons/bi";
import { PiStudentDuotone } from "react-icons/pi";
import Button from "../../../Components/Button/Button";
import { TypeOptionInput } from "../../../Components/Input/Input.type";
import useShowMssAndNotif from "../../../Hooks/useShowMssAndNotif";

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
        acceptTrainees: z.boolean().optional(),
        acceptTelecommuting: z.boolean().optional(),
        benefits_and_facilities: z.array(z.string()),
        military_order: z.boolean().optional(),
        seniority_level: z.string().min(1, messageRequiredGenerator("سطح ارشدیت")),
        work_experience: z.string().min(1, messageRequiredGenerator("سابقه کار")),
    }),
    rights_price: z
        .object({
            isTo: z.boolean().optional(),
            from: z.string(),
            to: z.string(),
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
                    value: to,
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
            to: z.string(),
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
                    value: to,
                    message: messageRequiredGenerator("حداکثر سن"),
                    path: ["to"],
                },
                both: { message: "حداقل سن از حداکثر سن بیشتر است" },
                ctx,
            })
        ),
});
type TypeAddAdsFormSchema = z.infer<typeof AddAdsFormSchema>;

type TypeAdSelectForm = {
    label: string;
    value: string;
};

export const BenefitsTypeArray: TypeAdSelectForm[] = [
    { label: "وام", value: "BENEFITS_AND_FACILITIES_LOAN" },
    { label: "پارکینگ", value: "BENEFITS_AND_FACILITIES_PARKING" },
    { label: "پاداش", value: "BENEFITS_AND_FACILITIES_REWARD" },
];

export const seniorityLevelArray: TypeAdSelectForm[] = [
    { label: "کارگر", value: "SENIORITY_LEVEL_MANUAL_WORKER" },
    { label: "کارمند", value: "SENIORITY_LEVEL_EMPLOYEE" },
    { label: "کارشناس", value: "SENIORITY_LEVEL_EXPERT" },
    { label: "کارشناس ارشد", value: "SENIORITY_LEVEL_MA" },
    { label: "مدیر میانی", value: "SENIORITY_LEVEL_MID_LEVEL_MANAGER" },
    { label: "معاونت", value: "SENIORITY_LEVEL_ASSISTANCE" },
    { label: "مدیرارشد", value: "SENIORITY_LEVEL_CHIEF" },
];

export const typeOfCooperationOption: TypeOptionInput[] = [
    { label: "تمام وقت", value: "TYPE_OF_COOPERTION_FULL_TIME" },
    { label: "پاره وقت", value: "TYPE_OF_COOPERTION_PART_TIME" },
    { label: "قراردادی", value: "TYPE_OF_COOPERTION_CONTRACTUAL_TIME" },
];
export const genderOption: TypeOptionInput[] = [
    { label: "تفاوتی ندارد", value: "NotImportant" },
    { label: "مرد", value: "Male" },
    { label: "زن", value: "Female" },
];

export const workExperienceArray: TypeAdSelectForm[] = [
    { label: "کمتر از دو سال", value: "WORK_EXPERIENCE_UNDER_2_YR" },
    { label: "بین دو تا پنج سال", value: "WORK_EXPERIENCE_AMONG_2_5_YR" },
    { label: "بین پنج تا هشت سال", value: "WORK_EXPERIENCE_AMONG_5_8_YR" },
    { label: "بین هشت تا دوازده سال", value: "WORK_EXPERIENCE_AMONG_8_12_YR" },
    { label: "بالای دوازده سال", value: "WORK_EXPERIENCE_OVER_12_YR" },
];

const AddAdvertising: React.FC = () => {
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

    const submitAction = () => {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                showMess({ type: "success", message: messageSuccess("ثبت آگهی") });
                reset();
                resolve();
            }, 2000);
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
            <h3>فرم ثبت آگهی تازه</h3>
            <form onSubmit={handleSubmit(submitAction)} className="my-10">
                <section>
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
                                className="block w-full"
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
                <section className="my-5">
                    <h5 className="mr-2">مزایا و تحصیلات</h5>
                    <TextInput
                        icon={<PiStudentDuotone />}
                        iconSide="Right"
                        placeholder="برای مثال : پورسانت ، جوایز سال تحویل و ..."
                        register={register("type.benefits_and_facilities")}
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
                                className="block w-full"
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
                            name={register("type.acceptTrainees").name}
                        />
                        <CheckBox
                            control={control}
                            label="امکان دورکاری"
                            name={register("type.acceptTelecommuting").name}
                        />
                        <CheckBox control={control} label="امریه سربازی" name={register("type.military_order").name} />
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
