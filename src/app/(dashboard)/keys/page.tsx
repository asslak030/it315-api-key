"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Gamepad2, Cpu, Server, Key, Menu, Sparkles, Zap, Shield, Terminal, Scan } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import CopyButton from "~/components/copy-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { UserButton, useUser } from "@clerk/nextjs";

type KeyItem = {
  id: string;
  name: string;
  masked: string;
  createdAt: string;
  revoked: boolean;
};

type CreateKeyResponse = {
  key?: string;
  id?: string;
  error?: string;
};

type RevokeResponse = {
  error?: string;
  success?: boolean;
};

export default function KeysPage() {
  const [name, setName] = useState("Quantum Access Token");
  const [justCreated, setJustCreated] = useState<{ key: string; id: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<KeyItem[]>([]);
  const { user } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  async function createKey() {
  setLoading(true);
  try {
    const res = await fetch("/keys/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    // 🔑 Safe JSON parsing
    let data: CreateKeyResponse = {};
    try {
      data = await res.json();
    } catch {
      data = {}; // fallback if response is empty
    }

    if (res.ok && data.key && data.id) {
      setJustCreated({ key: data.key, id: data.id });
    } else {
      alert(data.error ?? "Failed to generate access token");
    }
  } catch (err) {
    console.error("Error creating key:", err);
    alert("System overload - try again");
  } finally {
    setLoading(false);
  }
}


    async function load() {
    try {
      const res = await fetch("/keys/api", { cache: "no-store" });
      const data = await res.json();

      // Defensive: ensure it's always an array
      if (Array.isArray(data)) {
        setItems(data);
      } else if (Array.isArray(data.received)) {
        setItems(data.received);
      } else {
        setItems([]);
      }
    } catch (err) {
      console.error("Error loading keys:", err);
      setItems([]);
    }
  }


  async function revokeKey(id: string) {
    try {
      const res = await fetch(`/keys/api?keyId=${id}`, { method: "DELETE" });
      const data = (await res.json()) as RevokeResponse;
      if (!res.ok) alert(data.error ?? "Deactivation failed");
      await load();
    } catch (err) {
      console.error("Error revoking key:", err);
      alert("Security protocol failure");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white font-mono">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 border-r border-cyan-500/30 bg-gray-900/80 backdrop-blur-md p-6 flex flex-col justify-between transition-transform duration-300 ease-in-out z-40
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Gamepad2 className="h-7 w-7 text-cyan-400 animate-pulse" />
              <Sparkles className="h-3 w-3 text-pink-400 absolute -top-1 -right-1 animate-ping" />
            </div>
            <h2 className="text-xl font-bold tracking-wide bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              NEXUS CONTROL
            </h2>
          </div>
          <nav className="flex flex-col gap-3">
            <Link href={"/docs"}>
              <Button
                variant="outline"
                className="flex items-center gap-2 w-full justify-start border-cyan-500/30 bg-gray-800/50 text-cyan-300 hover:bg-cyan-500/20 hover:text-white transition-all"
              >
                <Terminal className="h-4 w-4" />
                DOCUMENTATION
              </Button>
            </Link>
            <Link href={"/gallery"}>
              <Button
                variant="outline"
                className="flex items-center gap-2 w-full justify-start border-purple-500/30 bg-gray-800/50 text-purple-300 hover:bg-purple-500/20 hover:text-white transition-all"
              >
                <Scan className="h-4 w-4" />
                GALLERY ACCESS
              </Button>
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-cyan-500/30 flex items-center gap-3">
          <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 p-1 rounded-full border border-cyan-400/30">
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8 border-2 border-cyan-400/50",
                }
              }}
            />
          </div>
          <span className="text-sm font-medium truncate text-cyan-200">
            {user?.fullName ?? user?.username ?? user?.primaryEmailAddress?.emailAddress}
          </span>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 p-8 space-y-6 transition-all duration-300 ease-in-out
        ${sidebarOpen ? "ml-64" : "ml-0"}`}
      >
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/10 transition-colors"
          >
            <Menu className="h-6 w-6 text-cyan-400" />
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            ACCESS KEY MANAGEMENT
          </h1>
        </div>

        {/* Generate Key Card */}
        <Card className="border-cyan-500/30 bg-gray-900/80 backdrop-blur-md text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-cyan-500/20">
            <div className="flex items-center gap-3">
              <Key className="h-5 w-5 text-cyan-400" />
              <CardTitle className="text-lg text-cyan-300">
                GENERATE ACCESS TOKEN
              </CardTitle>
            </div>
            <Button
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700 transition-all"
              aria-label="Generate access token"
              onClick={createKey}
              disabled={loading}
            >
              <Zap className="h-4 w-4" />
              {loading ? "GENERATING..." : "GENERATE"}
            </Button>
          </CardHeader>

          <CardContent className="space-y-4 pt-4">
            <div className="relative">
              <Input
                placeholder="Token designation (e.g., Quantum Core)"
                className="bg-gray-800/50 border-cyan-500/30 text-cyan-200 placeholder-cyan-400/50 font-mono"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Server className="h-4 w-4 text-cyan-400/50" />
              </div>
            </div>

            {justCreated ? (
              <div className="rounded-lg border border-cyan-500/30 p-4 bg-gray-800/50 backdrop-blur-md">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-4 w-4 text-green-400" />
                  <p className="text-sm font-medium text-green-300">
                    SECURITY TOKEN GENERATED (ONE-TIME DISPLAY)
                  </p>
                </div>
                <div className="mt-2 flex items-center gap-2 p-3 bg-gray-900/50 rounded border border-cyan-500/20">
                  <code className="text-sm break-all text-cyan-200 font-mono">
                    {justCreated.key ?? "NO TOKEN RETURNED"}
                  </code>
                  <div className="bg-cyan-500/20 rounded p-1.5 text-cyan-300 hover:bg-cyan-500/30 transition-colors">
                    <CopyButton value={justCreated.key} />
                  </div>
                </div>
                <p className="text-cyan-400/70 mt-3 text-xs font-mono">
                  ⚠️ STORE THIS TOKEN IN SECURE QUANTUM MEMORY. IT WILL SELF-DESTRUCT AFTER DISPLAY.
                </p>
                <Button
                  variant="outline"
                  className="mt-3 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/10"
                  onClick={() => {
                    setJustCreated(null);
                    void load();
                  }}
                >
                  ACKNOWLEDGE
                </Button>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {/* API Keys List */}
        <Card className="border-cyan-500/30 bg-gray-900/80 backdrop-blur-md text-white">
          <CardHeader className="pb-4 border-b border-cyan-500/20">
            <div className="flex items-center gap-3">
              <Cpu className="h-5 w-5 text-purple-400" />
              <CardTitle className="text-purple-300">ACTIVE TOKENS</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="pt-4">
            <div className="max-h-96 overflow-y-auto border border-cyan-500/20 rounded-md">
              <Table>
                <TableHeader className="sticky top-0 bg-gray-900 z-10">
                  <TableRow className="border-cyan-500/20 hover:bg-cyan-500/5">
                    <TableHead className="text-cyan-300 font-mono">DESIGNATION</TableHead>
                    <TableHead className="text-cyan-300 font-mono">TOKEN ID</TableHead>
                    <TableHead className="text-cyan-300 font-mono">CREATION TIME</TableHead>
                    <TableHead className="text-cyan-300 font-mono">STATUS</TableHead>
                    <TableHead className="text-cyan-300 font-mono">ACTION</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.length === 0 ? (
                    <TableRow className="border-cyan-500/20 hover:bg-cyan-500/5">
                      <TableCell colSpan={5} className="text-center text-cyan-400/50 font-mono py-8">
                        NO ACTIVE TOKENS DETECTED
                      </TableCell>
                    </TableRow>
                  ) : (
                    items.map((row) => (
                      <TableRow key={row.id} className="border-cyan-500/20 hover:bg-cyan-500/5">
                        <TableCell className="text-cyan-200">{row.name}</TableCell>
                        <TableCell>
                          <code className="text-cyan-400/70 font-mono">{row.masked}</code>
                        </TableCell>
                        <TableCell className="text-cyan-400/70 font-mono">
                          {new Date(row.createdAt).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {row.revoked ? (
                            <Badge variant="outline" className="text-red-400 border-red-500/30 bg-red-500/10">
                              REVOKED
                            </Badge>
                          ) : (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                              ACTIVE
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {!row.revoked && (
                            <Button
                              variant="outline"
                              className="text-white border-red-500/30 bg-red-500/20 hover:bg-red-500/30 hover:text-white"
                              onClick={async () => {
                                await revokeKey(row.id);
                              }}
                            >
                              REVOKE
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}