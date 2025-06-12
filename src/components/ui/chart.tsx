import * as React from "react";
import {
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  type TooltipProps,
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
    <ResponsiveContainer
      width="100%"
      height="100%"
      className={cn(className)}
      style={style}
      {...props}
    >
      {children}
    </ResponsiveContainer>
  );
}

export function ChartTooltip(props: TooltipProps<string, string>) {
  return <RechartsTooltip {...props} />;
}

export function ChartLegend(props: any) {
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
  formatter?: (value: any, name: any) => [React.ReactNode, React.ReactNode];
  indicator?: "dot" | "line";
}

export function ChartTooltipContent({
  label,
  payload,
  labelFormatter,
  formatter,
}: ChartTooltipContentProps) {
  if (!payload || !payload.length) return null;
  return (
    <div className="rounded-md border bg-popover p-2 text-popover-foreground shadow-sm">
      <div className="mb-2 text-sm font-semibold">
        {labelFormatter ? labelFormatter(label) : label}
      </div>
      <div className="grid gap-1">
        {payload.map((item) => {
          const [formattedValue, formattedName] = formatter 
            ? formatter(item.value, item.name)
            : [item.value, item.name];
          return (
            <div key={item.dataKey} className="flex items-center gap-2 text-sm">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {formattedName}: {formattedValue}
            </div>
          );
        })}
      </div>
    </div>
  );
}
