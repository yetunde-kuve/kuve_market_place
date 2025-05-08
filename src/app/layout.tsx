import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Layouts from "../layouts/main.layout";
import "react-toastify/dist/ReactToastify.css";
import "remixicon/fonts/remixicon.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kuve | Kuve",
  description: "Kuve",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Layouts>{children}</Layouts>
      </body>
    </html>
  );
}
