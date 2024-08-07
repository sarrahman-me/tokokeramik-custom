import { CatalogProducts } from "@/components/layouts";
import IWebstore from "@/interfaces/webstore";
import { GetDataApi } from "@/utils/fetcher"
import { Suspense } from "react";

const id_webstore = process.env.NEXT_PUBLIC_ID_WEBSTORE;

export default async function Home() {
  const response = await GetDataApi(`${process.env.NEXT_PUBLIC_HOST}/webstore/${id_webstore}`);

  const webstore: IWebstore = response.data.data;

  return (
    <div className="space-y-7">
      {/* catalog */}
      <Suspense fallback={<div>Loading...</div>}>
        <CatalogProducts id_webstore={id_webstore} />
      </Suspense>
    </div>
  )
}
