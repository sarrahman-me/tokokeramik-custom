import { GetDataApi } from "@/utils/fetcher";

export async function GET(
  req: Request,
  { params }: { params: { id_webstore: string } }
) {
  const url = new URL(req.url);

  const page = url.searchParams.get("page") || 1;
  const limit = url.searchParams.get("limit") || 25;
  const query = url.searchParams.get("query");
  const kategori = url.searchParams.get("kategori");
  const group = url.searchParams.get("group");
  const brand = url.searchParams.get("brand");
  const ukuran = url.searchParams.get("ukuran");
  const motif = url.searchParams.get("motif");
  const tekstur = url.searchParams.get("tekstur");

  let apiUrl = `${process.env.NEXT_PUBLIC_HOST}/barang-webstore/${params.id_webstore}?page=${page}&limit=${limit}`;

  if (query) apiUrl += `&query=${query}`;
  if (kategori) apiUrl += `&kategori=${kategori}`;
  if (group) apiUrl += `&group=${group}`;
  if (brand) apiUrl += `&brand=${brand}`;
  if (ukuran) apiUrl += `&ukuran=${ukuran}`;
  if (motif) apiUrl += `&motif=${motif}`;
  if (tekstur) apiUrl += `&tekstur=${tekstur}`;

  try {
    const res = await GetDataApi(apiUrl);

    if (res.status !== 200) {
      return Response.json(res.data, { status: res.status });
    }

    return Response.json(res.data, {
      status: res.status,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
