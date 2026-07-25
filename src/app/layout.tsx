import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Admissions & Fees Desk",
  description: "Admissions and fees follow-up control panel",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
