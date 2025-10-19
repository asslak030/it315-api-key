// app/keys/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Gamepad2,
  Cpu,
  Key,
  Menu,
  ShoppingBag,
  Coins,
  Zap,
  Shield,
  Terminal,
  Gift,
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Users,
} from "lucide-react";
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
  const [name, setName] = useState("Vault Token");
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
      const data: CreateKeyResponse = await res.json();
      if (res.ok && data.key && data.id) {
        setJustCreated({ key: data.key, id: data.id });
        localStorage.setItem("apiKey", data.key);
      } else {
        alert(data.error ?? "Token generation failed.");
      }
    } catch {
      alert("System overload — try again!");
    } finally {
      setLoading(false);
    }
  }

  async function load() {
    try {
      const res = await fetch("/keys/api", { cache: "no-store" });
      const data = await res.json();
      if (Array.isArray(data)) setItems(data);
      else if (Array.isArray(data.received)) setItems(data.received);
      else setItems([]);
    } catch {
      setItems([]);
    }
  }

  async function revokeKey(id: string) {
    try {
      const res = await fetch(`/keys/api?keyId=${id}`, { method: "DELETE" });
      const data = (await res.json()) as RevokeResponse;
      if (!res.ok) alert(data.error ?? "Revocation failed.");
      await load();
    } catch {
      alert("Security system error.");
    }
  }

  useEffect(() => {
    void load();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0b0c10] via-[#1f2833] to-[#0b0c10] text-white font-mono overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} user={user} />

      {/* Main */}
      <main
        className={`flex-1 p-8 space-y-8 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-0"}`}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg border border-[#66fcf1]/40 hover:bg-[#45a29e]/10"
          >
            <Menu className="h-6 w-6 text-[#66fcf1]" />
          </button>
          <h1 className="text-3xl font-extrabold tracking-wider bg-gradient-to-r from-[#66fcf1] to-[#ffd700] bg-clip-text text-transparent">
            VAULT TOKEN MANAGEMENT
          </h1>
        </div>

        {/* Rest of your existing content */}
        <Card className="border-[#66fcf1]/30 bg-[#1f2833]/90 backdrop-blur-md shadow-lg">
          <CardHeader className="flex items-center justify-between border-b border-[#45a29e]/30">
            <div className="flex items-center gap-3">
              <Key className="h-5 w-5 text-[#ffd700]" />
              <CardTitle className="text-lg text-[#66fcf1]">Generate GameVault Token</CardTitle>
            </div>
            <Button
              className="flex items-center gap-2 bg-gradient-to-r from-[#66fcf1] to-[#ffd700] text-black hover:from-[#45a29e] hover:to-[#e6c300]"
              onClick={createKey}
              disabled={loading}
            >
              <Zap className="h-4 w-4" />
              {loading ? "Processing..." : "Generate"}
            </Button>
          </CardHeader>

          <CardContent className="pt-4 space-y-4">
            <div className="relative">
              <Input
                placeholder="Token label (e.g. Player Vault Key)"
                className="bg-[#0b0c10]/70 border-[#45a29e]/40 text-[#66fcf1] placeholder-[#45a29e]/50"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Gift className="absolute right-3 top-1/2 -translate-y-1/2 text-[#ffd700]/60" />
            </div>

            {justCreated && (
              <div className="rounded-lg border border-[#ffd700]/30 p-4 bg-[#0b0c10]/60">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-4 w-4 text-[#66fcf1]" />
                  <p className="text-sm text-[#66fcf1] font-semibold">
                    TOKEN GENERATED – ONE-TIME DISPLAY
                  </p>
                </div>
                <div className="mt-2 flex items-center gap-2 p-3 bg-[#1f2833]/70 rounded border border-[#45a29e]/30">
                  <code className="text-sm break-all text-[#ffd700] font-mono">{justCreated.key}</code>
                  <div className="bg-[#66fcf1]/10 rounded p-1 hover:bg-[#66fcf1]/20">
                    <CopyButton value={justCreated.key} />
                  </div>
                </div>
                <p className="text-xs text-[#c5c6c7]/70 mt-3">
                  ⚠️ Keep this secure — it cannot be viewed again.
                </p>
                <Button
                  variant="outline"
                  className="mt-3 border-[#45a29e]/40 text-[#66fcf1] hover:bg-[#45a29e]/20"
                  onClick={() => {
                    setJustCreated(null);
                    void load();
                  }}
                >
                  Acknowledge
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Active Tokens */}
        <Card className="border-[#66fcf1]/30 bg-[#0b0c10]/80 backdrop-blur-md shadow-md">
          <CardHeader className="border-b border-[#45a29e]/30">
            <div className="flex items-center gap-3">
              <Cpu className="h-5 w-5 text-[#ffd700]" />
              <CardTitle className="text-[#66fcf1]">Active Vault Tokens</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="pt-4">
            <div className="max-h-96 overflow-y-auto border border-[#45a29e]/20 rounded-md">
              <Table>
                <TableHeader className="sticky top-0 bg-[#1f2833] z-10">
                  <TableRow>
                    <TableHead className="text-[#66fcf1]">Name</TableHead>
                    <TableHead className="text-[#66fcf1]">Token ID</TableHead>
                    <TableHead className="text-[#66fcf1]">Created</TableHead>
                    <TableHead className="text-[#66fcf1]">Status</TableHead>
                    <TableHead className="text-[#66fcf1]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-[#45a29e]/60 py-8">
                        No tokens available
                      </TableCell>
                    </TableRow>
                  ) : (
                    items.map((row) => (
                      <TableRow key={row.id} className="hover:bg-[#1f2833]/60">
                        <TableCell>{row.name}</TableCell>
                        <TableCell>
                          <code className="text-[#ffd700]">{row.masked}</code>
                        </TableCell>
                        <TableCell>{new Date(row.createdAt).toLocaleString()}</TableCell>
                        <TableCell>
                          {row.revoked ? (
                            <Badge variant="outline" className="text-red-400 border-red-400/30 bg-red-500/10">
                              Revoked
                            </Badge>
                          ) : (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                              Active
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {!row.revoked && (
                            <Button
                              variant="outline"
                              className="border-red-400/30 text-red-400 hover:bg-red-500/20"
                              onClick={() => revokeKey(row.id)}
                            >
                              Revoke
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

// Sidebar Component
function Sidebar({ sidebarOpen, user }: { sidebarOpen: boolean; user: any }) {
  return (
    <aside
      className={`fixed left-0 top-0 h-full w-64 bg-[#0b0c10]/90 border-r border-[#45a29e]/40 backdrop-blur-xl p-6 flex flex-col justify-between transform transition-transform duration-300 z-40
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Gamepad2 className="h-8 w-8 text-[#66fcf1] animate-pulse" />
          </div>
          <h2 className="text-xl font-extrabold tracking-widest bg-gradient-to-r from-[#66fcf1] to-[#ffd700] bg-clip-text text-transparent drop-shadow-[0_0_8px_#45a29e]">
            GAMEVAULT
          </h2>
        </div>

        <nav className="flex flex-col gap-2">
          {/* Dashboard */}
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="flex items-center gap-2 w-full justify-start border-[#66fcf1]/30 bg-[#1f2833]/70 text-[#66fcf1] hover:bg-[#45a29e]/20 hover:text-white"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>

          {/* Game Management */}
          <Link href="/games">
            <Button
              variant="outline"
              className="flex items-center gap-2 w-full justify-start border-[#ff6b6b]/30 bg-[#1f2833]/70 text-[#ff6b6b] hover:bg-[#ff6b6b]/20 hover:text-white"
            >
              <Package className="h-4 w-4" />
              Game Management
            </Button>
          </Link>

          {/* Order Management */}
          <Link href="/orders">
            <Button
              variant="outline"
              className="flex items-center gap-2 w-full justify-start border-[#4ecdc4]/30 bg-[#1f2833]/70 text-[#4ecdc4] hover:bg-[#4ecdc4]/20 hover:text-white"
            >
              <ShoppingCart className="h-4 w-4" />
              Order Management
            </Button>
          </Link>

          {/* Analytics */}
          <Link href="/analytics">
            <Button
              variant="outline"
              className="flex items-center gap-2 w-full justify-start border-[#ffd93d]/30 bg-[#1f2833]/70 text-[#ffd93d] hover:bg-[#ffd93d]/20 hover:text-white"
            >
              <BarChart3 className="h-4 w-4" />
              Analytics
            </Button>
          </Link>

          {/* Existing Links */}
          <Link href="/docs">
            <Button
              variant="outline"
              className="flex items-center gap-2 w-full justify-start border-[#66fcf1]/30 bg-[#1f2833]/70 text-[#66fcf1] hover:bg-[#45a29e]/20 hover:text-white"
            >
              <Terminal className="h-4 w-4" />
              Docs Terminal
            </Button>
          </Link>
          <Link href="/gallery">
            <Button
              variant="outline"
              className="flex items-center gap-2 w-full justify-start border-[#ffd700]/40 bg-[#1f2833]/70 text-[#ffd700] hover:bg-[#ffd700]/20 hover:text-white"
            >
              <ShoppingBag className="h-4 w-4" />
              Game Gallery
            </Button>
          </Link>
        </nav>
      </div>

      <div className="pt-6 border-t border-[#45a29e]/30 flex items-center gap-3">
        <div className="bg-[#1f2833]/70 p-1 rounded-full border border-[#66fcf1]/30">
          <UserButton appearance={{
            elements: { avatarBox: "h-8 w-8 border-2 border-[#45a29e]" }
          }} />
        </div>
        <span className="text-sm truncate text-[#c5c6c7]">
          {user?.fullName ?? user?.username ?? user?.primaryEmailAddress?.emailAddress}
        </span>
      </div>
    </aside>
  );
}