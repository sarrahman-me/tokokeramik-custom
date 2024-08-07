import { SearchBar } from "@/components/commons";
import { CatalogProducts } from "@/components/layouts";
import IWebstore from "@/interfaces/webstore";
import { GetDataApi } from "@/utils/fetcher"
import { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";

const id_webstore = process.env.NEXT_PUBLIC_ID_WEBSTORE;

export const metadata: Metadata = {
  title: "Dunia Keramik Samarinda",
  description: "Toko Keramik Dan Granit terlengkap di Samarinda",
  alternates: {
    canonical: "https://www.duniakeramik.com",
  },
  openGraph: {
    title: "Dunia Keramik Samarinda",
    images: [
      {
        url: "https://toko-keramik-assets.s3.ap-southeast-1.amazonaws.com/banner-dunia-keramik-samarinda.png",
        width: 800,
        height: 600,
      },
    ],
  },
};

export default async function Home() {
  const response = await GetDataApi(`${process.env.NEXT_PUBLIC_HOST}/webstore/${id_webstore}`);

  const webstore: IWebstore = response.data.data;

  return (
    <div className="space-y-7">
      <SearchBar route={`/barang/search`} />

      {/* banner */}
      {webstore?.banner_url && (
        <div className="flex justify-center w-full rounded">
          <Image width="1200" height="520" className="rounded" src={webstore.banner_url} alt="banner" />
        </div>
      )}

      {/* catalog */}
      <Suspense fallback={<div>Loading...</div>}>
        <CatalogProducts id_webstore={id_webstore} />
      </Suspense>


      {/* maps url */}
      {webstore?.maps_url ? (
        <div className=" border rounded-md p-1 md:p-2 space-y-3">
          <p className="bg-secondary text-primary-900 p-0.5 rounded-md font-medium text-lg">
            Alamat Toko
          </p>
          <iframe
            src={webstore?.maps_url}
            width="100%"
            height="400"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      ) : null}
    </div>
  )
}
