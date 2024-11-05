import { IResponseApi } from "@/interfaces/response-api";

export async function GetDataApi(
  url: string,
  token?: string
): Promise<{ status: number; data: IResponseApi }> {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      cache: 'no-store',
      credentials: "include",
    });
    const status = response.status;
    const data = await response.json();
    return { status, data };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: {
        data: null,
        metadata: {
          page: 0,
          limit: 0,
          total_data: 0,
          total_pages: 0,
        },
        error: {
          code: 500,
          message: `error fetching ${error}`,
        },
      },
    };
  }
}

export async function PostDataApi(
  url: string,
  payload: any,
  token?: string
): Promise<{ status: number; data: IResponseApi }> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    const status = response.status;
    const data = await response.json();
    return { status, data };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: {
        data: null,
        metadata: {
          page: 0,
          limit: 0,
          total_data: 0,
          total_pages: 0,
        },
        error: {
          code: 500,
          message: `error fetching ${error}`,
        },
      },
    };
  }
}

export async function PatchDataApi(
  url: string,
  payload: any,
  token?: string
): Promise<{ status: number; data: IResponseApi }> {
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    const status = response.status;
    const data = await response.json();
    return { status, data };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: {
        data: null,
        metadata: {
          page: 0,
          limit: 0,
          total_data: 0,
          total_pages: 0,
        },
        error: {
          code: 500,
          message: `error fetching ${error}`,
        },
      },
    };
  }
}

export async function DeleteDataApi(
  url: string,
  token?: string,
  payload?: any
): Promise<{ status: number; data: IResponseApi }> {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    const status = response.status;
    const data = await response.json();
    return { status, data };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      data: {
        data: null,
        metadata: {
          page: 0,
          limit: 0,
          total_data: 0,
          total_pages: 0,
        },
        error: {
          code: 500,
          message: `error fetching ${error}`,
        },
      },
    };
  }
}
