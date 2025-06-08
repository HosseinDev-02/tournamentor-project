import React from "react";
import { Link } from "react-router-dom";
import Symbols from "../Symbols/Symbols";

const menuLinks = [
    {
        id: 1,
        title: "تورنومنت ها",
        href: "#",
    },
    {
        id: 2,
        title: "اخبار",
        href: "#",
    },
    {
        id: 3,
        title: "لیست افراد برتر",
        href: "#",
    },
    {
        id: 4,
        title: "درباره ما",
        href: "#",
    },
];

function Header() {
    return (
        <>
            <Symbols />
            <header className="rounded-xl px-6 py-5 text-white backdrop-blur-[10px] bg-purple-100/8 flex items-center justify-between">
                {/* Logo */}
                <Link
                    className="font-Montserrat-Black bg-gradient-to-r from-purple-200 via-white to-cyan bg-clip-text text-[22px]"
                    style={{ WebkitTextFillColor: "transparent" }}
                    to="/"
                >
                    TOURNAMENTOR
                </Link>
                {/* Menu */}
                <ul className="flex items-center gap-10 font-VazirMatn-Medium">
                    {menuLinks?.map((link) => (
                        <li key={link.id}>
                            <Link className={`${link.title.includes("تورنومنت ها") && 'flex items-center gap-2'}`} to={link.href}>
                                {link.title.includes("تورنومنت ها") && (
                                    <svg className="w-5 h-5">
                                        <use href="#category"></use>
                                    </svg>
                                )}
                                <span>{link.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
                {/* Search Box */}
                <div className="h-12 rounded-xl px-4 flex items-center gap-2 border-[0.85px] border-white/20">
                    <svg className="w-4.5 h-4.5">
                        <use href="#search"></use>
                    </svg>
                    <input type="text" className="w-full h-full outline-none placeholder:text-white" placeholder="جست و جوی بازی ها ..." />
                </div>
                {/* Login-Register */}
                <Link className="h-12 flex items-center gap-2 rounded-lg px-4 border-[0.85px] border-white/20 hover:bg-white hover:text-background transition-colors duration-300" to='#'>
                    <svg className="w-4.5 h-4.5">
                        <use href="#login"></use>
                    </svg>
                    <span>
                    ورود/ثبت نام
                    </span>
                </Link>
            </header>
        </>
    );
}

export default Header;
