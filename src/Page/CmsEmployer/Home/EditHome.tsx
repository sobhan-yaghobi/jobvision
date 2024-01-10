import React, { useEffect } from "react";
import { z } from "zod";
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

import { NumberInput, TextInput } from "../../../Components/Input/Input";
import DateInput from "../../../Components/Input/DateInput";
import TextareaInput from "../../../Components/Input/TextareaInput";
import Button from "../../../Components/Button/Button";

import { BsImages } from "react-icons/bs";
import { BiLinkAlt, BiMap } from "react-icons/bi";
import { PiSpeakerHigh } from "react-icons/pi";
import { FaBuilding } from "react-icons/fa";
import logo from "/Svg/Logo/PrimaryColorLogo.svg";

import Persian_cl from "react-date-object/calendars/persian";
import { DateObject } from "react-multi-date-picker";
import useCompanies, { companyType } from "../../../Hooks/useCompanies";

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
    const {
        mutate: { mutateFn, data, isSuccess },
    } = useCompanies({ mode: "Mutate" });

    const { ShowContext, showMess } = useShowMssAndNotif({ placementOfNotif: "bottomLeft" });
    const {
        register,
        setValue,
        handleSubmit,
        getFieldState,
        reset,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm<TypeCompanyFormSchema>({
        resolver: zodResolver(CompanyFormSchema),
    });

    useEffect(() => {
        if (userInfo?.company_id) {
            mutateFn(userInfo?.company_id);
            reset(
                data
                    ? ({
                          ...data,
                          organization_employ: data.organization_employ.toString(),
                      } as TypeCompanyFormSchema)
                    : undefined
            );
        }
    }, [userInfo, isSuccess]);

    useEffect(() => {
        Object.keys(errors).map((item) => {
            showMess({
                type: "error",
                message: getFieldState(item as keyof TypeCompanyFormSchema).error?.message,
            });
        });
    }, [errors]);

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
                score_company: Math.floor(Math.random() * 5),
                score_experience_of_job_seekers: Math.floor(Math.random() * 5),
                score_popularity: Math.floor(Math.random() * 5),
                score_responsiveness: Math.floor(Math.random() * 5),
            };
            if (isLoggedIn && userInfo) {
                if (userInfo?.company_id) {
                    updateCompanyAction({
                        id: userInfo.company_id,
                        company: newCompany,
                        successFunctionHandler: () => {
                            reset();
                            resolve();
                            showMess({ type: "success", message: messageSuccess("آپدیت اطلاعات شرکت") });
                        },
                    });
                } else {
                    postAction({
                        newCompany,
                        successFunctionHandler: (companyData) => {
                            if (companyData) {
                                updateCompanyIdOfUser({
                                    companyId: companyData.id,
                                    userId: userInfo.email_or_phoneNumber as string,
                                    successFunctionHandler: () => {
                                        console.log("{ ...userInfo, company_id: companyData.id }", {
                                            ...userInfo,
                                            company_id: companyData.id,
                                        });

                                        setUserInfo({ ...userInfo, company_id: companyData.id });
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
                        <div className="w-24 flex items-center justify-center rounded-2xl p-3 shadow-xl ml-5">
                            <img className="w-full" src={logo} alt="" />
                        </div>
                        <div className="w-full">
                            <TextInput
                                icon={<BsImages />}
                                placeholder="...لینک لوگو شرکت"
                                register={register("logo")}
                                className={[{ inputClassName: "text-left" }]}
                                isError={errors.logo?.message}
                            ></TextInput>
                            <p className="mt-2 text-xs text-jv-lightGray2x w-1/2">
                                پیشنهاد میشود مقدار پیکسل لوگو شرکت 800 * 800 و فرمت عکس JPG یا PNG باشد و همچنین فرمت
                                GIF نامعتبر میباشد
                            </p>
                        </div>
                    </div>
                </section>
                <section className="my-5">
                    <h5 className="mr-2">نام شرکت</h5>
                    <TextInput
                        placeholder="برای مثال جاب ویژن"
                        register={register("name")}
                        isError={errors.name?.message}
                    ></TextInput>
                </section>
                <section>
                    <h5 className="mr-2">موقعیت شرکت</h5>
                    <TextInput
                        placeholder="برای مثال تهران ، بهارستان"
                        register={register("location")}
                        icon={<BiMap />}
                        iconSide="Right"
                        isError={errors.location?.message}
                    ></TextInput>
                </section>
                <section className="my-5">
                    <h5 className="mr-2">وب سایت شرکت</h5>
                    <TextInput
                        placeholder="برای مثال www.jobvision.ir"
                        register={register("website")}
                        icon={<BiLinkAlt />}
                        className={[{ inputClassName: "text-left" }]}
                        isError={errors.website?.message}
                    ></TextInput>
                </section>
                <section>
                    <h5 className="mr-2"> درباره شرکت</h5>
                    <TextareaInput
                        placeholder="سخنی از سمت شرکت شما برای جویندگان شغل..."
                        register={register("desc")}
                        isError={errors.desc?.message}
                    ></TextareaInput>
                </section>
                <section className="my-5">
                    <h5 className="mr-2">شعار شرکت</h5>
                    <TextInput
                        placeholder="برای مثال : متفاوت بیندیشید"
                        register={register("compnay_slogan")}
                        icon={<PiSpeakerHigh />}
                        iconSide="Right"
                        isError={errors.compnay_slogan?.message}
                    ></TextInput>
                </section>
                <section className="my-5">
                    <h5 className="mr-2">نوع فعالیت شرکت</h5>
                    <TextInput
                        placeholder="برای مثال : تولیدی پوشاک"
                        register={register("type_of_activity")}
                        icon={<FaBuilding />}
                        iconSide="Right"
                        isError={errors.type_of_activity?.message}
                    ></TextInput>
                </section>
                <section className="my-5">
                    <h5 className="mr-2">صنعت شرکت</h5>
                    <TextInput
                        placeholder="برای مثال : صادرات پوشاک"
                        register={register("industry")}
                        icon={<FaBuilding />}
                        iconSide="Right"
                        isError={errors.industry?.message}
                    ></TextInput>
                </section>
                <section>
                    <h5 className="mr-2">تعداد کارکنان شرکت</h5>
                    <NumberInput
                        register={register("organization_employ")}
                        placeholder="برای مثال 13"
                        min={1}
                        isError={errors.organization_employ?.message}
                    ></NumberInput>
                </section>
                <section className="my-5">
                    <h5 className="mr-2">سال تاسیس</h5>

                    <DateInput
                        date={new Date(getValues("established_year"))}
                        placeholder={`برای مثال ${new DateObject().convert(Persian_cl)}`}
                        setDate={setEstablishDate}
                    ></DateInput>
                </section>
                <Button
                    ClassName="mt-5 w-full"
                    textColor="primary"
                    size="middle"
                    ClickHandler={() => {}}
                    isLoading={isSubmitting}
                >
                    {userInfo?.company_id ? "آپدیت" : "ثبت"}
                </Button>
            </form>
        </>
    );
};

export default EditHome;
