"use client";

import React, { createContext, useContext, useState } from "react";

interface Ticket {
  ticketId: string;
  price: number;
  quantity: number;
}

interface TicketContextType {
  tickets: Ticket[];
  addTicket: (ticketId: string, price: number) => void;
  removeTicket: (ticketId: string, price: number) => void;
  clearTickets: () => void;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const TicketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const addTicket = (ticketId: string, price: number) => {
    setTickets((prev) => {
      const existing = prev.find((t) => t.ticketId === ticketId);
      if (existing) {
        return prev.map((t) =>
          t.ticketId === ticketId ? { ...t, quantity: t.quantity + 1 } : t
        );
      }
      return [...prev, { ticketId, price, quantity: 1 }];
    });
  };

  const removeTicket = (ticketId: string) => {
    setTickets((prev) =>
      prev
        .map((t) =>
          t.ticketId === ticketId && t.quantity > 0
            ? { ...t, quantity: t.quantity - 1 }
            : t
        )
        .filter((t) => t.quantity > 0)
    );
  };

  const clearTickets = () => {
    setTickets([]);
  };

  return (
    <TicketContext.Provider
      value={{ tickets, addTicket, removeTicket, clearTickets }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export const useTicketContext = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error("useTicketContext must be used within a TicketProvider");
  }
  return context;
};
