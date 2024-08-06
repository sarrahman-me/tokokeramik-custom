import { CatalogProducts } from "@/components/layouts";
import IWebstore from "@/interfaces/webstore";
import { GetDataApi } from "@/utils/fetcher"
import Image from "next/image";

const id_webstore = process.env.NEXT_PUBLIC_ID_WEBSTORE;

export default async function Home() {
  const response = await GetDataApi(`${process.env.NEXT_PUBLIC_HOST}/webstore/${id_webstore}`);

  const webstore: IWebstore = response.data.data;

  return (
    <div className="space-y-7">

      {/* banner */}
      {webstore?.banner_url && (
        <div className="flex justify-center w-full rounded">
          <Image width="700" height="450" src={webstore.banner_url} alt="banner" />
        </div>
      )}

      {/* catalog */}
      <CatalogProducts id_webstore={id_webstore} />


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
