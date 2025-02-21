"use client";

import * as React from "react";
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
import { format } from "date-fns";

interface DateRangePickerProps {
  date?: DateRange;
  onDateChange: (date: DateRange | undefined) => void;
  className?: string;
  placeholder?: string;
}

export function DateRangePicker({
  date,
  onDateChange,
  className,
  placeholder = "Pick a date range",
}: DateRangePickerProps) {
  const [isFromDate, setIsFromDate] = React.useState(true);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  <span className="text-xs text-muted-foreground mr-2">
                    From:
                  </span>
                  {format(date.from, "LLL dd, y")}
                  <span className="text-xs text-muted-foreground mx-2">
                    To:
                  </span>
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                <>
                  <span className="text-xs text-muted-foreground mr-2">
                    From:
                  </span>
                  {format(date.from, "LLL dd, y")}
                  <span className="text-xs text-muted-foreground mx-2">
                    To:
                  </span>
                  Select end date
                </>
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="px-4 py-2 border-b">
            <h3 className="text-sm font-medium">
              {isFromDate ? "Select start date" : "Select end date"}
            </h3>
          </div>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(newDate) => {
              if (newDate?.from && !newDate.to) {
                setIsFromDate(false);
              } else {
                setIsFromDate(true);
              }
              onDateChange(newDate);
            }}
            numberOfMonths={1} // Changed from 2 to 1
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
