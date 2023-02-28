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
        {label: "Schöpfungszeit", page: "/themen/schoepfungszeit"},
        {label: "SDGs", page: "/themen/sdgs---konziliare-prozess---laudato-si"},
        {label: "Nachschlagewerk", page: "/themen"},
    ];

    useScrollPosition(({currPos}) => {
        setFloating(currPos.y !== 0);
    });

    function search() {
        if (searchInput?.current.value === "") {
            setSearchActive(x => !x);
            searchInput.current.focus();
        } else {
            const searchContent = encodeURI(searchInput.current.value);
            searchInput.current.value = "";
            location.href = `/suche?q=${searchContent}`
        }
    }

    return <>
        <div
            className={`sticky top-0 w-full p-5 flex flex-row justify-between items-center font-bold print:hidden z-50 bg-[#f9f9f9aa] backdrop-blur-md border-b border-transparent transition`}>
            <Link href="/">
                <div className="relative z-20 text-primary-500 cursor-pointer">
                    <img src="/assets/logo.svg" className="h-12"/>
                </div>
            </Link>
            <Hamburger onClick={() => setOpenMobile(!openMobile)} open={openMobile}/>
            <div className="hidden md:flex flex-row items-center z-10 space-x-2">
                {items.map((item, index) => (
                    <Link href={item.page} key={item.page}>
                        <div
                            key={index}
                            className="hover:bg-black/5 p-3 cursor-pointer rounded"
                        >
                            {item.label}
                        </div>
                    </Link>
                ))}
                <div className="p-3 p-3 rounded-md cursor-pointer flex">
                    <input
                        ref={searchInput}
                        onKeyDown={(event) => {if (event.key === "Enter") search();}}
                        className={`outline-none py-1 -my-2 rounded transition ${searchActive ? "w-44 px-3 border-2 border-black mr-3" : "w-0 px-0"}`}/>
                    <div onClick={search}>
                        <img src="/assets/search.svg" className="w-5"/>
                    </div>
                </div>
            </div>
            <div
                className={
                    "bg-white absolute top-0 left-0 w-screen z-10 overflow-hidden box-border text-4xl " +
                    (openMobile ? "h-screen pt-32 px-8" : "h-0")
                }
            >
                <Link href="/">
                    <div className={" p-3"}>
                        Startseite
                    </div>
                </Link>
                {items.map((item, index) => (
                    <Link href={item.page} key={index}>
                        <div key={index} className={"p-3"}>
                            {item.label}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </>;
};

const Hamburger = ({onClick, open}) => {
    return (
        <div className="md:hidden cursor-pointer relative z-20" onClick={onClick}>
            <div
                className={
                    "relative w-6 h-1  transform bg-black " +
                    (open ? "rotate-45 top-2" : "top-0 rotate-0")
                }
            />
            <div className={"relative w-6 h-1"}/>
            <div
                className={
                    "relative w-6 h-1 bg-black " + (open ? "opacity-0" : "")
                }
            />
            <div className={"relative w-6 h-1"}/>
            <div
                className={
                    "relative w-6 h-1 transform bg-black " +
                    (open ? "-rotate-45 -top-2" : "rotate-0 top-0")
                }
            />
        </div>
    );
};
