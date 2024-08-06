"use client";
import { useEffect, useState } from "react";
import { GetDataApi } from "@/utils/fetcher";
import { useSearchParams } from "next/navigation";
import { CardProduct, Pagination } from "@/components/commons";
import IBarang from "@/interfaces/barang";
import { IMetadata } from "@/interfaces/response-api";

interface ICatalogProduct {
  atributQuery?: string;
  pagination?: boolean;
  limit?: number;
  id_webstore?: string;
  products?: IBarang[]; // hanya digunakan untuk rewrite barang dari parent
  staticData?: boolean; // true jika barang akan ditulis ulang dari parent
  setLengthProducts?: (l: number) => void; // untuk mendapatkan
}

interface resultInterface {
  metadata: IMetadata;
  data: IBarang[];
}

export default function CatalogProducts({
  atributQuery,
  pagination = true,
  limit = 30,
  id_webstore,
  setLengthProducts,
  products = [],
  staticData,
}: ICatalogProduct) {
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [resultData, setResult] = useState<resultInterface>({
    data: [],
    metadata: {
      page: 0,
      limit: 0,
      total_data: 0,
      total_pages: 0,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!staticData) {
        const response = await GetDataApi(
          id_webstore
            ? `/api/barang-webstore/${id_webstore}?page=${currentPage}&limit=${limit}&${atributQuery}`
            : `/api/barang?page=${currentPage}&limit=${limit}&${atributQuery}`
        );

        const { metadata, data }: resultInterface = response.data;

        setResult({ data, metadata });

        // mengirim jumlah data
        if (setLengthProducts) {
          setLengthProducts(data.length);
        }
      }
    };

    fetchData();
    setLoading(false);
  }, [
    atributQuery,
    currentPage,
    id_webstore,
    limit,
    setLengthProducts,
    staticData,
  ]);

  if (loading) {
    return (
      <div className="space-y-5 animate-pulse">
        {/* <div className="bg-gradient-to-b from-primary-700 to-primary-500 h-20"></div> */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="h-52 bg-secondary" />
          ))}
        </div>
      </div>
    );
  }

  const dataToUse: any[] = staticData ? products : resultData.data;

  return (
    <div className="space-y-5">
      {/* catalog */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2">
        {dataToUse?.map((barang, i) => (
          <CardProduct
            route={
              id_webstore
                ? `/site/${id_webstore}/barang/${barang.sku}`
                : `/dashboard/barang/${barang.sku}`
            }
            key={i}
            barang={id_webstore ? barang.barang : barang}
          />
        ))}
      </div>

      {/* pagination */}
      {pagination && !staticData ? (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          metadata={resultData.metadata}
        />
      ) : null}
    </div>
  );
}
