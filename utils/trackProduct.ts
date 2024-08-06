import { setCookie, getCookie } from "cookies-next";

interface TrackedProduct {
  sku: string;
  timestamp: number;
}

export function trackProduct(sku: string) {
  let productsTracker: TrackedProduct[] = [];
  const currentData = getCookie("X-Preferred-SKUs");

  if (currentData) {
    productsTracker = JSON.parse(currentData);
  }

  const threeDaysInMillisecond = 3 * 24 * 60 * 60 * 1000;

  // Hapus produk yang sudah lebih dari 3 hari
  productsTracker = productsTracker.filter(
    (product) => Date.now() - product.timestamp <= threeDaysInMillisecond
  );

  // Periksa apakah SKU sudah ada dalam array
  const isAlreadyTracked = productsTracker.some(
    (product) => product.sku === sku
  );

  // Jika SKU belum ada dalam array, tambahkan ke dalam array
  if (!isAlreadyTracked) {
    productsTracker.push({ sku, timestamp: Date.now() });
  }

  // Simpan kembali array ke cookie
  setCookie("X-Preferred-SKUs", JSON.stringify(productsTracker));
}

export function getTrackerProducts(): string[] {
  const currentData = getCookie("X-Preferred-SKUs");

  if (currentData) {
    const productsTracker: TrackedProduct[] = JSON.parse(currentData);

    // Return just the SKUs
    return productsTracker.map((product) => product.sku);
  } else {
    return [];
  }
}
