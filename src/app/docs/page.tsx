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
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

const baseUrl =
  typeof window !== "undefined"
    ? window.location.origin
    : "http://localhost:3000";

export default function DocsPage() {
  const [key, setKey] = useState("");
  const [out, setOut] = useState("");
  const [postBody, setPostBody] = useState("Hello, World!");
  const [userData, setUserData] = useState<any>(null);
  const [allUsers, setAllUsers] = useState<any[]>([]); // ✅ NEW state for all profiles
  const [loading, setLoading] = useState(false);
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);

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
      setAllUsers(data.users || []); // ✅ Store all users
    } catch (err: any) {
      setOut(
        JSON.stringify(
          { error: "Fetch failed", details: err.toString() },
          null,
          2
        )
      );
      setUserData(null);
      setAllUsers([]); // clear on error
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
      setAllUsers([]); // ✅ Clear allUsers when running POST
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

  // Keyboard navigation in zoom modal
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6 font-mono">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Top Toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Gamepad2 className="h-8 w-8 text-cyan-400 animate-pulse" />
              <Sparkles className="h-3 w-3 text-pink-400 absolute -top-1 -right-1 animate-ping" />
            </div>
            <h1 className="text-4xl font-bold tracking-wide bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              NEXUS API TERMINAL
            </h1>
          </div>
          <Link href="/keys">
            <Button
              variant="outline"
              className="flex items-center gap-2 border-cyan-500/30 bg-gray-800/50 text-cyan-300 hover:bg-cyan-500/20 hover:text-white transition-all"
              aria-label="Access Control Panel"
            >
              <KeyRound className="h-4 w-4" />
              ACCESS CONTROL
            </Button>
          </Link>
        </div>

        {/* Docs Card */}
        <Card className="border border-cyan-500/30 bg-gray-900/80 backdrop-blur-md text-white shadow-2xl shadow-cyan-500/10">
          <CardHeader className="border-b border-cyan-500/20">
            <div className="flex items-center gap-3">
              <Terminal className="h-6 w-6 text-cyan-400" />
              <CardTitle className="text-xl font-semibold text-cyan-300">
                QUANTUM AUTHENTICATION PROTOCOL
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 text-sm leading-relaxed pt-6">
            {/* ... docs content ... */}
          </CardContent>
        </Card>

        {/* Interactive Tester */}
        <Card className="border border-purple-500/30 bg-gray-900/80 backdrop-blur-md text-white shadow-2xl shadow-purple-500/10">
          <CardHeader className="border-b border-purple-500/20">
            <div className="flex items-center gap-3">
              <Cpu className="h-6 w-6 text-purple-400" />
              <CardTitle className="text-xl font-semibold text-purple-300">
                QUANTUM INTERFACE TERMINAL
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label className="text-cyan-300 font-mono text-sm">
                QUANTUM ACCESS TOKEN
              </Label>
              <Input
                placeholder="Enter security token (sk_...)"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="bg-gray-800/50 border-cyan-500/30 text-cyan-200 placeholder-cyan-400/50 font-mono"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={runGET}
                disabled={loading}
                className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:from-cyan-600 hover:to-cyan-700 transition-all border border-cyan-400/30 flex items-center"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Zap className="h-4 w-4 mr-2" />
                )}
                TEST QUANTUM PING
              </Button>
              <Button
                onClick={runPOST}
                disabled={loading}
                variant="outline"
                className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30 hover:text-white transition-all flex items-center"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Scan className="h-4 w-4 mr-2" />
                )}
                TEST QUANTUM ECHO
              </Button>
            </div>

            <div className="space-y-2">
              <Label className="text-purple-300 font-mono text-sm">
                QUANTUM DATA PAYLOAD (JSON)
              </Label>
              <Textarea
                rows={5}
                value={postBody}
                onChange={(e) => setPostBody(e.target.value)}
                className="bg-gray-800/50 border-purple-500/30 text-purple-200 placeholder-purple-400/50 font-mono"
              />
            </div>

            {/* Quantum Response Feed */}
            <div className="space-y-2">
              <Label className="text-green-300 font-mono text-sm">
                QUANTUM RESPONSE FEED
              </Label>
              <div className="bg-gray-800/50 border border-green-500/30 rounded-md p-3 h-64 overflow-y-auto font-mono text-green-300 text-sm">
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-full gap-2">
                    <Loader2 className="h-6 w-6 animate-spin text-green-400" />
                    <p className="animate-pulse text-green-400">
                      STREAMING DATA...
                    </p>
                  </div>
                ) : (
                  <pre className="whitespace-pre-wrap">{out}</pre>
                )}
              </div>
            </div>

            {/* User Profile + Uploads (single echo user) */}
            {userData && !loading && (
              <div className="mt-6 space-y-4">
                {/* Profile Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={userData.avatar}
                    alt={userData.name}
                    className="w-16 h-16 rounded-full border-2 border-cyan-400 shadow-md"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-cyan-300">
                      {userData.name}
                    </h2>
                    <p className="text-sm text-gray-400">User ID: {userData.id}</p>
                  </div>
                </div>

                {/* Uploaded Images */}
                {userData.uploads && userData.uploads.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-purple-300 mb-3">
                      Uploaded Images
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {userData.uploads.map((upload: any, index: number) => (
                        <div
                          key={upload.id}
                          onClick={() => setZoomIndex(index)}
                          className="cursor-pointer border border-purple-500/30 rounded-lg p-2 bg-gray-800/50 shadow-md hover:scale-105 hover:shadow-purple-500/40 transition-transform duration-300"
                        >
                          <img
                            src={upload.url}
                            alt={upload.name}
                            className="w-full h-40 object-cover rounded-md"
                          />
                          <div className="mt-2 text-xs text-purple-300 font-mono">
                            <p className="truncate">{upload.name}</p>
                            <p className="text-gray-400">
                              {new Date(upload.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Zoom Modal */}
                    {zoomIndex !== null && (
                      <div
                        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
                        onClick={() => setZoomIndex(null)}
                      >
                        <div
                          className="relative max-w-5xl max-h-[90vh] flex flex-col items-center gap-4"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* Close Button */}
                          <button
                            className="absolute -top-12 right-0 text-white hover:text-red-400 transition-colors"
                            onClick={() => setZoomIndex(null)}
                          >
                            <X className="h-8 w-8" />
                          </button>

                          {/* Left Arrow */}
                          {zoomIndex > 0 && (
                            <button
                              className="absolute left-0 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 transition"
                              onClick={() => setZoomIndex(zoomIndex - 1)}
                            >
                              <ChevronLeft className="h-10 w-10" />
                            </button>
                          )}

                          {/* Image */}
                          <img
                            src={userData.uploads[zoomIndex].url}
                            alt={userData.uploads[zoomIndex].name}
                            className="rounded-lg shadow-lg max-h-[70vh] object-contain transition-transform duration-300"
                          />

                          {/* Image Details */}
                          <div className="bg-gray-900/80 text-purple-200 px-4 py-2 rounded-lg text-center max-w-lg">
                            <p className="font-bold text-lg">
                              {userData.uploads[zoomIndex].name}
                            </p>
                            <p className="text-sm text-gray-400">
                              Uploaded:{" "}
                              {new Date(
                                userData.uploads[zoomIndex].createdAt
                              ).toLocaleString()}
                            </p>
                          </div>

                          {/* Right Arrow */}
                          {zoomIndex < userData.uploads.length - 1 && (
                            <button
                              className="absolute right-0 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 transition"
                              onClick={() => setZoomIndex(zoomIndex + 1)}
                            >
                              <ChevronRight className="h-10 w-10" />
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ✅ All Users (from ping) */}
            {allUsers.length > 0 && !loading && (
              <div className="mt-8 space-y-6">
                <h2 className="text-2xl font-bold text-green-300">
                  All User Profiles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allUsers.map((user) => (
                    <Card
                      key={user.id}
                      className="border border-cyan-500/30 bg-gray-800/70 text-white shadow-md hover:shadow-cyan-500/30 transition"
                    >
                      <CardContent className="p-4 flex flex-col items-center">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-20 h-20 rounded-full border-2 border-cyan-400 shadow-md mb-3"
                        />
                        <h3 className="text-lg font-bold text-cyan-300">
                          {user.name}
                        </h3>
                        <p className="text-sm text-gray-400">ID: {user.id}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Status Footer */}
        <div className="flex items-center justify-center gap-4 text-xs text-cyan-400/70 font-mono">
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>SYSTEM ONLINE</span>
          </div>
          <span>•</span>
          <span>QUANTUM API v2.4.7</span>
          <span>•</span>
          <span>NEXUS CORE ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
