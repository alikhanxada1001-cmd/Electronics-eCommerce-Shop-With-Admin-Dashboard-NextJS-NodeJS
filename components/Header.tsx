"use client";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import HeaderTop from "./HeaderTop";
import SearchInput from "./SearchInput";
import Link from "next/link";
import CartElement from "./CartElement";
import NotificationBell from "./NotificationBell";
import HeartElement from "./HeartElement";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";
import apiClient from "@/lib/api";

const Brand = ({ compact = false }: { compact?: boolean }) => (
  <Link href="/" aria-label="Pak-Tajarat home" className="inline-flex flex-col leading-none">
    <span className={compact ? "text-2xl font-extrabold tracking-tight text-slate-900" : "text-3xl font-extrabold tracking-tight text-slate-900"}>
      Pak<span className="text-cyan-600">-</span>Tajarat
    </span>
    <span className="mt-1 text-[10px] font-medium tracking-[0.18em] text-slate-500">ONLINE SHOPPING IN PAKISTAN</span>
  </Link>
);

const Header = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { wishlist, setWishlist, wishQuantity } = useWishlistStore();

  const handleLogout = () => {
    toast.success("Logout successful!");
    signOut();
  };

  const getWishlistByUserId = async (id: string) => {
    try {
      const response = await apiClient.get(`/api/wishlist/${id}`, { cache: "no-store" });
      if (!response.ok) return;
      const items = await response.json();
      const productArray = (Array.isArray(items) ? items : []).map((item: any) => ({
        id: item?.product?.id,
        title: item?.product?.title,
        price: item?.product?.price,
        image: item?.product?.mainImage,
        slug: item?.product?.slug,
        stockAvailabillity: item?.product?.inStock,
      })).filter((item: any) => item.id);
      setWishlist(productArray);
    } catch {
      // Wishlist is optional; do not block the storefront when its API is unavailable.
    }
  };

  useEffect(() => {
    if (!session?.user?.email) return;
    let active = true;
    apiClient.get(`/api/users/email/${encodeURIComponent(session.user.email)}`, { cache: "no-store" })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        if (active && data?.id) getWishlistByUserId(data.id);
      })
      .catch(() => undefined);
    return () => { active = false; };
  }, [session?.user?.email, wishlist.length]);

  return (
    <header className="bg-white">
      <HeaderTop />
      {pathname.startsWith("/admin") === false && (
        <div className="mx-auto flex h-32 max-w-screen-2xl items-center justify-between bg-white px-6 max-lg:h-auto max-lg:flex-col max-lg:justify-center max-lg:gap-y-6 max-lg:py-6 lg:px-16">
          <Brand />
          <SearchInput />
          <div className="flex items-center gap-x-6 sm:gap-x-10">
            <NotificationBell />
            <HeartElement wishQuantity={wishQuantity} />
            <CartElement />
          </div>
        </div>
      )}
      {pathname.startsWith("/admin") === true && (
        <div className="mx-auto flex h-28 max-w-screen-2xl items-center justify-between bg-white px-6 lg:px-16">
          <Brand compact />
          <div className="flex items-center gap-x-5">
            <NotificationBell />
            <div className="dropdown dropdown-end">
              <button type="button" tabIndex={0} aria-label="Open admin account menu" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">
                {session?.user?.email || "Admin"}
              </button>
              <ul tabIndex={0} className="dropdown-content z-[1] menu mt-2 w-56 rounded-box bg-base-100 p-2 shadow">
                <li><Link href="/admin">Dashboard</Link></li>
                <li><button type="button" onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
