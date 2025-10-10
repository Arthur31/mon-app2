'use client'

import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@src/components/ui/chart";
import { Pie, PieChart } from "recharts";

export function PieChartComponent(props: { chartData: any[], chartConfig: ChartConfig }
) {
    return (
        <ChartContainer
            config={props.chartConfig}
            className="mx-auto aspect-square max-h-[300px]"
        >
            <PieChart>
                <ChartTooltip
                    cursor={false}
                    content={
                        <ChartTooltipContent
                            hideLabel
                            nameKey="answer" />
                    }
                />
                <Pie data={props.chartData} dataKey="count" />
                <ChartLegend
                    content={<ChartLegendContent nameKey="answer" />}
                    className="flex-col gap-2 justify-start items-start"
                />
            </PieChart>
        </ChartContainer>
    );
}
