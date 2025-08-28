import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Landmark } from "lucide-react";

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold bg-black text-white">
      {/* Left: Museum Icon + Title */}
      <div className="flex items-center gap-2">
        <Landmark className="h-6 w-6 text-yellow-500" />
        <span className="tracking-wide">Art Museum</span>
      </div>

      {/* Right: Auth Section */}
      <div>
        <SignedOut>
          <div className="cursor-pointer">
            <SignInButton />
          </div>
        </SignedOut>
        <SignedIn>
        
        </SignedIn>
      </div>
    </nav>
  );
}
