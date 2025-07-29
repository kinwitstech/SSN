import {
  Bars3Icon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Link, Outlet, useMatchRoute } from "@tanstack/react-router";
import { useState } from "react";

import useTheme from "@/hooks/useTheme";

const SunSVG = () => (
  <svg
    className="h-6 w-6 text-yellow-500"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M10 3.22a.75.75 0 01.75.75v.61a.75.75 0 01-1.5 0v-.61A.75.75 0 0110 3.22zm0 12.25a.75.75 0 01.75.75v.61a.75.75 0 01-1.5 0v-.61a.75.75 0 01.75-.75zm6.03-9.78a.75.75 0 011.06 0l.43.43a.75.75 0 11-1.06 1.06l-.43-.43a.75.75 0 010-1.06zM3.94 15.03a.75.75 0 011.06 0l.43.43a.75.75 0 11-1.06 1.06l-.43-.43a.75.75 0 010-1.06zM16.78 10a.75.75 0 01.75.75h.61a.75.75 0 010 1.5h-.61a.75.75 0 01-.75-.75v-.61a.75.75 0 01.75-.75zM3.22 10a.75.75 0 01.75.75v.61a.75.75 0 01-1.5 0v-.61a.75.75 0 01.75-.75zm12.09 4.78a.75.75 0 011.06 1.06l-.43.43a.75.75 0 01-1.06-1.06l.43-.43zM3.94 4.97a.75.75 0 011.06 0l.43.43a.75.75 0 01-1.06 1.06l-.43-.43a.75.75 0 010-1.06zM10 6a4 4 0 100 8 4 4 0 000-8z" />
  </svg>
);

const MoonSVG = () => (
  <svg
    className="h-6 w-6 text-gray-800"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M17.293 13.293A8 8 0 116.707 2.707a7 7 0 1010.586 10.586z" />
  </svg>
);

// Navigation Data
const navItems = [
  {
    label: "Dashboard",
    to: "/super-admin/dashboard",
    icon: HomeIcon,
  },
  {
    label: "Appointments",
    icon: CalendarIcon,
    children: [
      {
        label: "All Appointments",
        to: "/super-admin/appointments",
        icon: ChevronRightIcon,
      },
      {
        label: "Online Consultations",
        to: "/super-admin/consultations",
        icon: ChevronRightIcon,
      },
    ],
  },
  {
    label: "Settings",
    to: "/super-admin/settings",
    icon: Cog6ToothIcon,
  },
];

const SidebarLink = ({ to, icon: Icon, label, isActive, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`mx-2 flex items-center gap-3 rounded-lg p-2 transition-colors ${
      isActive
        ? "border-primary text-primary border-b-2"
        : "text-base-content hover:bg-base-200"
    }`}
  >
    {Icon && <Icon className="h-5 w-5" />}
    <span>{label}</span>
  </Link>
);

const SidebarDropdown = ({ icon: Icon, label, children, isOpen, onToggle }) => (
  <div className="mr-4">
    <a
      className="text-base-content hover:bg-base-200 ml-2 flex w-full cursor-pointer items-center justify-between gap-2 rounded-lg px-2 py-2"
      onClick={onToggle}
    >
      <div className="flex items-center gap-3">
        {Icon && <Icon className="h-5 w-5" />}
        <span>{label}</span>
      </div>
      {isOpen ? (
        <ChevronDownIcon className="h-4 w-4" />
      ) : (
        <ChevronRightIcon className="h-4 w-4" />
      )}
    </a>
    <div
      className={`mt-1 space-y-1 overflow-hidden px-2 transition-all duration-300 ease-in-out ${
        isOpen ? "max-h-40" : "max-h-0"
      }`}
    >
      {children}
    </div>
  </div>
);

const Sidebar = (props) => {
  const { isOpen, setIsOpen } = props || {};
  const [openDropdown, setOpenDropdown] = useState(null);
  const matchRoute = useMatchRoute();

  const closeSidebar = () => setIsOpen(false);

  const handleDropdownToggle = (index) => {
    setOpenDropdown((prev) => (prev === index ? null : index));
  };

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeSidebar}
      ></div>
      <aside
        className={`bg-base-100 border-base-200 fixed top-0 left-0 z-50 flex h-screen w-64 transform flex-col border-r shadow-lg transition-transform duration-300 lg:static ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        style={{ maxHeight: "100vh" }}
      >
        <div className="border-base-200 flex items-center justify-between border-b p-4 pb-5">
          <span className="text-xl font-semibold">SSN</span>
          <div className="flex items-center gap-2">
            <button
              className="btn btn-sm btn-ghost lg:hidden"
              onClick={closeSidebar}
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto py-4">
          {navItems.map((item, index) => {
            const isActive =
              item.to && matchRoute({ to: item.to, fuzzy: true });

            if (item.children) {
              const isDropdownActive = item.children.some((child) =>
                matchRoute({ to: child.to, fuzzy: true })
              );
              const isOpenDropdown = openDropdown === index || isDropdownActive;

              return (
                <SidebarDropdown
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  isOpen={isOpenDropdown}
                  onToggle={() => handleDropdownToggle(index)}
                >
                  {item.children.map((child) => (
                    <SidebarLink
                      key={child.to}
                      to={child.to}
                      icon={child.icon}
                      label={child.label}
                      isActive={matchRoute({ to: child.to, fuzzy: true })}
                      onClick={() => {
                        closeSidebar();
                      }}
                    />
                  ))}
                </SidebarDropdown>
              );
            }
            return (
              <SidebarLink
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                isActive={isActive}
                onClick={() => {
                  closeSidebar();
                  setOpenDropdown(null);
                }}
              />
            );
          })}
        </nav>
      </aside>
    </>
  );
};

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="bg-base-100 dark:bg-base-200 flex h-screen">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex flex-1 flex-col">
        <div className="border-base-200 border-b">
          <div className="navbar bg-base-100 flex-end flex justify-end shadow-sm">
            <div className="flex-none lg:hidden">
              <button
                className="btn btn-square btn-ghost"
                onClick={() => setIsOpen(true)}
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
            </div>
            <div className="flex">
              <div className="dropdown dropdown-end">
                <div
                  role="button"
                  className="btn btn-ghost btn-circle"
                  onClick={toggleTheme}
                >
                  {theme === "dark" ? <SunSVG /> : <MoonSVG />}
                </div>
              </div>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
