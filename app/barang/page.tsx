import { SearchBar } from "@/components/commons";
import { CatalogProducts } from "@/components/layouts";
import { Suspense } from "react";

const id_webstore = process.env.NEXT_PUBLIC_ID_WEBSTORE;

export default function Home() {
  return (
    <div className="space-y-7">
      <SearchBar route={`/barang/search`} />

      {/* catalog */}
      <Suspense fallback={<div>Loading...</div>}>
        <CatalogProducts id_webstore={id_webstore} />
      </Suspense>
    </div>
  )
}
