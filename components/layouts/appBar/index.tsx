"use client";
/* eslint-disable @next/next/no-img-element */
import { webstore_navigation } from "@/data/webstoreNavigation";
import IWebstore from "@/interfaces/webstore";
import { isActivePage } from "@/utils/isActivePage";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";

export default function AppBar({
  webstore,
  arrowBack,
}: {
  webstore: IWebstore;
  arrowBack?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // Objek pemetaan antara judul navigasi dan URL yang sesuai
  const navigationMap: Record<string, string> = {
    Home: `/`,
    Barang: `/barang`,
    Kalkulator: `/site/${webstore.id_webstore}/kalkulator`,
    Bacaan: `/blog`,
  };

  return (
    <section className="flex justify-between bg-white p-4 text-secondary-medium shadow rounded-md items-center">
      {arrowBack && (
        <IoMdArrowBack
          onClick={() => router.back()}
          className="cursor-pointer text-xl"
        />
      )}

      {/* logo */}
      {webstore?.logo_url ? (
        <div className="flex items-center space-x-3">
          <img
            className="h-10"
            src={webstore?.logo_url}
            alt={webstore?.nama_toko}
          />
          <p className="text-xl font-bold">{webstore?.nama_toko}</p>
        </div>
      ) : (
        <p className="text-xl font-bold">{webstore?.nama_toko}</p>
      )}
      <div className="items-center space-x-8 hidden md:flex md:space-x-10">
        {webstore_navigation.map((item) => {
          const isActive = isActivePage(
            navigationMap[item.title],
            pathname,
            webstore.id_webstore
          );

          return (
            <Link
              className={`hover:font-medium transition
                        ${
                          isActive
                            ? "text-primary-600"
                            : "text-secondary-medium"
                        }
                        `}
              key={item.title}
              href={navigationMap[item.title]}
            >
              {item.title}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
