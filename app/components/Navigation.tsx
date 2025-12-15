"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navigation() {
  const pathname = usePathname();
  const links = [
    {
      title: "overview",
      href: "/",
    },
    {
      title: "orders",
      href: "/orders",
    },
  ];

  console.log(pathname);
  return (
    <div className="flex flex-col gap-2 pt-3 pl-4">
      {links.map((link) => (
        <Link
          key={link.title}
          href={link.href}
          className={`${
            pathname === link.href ? "text-sky-500" : ""
          } transition duration-200 font-semibold text-lg`}
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
}

export default Navigation;
