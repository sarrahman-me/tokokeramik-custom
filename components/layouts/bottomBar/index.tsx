"use client";
import { webstore_navigation } from "@/data/webstoreNavigation";
import { isActivePage } from "@/utils/isActivePage";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomBarNavigation() {
  const pathname = usePathname();

  const navigationMap: Record<string, string> = {
    Home: `/`,
    Barang: `/barang`,
    Kalkulator: `/kalkulator`,
  };

  return (
    <aside className="bg-white grid grid-cols-3 p-1 rounded-md shadow-lg select-none">
      {webstore_navigation.map((item, i) => {
        const isActive = isActivePage(
          navigationMap[item.title],
          pathname,
        );
        return (
          <Link
            key={i}
            href={navigationMap[item.title]}
            className={`flex flex-col justify-center items-center p-1 rounded-md ${
              isActive ? "border bg-primary-600 text-white" : "text-primary-600"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <p
              className={`text-xs text-center ${
                isActive ? "text-white" : "text-secondary-medium/50"
              } inline`}
            >
              {item.title}
            </p>
          </Link>
        );
      })}
    </aside>
  );
}
