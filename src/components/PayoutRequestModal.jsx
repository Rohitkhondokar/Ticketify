"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, DollarSign, CreditCard } from "lucide-react";

export default function PayoutRequestModal({ 
  isOpen, 
  onClose, 
  availableAmount,
  onSuccess 
}) {
  const [amount, setAmount] = useState("");
  const [bkashNumber, setBkashNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validation
    if (!amount || !bkashNumber) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError("Please enter a valid amount");
      setLoading(false);
      return;
    }

    if (numAmount > availableAmount) {
      setError(`Amount cannot exceed available balance of ৳${availableAmount.toFixed(2)}`);
      setLoading(false);
      return;
    }

    if (numAmount < 50) {
      setError("Minimum payout amount is ৳50");
      setLoading(false);
      return;
    }

    // Validate bKash number (Bangladesh mobile number format)
    const bkashRegex = /^(\+880|880|0)?1[3-9]\d{8}$/;
    if (!bkashRegex.test(bkashNumber)) {
      setError("Please enter a valid bKash number");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/withdrawals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: numAmount,
          bank_details: JSON.stringify({
            payment_method: "bKash",
            bkash_number: bkashNumber,
            account_holder: "Vendor Payout"
          }),
          vendor_id: "1" // This should come from auth context
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess("Payout request submitted successfully!");
        setAmount("");
        setBkashNumber("");
        setTimeout(() => {
          onClose();
          if (onSuccess) onSuccess();
        }, 2000);
      } else {
        setError(result.message || "Failed to submit payout request");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setAmount("");
      setBkashNumber("");
      setError("");
      setSuccess("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Request Payout
          </DialogTitle>
          <DialogDescription>
            Enter the amount you want to withdraw and your bKash number.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (৳)</Label>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="50"
                max={availableAmount}
                step="0.01"
                disabled={loading}
                className="pl-8"
              />
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <p className="text-xs text-gray-500">
              Available: ৳{availableAmount.toFixed(2)} | Min: ৳50
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bkash">bKash Number</Label>
            <div className="relative">
              <Input
                id="bkash"
                type="tel"
                placeholder="01XXXXXXXXX"
                value={bkashNumber}
                onChange={(e) => setBkashNumber(e.target.value)}
                disabled={loading}
                className="pl-8"
              />
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <p className="text-xs text-gray-500">
              Enter your bKash mobile number
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">
                {success}
              </AlertDescription>
            </Alert>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
