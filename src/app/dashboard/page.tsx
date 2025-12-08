import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"

import data from "./data.json"

export default function Page() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <SectionCards />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-12">
                    <ChartAreaInteractive />
                </div>
            </div>
        </div>
    )
}
