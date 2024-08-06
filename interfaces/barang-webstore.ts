import IBarang from "./barang";

export default interface IBarangWebstore {
  sku: string;
  barang: IBarang;
  stock: number;
  price: number;
  id_webstore: string;
}
