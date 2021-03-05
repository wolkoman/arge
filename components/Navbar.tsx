import { useState } from "react";
import Link from "next/link";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";

export const Navbar = () => {
  const [openMobile, setOpenMobile] = useState(false);
  const [floating, setFloating] = useState(false);
  const items = [
    { label: "Über uns", page: "/ueber-uns" },
    { label: "Themen", page: "/themen" },
    { label: "Newsletter", page: "/newsletter" },
    { label: "Spenden", page: "/spenden" },
  ];

  useScrollPosition(({ currPos }) => {
    setFloating(currPos.y !== 0);
  });

  return (
    <div className="sticky top-0 w-full z-20 p-5 px-7 leading-4 flex flex-row justify-between items-center font-bold print:hidden">
      <div
        className="absolute top-0 left-0 w-full bg-white"
        style={{
          height: floating ? "84px" : "0px",
          transition: "0.2s all linear 0s",
        }}
      ></div>
      <Link href="/">
        <div className="relative z-20 text-primary-500 cursor-pointer">
          <div className="text-md opacity-70">Arbeitsgemeinschaft</div>
          <div className="text-xl">Schöpfungsverantwortung</div>
        </div>
      </Link>
      <Hamburger onClick={() => setOpenMobile(!openMobile)} open={openMobile} />
      <div className="hidden flex-row md:flex text-primary-500 z-10">
        {items.map((item, index) => (
          <Link href={item.page} key={item.page}>
            <div
              key={index}
              className={
                (index === 3
                  ? "hover:bg-secondary-default"
                  : "hover:bg-primary-600") +
                " hover:text-white p-3 rounded-md cursor-pointer"
              }
            >
              {item.label}
            </div>
          </Link>
        ))}
      </div>
      <div
        className={
          "bg-white absolute top-0 left-0 w-screen z-10 overflow-hidden box-border text-primary-500 text-4xl underline " +
          (openMobile ? "h-screen pt-32 px-8" : "h-0")
        }
      >
        {items.map((item, index) => (
          <Link href={item.page} key={index}>
            <div key={index} className={" text-primary-500 p-3"}>
              {item.label}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const Hamburger = ({ onClick, open }) => {
  return (
    <div className="md:hidden cursor-pointer relative z-20" onClick={onClick}>
      <div
        className={
          "relative w-6 h-1  transform bg-primary-500 " +
          (open ? "rotate-45 top-2" : "top-0 rotate-0")
        }
      />
      <div className={"relative w-6 h-1"} />
      <div
        className={
          "relative w-6 h-1 bg-primary-500 " + (open ? "opacity-0" : "")
        }
      />
      <div className={"relative w-6 h-1"} />
      <div
        className={
          "relative w-6 h-1 transform bg-primary-500 " +
          (open ? "-rotate-45 -top-2" : "rotate-0 top-0")
        }
      />
    </div>
  );
};
