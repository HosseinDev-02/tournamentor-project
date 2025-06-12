import React, { useState } from "react";
import { Link } from "react-router-dom";
import Symbols from "../Symbols/Symbols";
import { GrSearch } from "react-icons/gr";
import { LuMenu, LuSearch, LuX, LuInfo } from "react-icons/lu";
import { AiOutlineLogin } from "react-icons/ai";
import { TbTournament } from "react-icons/tb";
import { BiNews } from "react-icons/bi";
import { RiMedal2Line } from "react-icons/ri";
import OverLay from "../OverLay/OverLay";
import PrimaryBorder from "../PrimaryBorder/PrimaryBorder";
import Box from "../Box/Box";
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
        title: "افراد برتر",
        href: "#",
    },
    {
        id: 4,
        title: "درباره ما",
        href: "#",
    },
];

console.warn("Refactor Admin-Panel Menu");

const setMobileMenuIcons = (title) => {
    if (title.includes("تورنومنت ها")) {
        return "tournament";
    }
    if (title.includes("اخبار")) {
        return "bill";
    }
    if (title.includes("افراد برتر")) {
        return "star-medal";
    }
    if (title.includes("درباره ما")) {
        return "warning";
    }
};

function Header() {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    return (
        <>
            <Symbols />
            <Box className='!px-4 md:!px-6 !py-3 md:!py-5'>
                <div className="z-50 text-white flex items-center justify-between">
                    <div className="hidden md:flex items-center gap-4">
                        {/* Tablet Mobile Menu */}
                        <div className="lg:hidden">
                            <span
                                onClick={() =>
                                    setShowMobileMenu((prevState) => !prevState)
                                }
                                className="block"
                            >
                                {showMobileMenu ? (
                                    <LuX size={30} />
                                ) : (
                                    <LuMenu size={30} />
                                )}
                            </span>
                            {/* Tablet Mobile Menu Content */}
                            <div
                                className={`absolute z-50 right-0 top-[86px] px-6 py-7.5 rounded-b-md border-l-[0.85px] border-b-[0.85px] border-white/17 backdrop-blur-[4px] bg-gradient-to-l from-[#1E104D] to-[#122540] transition-all ${
                                    showMobileMenu
                                        ? "visible opacity-100"
                                        : "invisible opacity-0"
                                }`}
                            >
                                <Link
                                    className="flex items-center justify-center gap-2 rounded-md border border-white py-3 px-4 mb-7.5"
                                    to="#"
                                >
                                    <svg className="w-4.5 h-4.5">
                                        <use href="#login"></use>
                                    </svg>
                                    <span>ورود/ثبت نام</span>
                                </Link>
                                <ul className="flex flex-col items-center font-VazirMatn-Medium gap-7.5">
                                    {menuLinks.map((link) => (
                                        <li key={link.id}>
                                            <Link
                                                className={`${
                                                    link.title.includes(
                                                        "تورنومنت ها"
                                                    ) &&
                                                    "flex items-center gap-2"
                                                }`}
                                                to={link.href}
                                            >
                                                {link.title.includes(
                                                    "تورنومنت ها"
                                                ) && (
                                                    <svg className="w-5 h-5">
                                                        <use href="#category"></use>
                                                    </svg>
                                                )}
                                                <span>{link.title}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        {/* Tablet Logo */}
                        <Link
                            className="font-Montserrat-Black bg-gradient-to-r from-purple-200 via-white to-cyan bg-clip-text text-2xl md:text-[22px]"
                            style={{ WebkitTextFillColor: "transparent" }}
                            to="/"
                        >
                            TOURNAMENTOR
                        </Link>
                    </div>
                    {/* Mobile Search Box */}
                    <span className="relative flex md:hidden items-center justify-center p-2 rounded-md">
                        <PrimaryBorder />
                        <GrSearch size={20} />
                    </span>
                    {/* Mobile Logo */}
                    <Link
                        className="md:hidden font-Montserrat-Black bg-gradient-to-r from-purple-200 via-white to-cyan bg-clip-text text-2xl md:text-[22px]"
                        style={{ WebkitTextFillColor: "transparent" }}
                        to="/"
                    >
                        TOURNAMENTOR
                    </Link>
                    {/* Menu */}
                    <ul className="hidden lg:flex items-center gap-10 font-VazirMatn-Medium">
                        {menuLinks?.map((link) => (
                            <li key={link.id}>
                                <Link
                                    className={`transition-colors duration-300 hover:text-cyan/80 ${
                                        link.title.includes("تورنومنت ها") &&
                                        "flex items-center gap-2"
                                    }`}
                                    to={link.href}
                                >
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
                    <div className="flex items-center justify-between gap-4">
                        {/* Desktop Search Box */}
                        <div className="h-12 rounded-xl px-4 hidden xl:flex items-center gap-2 border-[0.85px] border-neutral-300/20">
                            <LuSearch size={24} />
                            <input
                                type="text"
                                className="w-full h-full outline-none placeholder:text-white font-VazirMatn-Medium"
                                placeholder="جست و جوی بازی ها ..."
                            />
                        </div>
                        {/* Mobile Search Box */}
                        <div className="xl:hidden">
                            {/* Mobile Login-Register */}
                            <div className="md:hidden">
                                <Link
                                    to="#"
                                    className="flex items-center justify-center rounded-md relative p-2"
                                >
                                    <PrimaryBorder />
                                    <AiOutlineLogin size={20} />
                                </Link>
                            </div>
                            {/* Tablet Search Box  */}
                            <span className="hidden md:flex items-center justify-center p-3 rounded-lg relative">
                                <PrimaryBorder />
                                <LuSearch size={24} />
                            </span>
                        </div>
                        {/* Desktop Login-Register */}
                        <Link
                            className="h-12 hidden xl:flex items-center gap-2 rounded-lg px-4 border-[0.85px] border-white/20 hover:bg-white hover:text-background transition-colors duration-300 hover:border-white font-VazirMatn-Medium"
                            to="#"
                        >
                            <svg className="w-6 h-6">
                                <use href="#login"></use>
                            </svg>
                            <span>ورود/ثبت نام</span>
                        </Link>
                        {/* Tablet Login-Register */}
                        <Link
                            className="hidden md:flex xl:hidden items-center justify-center p-3 rounded-lg relative"
                            to="#"
                        >
                            <PrimaryBorder />
                            <AiOutlineLogin size={24} />
                        </Link>
                    </div>
                </div>
            </Box>
            {/* OverLay */}
            <OverLay
                className="hidden md:block lg:hidden"
                show={showMobileMenu}
                setShow={setShowMobileMenu}
            />

            {/* Mobile Menu Content */}

            <div className="fixed left-0 text-white right-0 bottom-0 py-6 flex md:hidden items-center justify-around backdrop-blur-[4px] bg-gradient-to-l from-[#1E104D] to-[#122540] font-VazirMatn-Medium text-sm">
                {menuLinks.map((link) => {
                    const icon = setMobileMenuIcons(link.title);
                    return (
                        <Link
                            key={link.id}
                            className="flex flex-col items-center gap-2"
                            to={link.href}
                        >
                            <svg className="w-6 h-6">
                                <use href={`#${icon}`}></use>
                            </svg>
                            <span>{link.title}</span>
                        </Link>
                    );
                })}
            </div>
        </>
    );
}

export default Header;
