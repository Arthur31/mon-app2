'use client'

import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";

export function PieChartComponent(props: {chartData: any[]}
) {
    const chartConfig = {
        visitors: {
            label: "Visitors",
        },
        yes: {
            label: "Yes",
            color: "var(--chart-1)",
        },
        no: {
            label: "No",
            color: "var(--chart-2)",
        },
    } satisfies ChartConfig;

    return (
        <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[300px]"
        >
            <PieChart>
                <Pie data={props.chartData} dataKey="visitors" />
                <ChartLegend
                    content={<ChartLegendContent nameKey="browser" />}
                    className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                />
            </PieChart>
        </ChartContainer>
    );
}
