import { DeleteDataApi, PatchDataApi } from "@/utils/fetcher";
import { cookies } from "next/headers";

export async function PATCH(request: Request) {
  const payload = await request.json();
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  try {
    const res = await PatchDataApi(
      `${process.env.NEXT_PUBLIC_HOST}/barang-webstore/sku`,
      payload,
      token?.value
    );

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

export async function DELETE(request: Request) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  const payload = await request.json();

  try {
    const res = await DeleteDataApi(
      `${process.env.NEXT_PUBLIC_HOST}/barang-webstore/sku`,
      token?.value,
      payload
    );

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
