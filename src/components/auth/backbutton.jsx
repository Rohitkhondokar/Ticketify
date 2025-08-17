"use client";

import Link from "next/link";
import { Button } from "../ui/button";

function BackButton({ href, BackButtonLavel, label }) {
  return (
    <div className="flex items-center justify-center w-full gap-2">
      {/* Left side label */}
      <span className="text-base font-medium">{BackButtonLavel}</span>

      {/* Right side link button */}
      <Button variant="link" className="p-0 h-auto" asChild>
        <Link
          href={href}
          className="text-blue-600  hover:text-blue-800 transition-colors font-medium"
        >
          {label}
        </Link>
      </Button>
    </div>
  );
}

export default BackButton;
