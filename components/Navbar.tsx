import { useState } from "react";
import Link from "next/link";

export const Navbar = () => {
  const [openMobile, setOpenMobile] = useState(false);
  const items = [
    { label: "Über uns", page: "ueber-uns" },
    { label: "Themen", page: "themen" },
    { label: "Schöpfungszeit", page: "schoepfungszeit" },
    { label: "Spenden", page: "spenden" },
  ];
  return (
    <div
      className={
        "bg-primary-50 p-5 px-7 font-medium leading-4 flex flex-row justify-between items-center font-bold"
      }
    >
      <Link href="/">
        <div
          className={
            "relative z-20 " +
            (openMobile ? "text-white" : "text-primary-500 cursor-pointer")
          }
        >
          <div className="text-md opacity-70">Arbeitsgemeinschaft</div>
          <div className="text-xl">Schöpfungsverantwortung</div>
        </div>
      </Link>
      <Hamburger onClick={() => setOpenMobile(!openMobile)} open={openMobile} />
      <div className="hidden flex-row md:flex text-primary-500">
        {items.map((item, index) => (
          <Link href={item.page}>
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
          "bg-primary-500 absolute top-0 left-0 w-screen z-10 overflow-hidden box-border text-white text-4xl underline " +
          (openMobile ? "h-screen pt-32 px-8" : "h-0")
        }
      >
        {items.map((item, index) => (
          <Link href={item.page}>
            <div key={index} className={" text-white p-3"}>
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
          "relative w-6 h-1  transform " +
          (open ? "rotate-45 top-2 bg-white" : "top-0 rotate-0 bg-primary-500")
        }
      />
      <div className={"relative w-6 h-1"} />
      <div
        className={
          "relative w-6 h-1 " +
          (open ? "opacity-0 bg-white" : " bg-primary-500")
        }
      />
      <div className={"relative w-6 h-1"} />
      <div
        className={
          "relative w-6 h-1 transform " +
          (open
            ? "-rotate-45 -top-2 bg-white"
            : "rotate-0 top-0 bg-primary-500")
        }
      />
    </div>
  );
};
