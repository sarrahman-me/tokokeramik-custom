import { AppBar, CatalogProducts } from "@/components/layouts";
import IWebstore from "@/interfaces/webstore";
import { GetDataApi } from "@/utils/fetcher"
import Image from "next/image";

const id_webstore = process.env.NEXT_PUBLIC_ID_WEBSTORE;

export default async function Home() {
  const response = await GetDataApi(`${process.env.NEXT_PUBLIC_HOST}/webstore/${id_webstore}`);

  const webstore: IWebstore = response.data.data;

  return (
    <div className="space-y-7">
      <AppBar webstore={webstore} />

      {/* banner */}
      {webstore?.banner_url && (
        <div className="flex justify-center w-full rounded">
          <Image width="700" height="450" src={webstore.banner_url} alt="banner" />
        </div>
      )}

      {/* catalog */}
      <CatalogProducts id_webstore={id_webstore} />
    </div>
  )
}
