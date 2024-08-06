import { CatalogProducts } from "@/components/layouts";
import IWebstore from "@/interfaces/webstore";
import { GetDataApi } from "@/utils/fetcher"

const id_webstore = process.env.NEXT_PUBLIC_ID_WEBSTORE;

export default async function Home() {
  const response = await GetDataApi(`${process.env.NEXT_PUBLIC_HOST}/webstore/${id_webstore}`);

  const webstore: IWebstore = response.data.data;

  return (
    <div className="space-y-7">
      {/* catalog */}
      <CatalogProducts id_webstore={id_webstore} />
    </div>
  )
}
