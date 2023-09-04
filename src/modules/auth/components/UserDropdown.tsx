"use client";
import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useAuth } from "../context";

interface UserDropdownProps {}

function UserDropdown({}: UserDropdownProps) {
  const { isLoggedIn } = useAuth();

  return (
    <Link
      href={isLoggedIn ? "/profile" : "/login"}
      className="tooltip tooltip-bottom"
      data-tip={isLoggedIn ? "Xem trang cá nhân" : "Đăng nhập/ Đăng ký"}
    >
      <div className="btn btn-square btn-ghost">
        <UserIcon className="w-6 h-6" />
      </div>
    </Link>
  );
}

export default UserDropdown;
