import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Gamepad2, Sparkles, Cpu, Zap } from "lucide-react";

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between border-b border-cyan-500/30 p-4 text-xl font-semibold bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white backdrop-blur-md">
      {/* Left: Gaming Icon + Title */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Gamepad2 className="h-7 w-7 text-cyan-400 animate-pulse" />
          <Sparkles className="h-3 w-3 text-pink-400 absolute -top-1 -right-1 animate-ping" />
        </div>
        <span className="tracking-wider bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-bold text-2xl">
          NEXUS REALM
        </span>
        <div className="flex items-center ml-4">
          <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse mr-1"></div>
          <span className="text-xs text-green-400 font-mono">ONLINE</span>
        </div>
      </div>

      {/* Right: Auth Section */}
      <div>
        <SignedOut>
          <div className="cursor-pointer">
            <SignInButton>
              <button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center gap-2 border border-cyan-400/30">
                <Zap className="h-4 w-4" />
                <span className="text-sm">SIGN IN</span>
              </button>
            </SignInButton>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1 rounded-full border border-cyan-400/20">
              <Cpu className="h-4 w-4 text-cyan-400" />
              <span className="text-sm text-cyan-300 font-mono">USER</span>
            </div>
            <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 p-1 rounded-full border border-cyan-400/30">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8 border-2 border-cyan-400/50",
                  }
                }}
              />
            </div>
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}