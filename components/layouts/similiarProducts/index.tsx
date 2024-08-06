"use client";
import { useState } from "react";
import IBarang from "@/interfaces/barang";
import CatalogProducts from "../catalogProducts";

export default function SimiliarProducts({
  barang,
  id_webstore,
}: {
  barang: Partial<IBarang>;
  id_webstore?: string;
}) {
  const [similiarNotFound, setSimiliarNotFound] = useState<boolean>(false);

  if (similiarNotFound) {
    return null;
  }

  return (
    <div>
      <p className="p-2 font-medium text-secondary-medium">Produk Serupa</p>
      <CatalogProducts
        id_webstore={id_webstore}
        setLengthProducts={(l) => setSimiliarNotFound(l < 2)}
        pagination={false}
        atributQuery={`kategori=${barang.kategori}&group=${barang.group}&brand=${barang.brand}&ukuran=${barang.ukuran}`}
      />
    </div>
  );
}
