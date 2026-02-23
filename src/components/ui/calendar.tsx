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
                root: cn(defaultClassNames.root, "p-3 relative", className),
                nav: "absolute flex items-center justify-between pointer-events-none left-0 right-0 px-3 top-3 h-8",
                button_previous: "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100 pointer-events-auto flex justify-center items-center z-10",
                button_next: "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100 pointer-events-auto flex justify-center items-center z-10",
                month_caption: "flex justify-center h-8 mb-4 relative items-center font-bold text-[15px] text-slate-800 w-full",
                caption_label: "font-bold",
                today: "font-semibold text-violet-600",
                selected: "bg-slate-900 text-white rounded-full",
                chevron: cn(defaultClassNames.chevron, "fill-violet-600 w-4 h-4"),
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
