import IBarang from "./barang";

interface IProductView {
  total_count_view: number;
  top_product_view: {
    _id: string;
    count: number;
    data: {
      source: string;
      identity: string;
      barang: IBarang;
      sku: string;
      id_webstore: string;
      created_at: string;
    };
  }[];
  top_brand_view: {
    _id: string;
    count: number;
  }[];
  top_kategori_view: {
    _id: string;
    count: number;
  }[];
}

export default interface ITrackerProductView {
  this_periode_data: IProductView;
  previous_periode_data: IProductView;
}
