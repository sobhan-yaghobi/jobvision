import React, { useEffect } from "react";
import { SubPageCmsTypes } from "../CmsEmployer.type";
import { z } from "zod";

import { useForm } from "react-hook-form";
import {
    messageLengthGenerator,
    messageRequiredGenerator,
    messageSuccess,
    messageUrlNotValid,
} from "../../../Utils/Utils";
import { zodResolver } from "@hookform/resolvers/zod";
import useShowMssAndNotif from "../../../Hooks/useShowMssAndNotif";

import { DateInput, NumberInput, SelectInput, TextInput, TextareaInput } from "../../../Components/Input/Input";

import { BsImages } from "react-icons/bs";
import { BiLinkAlt, BiMap } from "react-icons/bi";
import { PiSpeakerHigh } from "react-icons/pi";
import { DateObject } from "react-multi-date-picker";

import Persian_cl from "react-date-object/calendars/persian";
import Button from "../../../Components/Button/Button";

const CompanyFormSchema = z.object({
    name: z.string().min(3, messageLengthGenerator("Min", "نام شرکت", 3)).trim(),
    location: z.string().min(10, messageLengthGenerator("Min", "موقعیت مکانی", 10)).trim(),
    logo: z.string().min(1, messageRequiredGenerator("لینک لوگو شرکت")).url(messageUrlNotValid("لوگو شرکت")).trim(),
    website: z.string().url(messageUrlNotValid("وب سایت شرکت")).trim(),
    desc: z.string().min(1, messageRequiredGenerator("درباره ی شرکت")).trim(),
    CompanySlogan: z
        .string()
        .min(1, messageRequiredGenerator("شعار شرکت"))
        .max(50, messageLengthGenerator("Max", "شعار شرکت شما", 50))
        .trim(),
    establishedyear: z.date({ required_error: messageRequiredGenerator("سال تاسیس شرکت") }),
    OrganizationEmploy: z.string().min(1, messageRequiredGenerator("تعداد کارکنان")),
    ownership: z.string({ required_error: "انتخاب نوع شرکت اجباری است" }).trim(),
});
type TypeCompanyFormSchema = z.infer<typeof CompanyFormSchema>;

const EditHome: React.FC = () => {
    const { ShowContext, showMess } = useShowMssAndNotif({ placementOfNotif: "bottomLeft" });
    const {
        register,
        setValue,
        handleSubmit,
        getFieldState,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<TypeCompanyFormSchema>({ resolver: zodResolver(CompanyFormSchema) });

    useEffect(() => {
        Object.keys(errors).map((item) => {
            showMess({
                type: "error",
                message: getFieldState(item as keyof TypeCompanyFormSchema).error?.message,
            });
        });
    }, [errors]);

    const setEstablishDate = (date: number) => setValue("establishedyear", new Date(date));
    const submitAction = (data: TypeCompanyFormSchema) => {
        console.log(data);
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                showMess({ type: "success", message: messageSuccess("آپدیت اطلاعات شرکت") });
                reset();
                resolve();
            }, 2000);
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
                        <img className="rounded-full h-20 shadow-xl ml-5" src="/images/company-Sheypoor.webp" alt="" />
                        <div className="w-full">
                            <TextInput
                                icon={<BsImages></BsImages>}
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
                        icon={<BiMap></BiMap>}
                        iconSide="Right"
                        isError={errors.location?.message}
                    ></TextInput>
                </section>
                <section className="my-5">
                    <h5 className="mr-2">وب سایت شرکت</h5>
                    <TextInput
                        placeholder="برای مثال www.jobvision.ir"
                        register={register("website")}
                        icon={<BiLinkAlt></BiLinkAlt>}
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
                        register={register("CompanySlogan")}
                        icon={<PiSpeakerHigh></PiSpeakerHigh>}
                        iconSide="Right"
                        isError={errors.CompanySlogan?.message}
                    ></TextInput>
                </section>
                <section>
                    <h5 className="mr-2">تعداد کارکنان شرکت</h5>
                    <NumberInput
                        register={register("OrganizationEmploy")}
                        placeholder="برای مثال 13"
                        min={1}
                        isError={errors.OrganizationEmploy?.message}
                    ></NumberInput>
                </section>
                <section className="my-5">
                    <h5 className="mr-2">سال تاسیس</h5>
                    <DateInput
                        placeholder={`برای مثال ${new DateObject().convert(Persian_cl)}`}
                        setDate={setEstablishDate}
                    ></DateInput>
                </section>
                <section>
                    <h5 className="mr-2">نوع شرکت</h5>
                    <SelectInput
                        mode="Single"
                        label="نوع شرکت"
                        options={SubPageCmsTypes.ownershipOptions}
                        register={register("ownership")}
                        className="border-jv-lightGray3x"
                        isError={errors.ownership?.message}
                    ></SelectInput>
                </section>
                <Button
                    ClassName="mt-5 w-full"
                    textColor="primary"
                    size="middle"
                    ClickHandler={() => {}}
                    isLoading={isSubmitting}
                >
                    آپدیت
                </Button>
            </form>
        </>
    );
};

export default EditHome;
