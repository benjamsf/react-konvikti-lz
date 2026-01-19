import logo from "../assets/logo.png";

export function Header() {
  return (
    <div className="w-full h-16 flex items-center p-2 bg-backgroundLight">
      <img className="object-cover h-20" src={logo} alt="PV Logo" />
    </div>
  );
}
