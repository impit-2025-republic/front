import { HomeIcon } from "@heroicons/react/24/solid";
import { Link, useLocation } from "@tanstack/react-router";

export default function Navbar() {
  const route =useLocation({select:(location)=>location.pathname})
  const path = route.split('/')
  return (
    <div className="absolute inset-y-0 top-auto mb-5 z-20 flex flex-row gap-4">
      <Link to="/" className={`p-4 w-14 h-14 rounded-[12px] ${path[1]==="home" ? "bg-[#FB5FAB]" : ""}`}>
        <HomeIcon color="#fff" />
      </Link>
      <Link to="/"  className={`p-4 w-14 h-14 rounded-[12px] ${path[1]==="home" ? "bg-[#FB5FAB]" : ""}`}>
        <HomeIcon color="#fff" />
      </Link>
      <Link to="/"  className={`p-4 w-14 h-14 rounded-[12px] ${path[1]==="" ? "bg-[#FB5FAB]" : ""}`}>
        <HomeIcon color="#fff" />
      </Link>
      <Link to="/"  className={`p-4 w-14 h-14 rounded-[12px] ${path[1]==="home" ? "bg-[#FB5FAB]" : ""}`}>
        <HomeIcon color="#fff" />
      </Link>
      <Link to="/"  className={`p-4 w-14 h-14 rounded-[12px] ${path[1]==="home" ? "bg-[#FB5FAB]" : ""}`}>
        <HomeIcon color="#fff" />
      </Link>
    </div>
  );
}
