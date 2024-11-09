"use client";

import { Card } from "@/components/ui/card";
import { useSubscriptions } from "@/hooks/use-subscriptions";
import { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function SubscriptionCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { data: subscriptions } = useSubscriptions();

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const subscriptionsByDate = subscriptions?.reduce((acc, sub) => {
    const date = format(new Date(sub.nextBillingDate), 'yyyy-MM-dd');
    if (!acc[date]) acc[date] = [];
    acc[date].push(sub);
    return acc;
  }, {} as Record<string, typeof subscriptions>);

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))}
            className="p-2 hover:bg-secondary rounded-md"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))}
            className="p-2 hover:bg-secondary rounded-md"
          >
            Next
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-muted">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 text-center font-medium">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px bg-muted">
        {days.map((day, index) => {
          const dateKey = format(day, 'yyyy-MM-dd');
          const daySubscriptions = subscriptionsByDate?.[dateKey] || [];
          
          return (
            <div
              key={day.toString()}
              className={cn(
                "bg-background p-2 min-h-[100px]",
                "hover:bg-secondary/50 transition-colors",
              )}
            >
              <div className="font-medium text-sm mb-1">
                {format(day, 'd')}
              </div>
              <div className="space-y-1">
                {daySubscriptions.map(sub => (
                  <Badge
                    key={sub.id}
                    variant="secondary"
                    className="block truncate text-xs"
                  >
                    {sub.name} - {format(new Date(sub.nextBillingDate), 'MMM d')}
                  </Badge>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}