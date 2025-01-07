import DashboardPage from "@/components/promotor/dashboard";
import authGuard from "@/hoc/authGuard";
import React from "react";

function Dashboard2() {
  return (
    <div className="flex flex-row h-screen w-full">
      <DashboardPage />
    </div>
  );
}

export default authGuard(Dashboard2)
