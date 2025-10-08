'use client'

import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent } from "@src/components/ui/chart";
import { Pie, PieChart } from "recharts";

export function PieChartComponent(props: { chartData: any[], chartConfig: ChartConfig }
) {
    return (
        <ChartContainer
            config={props.chartConfig}
            className="mx-auto aspect-square max-h-[300px]"
        >
            <PieChart>
                <Pie data={props.chartData} dataKey="count" />
                <ChartLegend
                    content={<ChartLegendContent nameKey="answer" />}
                    className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                />
            </PieChart>
        </ChartContainer>
    );
}
