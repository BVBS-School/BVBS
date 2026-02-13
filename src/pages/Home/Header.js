import React, { useState } from "react";
import Image from "next/image";
import Logo from "../../../public/Header/Logo.png";
import Link from "next/link"; // Correct import for Link
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter(); // Initialize the router
  const url = router.pathname; // Get the current URL

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <>
      <nav className="sticky top-0 bg-white z-50 py-3 lg:py-3.5 border-b border-black border-opacity-10">
        <div className="mx-auto container sm:container md:container lg:max-w-[1204px] px-4">
          <div className="relative flex items-center justify-between">
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  className="max-w-[165px] h-[91px]"
                  height={1000}
                  width={1000}
                  layout="fixed"
                  src={Logo}
                  alt="BVBS School logo"
                />
              </Link>
            </div>
            <div className="hidden lg:ml-6 lg:block">
              <div>
                {/* <!-- Current: "text-[#EE834E]" --> */}
                <ul className="flex space-x-6 lg:space-x-8 xl:space-x-10">
                  <li className="group relative cursor-pointer">
                    <Link
                      href="/about"
                      className={
                        "capitalize text-base xl:text-lg tracking-[-0.04em] font-medium hover:text-[#EE834E] " +
                        (url === "/about" ? "text-[#EE834E]" : "text-[#1E1E1E]")
                      }
                    >
                      About
                      <MdOutlineKeyboardArrowDown
                        className="inline"
                        size={18}
                      />
                    </Link>
                    <ul className="capitalize invisible min-w-[249px] absolute z-50 group-hover:visible flex w-full flex-col shadow-md bg-white left-0 ">
                      <li>
                        <Link
                          href="/about#vision"
                          className="block text-base py-2 px-5 xl:text-lg text-[#1E1E1E] hover:text-[#EE834E] tracking-[-0.04em] font-medium"
                        >
                          Vision & Mission
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/about#mentor"
                          className="block text-base py-2 px-5 xl:text-lg text-[#1E1E1E] hover:text-[#EE834E] tracking-[-0.04em] font-medium"
                        >
                         Our Mentor
                        </Link>
                      </li>
                      {/* <li>
                        <Link
                          href="/about#faculty"
                          className="block text-base py-2 px-5 xl:text-lg text-[#1E1E1E] hover:text-[#EE834E] tracking-[-0.04em] font-medium"
                        >
                          Faculty
                        </Link>
                      </li> */}
                      <li>
                        <Link
                          href="/about#directors"
                          className="block text-base py-2 px-5 xl:text-lg text-[#1E1E1E] hover:text-[#EE834E] tracking-[-0.04em] font-medium"
                        >
                          Directors Desk
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/about#sisterSchools"
                          className="block text-base py-2 px-5 xl:text-lg text-[#1E1E1E] hover:text-[#EE834E] tracking-[-0.04em] font-medium"
                        >
                          Sister Schools
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="group relative cursor-pointer">
                    <Link
                      href="/academics"
                      className={
                        "capitalize text-base xl:text-lg tracking-[-0.04em] font-medium hover:text-[#EE834E] " +
                        (url.startsWith("/academies")
                          ? "text-[#EE834E]"
                          : "text-[#1E1E1E]")
                      }
                    >
                      Academics
                      <MdOutlineKeyboardArrowDown
                        className="inline"
                        size={18}
                      />
                    </Link>
                    <ul className="capitalize invisible min-w-[189px] absolute z-50 group-hover:visible flex w-full flex-col shadow-md bg-white left-0">
                      <li>
                        <Link
                          href="/academics#calendar"
                          className="block text-base py-2 px-5 xl:text-lg text-[#1E1E1E] hover:text-[#EE834E] tracking-[-0.04em] font-medium"
                        >
                          Calendar
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/academics#board"
                          className="block text-base py-2 px-5 xl:text-lg text-[#1E1E1E] hover:text-[#EE834E] tracking-[-0.04em] font-medium"
                        >
                          RBSE Board
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/academics#education"
                          className="block text-base py-2 px-5 xl:text-lg text-[#1E1E1E] hover:text-[#EE834E] tracking-[-0.04em] font-medium"
                        >
                          Education Stages
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/academics#syllabus"
                          className="block text-base py-2 px-5 xl:text-lg text-[#1E1E1E] hover:text-[#EE834E] tracking-[-0.04em] font-medium"
                        >
                          Syllabus
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/academics#results"
                          className="block text-base py-2 px-5 xl:text-lg text-[#1E1E1E] hover:text-[#EE834E] tracking-[-0.04em] font-medium"
                        >
                          Results
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="group relative cursor-pointer">
                    <Link
                      href="/facilities"
                      className={
                        "capitalize text-base xl:text-lg tracking-[-0.04em] font-medium hover:text-[#EE834E] " +
                        (url === "/facilities"
                          ? "text-[#EE834E]"
                          : "text-[#1E1E1E]")
                      }
                    >
                      Facilities
                      <MdOutlineKeyboardArrowDown
                        className="inline"
                        size={18}
                      />
                    </Link>
                    <ul className="capitalize invisible min-w-[189px] absolute z-50 group-hover:visible flex w-full flex-col shadow-md bg-white left-0">
                      <li>
                        <Link
                          href="/facilities#houses"
                          className="block text-base py-2 px-5 xl:text-lg text-[#1E1E1E] hover:text-[#EE834E] tracking-[-0.04em] font-medium"
                        >
                          Houses
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/facilities#infrastructure"
                          className="block text-base py-2 px-5 xl:text-lg text-[#1E1E1E] hover:text-[#EE834E] tracking-[-0.04em] font-medium"
                        >
                          Infrastructure
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/facilities#sports"
                          className="block text-base py-2 px-5 xl:text-lg text-[#1E1E1E] hover:text-[#EE834E] tracking-[-0.04em] font-medium"
                        >
                          Sports
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/facilities#activities"
                          className="block text-base py-2 px-5 xl:text-lg text-[#1E1E1E] hover:text-[#EE834E] tracking-[-0.04em] font-medium"
                        >
                          Gallery
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="group relative cursor-pointer">
                    <Link
                      href="/admissions"
                      className={
                        "capitalize text-base xl:text-lg tracking-[-0.04em] font-medium hover:text-[#EE834E] " +
                        (url.startsWith("/admissions")
                          ? "text-[#EE834E]"
                          : "text-[#1E1E1E]")
                      }
                    >
                      Admissions
                      <MdOutlineKeyboardArrowDown
                        className="inline"
                        size={18}
                      />
                    </Link>
                    <ul className="capitalize invisible min-w-[189px] absolute z-50 group-hover:visible flex w-full flex-col shadow-md bg-white left-0">
                      <li>
                        <Link
                          href="/admissions#form"
                          className="block text-base py-2 px-5 xl:text-lg text-[#1E1E1E] hover:text-[#EE834E] tracking-[-0.04em] font-medium"
                        >
                          Admission Form
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/admissions#ageCriteria"
                          className="block text-base py-2 px-5 xl:text-lg text-[#1E1E1E] hover:text-[#EE834E] tracking-[-0.04em] font-medium"
                        >
                          Age criteria
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/admissions#fees"
                          className="block text-base py-2 px-5 xl:text-lg text-[#1E1E1E] hover:text-[#EE834E] tracking-[-0.04em] font-medium"
                        >
                          Fee Structure
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="group relative cursor-pointer">
                    <Link
                      href="/contact"
                      className={
                        "capitalize text-base xl:text-lg tracking-[-0.04em] font-medium hover:text-[#EE834E] " +
                        (url.startsWith("/contact")
                          ? "text-[#EE834E]"
                          : "text-[#1E1E1E]")
                      }
                    >
                      Contact
                      <MdOutlineKeyboardArrowDown
                        className="inline"
                        size={18}
                      />
                    </Link>
                    <ul className="capitalize invisible min-w-[190px] absolute z-50 group-hover:visible flex w-full flex-col shadow-md bg-white -right-8">
                      <li>
                        <Link
                          href="/contact#touch"
                          className="block text-base py-2 px-5 xl:text-lg text-[#1E1E1E] hover:text-[#EE834E] tracking-[-0.04em] font-medium"
                        >
                          Get in touch
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/contact#donate"
                          className="block text-base py-2 px-5 xl:text-lg text-[#1E1E1E] hover:text-[#EE834E] tracking-[-0.04em] font-medium"
                        >
                          Make a donation
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/careers"
                          className="block text-base py-2 px-5 xl:text-lg text-[#1E1E1E] hover:text-[#EE834E] tracking-[-0.04em] font-medium"
                        >
                          Careers & Faculty
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex lg:hidden">
              {/* <!-- Mobile menu button --> */}
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={menuOpen}
                onClick={toggleMenu}
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                {/* <!--
                    Icon when menu is closed.

                    Menu open: "hidden", Menu closed: "block"
                --> */}
                <svg
                  className={`${menuOpen ? "hidden" : "block"} h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                {/* <!--
                        Icon when menu is open.

                        Menu open: "block", Menu closed: "hidden"
                    --> */}
                <svg
                  className={`${menuOpen ? "block" : "hidden"} h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* <!-- mobile menu */}
        <div
          className={`lg:hidden ${menuOpen ? "block" : "hidden"}`}
          id="mobile-menu"
        >
          <div className="space-y-1 px-2 pb-3 pt-2">
            {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
            <Link
              href="/about"
              className={
                "capitalize px-3 py-2 block text-base xl:text-lg tracking-[-0.04em] font-medium hover:text-[#EE834E] " +
                (url === "/about" ? "text-[#EE834E]" : "text-[#1E1E1E]")
              }
            >
              About
            </Link>
            <Link
              href="/academics"
              className={
                "capitalize px-3 py-2 block  text-base xl:text-lg tracking-[-0.04em] font-medium  hover:text-[#EE834E]  " +
                (url === "/academics" ? "text-[#EE834E]" : "text-[#1E1E1E]")
              }
            >
              Academics
            </Link>
            <Link
              href="/facilities"
              className={
                "capitalize px-3 py-2 block  text-base xl:text-lg tracking-[-0.04em] font-medium hover:text-[#EE834E] " +
                (url === "/facilities" ? "text-[#EE834E]" : "text-[#1E1E1E]")
              }
            >
              Facilities
            </Link>
            <Link
              href="/admissions"
              className={
                "capitalize px-3 py-2 block text-base xl:text-lg tracking-[-0.04em] font-medium hover:text-[#EE834E] " +
                (url === "/admissions" ? "text-[#EE834E]" : "text-[#1E1E1E]")
              }
            >
              Admissions
            </Link>
            <Link
              href="/contact"
              className={
                "capitalize px-3 py-2 block text-base xl:text-lg tracking-[-0.04em] font-medium hover:text-[#EE834E] " +
                (url === "/contact" ? "text-[#EE834E]" : "text-[#1E1E1E]")
              }
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
