import "./globals.css";
import type { Metadata } from "next";
import ThemeRegistry from "./ThemeRegistry";
import Layout from "./UI/Layout";
import UIContextProvider from "./store/ui";

export const metadata: Metadata = {
  title: "Pizza Platform",
  description: "Order the best pizza in your neightbourhood",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: "mui" }}>
            <UIContextProvider>
              <Layout>{children}</Layout>
            </UIContextProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
