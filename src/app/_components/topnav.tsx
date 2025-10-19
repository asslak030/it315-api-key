"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Gamepad2, Sparkles, Cpu, Zap, Bell } from "lucide-react";

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between bg-[#171d25] border-b border-[#363c44] p-4 text-white font-sans sticky top-0 z-50 backdrop-blur-md">
      {/* Left: Gaming Brand */}
      <div className="flex items-center gap-4">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-[#66c0f4] rounded-full blur-sm opacity-50"></div>
            <Gamepad2 className="h-8 w-8 text-[#66c0f4] relative z-10" />
            <Sparkles className="h-3 w-3 text-[#ffd700] absolute -top-1 -right-1 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-white tracking-wide">
              GAMEVAULT
            </span>
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-400 font-mono">ADMIN PANEL</span>
            </div>
          </div>
        </div>

        {/* Online Status Badge */}
        <div className="hidden md:flex items-center bg-[#363c44] px-3 py-1 rounded-full border border-green-500/30">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400 font-medium">SYSTEM ONLINE</span>
          </div>
        </div>
      </div>

      {/* Right: Auth Section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <SignedIn>
          <button className="relative p-2 rounded-lg hover:bg-[#363c44] text-[#c7d5e0] hover:text-white transition-colors">
            <Bell className="h-5 w-5" />
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-[#66c0f4] rounded-full border-2 border-[#171d25]"></div>
          </button>
        </SignedIn>

        <SignedOut>
          <SignInButton>
            <button className="bg-[#66c0f4] hover:bg-[#5aaae0] text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-[#66c0f4]/20">
              <Zap className="h-4 w-4" />
              <span className="text-sm">SIGN IN</span>
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <div className="flex items-center gap-4">
            {/* User Info */}
            <div className="hidden md:flex items-center gap-3 bg-[#363c44] px-4 py-2 rounded-lg border border-[#46525e]">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-[#66c0f4]" />
                <span className="text-sm text-white font-medium">ADMIN</span>
              </div>
              <div className="h-4 w-px bg-[#46525e]"></div>
              <div className="text-xs text-[#8f98a0]">
                SYSTEM ACCESS
              </div>
            </div>

            {/* User Avatar */}
            <div className="bg-gradient-to-r from-[#66c0f4]/20 to-[#ffd700]/20 p-1 rounded-full border border-[#66c0f4]/40">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-9 w-9 border-2 border-[#66c0f4]",
                    rootBox: "h-9 w-9"
                  },
                }}
              />
            </div>
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}