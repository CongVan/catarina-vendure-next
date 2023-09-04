
import Link from "next/link";
import { Search } from "../common/Search";
import { UserNav } from "../common/UserNav";
import { MainNav } from "./MainNav";

interface HeaderProps {}

async function Header({}: HeaderProps) {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center container">
        <div className="flex-1 px-2 lg:flex-none">
          <Link href="/" className="text-lg font-bold">
            catarina
          </Link>
        </div>
        <MainNav className="mx-6 hidden md:block" />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <UserNav />
        </div>
      </div>
    </div>
  );
}

export default Header;
