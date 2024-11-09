"use client";

import { useState, useEffect } from "react";
import { Subscription } from "@/types/subscription";
import { getStoredSubscriptions, setStoredSubscriptions } from "@/lib/storage";

export function useSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setSubscriptions(getStoredSubscriptions());
    setIsLoading(false);
  }, []);

  const addSubscription = (newSubscription: Omit<Subscription, "id">) => {
    const subscription = {
      ...newSubscription,
      id: Math.random().toString(36).slice(2),
    };
    const updated = [...subscriptions, subscription];
    setSubscriptions(updated);
    setStoredSubscriptions(updated);
  };

  const updateSubscription = (updatedSubscription: Subscription) => {
    const updated = subscriptions.map((sub) =>
      sub.id === updatedSubscription.id ? updatedSubscription : sub
    );
    setSubscriptions(updated);
    setStoredSubscriptions(updated);
  };

  const deleteSubscription = (id: string) => {
    const updated = subscriptions.filter((sub) => sub.id !== id);
    setSubscriptions(updated);
    setStoredSubscriptions(updated);
  };

  return {
    data: subscriptions,
    isLoading,
    addSubscription,
    updateSubscription,
    deleteSubscription,
  };
}