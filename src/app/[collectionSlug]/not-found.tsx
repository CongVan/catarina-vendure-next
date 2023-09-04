import Link from "next/link";

export default function NotFoundCollection() {
  return (
    <div className="min-h-[620px] text-center text-lg justify-center items-center flex flex-col">
      <div className="font-semibold h4 mb-5">Không tìm thấy sản phẩm</div>
      <Link href="/" className="btn btn-primary">
        Quay về trang chủ
      </Link>
    </div>
  );
}
