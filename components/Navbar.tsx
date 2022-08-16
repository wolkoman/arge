import {useRef, useState} from "react";
import Link from "next/link";
import {useScrollPosition} from "@n8tb1t/use-scroll-position";

export const Navbar = () => {
    const [searchActive, setSearchActive] = useState(false);
    const searchInput = useRef<HTMLInputElement>();
    const [openMobile, setOpenMobile] = useState(false);
    const [floating, setFloating] = useState(false);
    const items = [
        {label: "Über uns", page: "/ueber-uns/ueber-uns"},
        {label: "Themen", page: "/themen"},
        {label: "Newsletter", page: "/newsletter"},
        {label: "Spenden", page: "/spenden"},
    ];

    useScrollPosition(({currPos}) => {
        setFloating(currPos.y !== 0);
    });

    function search() {
        if (searchInput?.current.value === "") {
            searchInput.current.focus();
            setSearchActive(x => !x);
        } else {
            const searchContent = encodeURI(searchInput.current.value);
            searchInput.current.value = "";
            location.href = `/suche?q=${searchContent}`
        }
    }

    return (
        <div
            className={`sticky top-0 w-full p-5 px-7 leading-4 flex flex-row justify-between items-center font-bold print:hidden z-50 bg-primary-50 transition ${(floating ? 'shadow-lg' : '')} `}>
            <Link href="/">
                <div className="relative z-20 text-primary-500 cursor-pointer">
                    <div className="text-md text-secondary-default">ARGE</div>
                    <div className="text-xl">Schöpfungsverantwortung</div>
                </div>
            </Link>
            <Hamburger onClick={() => setOpenMobile(!openMobile)} open={openMobile}/>
            <div className="hidden md:flex flex-row items-center text-primary-500 z-10 space-x-2">
                {items.map((item, index) => (
                    <Link href={item.page} key={item.page}>
                        <div
                            key={index}
                            className="hover:bg-primary-500 hover:text-white p-3 rounded cursor-pointer"
                        >
                            {item.label}
                        </div>
                    </Link>
                ))}
                <div className="p-3 hover:bg-white p-3 rounded-md cursor-pointer flex">
                    <input
                        ref={searchInput}
                        onKeyDown={(event) => {if (event.key === "Enter") search();}}
                        className={`outline-none py-1 -my-2  rounded transition ${searchActive ? "w-44 px-3 border border-primary-default mr-3" : "w-0 px-0"}`}/>
                    <div onClick={search}>
                        <img src="/assets/search.svg" className="w-5"/>
                    </div>
                </div>
            </div>
            <div
                className={
                    "bg-white absolute top-0 left-0 w-screen z-10 overflow-hidden box-border text-primary-500 text-4xl " +
                    (openMobile ? "h-screen pt-32 px-8" : "h-0")
                }
            >
                <Link href="/">
                    <div className={" text-primary-500 p-3"}>
                        Startseite
                    </div>
                </Link>
                {items.map((item, index) => (
                    <Link href={item.page} key={index}>
                        <div key={index} className={"text-primary-500 p-3"}>
                            {item.label}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

const Hamburger = ({onClick, open}) => {
    return (
        <div className="md:hidden cursor-pointer relative z-20" onClick={onClick}>
            <div
                className={
                    "relative w-6 h-1  transform bg-primary-500 " +
                    (open ? "rotate-45 top-2" : "top-0 rotate-0")
                }
            />
            <div className={"relative w-6 h-1"}/>
            <div
                className={
                    "relative w-6 h-1 bg-primary-500 " + (open ? "opacity-0" : "")
                }
            />
            <div className={"relative w-6 h-1"}/>
            <div
                className={
                    "relative w-6 h-1 transform bg-primary-500 " +
                    (open ? "-rotate-45 -top-2" : "rotate-0 top-0")
                }
            />
        </div>
    );
};
