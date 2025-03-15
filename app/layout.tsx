import "app/_styles/globals.css";
import type { Metadata } from "next";
import { Poppins, Dancing_Script } from "next/font/google";
import Navigation from "src/components/common/Navigation";
import { ThemeProvider } from "src/providers/theme-provider";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
  subsets: ["latin"]
});

const dancingScript = Dancing_Script({
  weight: ["400", "500"],
  variable: "--font-dancing-script",
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
      <body
        className={`${poppins.variable} ${dancingScript.variable} antialiased bg-background`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange>
          <Navigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
