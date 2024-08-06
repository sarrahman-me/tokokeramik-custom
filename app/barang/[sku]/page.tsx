import { GetDataApi } from "@/utils/fetcher";
import IBarangWebstore from "@/interfaces/barang-webstore";
import { DisplayData, ImageProductWithPreview } from "@/components/commons";
import IBarang from "@/interfaces/barang";
import {
  RecomendByProduct,
  SimiliarProducts,
  VisualPattern,
} from "@/components/layouts";
import { formatCurrency } from "@/utils/formating";
import IWebstore from "@/interfaces/webstore";
import { Metadata } from "next";
import { headers } from "next/headers";
import { ButtonPesanWhatsapp } from "@/components/spesific";

const id_webstore = process.env.NEXT_PUBLIC_ID_WEBSTORE;

export async function generateMetadata({
  params,
}: {
  params: { sku: string };
}): Promise<Metadata> {
  const responseBarang = await GetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/barang-webstore/${id_webstore}/sku/${params.sku}`
  );

  const barang: IBarang = responseBarang?.data.data.barang;

  return {
    title: `${barang.nama_barang} - ${barang.brand}`,
    description: `Detail ${barang.kategori} ${barang.nama_barang} ${barang.brand}`,
    openGraph: {
      title: `${barang.nama_barang} - ${barang.brand}`,
      images: [
        {
          url: barang.gambar_url || "",
          width: 700,
          height: 700,
        },
      ],
    },
  };
}

export default async function Page({
  params,
}: {
  params: { sku: string; id_webstore: string };
}) {
  const header = headers();
  const ip = (header.get("x-forwarded-for") ?? "127.0.0.1").split(",")[0];

  const p1 = GetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/barang-webstore/${id_webstore}/sku/${params.sku}?source=tokokeramik.com/site/${id_webstore}&identity=${ip}&track=true`
  );

  const p2 = GetDataApi(
    `${process.env.NEXT_PUBLIC_HOST}/webstore/${id_webstore}`
  );

  const [response, responseWebstore] = await Promise.all([p1, p2]);

  const webstore: IWebstore = responseWebstore.data.data;
  const data: IBarangWebstore = response.data.data;
  const barang: IBarang = data.barang;

  return (
    <div className="space-y-6">
      <div className="w-full flex flex-col md:flex-row gap-5">
        {/* gambar */}
        <ImageProductWithPreview product={barang} />

        {/* detail barang */}
        <div className="bg-white border rounded-md w-full md:w-2/3 space-y-4 p-2 md:p-3">
          <p className="font-semibold text-lg md:text-xl lg:text-2xl">
            {barang.nama_barang}
          </p>
          <DisplayData title="Kategori" data={barang.kategori} />
          <DisplayData title="Merek" data={barang.brand} />
          <DisplayData
            title="Berat"
            data={`${barang.berat / 1000} kg / ${barang.berat} g`}
          />
          {webstore.show_price ? (
            <DisplayData title="Harga" data={`${formatCurrency(data.price)}`} />
          ) : null}
          {webstore.show_stock ? (
            <DisplayData title="Stok" data={`${data.stock}`} />
          ) : null}
        </div>
      </div>

      {/* spesifikasi barang */}
      {barang.kualitas || barang.tekstur || barang.motif || barang.ukuran ? (
        <div className="bg-white border rounded-md p-1 md:p-2 space-y-3">
          <p className="bg-secondary text-primary-900 p-0.5 rounded-md font-medium text-lg">
            Spesifikasi Barang
          </p>
          {barang.ukuran && <DisplayData title="ukuran" data={barang.ukuran} />}
          {barang.motif && <DisplayData title="motif" data={barang.motif} />}
          {barang.tekstur && (
            <DisplayData title="tekstur" data={barang.tekstur} />
          )}
          {barang.kualitas && (
            <DisplayData title="Kualitas" data={barang.kualitas} />
          )}
        </div>
      ) : null}

      {/* visual pattern */}
      <VisualPattern imageUrl={barang.gambar_url} />

      {/* Whatsapp Button */}
      {webstore.whatsapp && (
        <ButtonPesanWhatsapp barang={barang} whatsapp={webstore.whatsapp} />
      )}

      {/* similiar product */}
      <SimiliarProducts barang={barang} id_webstore={id_webstore} />

      {/* Rekomendasi barang */}
      <RecomendByProduct barang={barang} id_webstore={id_webstore} />
    </div>
  );
}
