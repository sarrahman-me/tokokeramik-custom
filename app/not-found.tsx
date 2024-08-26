"use client";
import animation from "@/public/svg/404.svg";
import { useRouter } from "next/navigation";
import { Button } from "@/components/commons";
import Image from "next/image";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen w-full bg-secondary p-3 md:p-5">
      <div className="flex items-center justify-center order-2 md:order-1">
        <div className="space-y-8 mx-auto max-w-md">
          <h2 className="text-2xl md:text-4xl font-bold text-primary-600">
            404 - Not Found
          </h2>
          <p className="md:text-lg text-gray-700 mt-4">
            sepertinya Saya tidak dapat menemukan halaman yang kamu cari
          </p>
          <Button fullWidth onClick={() => router.back()}>
            Kembali
          </Button>
        </div>
      </div>
      <div className="order-1 md:order-2 flex justify-center">
        <Image src={animation.src} alt="Notfound" width={500} height={500} />
      </div>
    </div>
  );
}
