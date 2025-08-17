// File: components/AddToCartButton.js
"use client";

import { ProtectedButton } from "./authbutton";

export function AddToCartButton() {
  return (
    <ProtectedButton onAuthenticatedClick={() => alert("Added to cart!")}>
      Add to Cart
    </ProtectedButton>
  );
}
