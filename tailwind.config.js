// tailwind.config.js
/ @type {import('tailwindcss').Config} */;
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            screen: {
                sm: "540px",
            },
            colors: {
                "jv-white": "var(--whiteColor)",
                "jv-black": "var(--blackColor)",
                "jv-primary": "var(--primaryColor)",
                "jv-light": "var(--lightColor)",
                "jv-danger": "var(--dangerColor)",
                "jv-lightDanger": "var(--lightDangerColor)",
                "jv-success": "var(--successColor)",
                "jv-warning": "var(--warningColor)",
                "jv-blue": "var(--blueColor)",
                "jv-bgColor": "var(--backgroundColor)",
                "jv-gray": "var(--grayColor)",
                "jv-lightGray": "var(--lightGrayColor)",
                "jv-lightGray2x": "var(--lightGray2xColor)",
                "jv-lightGray3x": "var(--lightGray3xColor)",
            },
        },
    },
    plugins: [
        // ...
    ],
    corePlugins: {
        preflight: false, // <== disable this!
    },
};
