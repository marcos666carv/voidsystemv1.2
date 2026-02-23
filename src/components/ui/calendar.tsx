import * as React from "react"
import { DayPicker, getDefaultClassNames } from "react-day-picker"
import "react-day-picker/style.css"

import { cn } from "@/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    ...props
}: CalendarProps) {
    const defaultClassNames = getDefaultClassNames()

    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn(defaultClassNames.root, "p-3", className)}
            classNames={{
                root: cn(defaultClassNames.root, "p-3 w-full", className),
                months: "w-full",
                month: "w-full space-y-4",
                month_grid: "w-full border-collapse space-y-1",
                nav: "space-x-1 flex items-center justify-between absolute w-full top-3 px-2 left-0 pointer-events-none",
                button_previous: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 pointer-events-auto",
                button_next: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 pointer-events-auto",
                month_caption: "flex justify-center pt-1 relative items-center font-medium text-sm text-slate-800",
                caption_label: "font-medium",
                today: "font-semibold text-violet-600",
                selected: "bg-slate-900 text-white rounded-full",
                chevron: cn(defaultClassNames.chevron, "fill-violet-600"),
                day: cn(defaultClassNames.day, "rounded-full transition-colors w-9 h-9 flex items-center justify-center p-0 font-normal aria-selected:opacity-100"),
                outside: cn(defaultClassNames.outside, "text-slate-300 opacity-50"),
                disabled: cn(defaultClassNames.disabled, "text-slate-300 opacity-50"),
                ...classNames,
            }}
            {...props}
        />
    )
}
Calendar.displayName = "Calendar"

export { Calendar }
