import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Symbols from "../../components/Symbols/Symbols";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import {
    BiUser,
    BiSearchAlt,
    BiX,
    BiPowerOff,
    BiMenu,
    BiUserCircle,
    BiGroup,
    BiWallet,
    BiSolidDashboard,
} from "react-icons/bi";
import { LuSwords } from "react-icons/lu";
import { TbGenderFemale } from "react-icons/tb";
import { TbTournament } from "react-icons/tb";
import { GrGroup } from "react-icons/gr";
import { useAuth } from "../../contexts/AuthContext.jsx";
import Overlay from "../../components/Overlay/Overlay";
function Index() {
    const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
    const [showSearchBox, setShowSearchBox] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const [headerShadow, setHeaderShadow] = useState(false);
    const { logOut } = useAuth();
    const location = useLocation();
    const { pathname } = location;
    const navigate = useNavigate();

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 40) {
                setHeaderShadow(true);
            } else {
                setHeaderShadow(false);
            }
        });

        const keyDownHandler = (e) => {
            if (e.ctrlKey && e.key === "/") {
                e.preventDefault();
                setShowSearchBox((prevState) => !prevState);
            }
        };
        window.addEventListener("keydown", keyDownHandler);

        return () => {
            window.removeEventListener("keydown", keyDownHandler);
        };
    }, []);

    return (
        <>
            <Symbols />

            <div className="flex bg-[rgb(243,244,244)] min-h-screen">
                {/* Side Bar */}
                <div
                    className={`shrink-0 bg-[#182535] h-screen transition-all duration-300 fixed z-[1001] w-64 ${
                        openMenu ? "right-0" : "-right-64 xl:right-0"
                    } ${sidebarIsOpen ? "xl:w-64" : "xl:w-20"}`}
                >
                    {/*  SideBar Logo  */}
                    <div className="flex justify-between items-center pr-6 pl-5 h-16">
                        <span
                            className={`font-IranYekan-Bold text-2xl text-white ${
                                sidebarIsOpen
                                    ? "xl:opacity-100"
                                    : "xl:opacity-0"
                            }`}
                        >
                            تورنومنتور
                        </span>
                        <span
                            onClick={() => {
                                setOpenMenu((prevState) => !prevState);
                            }}
                            className="flex xl:hidden items-center justify-center text-blue"
                        >
                            <BiX size="24px" />
                        </span>
                    </div>
                    {/*  SideBar Open Button  */}
                    <button
                        onClick={() => {
                            setSidebarIsOpen((prevState) => !prevState);
                        }}
                        className="w-8 h-8 rounded-l-xl bg-blue text-white hidden xl:flex cursor-pointer items-center text-xl justify-center absolute -left-8 top-4 z-[1001]"
                    >
                        {sidebarIsOpen ? (
                            <MdKeyboardArrowRight />
                        ) : (
                            <MdKeyboardArrowLeft />
                        )}
                    </button>
                    {/* Sidebar Content */}
                    <div
                        className={`mt-2.5 overflow-hidden transition-all duration-300`}
                    >
                        <ul className="flex flex-col gap-0.5 font-IranYekan-Medium text-2sm text-[#bec5cc] px-[15px]">
                            <Link
                                to="/"
                                className={`flex items-center gap-2 py-2.5 px-3.5 transition-colors duration-300 rounded-md ${
                                    pathname === "/"
                                        ? "bg-blue text-white"
                                        : "hover:bg-[#2a3645]"
                                }`}
                            >
                                <BiSolidDashboard
                                    className="shrink-0"
                                    size="20px"
                                />
                                <span
                                    className={`sidebar-menu-text ${
                                        sidebarIsOpen
                                            ? "xl:opacity-100"
                                            : "xl:opacity-0"
                                    }`}
                                >
                                    داشبورد
                                </span>
                            </Link>
                            <Link
                                to="users"
                                className={`flex items-center gap-2 py-2.5 px-3.5 transition-colors duration-300 rounded-md ${
                                    pathname.includes("users")
                                        ? "bg-blue text-white"
                                        : "hover:bg-[#2a3645]"
                                }`}
                            >
                                <BiGroup className="shrink-0" size="20px" />
                                <span
                                    className={`sidebar-menu-text ${
                                        sidebarIsOpen
                                            ? "xl:opacity-100"
                                            : "xl:opacity-0"
                                    }`}
                                >
                                    کاربران
                                </span>
                            </Link>
                            <Link
                                to="avatars"
                                className={`flex items-center gap-2 py-2.5 px-3.5 transition-colors duration-300 rounded-md ${
                                    pathname.includes("avatars")
                                        ? "bg-blue text-white"
                                        : "hover:bg-[#2a3645]"
                                }`}
                            >
                                <BiUserCircle
                                    className="shrink-0"
                                    size="20px"
                                />
                                <span
                                    className={`sidebar-menu-text ${
                                        sidebarIsOpen
                                            ? "xl:opacity-100"
                                            : "xl:opacity-0"
                                    }`}
                                >
                                    آواتار ها
                                </span>
                            </Link>
                            <Link
                                to="games"
                                className={`flex items-center gap-2 py-2.5 px-3.5 transition-colors duration-300 rounded-md ${
                                    pathname.includes("games")
                                        ? "bg-blue text-white"
                                        : "hover:bg-[#2a3645]"
                                }`}
                            >
                                <LuSwords className="shrink-0" size="20px" />
                                <span
                                    className={`sidebar-menu-text ${
                                        sidebarIsOpen
                                            ? "xl:opacity-100"
                                            : "xl:opacity-0"
                                    }`}
                                >
                                    بازی ها
                                </span>
                            </Link>
                            <Link
                                to="genders"
                                className={`flex items-center gap-2 py-2.5 px-3.5 transition-colors duration-300 rounded-md ${
                                    pathname.includes("genders")
                                        ? "bg-blue text-white"
                                        : "hover:bg-[#2a3645]"
                                }`}
                            >
                                <TbGenderFemale
                                    className="shrink-0"
                                    size="20px"
                                />
                                <span
                                    className={`sidebar-menu-text ${
                                        sidebarIsOpen
                                            ? "xl:opacity-100"
                                            : "xl:opacity-0"
                                    }`}
                                >
                                    جنسیت
                                </span>
                            </Link>
                            <Link
                                to="tournaments"
                                className={`flex items-center gap-2 py-2.5 px-3.5 transition-colors duration-300 rounded-md ${
                                    pathname.includes("tournaments")
                                        ? "bg-blue text-white"
                                        : "hover:bg-[#2a3645]"
                                }`}
                            >
                                <TbTournament
                                    className="shrink-0"
                                    size="20px"
                                />
                                <span
                                    className={`sidebar-menu-text ${
                                        sidebarIsOpen
                                            ? "xl:opacity-100"
                                            : "xl:opacity-0"
                                    }`}
                                >
                                    تورنومنت ها
                                </span>
                            </Link>
                            <Link
                                to="teams"
                                className={`flex items-center gap-2 py-2.5 px-3.5 transition-colors duration-300 rounded-md ${
                                    pathname.includes("teams")
                                        ? "bg-blue text-white"
                                        : "hover:bg-[#2a3645]"
                                }`}
                            >
                                <GrGroup className="shrink-0" size="20px" />
                                <span
                                    className={`sidebar-menu-text ${
                                        sidebarIsOpen
                                            ? "xl:opacity-100"
                                            : "xl:opacity-0"
                                    }`}
                                >
                                    تیم ها
                                </span>
                            </Link>
                            <Link
                                to="wallets"
                                className={`flex items-center gap-2 py-2.5 px-3.5 transition-colors duration-300 rounded-md ${
                                    pathname.includes("wallets")
                                        ? "bg-blue text-white"
                                        : "hover:bg-[#2a3645]"
                                }`}
                            >
                                <BiWallet className="shrink-0" size="20px" />
                                <span
                                    className={`sidebar-menu-text ${
                                        sidebarIsOpen
                                            ? "xl:opacity-100"
                                            : "xl:opacity-0"
                                    }`}
                                >
                                    کیف پول ها
                                </span>
                            </Link>
                            <Link
                                to="players"
                                className={`flex items-center gap-2 py-2.5 px-3.5 transition-colors duration-300 rounded-md ${
                                    pathname.includes("players")
                                        ? "bg-blue text-white"
                                        : "hover:bg-[#2a3645]"
                                }`}
                            >
                                <BiUser className="shrink-0" size="20px" />
                                <span
                                    className={`sidebar-menu-text ${
                                        sidebarIsOpen
                                            ? "xl:opacity-100"
                                            : "xl:opacity-0"
                                    }`}
                                >
                                    بازیکن ها
                                </span>
                            </Link>
                            <Link
                                onClick={() => logOut(navigate)}
                                to="#"
                                className={`flex items-center gap-2 py-2.5 px-3.5 transition-colors duration-300 rounded-md hover:bg-[#2a3645]`}
                            >
                                <BiPowerOff className="shrink-0" size="20px" />
                                <span
                                    className={`sidebar-menu-text ${
                                        sidebarIsOpen
                                            ? "xl:opacity-100"
                                            : "xl:opacity-0"
                                    }`}
                                >
                                    خروج
                                </span>
                            </Link>
                        </ul>
                    </div>
                </div>
                {/* Content */}
                <div
                    className={`w-full px-4 lg:px-8 xl:pl-8 relative transition-all duration-300 ${
                        sidebarIsOpen ? "xl:pr-72" : "xl:pr-24"
                    }`}
                >
                    {/*Dashboard Header  */}
                    <div
                        className={`h-16 ${
                            headerShadow
                                ? "shadow-[6px_4px_30px_0_rgba(38,60,85,0.12)]"
                                : ""
                        } flex items-center justify-between bg-[#f3f4f4] fixed left-0 right-0 top-0 z-[1000] transition-all duration-300 px-4 xl:pl-8 xl:pr-10 ${
                            sidebarIsOpen ? "xl:right-64" : "xl:right-20"
                        }`}
                    >
                        <div className="flex items-center gap-4">
                            {/* Menu Button  */}
                            <a
                                onClick={(event) => {
                                    event.preventDefault();
                                    setOpenMenu((prevState) => !prevState);
                                }}
                                className="flex xl:hidden items-center gap-2 text-caption"
                                href="#"
                            >
                                <BiMenu size="24px" />
                            </a>
                            {/* Sidebar Menu Overlay */}
                            <Overlay
                                show={openMenu}
                                setShow={() => {
                                    setOpenMenu((prevState) => !prevState);
                                }}
                                className="bg-secondary/15 xl:hidden"
                            />
                            {/* Search Btn */}
                            <a
                                onClick={(event) => {
                                    event.preventDefault();
                                    setShowSearchBox((prevState) => !prevState);
                                }}
                                className="flex items-center gap-2 text-caption"
                                href="#"
                            >
                                <BiSearchAlt size="24px" />
                                <span className="text-2sm font-IranYekan-Medium text-muted hidden md:flex gap-0.5">
                                    جستجو
                                    <span>(Ctrl+/)</span>
                                </span>
                            </a>
                            {/*  Sidebar Search Box  */}
                            <div
                                className={`absolute left-0 right-0 transition-all duration-300 ${
                                    showSearchBox ? "top-0" : "-top-[60px]"
                                } py-2.5 px-8 z-10 bg-white`}
                            >
                                <form
                                    className="flex items-center h-10 text-caption"
                                    action="#"
                                >
                                    <input
                                        className="outline-none w-full h-full font-IranYekan-Bold text-2sm py-2 pr-8"
                                        placeholder="جستجو..."
                                        type="text"
                                    />
                                    <button
                                        onClick={(event) => {
                                            event.preventDefault();
                                            setShowSearchBox(false);
                                        }}
                                        className="flex items-center justify-center p-2 shrink-0"
                                    >
                                        <BiX size="24px" />
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="hidden items-center">
                            {/* Widgets */}

                            {/*  Widgets Overlay  */}

                            {/* Notifications */}

                            {/*  Notifications Overlay  */}

                            {/*  Profile  */}

                            {/*  Profile Overlay  */}
                        </div>
                    </div>
                    {/*  Outlet Content  */}
                    <div className="py-24">
                        <div className="container">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Index;
