import logo from "../assets/logo_green.png";
import { useNavigate } from "react-router-dom";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

interface NavbarProps {
  title?: string; // Optional prop to override title
  views: string[]; // Navigation view names
  activeViewIndex: number; // Index of the currently active view
  toggleSidebar: () => void; // Function to open the sidebar
}

export function Navbar({
  title = "Konvikti",
  views,
  activeViewIndex,
  toggleSidebar,
  onNavigate, // Pass a callback to handle navigation
}: NavbarProps & { onNavigate: (index: number) => void }) {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 right-0 h-14 bg-backgroundBlue z-50 border-b border-backgroundDark flex items-center px-4">
      {/* Left Section */}
      <div className="flex items-center">
        <img
          src={logo}
          alt="Logo"
          className="w-13 h-11 object-cover cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div className="ml-2 h-10 w-[1px] bg-textLight"></div>
        <span className="text-white text-xl font-sans ml-2 hidden md:block">
          {title}
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center ml-auto space-x-4">
        {/* Navigation Views */}
        {views.map((view, index) => (
          <button
            key={index}
            onClick={() => onNavigate(index)} // Navigate to the selected view
            className={`text-white text-base ${
              index === activeViewIndex ? "font-sans" : "opacity-70"
            }`}
          >
            {view}
          </button>
        ))}
        {/* Hamburger Menu */}
        <button
          onClick={toggleSidebar}
          className="text-white flex items-center justify-center w-8 h-8"
        >
          <HamburgerMenuIcon width={20} height={20} />
        </button>
      </div>
    </div>
  );
}
