"use client";

import React,{useState} from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { FocusScope } from "@radix-ui/react-focus-scope";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";

export function DatePickerWithRange({date,setDate, isSubmit,submit,handleClick}) {
  

  return (
    <div className={"grid gap-2"}>
      <Popover onOpenChange={()=>{

        isSubmit({...submit,second:true})
        
      }}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={`
              "w-[300px] justify-start text-left font-normal",
              ${!date} && "text-muted-foreground"`}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={1}
            />
            <PopoverClose asChild>
              <Button
                className="w-full rounded-none"
                onClick={() => {
                  isSubmit({...submit,first:true});
                }}
              >
                Submit
              </Button>
            </PopoverClose>
          </PopoverContent>
        
      </Popover>
    </div>
  );
}
