"use client";
import * as React from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
} from "recharts";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { MonthlyTrend } from "@/types";

interface ChartAreaInteractiveProps {
  data: MonthlyTrend[];
}

const revenueChartConfig: ChartConfig = {
  revenue: { label: "Revenue", color: "var(--chart-1)" },
};

const volumeChartConfig: ChartConfig = {
  orders: { label: "Orders", color: "var(--chart-2)" },
  customers: { label: "Customers", color: "var(--chart-3)" },
};

export function RevenueChart({ data }: ChartAreaInteractiveProps) {
  const filteredData = React.useMemo(() => {
    return data;
  }, [data]);

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Revenue Trend</CardTitle>
          <CardDescription>Monthly revenue</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={revenueChartConfig}
          width="100%"
          height={250}
          className="w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={20}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={<ChartTooltipContent
                labelFormatter={(value) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })
                }}
                formatter={(value, name) => [
                  `$${Number(value).toLocaleString()}`,
                  name
                ]}
              />}
            />
            <Area
              dataKey="revenue"
              type="natural"
              fill="url(#fillRevenue)"
              stroke="var(--color-revenue)"
              strokeWidth={2}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function VolumeChart({ data }: ChartAreaInteractiveProps) {
  const filteredData = React.useMemo(() => {
    return data;
  }, [data]);

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Volume Trend</CardTitle>
          <CardDescription>Monthly orders and customers</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={volumeChartConfig}
          width="100%"
          height={250}
          className="w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-orders)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-orders)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillCustomers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-customers)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-customers)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={20}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={<ChartTooltipContent
                labelFormatter={(value) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })
                }}
                formatter={(value, name) => [
                  Number(value).toLocaleString(),
                  name
                ]}
              />}
            />
            <Area
              dataKey="orders"
              type="natural"
              fill="url(#fillOrders)"
              stroke="var(--color-orders)"
              strokeWidth={2}
            />
            <Area
              dataKey="customers"
              type="natural"
              fill="url(#fillCustomers)"
              stroke="var(--color-customers)"
              strokeWidth={2}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function ChartAreaInteractive({ data }: ChartAreaInteractiveProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <RevenueChart data={data} />
      <VolumeChart data={data} />
    </div>
  );
}
