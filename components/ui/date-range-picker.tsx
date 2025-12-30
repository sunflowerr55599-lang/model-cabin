"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal p-6 border-gray-200 hover:border-gray-400 h-auto",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-orange-500" />
            <div className="flex w-full items-center">
              <span className="flex-1">
                {date?.from ? format(date.from, "LLL dd, y") : "Start date"}
              </span>
              <span className="mx-2 text-gray-400">→</span>
              <span className="flex-1 text-right">
                {date?.to ? format(date.to, "LLL dd, y") : "End date"}
              </span>
            </div>
          </Button>
        </PopoverTrigger>
        {/* <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2} // Shows two months for easier cabin booking
          />
        </PopoverContent> */}
        <PopoverContent className="w-auto p-0" align="center">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            // Logic: Disable any date older than "now"
            disabled={(date) => {
              const today = new Date();
              today.setHours(0, 0, 0, 0); // Clear time for accurate comparison
              return date < today;
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
