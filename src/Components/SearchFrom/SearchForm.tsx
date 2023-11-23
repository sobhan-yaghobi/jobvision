// Hooks
import React, { memo } from "react";
import useSearchForm from "../../Hooks/useSearchForm";
import { useNavigate } from "react-router-dom";

// Types
import { ItemGeneratorProps, citis, groupJobs } from "./SearchForm.type";

// Components
import { TextInput } from "../Input/Input";
import Button from "../Button/Button";

// Functions
import { uniqBy } from "lodash";

const SearchFrom: React.FC = memo(() => {
    const navigate = useNavigate();
    const { setValue, routeTitle, routeJobsTag, routeCity, getForm } = useSearchForm();

    const ItemGenerator: React.FC<ItemGeneratorProps> = ({ array, mainValue, setMainValue }) => {
        const listItems: ItemGeneratorProps["array"] = array.filter((item) => item.name.includes(mainValue) && item);
        type LiGeneratorProps = {
            value: ItemGeneratorProps["mainValue"];
        };
        const LiGenerator: React.FC<LiGeneratorProps> = ({ value }) => (
            <li
                onClick={() => {
                    setMainValue(value);
                }}
                className="p-2 my-1 cursor-pointer hover:bg-jv-white last:mb-0 first:mt-0"
            >
                {value}
            </li>
        );

        return listItems.length ? (
            uniqBy(listItems, "id").map((item) => (
                <LiGenerator key={`LiGenerator-${item.id}`} value={item.name}></LiGenerator>
            ))
        ) : (
            <LiGenerator key={`LiGenerator_main_value`} value={mainValue}></LiGenerator>
        );
    };

    return (
        <>
            <div className="w-full flex flex-col items-center justify-between md:flex-row">
                <TextInput
                    value={routeTitle}
                    onChange={(value) => setValue({ name: "title", value })}
                    placeholder="عنوان شغلی یا شرکت"
                    className={[{ inputwrapperClassName: "mx-1 my-1 md:my-0" }]}
                    icon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19.5304 17.4698C19.2375 17.1769 18.7626 17.1769 18.4697 17.4698C18.1768 17.7626 18.1768 18.2375 18.4697 18.5304L19.5304 17.4698ZM22.4696 22.5304C22.7625 22.8233 23.2374 22.8233 23.5303 22.5304C23.8232 22.2375 23.8232 21.7626 23.5303 21.4697L22.4696 22.5304ZM9.33512 4.80232C9.74423 4.73752 10.0234 4.35334 9.95856 3.94423C9.89376 3.53511 9.50958 3.25599 9.10047 3.32079L9.33512 4.80232ZM4.32076 8.1005C4.25596 8.50961 4.53508 8.89379 4.9442 8.95859C5.35331 9.02339 5.73749 8.74426 5.80229 8.33515L4.32076 8.1005ZM18.4697 18.5304L22.4696 22.5304L23.5303 21.4697L19.5304 17.4698L18.4697 18.5304ZM11 18.25C6.44365 18.25 2.75 14.5563 2.75 10H1.25C1.25 15.3848 5.61522 19.75 11 19.75V18.25ZM19.25 10C19.25 14.5563 15.5563 18.25 11 18.25V19.75C16.3848 19.75 20.75 15.3848 20.75 10H19.25ZM11 1.75C15.5563 1.75 19.25 5.44365 19.25 10H20.75C20.75 4.61522 16.3848 0.25 11 0.25V1.75ZM11 0.25C5.61522 0.25 1.25 4.61522 1.25 10H2.75C2.75 5.44365 6.44365 1.75 11 1.75V0.25ZM9.10047 3.32079C6.64008 3.71047 4.71044 5.64012 4.32076 8.1005L5.80229 8.33515C6.09032 6.51661 7.51658 5.09035 9.33512 4.80232L9.10047 3.32079Z"
                                fill="#2D264B"
                            />
                        </svg>
                    }
                    register={{}}
                    iconSide="Right"
                ></TextInput>
                <TextInput
                    value={routeJobsTag}
                    onChange={(value) => setValue({ name: "jobsGroup", value })}
                    placeholder="گروه شغلی"
                    className={[{ inputwrapperClassName: "mx-1 my-1 md:my-0" }]}
                    icon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14.25 7.75C14.25 8.99264 13.2426 10 12 10V11.5C14.0711 11.5 15.75 9.82107 15.75 7.75H14.25ZM12 10C10.7574 10 9.75 8.99264 9.75 7.75H8.25C8.25 9.82107 9.92893 11.5 12 11.5V10ZM9.75 7.75C9.75 6.50736 10.7574 5.5 12 5.5V4C9.92893 4 8.25 5.67893 8.25 7.75H9.75ZM12 5.5C13.2426 5.5 14.25 6.50736 14.25 7.75H15.75C15.75 5.67893 14.0711 4 12 4V5.5ZM9 14.5H15V13H9V14.5ZM15 19H9V20.5H15V19ZM9 19C7.75736 19 6.75 17.9926 6.75 16.75H5.25C5.25 18.8211 6.92893 20.5 9 20.5V19ZM17.25 16.75C17.25 17.9926 16.2426 19 15 19V20.5C17.0711 20.5 18.75 18.8211 18.75 16.75H17.25ZM15 14.5C16.2426 14.5 17.25 15.5074 17.25 16.75H18.75C18.75 14.6789 17.0711 13 15 13V14.5ZM9 13C6.92893 13 5.25 14.6789 5.25 16.75H6.75C6.75 15.5074 7.75736 14.5 9 14.5V13Z"
                                fill="#2D264B"
                            />
                            <path
                                d="M7.75214 10.3887C7.59441 10.1353 7.29846 10 7 10C5.75736 10 4.75 8.99264 4.75 7.75C4.75 6.50736 5.75736 5.5 7 5.5C7.29846 5.5 7.59441 5.36473 7.75214 5.11135C7.75912 5.10014 7.76613 5.08896 7.7732 5.07782C8.0358 4.66331 7.90275 4.0764 7.415 4.0227C7.27873 4.0077 7.14027 4 7 4C4.92893 4 3.25 5.67893 3.25 7.75C3.25 9.82107 4.92893 11.5 7 11.5C7.14027 11.5 7.27873 11.4923 7.415 11.4773C7.90275 11.4236 8.0358 10.8367 7.7732 10.4222C7.76614 10.411 7.75912 10.3999 7.75214 10.3887Z"
                                fill="#2D264B"
                            />
                            <path
                                d="M4.70829 18.3169C4.59477 18.1275 4.39439 18 4.17359 18H4C2.75736 18 1.75 16.9926 1.75 15.75C1.75 14.5074 2.75736 13.5 4 13.5H4.17359C4.39439 13.5 4.59477 13.3725 4.70829 13.1831C4.98539 12.7208 4.68468 12 4.14569 12H4C1.92893 12 0.25 13.6789 0.25 15.75C0.25 17.8211 1.92893 19.5 4 19.5H4.14569C4.68469 19.5 4.98539 18.7792 4.70829 18.3169Z"
                                fill="#2D264B"
                            />
                            <path
                                d="M16.2268 10.4222C15.9642 10.8367 16.0973 11.4236 16.585 11.4773C16.7213 11.4923 16.8597 11.5 17 11.5C19.0711 11.5 20.75 9.82107 20.75 7.75C20.75 5.67893 19.0711 4 17 4C16.8597 4 16.7213 4.0077 16.585 4.0227C16.0973 4.0764 15.9642 4.66331 16.2268 5.07782C16.2339 5.08896 16.2409 5.10014 16.2479 5.11134C16.4056 5.36472 16.7015 5.5 17 5.5C18.2426 5.5 19.25 6.50736 19.25 7.75C19.25 8.99264 18.2426 10 17 10C16.7015 10 16.4056 10.1353 16.2479 10.3887C16.2409 10.3999 16.2339 10.411 16.2268 10.4222Z"
                                fill="#2D264B"
                            />
                            <path
                                d="M19.2917 18.3169C19.0146 18.7792 19.3153 19.5 19.8543 19.5H20C22.0711 19.5 23.75 17.8211 23.75 15.75C23.75 13.6789 22.0711 12 20 12H19.8543C19.3153 12 19.0146 12.7208 19.2917 13.1831C19.4052 13.3725 19.6056 13.5 19.8264 13.5H20C21.2426 13.5 22.25 14.5074 22.25 15.75C22.25 16.9926 21.2426 18 20 18H19.8264C19.6056 18 19.4052 18.1275 19.2917 18.3169Z"
                                fill="#2D264B"
                            />
                        </svg>
                    }
                    register={{}}
                    iconSide="Right"
                >
                    <ItemGenerator
                        array={groupJobs}
                        mainValue={routeJobsTag}
                        setMainValue={(value) => setValue({ name: "jobsGroup", value })}
                    ></ItemGenerator>
                </TextInput>
                <TextInput
                    onChange={(value) => setValue({ name: "city", value })}
                    value={routeCity}
                    placeholder="شهر"
                    className={[{ inputwrapperClassName: "mx-1 my-1 md:my-0" }]}
                    icon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14.7808 19.7005L14.1906 19.2377L14.7808 19.7005ZM9.21921 19.7005L8.62903 20.1633L9.21921 19.7005ZM12 22.0055V21.2555V22.0055ZM19.25 9.6087C19.25 10.8352 18.6104 12.4764 17.6037 14.256C16.6137 16.0063 15.3342 17.7794 14.1906 19.2377L15.371 20.1633C16.5371 18.6762 17.8672 16.837 18.9094 14.9945C19.9349 13.1814 20.75 11.2494 20.75 9.6087H19.25ZM9.80938 19.2377C8.66578 17.7794 7.38628 16.0063 6.39625 14.256C5.38962 12.4764 4.75 10.8352 4.75 9.6087H3.25C3.25 11.2494 4.06511 13.1814 5.09064 14.9945C6.13277 16.837 7.46288 18.6762 8.62903 20.1633L9.80938 19.2377ZM4.75 9.6087C4.75 5.21571 8.04678 1.75 12 1.75V0.25C7.11666 0.25 3.25 4.49277 3.25 9.6087H4.75ZM12 1.75C15.9532 1.75 19.25 5.21571 19.25 9.6087H20.75C20.75 4.49277 16.8833 0.25 12 0.25V1.75ZM14.1906 19.2377C13.5717 20.027 13.1641 20.5426 12.7992 20.8741C12.4664 21.1764 12.2442 21.2555 12 21.2555V22.7555C12.7291 22.7555 13.2948 22.4504 13.8078 21.9844C14.2886 21.5476 14.7849 20.9107 15.371 20.1633L14.1906 19.2377ZM8.62903 20.1633C9.21511 20.9107 9.71136 21.5476 10.1922 21.9844C10.7052 22.4504 11.2709 22.7555 12 22.7555V21.2555C11.7558 21.2555 11.5336 21.1764 11.2008 20.8741C10.8359 20.5426 10.4283 20.027 9.80938 19.2377L8.62903 20.1633ZM8.25 10C8.25 12.0711 9.92893 13.75 12 13.75V12.25C10.7574 12.25 9.75 11.2426 9.75 10H8.25ZM12 13.75C14.0711 13.75 15.75 12.0711 15.75 10H14.25C14.25 11.2426 13.2426 12.25 12 12.25V13.75ZM15.75 10C15.75 7.92893 14.0711 6.25 12 6.25V7.75C13.2426 7.75 14.25 8.75736 14.25 10H15.75ZM12 6.25C9.92893 6.25 8.25 7.92893 8.25 10H9.75C9.75 8.75736 10.7574 7.75 12 7.75V6.25Z"
                                fill="#2D264B"
                            />
                        </svg>
                    }
                    register={{}}
                    iconSide="Right"
                >
                    <ItemGenerator
                        array={citis}
                        mainValue={routeCity}
                        setMainValue={(value) => setValue({ name: "city", value })}
                    ></ItemGenerator>
                </TextInput>
                <Button
                    textColor="primary"
                    size="small"
                    ClassName="hover:!bg-jv-primary hover:!text-jv-light w-full my-1 md:w-auto"
                    isLoading={false}
                    ClickHandler={() => {
                        navigate(
                            `/jobs?title=${getForm().title}&jobsGroup=${getForm().jobsGroup}&city=${getForm().city}`
                        );
                    }}
                >
                    جستجو در مشاغل
                </Button>
            </div>
        </>
    );
});

export default SearchFrom;
