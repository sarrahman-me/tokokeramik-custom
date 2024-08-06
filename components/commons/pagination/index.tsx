"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GrNext, GrPrevious } from "react-icons/gr";

export default function Pagination({
  metadata,
  currentPage,
  setCurrentPage,
}: {
  metadata: {
    page: number;
    limit: number;
    total_data: number;
    total_pages: number;
  };
  currentPage: number;
  setCurrentPage: (p: number) => void;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const handleNextPage = () => {
    if (currentPage < metadata?.total_pages) {
      const nextPage = currentPage + 1;
      const queryParams = new URLSearchParams(params.toString());
      queryParams.set("page", nextPage.toString());
      setCurrentPage(nextPage);
      router.push(`${pathname}?${queryParams.toString()}`);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      const queryParams = new URLSearchParams(params.toString());
      queryParams.set("page", prevPage.toString());
      setCurrentPage(prevPage);
      router.push(`${pathname}?${queryParams.toString()}`);
    }
  };

  return (
    <div className="flex py-3 items-center justify-between bg-white shadow-sm text-secondary-medium p-1 md:p-2 rounded-md">
      {/* prev button */}
      {currentPage > 1 && (
        <div onClick={handlePrevPage} className="text-xl cursor-pointer">
          <GrPrevious />
        </div>
      )}

      <div className="flex items-center text-sm">
        <p>
          {Math.min(
            (currentPage - 1) * metadata.limit + 1,
            metadata.total_data
          )}
          - {Math.min(currentPage * metadata.limit, metadata.total_data)} dari{" "}
          {metadata.total_data} data
        </p>
      </div>

      {/* next page */}
      {currentPage < metadata?.total_pages && (
        <div onClick={handleNextPage} className="text-xl cursor-pointer">
          <GrNext />
        </div>
      )}
    </div>
  );
}
