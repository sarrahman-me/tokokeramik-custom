"use client";
import IBarang from "@/interfaces/barang";
import { useState } from "react";
import CatalogProducts from "../catalogProducts";

export default function RecomendByProduct({
  barang,
  id_webstore,
}: {
  barang: Partial<IBarang>;
  id_webstore?: string;
}) {
  const [recomendedNotFound, setRecomendedNotFound] = useState<boolean>(false);

  if (recomendedNotFound) {
    return null;
  }

  return (
    <div>
      <p className="p-2 font-medium text-secondary-medium">
        Kamu Mungkin Juga Suka
      </p>
      <CatalogProducts
        id_webstore={id_webstore}
        pagination={false}
        setLengthProducts={(l) => setRecomendedNotFound(l < 2)}
        atributQuery={`kategori=${barang.kategori}&ukuran=${barang.ukuran}&motif=${barang.motif}&tekstur=${barang.tekstur}`}
      />
    </div>
  );
}
