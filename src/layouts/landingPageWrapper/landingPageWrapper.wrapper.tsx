"use client";

import Footer from "@/components/footer/footer.footer";
import NavBar from "@/components/navBar/navBar.navBar";
import Head from "next/head";
import { ReactNode } from "react";

interface LandingPageWrapperProps {
  children: ReactNode;
  title?: string;
  description?: string;
  image?: string;
}

export default function LandingPageWrapper({
  children,
  title = "Default Title",
  description = "Default description for SEO",
  image = "/img/productdefaultimg.png",
}: LandingPageWrapperProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        {/* Open Graph / Social media tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
      </Head>
      <main>
        <NavBar />
        <div className=" lg:px-[88px] md:px-[32px] px-4  lg:mt-[228px] md:mt-[228px] mt-[240px]">
          {children}
        </div>
        <Footer />
      </main>
    </>
  );
}
