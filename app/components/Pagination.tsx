"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
type Props = {
  totalPages: number;
};
function Pagination({ totalPages }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = searchParams.get("page") || "1";
  function createURL(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  }
  const prevPage = Number(page) > 1 ? Number(page) - 1 : 1;
  const nextPage = Number(page) < totalPages ? Number(page) + 1 : totalPages;

  return (
    <div className="flex justify-center items-center gap-4 mt-4">
      <Link
        href={createURL(prevPage)}
        className="bg-sky-400 rounded-full w-8 h-8 text-2xl flex items-center justify-center cursor-pointer hover:scale-110 transition duration-200"
      >
        &larr;
      </Link>
      <span>
        Page {page} of {totalPages}
      </span>
      <Link
        href={createURL(nextPage)}
        className="bg-sky-400 rounded-full w-8 h-8 text-2xl flex items-center justify-center cursor-pointer hover:scale-110 transition duration-200"
      >
        &rarr;
      </Link>
    </div>
  );
}

export default Pagination;
