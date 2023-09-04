"use client";

import { useAuth } from "@/modules/auth/context";
import {
  PhoneIcon,
  ShoppingBagIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { ReactNode } from "react";

interface BottomNavigationProps {}

function BottomNavigation({}: BottomNavigationProps) {
  const { isLoggedIn } = useAuth();

  const pathname = usePathname();

  return (
    <div className="btm-nav flex lg:hidden">
      <button>
        <ShoppingBagIcon className="w-5 h-5" />
        <span className="btm-nav-label">Giỏ hàng</span>
      </button>
      <button>
        <MagnifyingGlassIcon className="w-5 h-5" />
        <span className="btm-nav-label">Tìm kiếm</span>
      </button>
      <button className="">
        <PhoneIcon className="w-5 h-5" />
        <span className="btm-nav-label">Liên hệ</span>
      </button>

      <Link href={isLoggedIn ? "/profile" : "/login?callback=" + pathname}>
        <UserIcon className="w-5 h-5" />
        <span className="btm-nav-label">Cá nhân</span>
      </Link>
    </div>
  );
}

export default BottomNavigation;
