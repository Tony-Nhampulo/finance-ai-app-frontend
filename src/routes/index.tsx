import { Route, Routes } from "react-router-dom";

import { PrivateRoute } from "./PrivateRoute";
// import { PublicRoute } from "./PublicRoute";
// import { Navigate } from "react-router-dom";
import LoginPage from "@/pages/login";
import DashboardPage from "@/pages/dashboard";
import TransactionsPage from "@/pages/dashboard/transactions";
import { TransactionsPageProvider } from "@/pages/dashboard/transactions/components/transactions-page-context";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <LoginPage />
          </>
        }
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />

      <Route
        path="dashboard/transactions"
        element={
          <PrivateRoute>
            <TransactionsPageProvider>
              <TransactionsPage />
            </TransactionsPageProvider>
          </PrivateRoute>
        }
      />

      <Route
        path="*"
        element={
          <h1 className="absolute right-0 top-0 flex h-full w-full items-center justify-center text-2xl font-bold text-gray-500">
            Not Found Route
            {/* {<Navigate to="/" />} */}
          </h1>
        }
      />
    </Routes>
  );
};
