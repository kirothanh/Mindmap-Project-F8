"use client"

import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function LayOutPage({ children }) {
  return (
    <>
      <div>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}
