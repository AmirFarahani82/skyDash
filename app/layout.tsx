import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Panel from "./components/Panel";

const geistSans = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkyDash",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} `}>
        <main className="flex bg-stone-200 ">
          <Panel />
          <section className="bg-white w-full m-6 p-6 rounded-2xl">
            {children}
          </section>
        </main>
      </body>
    </html>
  );
}
