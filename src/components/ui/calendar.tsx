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
                today: "border border-slate-300 rounded-full font-semibold",
                selected: "bg-slate-900 text-white rounded-full",
                root: cn(defaultClassNames.root, "p-3", className),
                chevron: cn(defaultClassNames.chevron, "fill-slate-900"),
                month_caption: "font-medium text-sm text-slate-800",
                day: cn(defaultClassNames.day, "rounded-full transition-colors"),
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
