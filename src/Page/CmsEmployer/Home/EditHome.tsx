import React, { useEffect } from "react";
import { object, z } from "zod";
import {
    messageLengthGenerator,
    messageRequiredGenerator,
    messageSuccess,
    messageUrlNotValid,
} from "../../../Utils/Utils";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import useShowMssAndNotif from "../../../Hooks/useShowMssAndNotif";
import useAuth from "../../../Store/useAuth";
import usePostCompanyToApi, { companyPostType } from "../../../Hooks/usePostCompanyToApi";
import usePostUserToApi from "../../../Hooks/usePostUserToApi";

import { TextInput } from "../../../Components/Input/Input";
import NumberInput from "../../../Components/Input/NumberInput";
import DateInput from "../../../Components/Input/DateInput";
import TextareaInput from "../../../Components/Input/TextareaInput";
import Button from "../../../Components/Button/Button";

import { BsImages } from "react-icons/bs";
import { BiLinkAlt, BiMap } from "react-icons/bi";
import { PiSpeakerHigh } from "react-icons/pi";
import { FaBuilding } from "react-icons/fa";

import Persian_cl from "react-date-object/calendars/persian";
import { DateObject } from "react-multi-date-picker";
import { isEqual, omit } from "lodash";
import { CustomSkeleton, SkeletonElm } from "../../../Components/Skeleton/Skeleton";

const CompanyFormSchema = z.object({
    name: z.string().min(3, messageLengthGenerator("Min", "نام شرکت", 3)).trim(),
    location: z.string().min(10, messageLengthGenerator("Min", "موقعیت مکانی", 10)).trim(),
    logo: z.string().min(1, messageRequiredGenerator("لینک لوگو شرکت")).url(messageUrlNotValid("لوگو شرکت")).trim(),
    website: z.string().url(messageUrlNotValid("وب سایت شرکت")).trim(),
    desc: z.string().min(1, messageRequiredGenerator("درباره ی شرکت")).trim(),
    compnay_slogan: z
        .string()
        .min(1, messageRequiredGenerator("شعار شرکت"))
        .max(50, messageLengthGenerator("Max", "شعار شرکت شما", 50))
        .trim(),
    established_year: z.date({ required_error: messageRequiredGenerator("سال تاسیس شرکت") }),
    organization_employ: z.string().min(1, messageRequiredGenerator("تعداد کارکنان")),
    type_of_activity: z.string().min(1, messageRequiredGenerator("نوع فعالیت شرکت")),
    industry: z.string().min(1, messageRequiredGenerator("نوع صنعت شرکت")),
});
type TypeCompanyFormSchema = z.infer<typeof CompanyFormSchema>;

