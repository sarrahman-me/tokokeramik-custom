"use client";
import animation from "@/public/svg/500.svg";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/commons";
import Image from "next/image";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen w-full bg-secondary p-3 md:p-5">
      <div className="flex items-center justify-center order-2 md:order-1">
        <div className="space-y-8 mx-auto max-w-md">
          <h2 className="text-2xl md:text-4xl font-bold text-primary-600">
            500 - Internal Error
          </h2>
          <p className="md:text-lg text-gray-700 mt-4">
            Terjadi kesalahan dan saya sedang berupaya memperbaikinya! Saya akan
            segera kembali aktif.
          </p>
          <p className="md:text-lg text-gray-700 mt-4">
            Terima kasih atas kesabaran Anda!
          </p>
          <Button fullWidth onClick={() => router.back()}>
            Kembali
          </Button>
        </div>
      </div>
      <div className="order-1 md:order-2 flex justify-center">
        <Image src={animation} alt="error" width={500} height={500} />
      </div>
    </div>
  );
}
