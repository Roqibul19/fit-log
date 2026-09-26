import "./globals.css";
import { PlanProvider } from "./context/PlanContext";

export const metadata = {
  title: "FitLog",
  description: "Workout Library",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PlanProvider>
          {children}
        </PlanProvider>
      </body>
    </html>
  );
}