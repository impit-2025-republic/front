import { CalendarIcon, EnvelopeIcon, HomeIcon, UserCircleIcon, WalletIcon } from "@heroicons/react/24/solid";
// import {Wallet} from "solar-icon-set/money"
import { Link, useLocation } from "@tanstack/react-router";

export default function Navbar() {
  const route =useLocation({select:(location)=>location.pathname})
  const path = route.split('/')
  return (
    <div className="fixed inset-y-0 top-auto mx-auto pb-2 pt-2 z-20 flex w-screen flex-row justify-between bg-[#191B1F]">
      <Link to="/wallet" className={`p-4 w-14 h-14 rounded-[12px] ${path[1]==="wallet" ? "bg-[#FB5FAB]" : ""}`}>
        <WalletIcon color="#fff"/>
      </Link>
      <Link to="/events"  className={`p-4 w-14 h-14 rounded-[12px] ${path[1]==="events" ? "bg-[#FB5FAB]" : ""}`}>
        <CalendarIcon color="#fff" />
      </Link>
      <Link to="/"  className={`p-4 w-14 h-14 rounded-[12px] ${path[1]==="" ? "bg-[#FB5FAB]" : ""}`}>
        <HomeIcon color="#fff" />
      </Link>
      <Link to="/notification"  className={`p-4 w-14 h-14 rounded-[12px] ${path[1]==="notification" ? "bg-[#FB5FAB]" : ""}`}>
        <EnvelopeIcon color="#fff" />
      </Link>
      <Link to="/profile"  className={`p-4 w-14 h-14 rounded-[12px] ${path[1]==="profile" ? "bg-[#FB5FAB]" : ""}`}>
        <UserCircleIcon color="#fff" />
      </Link>
    </div>
  );
}
