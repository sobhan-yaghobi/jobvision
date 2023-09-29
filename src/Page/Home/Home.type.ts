import uuidGenerator from "../../Utils/UuidGenerator";

export interface AboutUsBoxType {
    id: string;
    title: string;
    desc: string;
    iconSrc: string;
    customClass: string;
}

export interface WhyUsDescType {
    id: string;
    title: string;
    iconColor: string;
    iconSrc: string;
    desc: string;
}

export interface WhyUsType {
    mainItems: WhyUsDescType[];
    mainNumber: number;
    isShow: boolean;
}

const AboutUsItemArray: AboutUsBoxType[] = [
    {
        id: uuidGenerator(),
        title: "کارجوی همراه",
        desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده گرافیک است.",
        iconSrc: "/images/worker.webp",
        customClass: "from-[#f8f9fa] to-[#ec8386] shadow-[-10px_10px_30px_-9px_#ff979a,10px_10px_30px_-9px_#c96f72]",
    },
    {
        id: uuidGenerator(),
        title: "سازمان های در حال همکاری",
        desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده گرافیک است.",
        iconSrc: "/images/skyline.webp",
        customClass: "from-[#f8f9fa] to-[#A5A8F2] shadow-[-10px_10px_30px_-9px_#9396d7,10px_10px_30px_-9px_#b7baff]",
    },
    {
        id: uuidGenerator(),
        title: "موقعیت شغلی فعال",
        desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده گرافیک است.",
        iconSrc: "/images/job-search.webp",
        customClass: "from-[#f8f9fa] to-[#90D1F4] shadow-[-10px_10px_30px_-9px_#80bad9,10px_10px_30px_-9px_#a0e8ff]",
    },
    {
        id: uuidGenerator(),
        title: "استخدام موفق",
        desc: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده گرافیک است.",
        iconSrc: "/images/hiring.webp",
        customClass: "from-[#f8f9fa] to-[#F5CD8D] shadow-[-10px_10px_30px_-9px_#dab67d,10px_10px_30px_-9px_#ffe49d]",
    },
];

const whyUsArray: WhyUsDescType[] = [
    {
        id: uuidGenerator(),
        title: "مورد اعتماد",
        iconColor: "#F06263",
        iconSrc: "/images/trust.webp",
        desc: "دسترسی به بهترین موقعیت‌های کاریابی و مشاهده فرصت‌های استخدام معتبرترین سازمان‌های ایران از جمله مهم‌ترین مزیت‌های سایت کاریابی جاب ویژن است.",
    },
    {
        id: uuidGenerator(),
        title: "هوشمند",
        iconColor: "#7551F5",
        iconSrc: "/images/smart-city.webp",
        desc: "سایت کاریابی جاب ویژن با استفاده از هوش مصنوعی (AI)، عملکرد شما را در سیستم رصد کرده و بر همین اساس، آگهی‌های استخدام مرتبط را از طریق پنل کاربری، ایمیل، ربات تلگرام و در برخی موارد پیامک و نوتیفیکشن به شما پیشنهاد می‌دهد.",
    },
    {
        id: uuidGenerator(),
        title: "رزومه ساز",
        iconColor: "#F4885F",
        iconSrc: "/images/resume.webp",
        desc: "سایت کاریابی جاب ویژن با استفاده از هوش مصنوعی (AI)، عملکرد شما را در سیستم رصد کرده و بر همین اساس، آگهی‌های استخدام مرتبط را از طریق پنل کاربری، ایمیل، ربات تلگرام و در برخی موارد پیامک و نوتیفیکشن به شما پیشنهاد می‌دهد.",
    },
    {
        id: uuidGenerator(),
        title: "آزمون خودشناسی",
        iconColor: "#28BBF3",
        iconSrc: "/images/mindset.webp",
        desc: "قبل از اینکه به دنبال فرصت‌های استخدام مناسب بگردید باید خود را بشناسید. سایت استخدام جاب ویژن به کمک معتبرترین آزمون‌ها و با ارائه‌ی گزارش‌های تحلیلی به شما کمک می‌کند به شناخت دقیق‌تری از ویژگی‌های شخصیتی، علائق شغلی، هوش هیجانی (EQ) و سایر جنبه‌های هوش خود مثل حل مسئله، قدرت تحلیل و استدلال برسید.",
    },
    {
        id: uuidGenerator(),
        title: "توانایی ملاقات با مدیران",
        iconColor: "#90D142",
        iconSrc: "/images/conversation.webp",
        desc: "جاب‌ویژن برگزارکننده بزرگترین نمایشگاه‌های کار در کشور است.سازمانها در این رویداد به دنبال ارتقای برند کارفرمایی خود و استخدام بهترین استعدادهای بازار کار هستند پس فرصت مناسبی برای نیروی متخصص فراهم شده تا اطلاعات کافی از سازمانها کسب کرده و شانس خود را برای استخدام شدن در آنها امتحان کنند.",
    },
    {
        id: uuidGenerator(),
        title: "امکان معرفی کامل به کارفرما",
        iconColor: "#F56564",
        iconSrc: "/images/teacher.webp",
        desc: "در سایت استخدامی جاب ویژن می‌توانید علاوه بر رزومه، اطلاعات بیشتری از خود به کارفرما ارائه کنید تا شانس استخدام بالاتری داشته باشید. نتیجه آزمون‌‌های خودشناسی، نمونه کار، معرفی صوتی، تلفن تماس مدیران و همکاران سابق و نیز نامه اختصاصی برای سازمان‌ها، از جمله امکاناتی هستند که به کمک آن‌ها می‌توانید خود و توانمندی‌هایتان را بهتر به کارفرما معرفی کنید.",
    },
    {
        id: uuidGenerator(),
        title: "جز شبکه های قوی اجتماعی",
        iconColor: "#D1C5F2",
        iconSrc: "/images/social-media.webp",
        desc: "جاب ویژن در شبکه‌های اجتماعی نیز حضور فعالی دارد و بیش از 400 هزار متخصص و کارجو، صفحه جاب ویژن در لینکدین، تلگرام، اینستاگرام و توییتر را دنبال می‌کنند.",
    },
    {
        id: uuidGenerator(),
        title: "همکاری با موسسات ایران",
        iconColor: "#F5895D",
        iconSrc: "/images/teamwork.webp",
        desc: "هرچه مهارت‌های بیشتری داشته باشید در موقعیت‌های شغلی بهتری می‌توانید استخدام شوید. سایت کاریابی جاب ویژن با همکاری بهترین موسسات آموزشی کشور، دوره‌های آموزشی مفید و کاربردی را به شما معرفی می‌کند. پس از شرکت در این دوره‌ها، مدالی در کنار رزومه شما قرار می‌گیرد که باعث تمایز شما از سایر کارجویان می‌شود؛ به این ترتیب، می‌توانید در رقابت کاریابی پیروز شده و در موقعیت شغلی بهتری استخدام شوید.",
    },
];

export { AboutUsItemArray, whyUsArray };
