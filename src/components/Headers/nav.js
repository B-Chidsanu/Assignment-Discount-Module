import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import { useCart } from "react-use-cart";

function Nav() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const closeDropdown = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!closeDropdown.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [closeDropdown]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const { totalItems, emptyCart } = useCart();

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-[#FBFBFB] flex flex-col md:flex-row items-center justify-between py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4">
        <div className="ml-5 px-20 flex md:w-[30%] items-center justify-between">
          <Link to="/" className="text-gray-800 px-4 font-16px">
            Home
          </Link>
          <Link to="/" className="text-gray-800 px-4">
            About
          </Link>

          <div className="relative" ref={closeDropdown}>
            <button
              type="button"
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={toggleDropdown}
            >
              Category
              <svg
                className="-mr-1 h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
                onBlur={closeDropdown}
              >
                <div className="py-1" role="none">
                  {Array.from({ length: 1 }).map((_, index) => (
                    <Link
                      key={index}
                      to="/"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                    >
                      T-shirt
                    </Link>
                  ))}
                </div>
                <div className="py-1" role="none">
                  {Array.from({ length: 1 }).map((_, index) => (
                    <Link
                      key={index}
                      to="/"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                    >
                      Assesorie
                    </Link>
                  ))}
                </div>
                <div className="py-1" role="none">
                  {Array.from({ length: 1 }).map((_, index) => (
                    <Link
                      key={index}
                      to="/"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                    >
                      Boot
                    </Link>
                  ))}
                </div>
                <div className="py-1" role="none">
                  {Array.from({ length: 1 }).map((_, index) => (
                    <Link
                      key={index}
                      to="/"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                    >
                      Pant
                    </Link>
                  ))}
                </div>
                <div className="py-1" role="none">
                  {Array.from({ length: 1 }).map((_, index) => (
                    <Link
                      key={index}
                      to="/"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                    >
                      Dress
                    </Link>
                  ))}
                </div>
                <div className="py-1" role="none">
                  {Array.from({ length: 1 }).map((_, index) => (
                    <Link
                      key={index}
                      to="/"
                      className="text-gray-700 block px-4 py-2 text-sm"
                      role="menuitem"
                      tabIndex="-1"
                    >
                      Bra
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="inline-flex m-3">
            <div className="flex items-center">
              <input
                type="search"
                className="relative m-0 block min-w-0 rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none motion-reduce:transition-none"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon2"
              />
              <span
                className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                id="basic-addon2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className="inline-flex ml-14">
            {totalItems ? (
              <div className="ms-7 top-5 text-lg font-bold font absolute bg-gray-600 text-white rounded-full w-6 h-6 flex items-center justify-center ">
                {totalItems}
              </div>
            ) : null}
            <Link to="/cart">
              <BsCart2 size={"1.8rem"} />
            </Link>
          </div>
        </div>
      </nav>
      <div className="mt-32"></div>
    </>
  );
}

export default Nav;
