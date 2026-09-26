import "./globals.css";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { PlanProvider } from "./context/PlanContext";

export const metadata = {
  title: "FitLog — Workout Library",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PlanProvider>

          <Navbar />

          <main>
            {children}
          </main>

          <Footer />

        </PlanProvider>
      </body>
    </html>
  );
}