const EditHome: React.FC = () => {
    const { userInfo, setUserInfo, isLoggedIn } = useAuth();
    const { postAction, updateAction: updateCompanyAction } = usePostCompanyToApi();
    const { updateAction: updateCompanyIdOfUser } = usePostUserToApi();
    const setEstablishDate = (date: number) => setValue("established_year", new Date(date));

    const { ShowContext, showMess } = useShowMssAndNotif({ placementOfNotif: "bottomLeft" });
    const {
        register,
        setValue,
        handleSubmit,
        getFieldState,
        reset,
        watch,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm<TypeCompanyFormSchema>({
        resolver: zodResolver(CompanyFormSchema),
    });

    useEffect(() => {
        if (userInfo?.company) {
            reset(
                userInfo.company
                    ? ({
                          ...userInfo.company,
                          organization_employ: userInfo?.company?.organization_employ?.toString(),
                          established_year: new Date(userInfo.company.established_year),
                      } as TypeCompanyFormSchema)
                    : undefined
            );
        }
    }, [userInfo]);

    useEffect(() => {
        Object.keys(errors).map((item) => {
            showMess({
                type: "error",
                message: getFieldState(item as keyof TypeCompanyFormSchema).error?.message,
            });
        });
    }, [errors]);

    const logoField = watch("logo");

    const submitAction = ({
        compnay_slogan,
        desc,
        established_year,
        industry,
        location,
        logo,
        name,
        organization_employ,
        type_of_activity,
        website,
    }: TypeCompanyFormSchema) => {
        return new Promise<void>((resolve) => {
            const newCompany: companyPostType = {
                compnay_slogan,
                desc,
                established_year: established_year,
                industry,
                location,
                logo,
                name,
                organization_employ: parseInt(organization_employ),
                type_of_activity,
                website,
                score_company:
                    userInfo && userInfo?.company?.score_company
                        ? userInfo.company.score_company
                        : Math.floor(Math.random() * 5),
                score_experience_of_job_seekers:
                    userInfo && userInfo?.company?.score_experience_of_job_seekers
                        ? userInfo.company.score_experience_of_job_seekers
                        : Math.floor(Math.random() * 5),
                score_popularity:
                    userInfo && userInfo?.company?.score_popularity
                        ? userInfo.company.score_popularity
                        : Math.floor(Math.random() * 5),
                score_responsiveness:
                    userInfo && userInfo?.company?.score_responsiveness
                        ? userInfo.company.score_responsiveness
                        : Math.floor(Math.random() * 5),
            };
            if (isLoggedIn && userInfo) {
                if (userInfo.company) {
                    if (
                        isEqual(
                            {
                                ...omit(userInfo.company, ["created_at", "id"]),
                                established_year: new Date(userInfo.company?.established_year),
                            },
                            {
                                ...omit(newCompany),
                                established_year: new Date(newCompany?.established_year),
                            }
                        )
                    ) {
                        showMess({ type: "warning", message: "اطلاعاتی آپدیت نکرده اید" });
                        resolve();
                    } else {
                        updateCompanyAction({
                            id: userInfo.company.id,
                            company: newCompany,
                            successFunctionHandler: (companyData) => {
                                setUserInfo({
                                    ...userInfo,
                                    company: typeof companyData !== "undefined" ? companyData : null,
                                });
                                reset();
                                resolve();
                                showMess({ type: "success", message: messageSuccess("آپدیت اطلاعات شرکت") });
                            },
                        });
                    }
                } else {
                    postAction({
                        newCompany,
                        successFunctionHandler: (companyData) => {
                            if (companyData) {
                                updateCompanyIdOfUser({
                                    companyId: companyData.id,
                                    userId: userInfo.email_or_phoneNumber as string,
                                    successFunctionHandler: () => {
                                        setUserInfo({ ...userInfo, company: companyData });
                                        reset();
                                        resolve();
                                        showMess({ type: "success", message: messageSuccess("ثبت اطلاعات شرکت") });
                                    },
                                });
                            }
                        },
                    });
                }
            }
        });
    };
    return (
        <>
            {ShowContext}
            <h3>ویرایش اطلاعات شرکت</h3>
            <form onSubmit={handleSubmit(submitAction)} className="my-10">
                <section>
                    <h5 className="mr-2">لوگو</h5>
                    <div className="flex mt-2">
                        {userInfo?.company?.logo ? (
                            <div className="w-24 flex items-center justify-center rounded-2xl p-3 shadow-xl ml-5">
                                <img className="w-full" src={logoField ? logoField : userInfo?.company?.logo} alt="" />
                            </div>
                        ) : (
                            <SkeletonElm
                                className={[{ wrapper: "w-24 h-24 rounded-2xl shadow-xl ml-5" }]}
                            ></SkeletonElm>
                        )}
                        <div className="w-full">
                            <CustomSkeleton
                                loading={typeof userInfo?.company !== "undefined" ? false : true}
                                className={[{ wrapper: "w-full h-10 rounded-lg" }]}
                            >
                                <TextInput
                                    direction="ltr"
                                    icon={<BsImages />}
                                    placeholder="...لینک لوگو شرکت"
                                    register={register("logo")}
                                    className={[{ inputClassName: "text-left flex flex-row-reverse" }]}
                                    isError={errors.logo?.message}
                                ></TextInput>
                            </CustomSkeleton>
                            <p className="mt-2 text-xs text-jv-lightGray2x w-1/2">
                                پیشنهاد میشود مقدار پیکسل لوگو شرکت 800 * 800 و فرمت عکس JPG یا PNG باشد و همچنین فرمت
                                GIF نامعتبر میباشد
                            </p>
                        </div>
                    </div>
                </section>
                <section className="my-5">
                    <h5 className="mr-2">نام شرکت</h5>
                    <CustomSkeleton
                        loading={typeof userInfo?.company !== "undefined" ? false : true}
                        className={[{ wrapper: "w-full h-10 rounded-lg" }]}
                    >
                        <TextInput
                            placeholder="برای مثال جاب ویژن"
                            register={register("name")}
                            isError={errors.name?.message}
                        ></TextInput>
                    </CustomSkeleton>
                </section>
                <section>
                    <h5 className="mr-2">موقعیت شرکت</h5>

                    <CustomSkeleton
                        loading={typeof userInfo?.company !== "undefined" ? false : true}
                        className={[{ wrapper: "w-full h-10 rounded-lg" }]}
                    >
                        <TextInput
                            placeholder="برای مثال تهران ، بهارستان"
                            register={register("location")}
                            icon={<BiMap />}
                            iconSide="Right"
                            isError={errors.location?.message}
                        ></TextInput>
                    </CustomSkeleton>
                </section>
                <section className="my-5">
                    <h5 className="mr-2">وب سایت شرکت</h5>
                    <CustomSkeleton
                        loading={typeof userInfo?.company !== "undefined" ? false : true}
                        className={[{ wrapper: "w-full h-10 rounded-lg" }]}
                    >
                        <TextInput
                            direction="ltr"
                            placeholder="برای مثال www.jobvision.ir"
                            register={register("website")}
                            icon={<BiLinkAlt />}
                            className={[{ inputClassName: "text-left" }]}
                            isError={errors.website?.message}
                        ></TextInput>
                    </CustomSkeleton>
                </section>
                <section>
                    <h5 className="mr-2"> درباره شرکت</h5>
                    <CustomSkeleton
                        loading={typeof userInfo?.company !== "undefined" ? false : true}
                        className={[{ wrapper: "w-full h-10 rounded-lg" }]}
                    >
                        <TextareaInput
                            placeholder="سخنی از سمت شرکت شما برای جویندگان شغل..."
                            register={register("desc")}
                            isError={errors.desc?.message}
                        ></TextareaInput>
                    </CustomSkeleton>
                </section>
                <section className="my-5">
                    <h5 className="mr-2">شعار شرکت</h5>
                    <CustomSkeleton
                        loading={typeof userInfo?.company !== "undefined" ? false : true}
                        className={[{ wrapper: "w-full h-10 rounded-lg" }]}
                    >
                        <TextInput
                            placeholder="برای مثال : متفاوت بیندیشید"
                            register={register("compnay_slogan")}
                            icon={<PiSpeakerHigh />}
                            iconSide="Right"
                            isError={errors.compnay_slogan?.message}
                        ></TextInput>
                    </CustomSkeleton>
                </section>
                <section className="my-5">
                    <h5 className="mr-2">نوع فعالیت شرکت</h5>
                    <CustomSkeleton
                        loading={typeof userInfo?.company !== "undefined" ? false : true}
                        className={[{ wrapper: "w-full h-10 rounded-lg" }]}
                    >
                        <TextInput
                            placeholder="برای مثال : تولیدی پوشاک"
                            register={register("type_of_activity")}
                            icon={<FaBuilding />}
                            iconSide="Right"
                            isError={errors.type_of_activity?.message}
                        ></TextInput>
                    </CustomSkeleton>
                </section>
                <section className="my-5">
                    <h5 className="mr-2">صنعت شرکت</h5>
                    <CustomSkeleton
                        loading={typeof userInfo?.company !== "undefined" ? false : true}
                        className={[{ wrapper: "w-full h-10 rounded-lg" }]}
                    >
                        <TextInput
                            placeholder="برای مثال : صادرات پوشاک"
                            register={register("industry")}
                            icon={<FaBuilding />}
                            iconSide="Right"
                            isError={errors.industry?.message}
                        ></TextInput>
                    </CustomSkeleton>
                </section>
                <section>
                    <h5 className="mr-2">تعداد کارکنان شرکت</h5>
                    <CustomSkeleton
                        loading={typeof userInfo?.company !== "undefined" ? false : true}
                        className={[{ wrapper: "w-2/12 h-10 rounded-lg" }]}
                    >
                        <NumberInput
                            register={register("organization_employ")}
                            placeholder="برای مثال 13"
                            min={1}
                            isError={errors.organization_employ?.message}
                        ></NumberInput>
                    </CustomSkeleton>
                </section>
                <section className="my-5">
                    <h5 className="mr-2">سال تاسیس</h5>
                    <CustomSkeleton
                        loading={typeof userInfo?.company !== "undefined" ? false : true}
                        className={[{ wrapper: "w-2/12 h-10 rounded-lg" }]}
                    >
                        <DateInput
                            date={new Date(getValues("established_year"))}
                            placeholder={`برای مثال ${new DateObject().convert(Persian_cl)}`}
                            setDate={setEstablishDate}
                        ></DateInput>
                    </CustomSkeleton>
                </section>
                <Button
                    ClassName="mt-5 w-full"
                    textColor="primary"
                    size="middle"
                    ClickHandler={() => {}}
                    isLoading={isSubmitting}
                >
                    {userInfo?.company ? "آپدیت" : "ثبت"}
                </Button>
            </form>
        </>
    );
};

export default EditHome;
