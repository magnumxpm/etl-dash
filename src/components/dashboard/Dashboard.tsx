"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartAreaInteractive } from "./ChartAreaInteractive";
import type { DashboardMetrics, MonthlyTrend } from "@/types";
import { fetchDashboardMetrics, fetchMonthlyTrends } from "@/data/dashboard";

export function Dashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [trends, setTrends] = useState<MonthlyTrend[]>([]);

  useEffect(() => {
    fetchDashboardMetrics().then(setMetrics);
    fetchMonthlyTrends().then(setTrends);
  }, []);

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-2xl">
              {metrics ? `$${metrics.totalRevenue.toLocaleString()}` : "-"}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Total Orders</CardDescription>
            <CardTitle className="text-2xl">
              {metrics ? metrics.totalOrders.toLocaleString() : "-"}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Customers</CardDescription>
            <CardTitle className="text-2xl">
              {metrics ? metrics.uniqueCustomers.toLocaleString() : "-"}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Avg. Order Value</CardDescription>
            <CardTitle className="text-2xl">
              {metrics ? `$${metrics.avgOrderValue.toFixed(2)}` : "-"}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
      <ChartAreaInteractive data={trends} />
    </div>
  );
}
