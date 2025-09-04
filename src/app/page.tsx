"use client";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { 
  Gamepad2, 
  Zap, 
  Shield, 
  Star, 
  Upload, 
  Key,
  Sparkles,
  Play,
  Power,
  Trophy,
  Sword,
  Target
} from "lucide-react";
import { Button } from "~//components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

function RedirectToKeys() {
  const router = useRouter();
  useEffect(() => {
    router.push("/keys");
  }, [router]);
  return null;
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-pink-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-green-400 rounded-full animate-bounce"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZUOnVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDk5LCAyMDIsIDI1NSwgMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')] opacity-30"></div>
      </div>

      <SignedOut>
        {/* Hero Section */}
        <div className="relative z-10 pt-20 pb-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="flex justify-center items-center gap-3 mb-6">
                <Gamepad2 className="w-12 h-12 text-cyan-400" />
                <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  NEXUS
                </h1>
                <Sparkles className="w-12 h-12 text-pink-400" />
              </div>
              <p className="text-2xl text-slate-300 font-light tracking-wide">
                GAMING GALLERY SYSTEM
              </p>
              <div className="flex justify-center gap-2 mt-4">
                <Badge variant="outline" className="border-cyan-400 text-cyan-400 bg-cyan-400/10">
                  <Zap className="w-3 h-3 mr-1" />
                  POWERED BY AI
                </Badge>
                <Badge variant="outline" className="border-purple-400 text-purple-400 bg-purple-400/10">
                  <Shield className="w-3 h-3 mr-1" />
                  SECURE
                </Badge>
                <Badge variant="outline" className="border-pink-400 text-pink-400 bg-pink-400/10">
                  <Star className="w-3 h-3 mr-1" />
                  PREMIUM
                </Badge>
              </div>
            </div>

            {/* Main CTA Card */}
            <div className="flex justify-center mb-16">
              <Card className="group relative w-full max-w-4xl bg-gradient-to-r from-slate-900/80 to-purple-900/80 border border-cyan-400/30 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-700 hover:shadow-cyan-400/20 hover:shadow-2xl cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-transparent to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Animated Border */}
                <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="absolute inset-[2px] bg-gradient-to-r from-slate-900/95 to-purple-900/95 rounded-lg"></div>
                
                <CardContent className="relative z-10 p-12">
                  {/* Default State */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-100 group-hover:opacity-0 transition-all duration-500">
                    <div className="flex items-center gap-4 mb-4">
                      <Power className="w-12 h-12 text-cyan-400 animate-pulse" />
                      <span className="text-4xl font-black text-white tracking-wider">
                        INITIALIZE SESSION
                      </span>
                      <Power className="w-12 h-12 text-pink-400 animate-pulse" />
                    </div>
                    <p className="text-cyan-400 text-lg font-mono">
                      AUTHENTICATION REQUIRED
                    </p>
                  </div>

                  {/* Hover State */}
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <div className="text-center">
                      <h2 className="text-3xl font-black text-white mb-6">
                        🚀 ENTER THE DIGITAL REALM
                      </h2>
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-cyan-400/20">
                            <Upload className="w-6 h-6 text-cyan-400" />
                            <span className="text-white">Upload & Manage Digital Assets</span>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-purple-400/20">
                            <Key className="w-6 h-6 text-purple-400" />
                            <span className="text-white">Personal API Access Keys</span>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-pink-400/20">
                            <Shield className="w-6 h-6 text-pink-400" />
                            <span className="text-white">Quantum-Level Security</span>
                          </div>
                        </div>
                        <div className="text-center">
                          <Button 
                            size="lg" 
                            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105"
                          >
                            <Play className="w-5 h-5 mr-2" />
                            START MISSION
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
{/* Gaming-Themed Art Gallery */}
<div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
  {[
    {
      url: "https://i.pinimg.com/1200x/b2/1d/20/b21d20f5ca7ffd5169404ce0fe983f60.jpg",
      title: "VALORANT",
      artist: "Your callouts are as useful as a smoke grenade in a hurricane. I'll just clutch this 1v5 myself.",
      level: "BOSS TIER",
      rarity: "MYTHIC",
      color: "cyan",
      xp: "2,500 XP"
    },
    {
      url: "https://i.pinimg.com/736x/84/b3/b3/84b3b3b187590abab8d85518e1407b3c.jpg",
      title: "GENSHIN IMPACT",
      artist: "Your main DPS does less damage than my Barbara's splash attack. Maybe reroll your account... and your life.",
      level: "ELITE",
      rarity: "LEGENDARY",
      color: "purple",
      xp: "1,800 XP"
    },
    {
      url: "https://i.pinimg.com/1200x/76/b4/f8/76b4f853af6d62f8ded7a30670c34fce.jpg",
      title: "LEAGUE OF LEGENDS",
      artist: "0/10/2 before 15 minutes? You're not playing a champion, you're playing a resource for the enemy team.",
      level: "CHAMPION",
      rarity: "EPIC",
      color: "pink",
      xp: "3,200 XP"
    },
  ].map((art, index) => (
    <Card
      key={index}
      className="group relative bg-slate-900/50 border border-slate-700 overflow-hidden transition-all duration-500 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-400/10 hover:scale-105"
    >
      {/* Portrait container with proper aspect ratio */}
      <div className="relative w-full pt-[125%] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={art.url}
            alt={art.title}
            className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
            style={{
              imageRendering: 'crisp-edges'
            }}
            loading="lazy"
          />
        </div>
        
        {/* Gaming Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
          <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex items-center gap-2 mb-3">
              <Badge 
                className={`${
                  art.color === 'cyan' ? 'bg-cyan-400/20 border-cyan-400 text-cyan-400' :
                  art.color === 'purple' ? 'bg-purple-400/20 border-purple-400 text-purple-400' :
                  'bg-pink-400/20 border-pink-400 text-pink-400'
                }`}
              >
                {art.rarity}
              </Badge>
              <div className="flex items-center gap-1 bg-slate-800/60 px-2 py-1 rounded-md">
                <Trophy className="w-3 h-3 text-yellow-400" />
                <span className="text-xs text-yellow-400 font-mono">{art.xp}</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 tracking-wide">{art.title}</h3>
            <p className="text-slate-300 mb-3 font-mono text-sm">{art.artist}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sword className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-400 font-mono">{art.level}</span>
              </div>
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4 text-green-400" />
                <span className="text-xs text-green-400 font-mono">ACQUIRED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Gaming HUD Elements */}
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-cyan-400/30">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-white font-mono font-bold">ONLINE</span>
          </div>
        </div>
        
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="bg-slate-900/90 backdrop-blur-sm p-2 rounded-lg border border-cyan-400/30">
            <Star className={`w-5 h-5 ${
              art.color === 'cyan' ? 'text-cyan-400' :
              art.color === 'purple' ? 'text-purple-400' :
              'text-pink-400'
            }`} />
          </div>
        </div>

        {/* Power Level Indicator */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full border border-yellow-400/50">
            <span className="text-xs text-yellow-400 font-mono font-bold">PWR: {1000 + index * 500}</span>
          </div>
        </div>

        {/* Scan Lines Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
          <div className="h-full w-full bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent bg-[length:100%_4px] animate-pulse"></div>
        </div>
      </div>
    </Card>
  ))}
</div>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <RedirectToKeys />
      </SignedIn>
    </main>
  );
}