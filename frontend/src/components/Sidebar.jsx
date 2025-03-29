import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../assets/logo.png";
import { logout } from './Logout';

function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isMobile = window.innerWidth <= 768;

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const renderNavItem = (iconComponent, label, to) => {
    const isActive = location.pathname === to;

    if (isCollapsed && !isMobile) {
      return (
        <Link
          to={to}
          className={`flex items-center justify-center p-2 rounded-lg transition-colors ${isActive ? "bg-white/10" : "hover:bg-white/10"}`}
          title={label}
        >
          {iconComponent}
        </Link>
      );
    }

    return (
      <Link
        to={to}
        className={`flex items-center space-x-2 px-2 py-2 rounded-lg transition-colors ${isActive ? "bg-white/10" : "hover:bg-white/10"}`}
      >
        {iconComponent}
        {(!isCollapsed || isMobile) && <span className="text-sm">{label}</span>}
      </Link>
    );
  };

  // Dashboard icon
  const dashboardIcon = (
    <div className="grid grid-cols-2 gap-0.5">
      <div className="w-3 h-3 bg-white"></div>
      <div className="w-3 h-3 bg-white"></div>
      <div className="w-3 h-3 bg-white"></div>
      <div className="w-3 h-3 bg-white"></div>
    </div>
  );

  // Students icon
  const studentsIcon = (
    <div className="w-5 h-5">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M16 6C14.3432 6 13 7.34315 13 9C13 10.6569 14.3432 12 16 12C17.6569 12 19 10.6569 19 9C19 7.34315 17.6569 6 16 6ZM11 9C11 6.23858 13.2386 4 16 4C18.7614 4 21 6.23858 21 9C21 10.3193 20.489 11.5193 19.6542 12.4128C21.4951 13.0124 22.9176 14.1993 23.8264 15.5329C24.1374 15.9893 24.0195 16.6114 23.5631 16.9224C23.1068 17.2334 22.4846 17.1155 22.1736 16.6591C21.1979 15.2273 19.4178 14 17 14C13.166 14 11 17.0742 11 19C11 19.5523 10.5523 20 10 20C9.44773 20 9.00001 19.5523 9.00001 19C9.00001 18.308 9.15848 17.57 9.46082 16.8425C9.38379 16.7931 9.3123 16.7323 9.24889 16.6602C8.42804 15.7262 7.15417 15 5.50001 15C3.84585 15 2.57199 15.7262 1.75114 16.6602C1.38655 17.075 0.754692 17.1157 0.339855 16.7511C-0.0749807 16.3865 -0.115709 15.7547 0.248886 15.3398C0.809035 14.7025 1.51784 14.1364 2.35725 13.7207C1.51989 12.9035 1.00001 11.7625 1.00001 10.5C1.00001 8.01472 3.01473 6 5.50001 6C7.98529 6 10 8.01472 10 10.5C10 11.7625 9.48013 12.9035 8.64278 13.7207C9.36518 14.0785 9.99085 14.5476 10.5083 15.0777C11.152 14.2659 11.9886 13.5382 12.9922 12.9945C11.7822 12.0819 11 10.6323 11 9ZM3.00001 10.5C3.00001 9.11929 4.1193 8 5.50001 8C6.88072 8 8.00001 9.11929 8.00001 10.5C8.00001 11.8807 6.88072 13 5.50001 13C4.1193 13 3.00001 11.8807 3.00001 10.5Z" fill="#ffffff"></path>
      </svg>
    </div>
  );
  //groups icon
  const groupsIcon = (
    <div className='w-5 h-5'>
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>affinitydiagram</title> <g> <rect x="8" y="2" width="8" height="5"></rect> <rect x="2" y="9" width="5" height="5"></rect> <rect x="17" y="9" width="5" height="5"></rect> <rect x="9.5" y="9" width="5" height="5"></rect> <rect x="2" y="16" width="5" height="5"></rect> <rect x="17" y="16" width="5" height="5"></rect> <rect x="9.5" y="16" width="5" height="5"></rect> <rect width="24" height="24" fill="none"></rect> </g> </g></svg>
    </div>
  )

  // Registration icon
  const registrationIcon = (
    <div className="w-5 h-5">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </div>
  );

  // Supervisors icon
  const supervisorsIcon = (
    <div className="w-5 h-5">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </div>
  );

  // Hamburger menu icon for mobile
  const hamburgerIcon = (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );

  // Close menu icon for mobile
  const closeIcon = (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden text-white bg-purple-500 p-2 rounded-lg"
      >
        {isMobileMenuOpen ? closeIcon : hamburgerIcon}
      </button>

      {/* Sidebar container */}
      <div
        className={`
           bg-purple-500 inset-y-0 min-h-screen  text-white 
          transition-all duration-300 ease-in-out
          ${isMobile
            ? (isMobileMenuOpen
              ? "w-64 translate-x-0"
              : "w-0 -translate-x-full")
            : (isCollapsed
              ? "w-20"
              : "w-64")
          }
          flex flex-col
        `}
      >
        <div className="p-4 flex flex-col items-center">
          {(!isCollapsed || isMobile) && (
            <div className="text-center mb-2">
              <div className="font-medium">Busiless</div>
            </div>
          )}
          {(!isCollapsed || isMobile) && <img src={logo} alt="logo" className="max-w-full" />}
        </div>

        <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
          {renderNavItem(dashboardIcon, "Dashboard", "/")}
          {renderNavItem(studentsIcon, "Students", "/students")}
          {renderNavItem(groupsIcon, "Groups", "/groups")}
          {renderNavItem(supervisorsIcon, "Supervisors", "/supervisors")}
          {renderNavItem(registrationIcon, "Signup-Student", "/students/signup")}
          {renderNavItem(registrationIcon, "Signup-Supervisor", "/supervisors/signup")}
        </nav>

        <div className="p-4">
          <button
            onClick={logout}
            className={`
              ${isCollapsed && !isMobile
                ? "justify-center"
                : "justify-start"
              } 
              w-full flex items-center px-2 py-2 text-white hover:bg-white/10 rounded-lg
            `}
          >
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 16L21 12M21 12L17 8M21 12H9M9 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {(!isCollapsed || isMobile) && "Logout"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
