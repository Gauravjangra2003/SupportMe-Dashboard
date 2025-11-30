import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ui/theme-provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100","200", "300", "400", "500", "600", "700", "800", "900"],
});


export const metadata: Metadata = {
  title: "Support Me",
  description: "Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
       <body className={cn(`${poppins.className} antialiased`)}>
       <ThemeProvider  
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
        {children}
       </ThemeProvider>
      </body>
    </html>
  );
}
