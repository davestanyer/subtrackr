"use client";

import { Card } from "@/components/ui/card";
import { DollarSign, TrendingUp, Calendar } from "lucide-react";
import { useSubscriptions } from "@/hooks/use-subscriptions";
import { formatCurrency } from "@/lib/utils";
import { AddSubscriptionDialog } from "@/components/subscriptions/add-subscription-dialog";

export function DashboardHeader() {
  const { data: subscriptions } = useSubscriptions();
  
  const totalMonthly = subscriptions?.reduce((acc, sub) => 
    acc + (sub.frequency === "monthly" ? sub.amount : sub.amount / 12), 0) || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Subscriptions</h1>
        <AddSubscriptionDialog />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Monthly Cost</p>
              <p className="text-2xl font-bold">{formatCurrency(totalMonthly)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Subscriptions</p>
              <p className="text-2xl font-bold">{subscriptions?.length || 0}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Next Payment</p>
              <p className="text-2xl font-bold">Apr 15</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}