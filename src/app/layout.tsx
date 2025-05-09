import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";
import Layouts from "../layouts/main.layout";
import "react-toastify/dist/ReactToastify.css";
import "remixicon/fonts/remixicon.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

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
      <body className={poppins.className} suppressHydrationWarning={true}>
        <Layouts>{children}</Layouts>
      </body>
    </html>
  );
}
