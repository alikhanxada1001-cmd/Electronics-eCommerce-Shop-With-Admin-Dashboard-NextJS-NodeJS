import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth/next";
import "svgmap/dist/svgMap.min.css";
import SessionProvider from "@/utils/SessionProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/Providers";
import SessionTimeoutWrapper from "@/components/SessionTimeoutWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "https://pak-tajarat.vercel.app"),
  title: {
    default: "Pak-Tajarat | Pakistan's Online Shopping Store",
    template: "%s | Pak-Tajarat",
  },
  description:
    "Shop electronics and everyday essentials at Pak-Tajarat. Discover products, browse categories, and enjoy a convenient online shopping experience in Pakistan.",
  applicationName: "Pak-Tajarat",
  openGraph: {
    title: "Pak-Tajarat | Pakistan's Online Shopping Store",
    description: "Discover products and shop online across Pakistan with Pak-Tajarat.",
    siteName: "Pak-Tajarat",
    locale: "en_PK",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en-PK" data-theme="light">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <SessionTimeoutWrapper />
          <Header />
          <Providers>{children}</Providers>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
