"use client";
import IBarang from "@/interfaces/barang";
import isNewProduct from "@/utils/isNewProduct";
import { trackProduct } from "@/utils/trackProduct";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CardProduct({
  barang,
  route,
}: {
  barang: IBarang;
  route?: string;
}) {
  const router = useRouter();

  // cek apakah barang baru
  const isNew = isNewProduct(barang.created_at);

  // menghilangkan fungsi klik kanan pada gambar
  const handleKlikKanan = (e: any) => {
    e.preventDefault();

    return false;
  };

  return (
    <div
      onClick={() => {
        trackProduct(barang.sku);
        router.push(route ? route : `/dashboard/barang/${barang.sku}`);
      }}
      className="bg-white border cursor-pointer hover:shadow-sm rounded"
    >
      <div
        className="flex justify-center relative"
        onContextMenu={handleKlikKanan}
      >
        {isNew && (
          <div className="bg-red-600 text-white text-xs p-0.5 rounded-bl absolute top-0 right-0">
            Baru
          </div>
        )}

        <Image
          className="object-contain max-h-44 md:max-h-40 rounded-t"
          src={
            barang?.gambar_url ||
            "https://ik.imagekit.io/sarrahmanme/No-Image-Placeholder.svg.png?updatedAt=1701908821050"
          }
          alt={barang?.nama_barang}
          width={250}
          height={250}
        />
        {barang.ukuran && (
          <div className="absolute left-0 bottom-0 text-xs bg-white text-primary-600 p-0.5 rounded-tr">
            <p>{barang.ukuran}</p>
          </div>
        )}
      </div>
      <div className="p-1 space-y-2">
        <p className="text-xs text-secondary-medium">{barang.brand}</p>
        <div>
          <p className="text-sm capitalize">{barang.nama_barang}</p>
          <p className="text-primary-600 text-xs">{barang.kategori}</p>
        </div>
        <div className="text-xs flex items-center space-x-1">
          {barang.tekstur && (
            <p className="rounded-full p-0.5 bg-primary-50 text-primary-900 border border-primary-100">
              {barang.tekstur}
            </p>
          )}
          {barang.kualitas && (
            <p className="rounded-full p-0.5 bg-primary-50 text-primary-900 border border-primary-100">
              {barang.kualitas}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
