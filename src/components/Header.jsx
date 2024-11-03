"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import "@/assets/css/Header.css";
import Loading from "./Loading";

export default function Header() {
  const pathname = usePathname();
  const { user, error, isLoading } = useUser();

  if (isLoading) return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="flex items-center justify-between py-4 px-2">
      <div>
        <Link href="/" className="capitalize text-2xl font-bold text-blue-600">
          mindmap flow
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <ul className="flex items-center gap-3 text-lg">
          <li
            className={`py-2 px-3 rounded-md ${pathname == "/" ? "active" : "hover:bg-slate-300"
              }`}
          >
            <Link href="/">Trang chủ</Link>
          </li>
          <li
            className={`py-2 px-3 rounded-md ${pathname == "/about" ? "active" : "hover:bg-slate-300"
              }`}
          >
            <Link href="/about">Giới thiệu</Link>
          </li>
          <li
            className={`py-2 px-3 rounded-md ${pathname == "/features" ? "active" : "hover:bg-slate-300"
              }`}
          >
            <Link href="/features">Tính năng</Link>
          </li>
          <li
            className={`py-2 px-3 rounded-md ${pathname == "/price" ? "active" : "hover:bg-slate-300"
              }`}
          >
            <Link href="/price">Bảng giá</Link>
          </li>
          <li
            className={`py-2 px-3 rounded-md ${pathname == "/contact" ? "active" : "hover:bg-slate-300"
              }`}
          >
            <Link href="/contact">Liên hệ</Link>
          </li>
        </ul>
        <div className="text-lg flex items-center gap-3">
          {user ? (
            <>
              <div className="text-blue-600 px-3 py-2 rounded-md hover:bg-blue-600 hover:bg-opacity-25 hover:text-blue-600 cursor-pointer">
                Hi, {user?.name}
              </div>
              <Link
                className="text-blue-600 px-3 py-2 rounded-md hover:bg-blue-600 hover:bg-opacity-25 hover:text-blue-600"
                href="/my-mindmap"
              >
                Mindmap
              </Link>
              <Link
                href="/api/auth/logout"
                className="px-3 py-2 rounded-md hover:bg-blue-600 hover:bg-opacity-25 hover:text-blue-600"
              >
                Đăng xuất
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/api/auth/login"
                className="px-3 py-2 rounded-md hover:bg-blue-600 hover:bg-opacity-25 hover:text-blue-600"
              >
                Đăng nhập
              </Link>
              <Link
                href="/api/auth/signup"
                className="px-3 py-2 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg"
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
