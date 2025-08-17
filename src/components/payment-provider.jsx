"use client";

import { createContext, useContext, useState } from "react";

const PaymentContext = createContext({});

export function PaymentProvider({ children }) {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const processPayment = async (paymentData) => {
    setIsProcessing(true);

    // Mock payment processing
    return new Promise((resolve) => {
      setTimeout(() => {
        const transaction = {
          id: `TXN-${Date.now()}`,
          amount: paymentData.amount,
          status: "completed",
          date: new Date().toISOString(),
          method: paymentData.method,
          description: paymentData.description,
        };

        setTransactions((prev) => [transaction, ...prev]);
        setIsProcessing(false);
        resolve({ success: true, transaction });
      }, 2000);
    });
  };

  const addPaymentMethod = async (methodData) => {
    const newMethod = {
      id: Date.now(),
      ...methodData,
      isDefault: paymentMethods.length === 0,
    };

    setPaymentMethods((prev) => [...prev, newMethod]);
    return { success: true, method: newMethod };
  };

  const removePaymentMethod = (methodId) => {
    setPaymentMethods((prev) =>
      prev.filter((method) => method.id !== methodId)
    );
  };

  const setDefaultPaymentMethod = (methodId) => {
    setPaymentMethods((prev) =>
      prev.map((method) => ({
        ...method,
        isDefault: method.id === methodId,
      }))
    );
  };

  const requestRefund = async (transactionId, reason) => {
    // Mock refund processing
    return new Promise((resolve) => {
      setTimeout(() => {
        setTransactions((prev) =>
          prev.map((transaction) =>
            transaction.id === transactionId
              ? { ...transaction, status: "refunded" }
              : transaction
          )
        );
        resolve({ success: true });
      }, 1000);
    });
  };

  const value = {
    paymentMethods,
    transactions,
    isProcessing,
    processPayment,
    addPaymentMethod,
    removePaymentMethod,
    setDefaultPaymentMethod,
    requestRefund,
  };

  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  );
}

export function usePayment() {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
}
