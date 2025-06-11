import type { DashboardMetrics, MonthlyTrend, CategoryData, StateData } from "@/types";

export async function fetchDashboardMetrics(): Promise<DashboardMetrics> {
  try {
    const response = await fetch("/api/dashboard/metrics");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch dashboard metrics:", error);
    return {
      totalRevenue: 0,
      totalOrders: 0,
      uniqueCustomers: 0,
      avgOrderValue: 0,
      totalFreight: 0,
      avgDeliveryDays: 0,
      avgReviewScore: 0,
      repeatCustomerRate: 0,
    };
  }
}

export async function fetchMonthlyTrends(): Promise<MonthlyTrend[]> {
  try {
    const response = await fetch("/api/dashboard/trends");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch monthly trends:", error);
    return [];
  }
}

export async function fetchCategoryData(): Promise<CategoryData[]> {
  try {
    const response = await fetch("/api/dashboard/categories");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch category data:", error);
    return [];
  }
}

export async function fetchStateData(): Promise<StateData[]> {
  try {
    const response = await fetch("/api/dashboard/states");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch state data:", error);
    return [];
  }
}

export async function executeCustomQuery(query: string): Promise<any> {
  try {
    const response = await fetch("/api/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Failed to execute custom query:", error);
    throw error;
  }
}
