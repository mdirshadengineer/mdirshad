import "app/_styles/globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Md Irshad - 💫 Software engineer",
  description:
    "A Progressive Web App (PWA) showcasing my portfolio, blog, and career roadmap. Explore my journey, skills, and achievements, stay updated with insightful blog posts, and track my career milestones. Optimized for fast performance, offline access, and mobile-friendly experiences."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
}
