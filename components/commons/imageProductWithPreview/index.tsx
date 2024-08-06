/* eslint-disable @next/next/no-img-element */
"use client";
import IBarang from "@/interfaces/barang";

const ImageProductWithPreview = ({
  product,
}: {
  product: Partial<IBarang>;
}) => {
  // menghilangkan fungsi klik kanan pada gambar
  const handleKlikKanan = (e: any) => {
    e.preventDefault();

    return false;
  };

  if (!product.design_url) {
    return (
      <div
        onContextMenu={handleKlikKanan}
        className="flex justify-center items-center bg-secondary rounded-md w-full md:w-1/3"
      >
        <img
          src={
            product.gambar_url ||
            "https://ik.imagekit.io/sarrahmanme/No-Image-Placeholder.svg.png?updatedAt=1701908821050"
          }
          alt={product.nama_barang}
          className="max-h-64 md:max-h-72 lg:max-h-80 object-cover"
        />
      </div>
    );
  } else {
    return (
      <div onContextMenu={handleKlikKanan} className="relative w-full md:w-1/2">
        <img
          className="w-full max-h-96 object-cover object-bottom rounded-t-md"
          src={
            product.design_url ||
            "https://ik.imagekit.io/sarrahmanme/No-Image-Placeholder.svg.png?updatedAt=1701908821050"
          }
          alt={product.nama_barang}
        />
        <div className="absolute bottom-0 right-5 border shadow-lg shadow-slate-400 dark:shadow-slate-600">
          <img
            className="max-h-32 sm:max-h-36 md:max-h-32 xl:max-h-40"
            src={
              product.gambar_url ||
              "https://ik.imagekit.io/sarrahmanme/No-Image-Placeholder.svg.png?updatedAt=1701908821050"
            }
            alt={product.sku}
          />
        </div>
      </div>
    );
  }
};

export default ImageProductWithPreview;
