import { PostDataApi } from "@/utils/fetcher";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const payload = await request.json();
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  try {
    const res = await PostDataApi(
      `${process.env.NEXT_PUBLIC_HOST}/barang-webstore`,
      payload,
      token?.value
    );

    if (res.status !== 201) {
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
