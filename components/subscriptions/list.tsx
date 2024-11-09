"use client";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSubscriptions } from "@/hooks/use-subscriptions";
import { formatCurrency } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import { EditSubscriptionDialog } from "./edit-subscription-dialog";
import { Subscription } from "@/types/subscription";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function SubscriptionList() {
  const { data: subscriptions, isLoading, updateSubscription, deleteSubscription } = useSubscriptions();
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);
  const [deletingSubscription, setDeletingSubscription] = useState<Subscription | null>(null);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions?.map((subscription) => (
              <TableRow key={subscription.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={subscription.logo} />
                      <AvatarFallback>{subscription.name[0]}</AvatarFallback>
                    </Avatar>
                    {subscription.name}
                  </div>
                </TableCell>
                <TableCell>{subscription.client?.name || "-"}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={subscription.owner.avatar} />
                      <AvatarFallback>{subscription.owner.name[0]}</AvatarFallback>
                    </Avatar>
                    {subscription.owner.name}
                  </div>
                </TableCell>
                <TableCell className="capitalize">{subscription.frequency}</TableCell>
                <TableCell>{formatCurrency(subscription.amount)}</TableCell>
                <TableCell>
                  <Badge variant={subscription.status === "active" ? "default" : "destructive"}>
                    {subscription.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingSubscription(subscription)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeletingSubscription(subscription)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {editingSubscription && (
        <EditSubscriptionDialog
          subscription={editingSubscription}
          open={!!editingSubscription}
          onOpenChange={(open) => !open && setEditingSubscription(null)}
          onSave={updateSubscription}
        />
      )}

      <AlertDialog
        open={!!deletingSubscription}
        onOpenChange={(open) => !open && setDeletingSubscription(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the subscription for {deletingSubscription?.name}.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deletingSubscription) {
                  deleteSubscription(deletingSubscription.id);
                  setDeletingSubscription(null);
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}