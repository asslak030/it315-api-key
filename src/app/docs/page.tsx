"use client";
import { Separator } from "@radix-ui/react-separator";
import {
  KeyRound,
  Terminal,
  Cpu,
  Server,
  Zap,
  Scan,
  Gamepad2,
  Sparkles,
  Loader2,
  X,
  ChevronLeft,
  ChevronRight,
  Menu,
  Package,
  ShoppingCart,
  BarChart3,
  ShoppingBag,
  Shield,
  Cctv,
  CpuIcon,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Badge } from "~/components/ui/badge"; // Added missing import
import { UserButton, useUser } from "@clerk/nextjs";

const baseUrl =
  typeof window !== "undefined"
    ? window.location.origin
    : "http://localhost:3000";

export default function DocsPage() {
  const [key, setKey] = useState("");
  const [out, setOut] = useState("");
  const [postBody, setPostBody] = useState("Hello, World!");
  const [userData, setUserData] = useState<any>(null);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useUser();

  async function runGET() {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/keys/api/ping`, {
        headers: { "x-api-key": key },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setOut(JSON.stringify(data, null, 2));
      setUserData(null);
      setAllUsers(data.users || []);
    } catch (err: any) {
      setOut(
        JSON.stringify(
          { error: "Fetch failed", details: err.toString() },
          null,
          2
        )
      );
      setUserData(null);
      setAllUsers([]);
    } finally {
      setLoading(false);
    }
  }

  async function runPOST() {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/keys/api/echo`, {
        method: "POST",
        headers: { "x-api-key": key, "Content-Type": "application/json" },
        body: JSON.stringify({ postBody }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setOut(JSON.stringify(data, null, 2));
      setUserData(data.user || null);
      setAllUsers([]);
    } catch (err: any) {
      setOut(
        JSON.stringify(
          { error: "Fetch failed", details: err.toString() },
          null,
          2
        )
      );
      setUserData(null);
      setAllUsers([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (zoomIndex === null) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setZoomIndex(null);
      if (e.key === "ArrowLeft")
        setZoomIndex((i) => (i !== null && i > 0 ? i - 1 : i));
      if (e.key === "ArrowRight")
        setZoomIndex((i) =>
          i !== null && userData?.uploads && i < userData.uploads.length - 1
            ? i + 1
            : i
        );
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [zoomIndex, userData]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 to-slate-950 text-white font-sans overflow-hidden">
      {/* Enhanced Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-80 bg-slate-900/95 border-r border-slate-700/50 backdrop-blur-2xl p-8 flex flex-col justify-between transform transition-all duration-500 z-40
          ${sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}`}
      >
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-4 pb-6 border-b border-slate-700/50">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/20 blur-lg rounded-full"></div>
              <Gamepad2 className="h-10 w-10 text-cyan-400 relative z-10" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-widest bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                GAMEVAULT
              </h2>
              <p className="text-xs text-slate-400 font-medium">ADMIN PANEL</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-3">
            <Link href="/games">
              <Button
                variant="outline"
                className="flex items-center gap-3 w-full justify-start border-cyan-500/30 bg-slate-800/50 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 hover:border-cyan-400/50 transition-all duration-300 group py-6"
              >
                <div className="p-2 bg-cyan-500/20 rounded-lg group-hover:bg-cyan-500/30 transition-colors">
                  <Package className="h-5 w-5" />
                </div>
                <span className="font-semibold">Game Management</span>
              </Button>
            </Link>

            <Link href="/orders">
              <Button
                variant="outline"
                className="flex items-center gap-3 w-full justify-start border-emerald-500/30 bg-slate-800/50 text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 hover:border-emerald-400/50 transition-all duration-300 group py-6"
              >
                <div className="p-2 bg-emerald-500/20 rounded-lg group-hover:bg-emerald-500/30 transition-colors">
                  <ShoppingCart className="h-5 w-5" />
                </div>
                <span className="font-semibold">Order Management</span>
              </Button>
            </Link>

            <Link href="/analytics">
              <Button
                variant="outline"
                className="flex items-center gap-3 w-full justify-start border-amber-500/30 bg-slate-800/50 text-amber-400 hover:bg-amber-500/10 hover:text-amber-300 hover:border-amber-400/50 transition-all duration-300 group py-6"
              >
                <div className="p-2 bg-amber-500/20 rounded-lg group-hover:bg-amber-500/30 transition-colors">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <span className="font-semibold">Analytics</span>
              </Button>
            </Link>

            <Link href="/docs">
              <Button
                variant="outline"
                className="flex items-center gap-3 w-full justify-start border-cyan-500/30 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300 hover:border-cyan-400/50 transition-all duration-300 group py-6"
              >
                <div className="p-2 bg-cyan-500/20 rounded-lg group-hover:bg-cyan-500/30 transition-colors">
                  <Terminal className="h-5 w-5" />
                </div>
                <span className="font-semibold">Docs Terminal</span>
              </Button>
            </Link>

            <Link href="/gallery">
              <Button
                variant="outline"
                className="flex items-center gap-3 w-full justify-start border-purple-500/30 bg-slate-800/50 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300 hover:border-purple-400/50 transition-all duration-300 group py-6"
              >
                <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <span className="font-semibold">Game Gallery</span>
              </Button>
            </Link>
          </nav>
        </div>

        {/* User Section */}
        <div className="pt-6 border-t border-slate-700/50">
          <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-2xl border border-slate-700/30">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/20 blur-md rounded-full"></div>
              <UserButton appearance={{
                elements: { 
                  avatarBox: "h-12 w-12 border-2 border-cyan-500/50 relative z-10",
                  rootBox: "relative z-10"
                }
              }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-200 truncate">
                {user?.fullName ?? user?.username ?? user?.primaryEmailAddress?.emailAddress ?? "Francis Rafiola"}
              </p>
              <p className="text-sm text-slate-400">API Developer</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 p-8 space-y-8 transition-all duration-500 ${sidebarOpen ? "ml-80" : "ml-0"}`}
      >
        {/* Enhanced Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-3 rounded-2xl border border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 hover:border-slate-600 transition-all duration-300 group hover:scale-105"
          >
            <Menu className="h-6 w-6 text-cyan-400 group-hover:text-cyan-300" />
          </button>
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <CpuIcon className="h-8 w-8 text-cyan-400 animate-pulse" />
              <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
                GAME VAULT API TERMINAL
              </h1>
              <CpuIcon className="h-8 w-8 text-purple-400 animate-pulse" />
            </div>
            <p className="text-slate-400 mt-2 font-medium">Quantum Authentication Protocol Interface</p>
          </div>
          <Link href="/keys">
            <Button
              variant="outline"
              className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300 h-12 rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
            >
              <KeyRound className="h-4 w-4 mr-2" />
              ACCESS CONTROL
            </Button>
          </Link>
        </div>

        <div className="mx-auto max-w-6xl space-y-8">
          {/* Enhanced Docs Card */}
          <Card className="border-slate-700/50 bg-slate-800/30 backdrop-blur-md shadow-2xl">
            <CardHeader className="pb-4 border-b border-slate-700/50">
              <CardTitle className="text-cyan-400 flex items-center gap-3 text-xl">
                <div className="p-2 bg-cyan-500/20 rounded-xl">
                  <Terminal className="h-5 w-5" />
                </div>
                QUANTUM AUTHENTICATION PROTOCOL
                <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 ml-2 font-semibold">
                  v2.4.7
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-sm leading-relaxed pt-6">
              <div className="space-y-4">
                <p className="text-slate-300">
                  Welcome to the <span className="text-cyan-400 font-bold">Quantum Authentication Protocol</span> interface. 
                  This terminal provides direct access to the GameVault API ecosystem with enhanced security and performance.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3 p-4 bg-slate-700/30 rounded-2xl border border-cyan-500/20">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-cyan-400" />
                      <h3 className="text-cyan-300 font-semibold">GET /api/ping</h3>
                    </div>
                    <p className="text-slate-400 text-sm">
                      Test API connectivity and retrieve system status with quantum validation.
                    </p>
                    <div className="bg-slate-800/50 p-3 rounded-lg border border-cyan-500/10">
                      <code className="text-cyan-300 text-xs font-mono">x-api-key: sk_...</code>
                    </div>
                  </div>
                  
                  <div className="space-y-3 p-4 bg-slate-700/30 rounded-2xl border border-purple-500/20">
                    <div className="flex items-center gap-2">
                      <Scan className="h-4 w-4 text-purple-400" />
                      <h3 className="text-purple-300 font-semibold">POST /api/echo</h3>
                    </div>
                    <p className="text-slate-400 text-sm">
                      Echo payload with user data extraction and quantum processing.
                    </p>
                    <div className="bg-slate-800/50 p-3 rounded-lg border border-purple-500/10">
                      <code className="text-purple-300 text-xs font-mono">{"{ \"postBody\": \"...\" }"}</code>
                    </div>
                  </div>
                </div>

                <Separator className="bg-slate-700/50" />

                <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield className="h-5 w-5 text-cyan-400" />
                    <h4 className="text-cyan-300 font-semibold">SECURITY PROTOCOL</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span>Quantum-grade 256-bit encryption</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span>Real-time threat detection</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span>Multi-factor authentication</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                      <span>Zero-trust architecture</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Interactive Tester */}
          <Card className="border-slate-700/50 bg-slate-800/30 backdrop-blur-md shadow-2xl">
            <CardHeader className="pb-4 border-b border-slate-700/50">
              <CardTitle className="text-purple-400 flex items-center gap-3 text-xl">
                <div className="p-2 bg-purple-500/20 rounded-xl">
                  <Cpu className="h-5 w-5" />
                </div>
                QUANTUM INTERFACE TERMINAL
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 ml-2 font-semibold">
                  LIVE
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {/* API Key Input */}
              <div className="space-y-3">
                <Label className="text-cyan-300 font-semibold text-sm">
                  QUANTUM ACCESS TOKEN
                </Label>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 h-4 w-4" />
                  <Input
                    placeholder="Enter security token (sk_...)"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-cyan-200 placeholder-cyan-400/50 h-12 rounded-2xl pl-12 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 font-mono"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={runGET}
                  disabled={loading}
                  className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:from-cyan-600 hover:to-cyan-700 border border-cyan-400/30 h-12 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Zap className="h-4 w-4" />
                  )}
                  TEST QUANTUM PING
                </Button>
                <Button
                  onClick={runPOST}
                  disabled={loading}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 border border-purple-400/30 h-12 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Scan className="h-4 w-4" />
                  )}
                  TEST QUANTUM ECHO
                </Button>
              </div>

              {/* Data Payload */}
              <div className="space-y-3">
                <Label className="text-purple-300 font-semibold text-sm">
                  QUANTUM DATA PAYLOAD (JSON)
                </Label>
                <Textarea
                  rows={5}
                  value={postBody}
                  onChange={(e) => setPostBody(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-purple-200 placeholder-purple-400/50 rounded-2xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 font-mono resize-none"
                />
              </div>

              {/* Enhanced Response Feed */}
              <div className="space-y-3">
                <Label className="text-emerald-300 font-semibold text-sm">
                  QUANTUM RESPONSE FEED
                </Label>
                <div className="bg-slate-700/50 border border-emerald-500/30 rounded-2xl p-4 h-64 overflow-y-auto font-mono text-sm">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center h-full gap-3">
                      <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
                      <p className="text-emerald-400 font-semibold animate-pulse">
                        STREAMING QUANTUM DATA...
                      </p>
                    </div>
                  ) : (
                    <pre className="text-emerald-300 whitespace-pre-wrap">{out}</pre>
                  )}
                </div>
              </div>

              {/* Enhanced User Profile Display */}
              {userData && !loading && (
                <div className="mt-6 space-y-6 p-6 bg-slate-700/30 rounded-2xl border border-cyan-500/20">
                  {/* Profile Header */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-cyan-500/20 blur-md rounded-full"></div>
                      <img
                        src={userData.avatar}
                        alt={userData.name}
                        className="w-20 h-20 rounded-full border-2 border-cyan-400 relative z-10"
                      />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-cyan-300 bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text">
                        {userData.name}
                      </h2>
                      <p className="text-slate-400 text-sm font-mono">User ID: {userData.id}</p>
                    </div>
                  </div>

                  {/* Uploaded Images */}
                  {userData.uploads && userData.uploads.length > 0 && (
                    <div>
                      <h3 className="text-lg font-bold text-purple-300 mb-4 flex items-center gap-2">
                        <Cctv className="h-5 w-5" />
                        Uploaded Media
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {userData.uploads.map((upload: any, index: number) => (
                          <div
                            key={upload.id}
                            onClick={() => setZoomIndex(index)}
                            className="cursor-pointer border border-purple-500/30 rounded-2xl p-3 bg-slate-800/50 shadow-lg hover:scale-105 hover:shadow-purple-500/40 transition-all duration-300 group"
                          >
                            <div className="relative overflow-hidden rounded-lg mb-2">
                              <img
                                src={upload.url}
                                alt={upload.name}
                                className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="text-xs text-purple-300 font-mono">
                              <p className="truncate font-semibold">{upload.name}</p>
                              <p className="text-slate-400">
                                {new Date(upload.createdAt).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Enhanced Zoom Modal */}
                      {zoomIndex !== null && (
                        <div
                          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 backdrop-blur-sm"
                          onClick={() => setZoomIndex(null)}
                        >
                          <div
                            className="relative max-w-6xl max-h-[90vh] flex flex-col items-center gap-6"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {/* Close Button */}
                            <button
                              className="absolute -top-16 right-0 text-white hover:text-red-400 transition-colors p-2 bg-slate-800/50 rounded-full"
                              onClick={() => setZoomIndex(null)}
                            >
                              <X className="h-6 w-6" />
                            </button>

                            {/* Navigation Arrows */}
                            {zoomIndex > 0 && (
                              <button
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-4 bg-slate-800/50 rounded-full transition-all duration-300 hover:scale-110"
                                onClick={() => setZoomIndex(zoomIndex - 1)}
                              >
                                <ChevronLeft className="h-8 w-8" />
                              </button>
                            )}

                            {/* Image */}
                            <img
                              src={userData.uploads[zoomIndex].url}
                              alt={userData.uploads[zoomIndex].name}
                              className="rounded-2xl shadow-2xl max-h-[70vh] object-contain transition-transform duration-300"
                            />

                            {/* Image Details */}
                            <div className="bg-slate-800/80 text-purple-200 px-6 py-4 rounded-2xl text-center border border-purple-500/30">
                              <p className="font-bold text-lg text-cyan-300">
                                {userData.uploads[zoomIndex].name}
                              </p>
                              <p className="text-sm text-slate-400 mt-1">
                                Uploaded: {new Date(userData.uploads[zoomIndex].createdAt).toLocaleString()}
                              </p>
                            </div>

                            {zoomIndex < userData.uploads.length - 1 && (
                              <button
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-4 bg-slate-800/50 rounded-full transition-all duration-300 hover:scale-110"
                                onClick={() => setZoomIndex(zoomIndex + 1)}
                              >
                                <ChevronRight className="h-8 w-8" />
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Enhanced All Users Display */}
              {allUsers.length > 0 && !loading && (
                <div className="mt-8 space-y-6 p-6 bg-slate-700/30 rounded-2xl border border-emerald-500/20">
                  <h2 className="text-2xl font-black text-emerald-300 bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text">
                    All User Profiles
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allUsers.map((user) => (
                      <Card
                        key={user.id}
                        className="border border-cyan-500/30 bg-slate-800/50 text-white shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105"
                      >
                        <CardContent className="p-4 flex flex-col items-center text-center">
                          <div className="relative mb-3">
                            <div className="absolute inset-0 bg-cyan-500/20 blur-md rounded-full"></div>
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-16 h-16 rounded-full border-2 border-cyan-400 relative z-10"
                            />
                          </div>
                          <h3 className="text-lg font-bold text-cyan-300">
                            {user.name}
                          </h3>
                          <p className="text-slate-400 text-sm font-mono">ID: {user.id}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Enhanced Status Footer */}
          <div className="flex items-center justify-center gap-6 text-sm text-slate-400 font-semibold">
            <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-2xl border border-emerald-500/30">
              <div className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-emerald-400">SYSTEM ONLINE</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-2xl border border-cyan-500/30">
              <Server className="h-3 w-3 text-cyan-400" />
              <span className="text-cyan-400">QUANTUM API v2.4.7</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-2xl border border-purple-500/30">
              <Sparkles className="h-3 w-3 text-purple-400" />
              <span className="text-purple-400">NEXUS CORE ACTIVE</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}