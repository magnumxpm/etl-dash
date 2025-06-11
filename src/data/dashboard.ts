import type { DashboardMetrics, MonthlyTrend } from "@/types";

export async function fetchDashboardMetrics(): Promise<DashboardMetrics> {
  return {
    totalRevenue: 15309940,
    totalOrders: 97621,
    uniqueCustomers: 97621,
    avgOrderValue: 156.83,
    totalFreight: 14056152,
    avgDeliveryDays: 12.4,
    avgReviewScore: 4.1,
    repeatCustomerRate: 8.5,
  };
}

export async function fetchMonthlyTrends(): Promise<MonthlyTrend[]> {
  return [
    { month: "Jan 2017", revenue: 850000, orders: 5200, customers: 5200 },
    { month: "Feb 2017", revenue: 920000, orders: 5800, customers: 5800 },
    { month: "Mar 2017", revenue: 1120000, orders: 7100, customers: 7100 },
    { month: "Apr 2017", revenue: 1280000, orders: 8200, customers: 8200 },
    { month: "May 2017", revenue: 1350000, orders: 8600, customers: 8600 },
    { month: "Jun 2017", revenue: 1420000, orders: 9100, customers: 9100 },
    { month: "Jul 2017", revenue: 1580000, orders: 10200, customers: 10200 },
    { month: "Aug 2017", revenue: 1650000, orders: 10800, customers: 10800 },
  ];
}
