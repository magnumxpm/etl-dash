import * as React from "react";
import {
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  type TooltipProps,
  type LegendProps,
} from "recharts";
import { cn } from "@/lib/utils";

export type ChartConfig = Record<string, { label: string; color?: string }>;

interface ChartContainerProps
  extends React.ComponentPropsWithoutRef<typeof ResponsiveContainer> {
  config?: ChartConfig;
}

export function ChartContainer({
  children,
  className,
  config,
  ...props
}: ChartContainerProps) {
  const style: React.CSSProperties = {};
  if (config) {
    for (const [key, value] of Object.entries(config)) {
      if (value.color) {
        (style as any)[`--color-${key}`] = value.color;
      }
    }
  }
  return (
    <ResponsiveContainer className={cn(className)} style={style} {...props}>
      {children}
    </ResponsiveContainer>
  );
}

export function ChartTooltip({ children, ...props }: TooltipProps<string, string>) {
  return <RechartsTooltip {...props}>{children}</RechartsTooltip>;
}

export function ChartLegend(props: LegendProps) {
  return <RechartsLegend {...props} />;
}

export function ChartLegendContent({ payload }: any) {
  return (
    <ul className="flex flex-wrap gap-4 text-sm">
      {payload?.map((entry: any) => (
        <li key={entry.dataKey} className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          {entry.value}
        </li>
      ))}
    </ul>
  );
}

export interface ChartTooltipContentProps extends TooltipProps<string, string> {
  labelFormatter?: (value: any) => React.ReactNode;
  indicator?: "dot" | "line";
}

export function ChartTooltipContent({
  label,
  payload,
  labelFormatter,
}: ChartTooltipContentProps) {
  if (!payload || !payload.length) return null;
  return (
    <div className="rounded-md border bg-popover p-2 text-popover-foreground shadow-sm">
      <div className="mb-2 text-sm font-semibold">
        {labelFormatter ? labelFormatter(label) : label}
      </div>
      <div className="grid gap-1">
        {payload.map((item) => (
          <div key={item.dataKey} className="flex items-center gap-2 text-sm">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            {item.name}: {item.value}
          </div>
        ))}
      </div>
    </div>
  );
}
