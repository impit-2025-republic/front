import { HomeIcon, UserCircleIcon, UserIcon, WalletIcon } from "@heroicons/react/24/solid";
// import {Wallet} from "solar-icon-set/money"
import { Link, useLocation } from "@tanstack/react-router";

export default function Navbar() {
  const route =useLocation({select:(location)=>location.pathname})
  const path = route.split('/')
  return (
    <div className="fixed inset-y-0 top-auto mx-auto pb-2 pt-2 z-20 flex w-screen flex-row h-[68px] justify-between bg-[#191B1F]">
      <Link to="/"  className={` w-[68px] h-[60px] flex flex-col items-center gap-1`}>
        <HomeIcon width={24} height={24} color={path[1]==="" ? "#fff" : "#71717A"} />
          <p className={` text-xs ${path[1]==="" ? "text-[#fff]" : "text-[#71717A]"}`}>Дом</p>
        </Link>
      <Link to="/notification"  className={` w-[68px] h-[60px] flex flex-col items-center gap-1`}>
        <UserIcon width={24} height={24} color={path[1]==="notification" ? "#fff" : "#71717A"} />
        <p className={` text-xs ${path[1]==="notification" ? "text-[#fff]" : "text-[#71717A]"}`}>Чат с ИИ</p>
      </Link>
      <Link to="/wallet"  className={` w-[68px] h-[60px] flex flex-col items-center gap-1`}>
        <WalletIcon  width={24} height={24} color={path[1]==="wallet" ? "#fff" : "#71717A"}/>
        <p className={` text-xs ${path[1]==="wallet" ? "text-[#fff]" : "text-[#71717A]"}`}>Кошелек</p>
      </Link>
      <Link to="/profile" className={` w-[68px] h-[60px] flex flex-col items-center gap-1`}>
        <UserCircleIcon width={24} height={24} color={path[1]==="profile" ? "#fff" : "#71717A"}/>
        <p className={` text-xs ${path[1]==="profile" ? "text-[#fff]" : "text-[#71717A]"}`}>Профиль</p>
      </Link>
    </div>
  );
}
