import { NAV_LINKS } from "@/constants";
import Link from "next/link";
import Image from "next/image";
function Menu() {
  return (
    <div className="h-full flex gap-5 flex-col">
      {NAV_LINKS.map((item) => (
        <Link key={item.href} href={item.href} className="flex items-center">
          <Image src={item.icon} alt={item.label} width={24} height={24} />
          <p className="text-lg font-semibold text-theme font-display pl-3 max-sm:hidden">
            {item.label}
          </p>
        </Link>
      ))}
    </div>
  );
}

export default Menu;
