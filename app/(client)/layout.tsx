import type { Metadata } from "next";
import "../globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {ClerkProvider} from "@clerk/nextjs"

export const metadata: Metadata = {
  title: {
    template: "%s | Full Stack Ecommerce Website",
    default: "Full Stack Ecommerce Website",
  },
  description: "Shoping Website, your best choice to buy our products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
    </ClerkProvider>
  );
}
