
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'InsightHire AI | Practice. Improve. Get Hired.',
  description: 'Premium AI-powered interview simulator for B.Tech students and freshers. Real-time feedback and company-level simulations.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body selection:bg-primary/30 selection:text-primary-foreground antialiased overflow-x-hidden">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
