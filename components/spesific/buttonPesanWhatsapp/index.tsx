"use client";
import IBarang from "@/interfaces/barang";
import { RiWhatsappFill } from "react-icons/ri";

export default function ButtonPesanWhatsapp({
  whatsapp,
  barang,
}: {
  whatsapp: string;
  barang: Partial<IBarang>;
}) {
  const handlePesan = () => {
    const message = `Saya ingin bertanya tentang produk ini
        Nama : *${barang?.nama_barang}*,
        Merk : *${barang?.brand}*, 
        Ukuran : *${barang?.ukuran}*, 
    
        --------Link Produk---------
        ${window.location.href}`;
    const whatsappLink = `https://api.whatsapp.com/send?phone=${whatsapp}&text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappLink, "_blank");
  };

  return (
    <button
      onClick={handlePesan}
      className={`w-full p-1.5 px-2.5 bg-gradient-to-tr from-green-500 to-green-600 text-white rounded-md hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed`}
    >
      <span className="flex justify-center items-center">
        <RiWhatsappFill className="text-white text-2xl mr-2" />
        Pesan Whatsapp
      </span>
    </button>
  );
}
