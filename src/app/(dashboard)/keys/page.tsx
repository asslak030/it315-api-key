"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { BookOpen, Plus, Menu, ImageIcon } from "lucide-react";
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
import { Separator } from "@radix-ui/react-separator";
import { UserButton, useUser } from "@clerk/nextjs";

type KeyItem = {
  id: string;
  name: string;
  masked: string;
  createdAt: string;
  revoked: boolean;
};

export default function KeysPage() {
  const [name, setName] = useState("My API Key");
  const [justCreated, setJustCreated] = useState<{
    key: string;
    id: string;
  } | null>(null);
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
      const data = await res.json();
      console.log("API response:", data); // ✅ DEBUG LOG

      if (res.ok && data.key && data.id) {
        setJustCreated({ key: data.key, id: data.id });
      } else {
        alert(data.error ?? "Failed to create key (missing data)");
      }
    } catch (err) {
      console.error("Error creating key:", err);
      alert("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  async function load() {
    const res = await fetch("/keys/api", { cache: "no-store" });
    const data = await res.json();
    setItems(data ?? []);
  }

  async function revokeKey(id: string) {
    const res = await fetch(`/keys/api?keyId=${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) alert(data.error ?? "Failed to revoke ");
    await load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="flex min-h-screen bg-black text-white font-serif">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 border-r border-gray-800 bg-black p-6 flex flex-col justify-between transition-transform duration-300 ease-in-out z-40
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="space-y-6">
          <h2 className="text-xl font-bold tracking-wide text-yellow-500">
            Art Museum
          </h2>
          <nav className="flex flex-col gap-3">
            <Link href={"/docs"}>
              <Button
                variant="outline"
                className="flex items-center gap-2 w-full justify-start border-gray-600 bg-white text-black hover:bg-gray-200"
              >
                <BookOpen className="h-4 w-4" />
                Guide
              </Button>
            </Link>
            <Link href={"/gallery"}>
              <Button
                variant="outline"
                className="flex items-center gap-2 w-full justify-start border-gray-600 bg-white text-black hover:bg-gray-200"
              >
                <ImageIcon className="h-4 w-4" />
                Gallery
              </Button>
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-gray-800 flex items-center gap-3">
          <UserButton afterSignOutUrl="/" />
          <span className="text-sm font-medium truncate">
            {user?.fullName ??
              user?.username ??
              user?.primaryEmailAddress?.emailAddress}
          </span>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 p-8 space-y-6 transition-all duration-300 ease-in-out
        ${sidebarOpen ? "ml-64" : "ml-0"}`}
      >
        <div className="flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="h-6 w-6 text-gray-400 hover:text-yellow-500" />
          </button>
          <h1 className="text-2xl font-bold text-yellow-500">Access Keys</h1>
        </div>

        {/* Generate Key Card */}
        <Card className="border-gray-700 bg-black text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg text-yellow-400">
              Generate Access Key
            </CardTitle>
            <Button
              className="flex items-center gap-2 bg-yellow-500 text-black hover:bg-yellow-400"
              aria-label="Create API key"
              onClick={createKey}
              disabled={loading}
            >
              <Plus />
              Create
            </Button>
          </CardHeader>

          <CardContent className="space-y-3">
            <Input
              placeholder="Key name (e.g., Exhibition 2025)"
              className="bg-black border-gray-600 text-white placeholder-gray-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {justCreated ? (
              <div className="rounded-md border border-gray-700 p-3 bg-gray-900">
                <p className="text-sm font-medium text-yellow-300">
                  Here is your API key (visible once):
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <code className="text-sm break-all text-gray-200">
                    {justCreated.key ?? "No key returned"}
                  </code>
                  <div className="bg-white rounded p-1">
                    <CopyButton value={justCreated.key} />
                  </div>
                </div>
                <p className="text-gray-400 mt-2 text-xs">
                  Please store this key securely. It will not be displayed
                  again.
                </p>
                <Button
                  size="sm"
                  className="mt-2 bg-gray-700 text-white hover:bg-gray-600"
                  onClick={async () => {
                    setJustCreated(null);
                    await load();
                  }}
                >
                  Close
                </Button>
              </div>
            ) : (
              <p className="text-gray-500 text-sm italic">No key generated yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Keys Table */}
        <Card className="border-gray-700 bg-black text-white">
          <CardHeader>
            <CardTitle className="text-yellow-400">Your Keys</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-yellow-400">Name</TableHead>
                  <TableHead className="text-yellow-400">Key</TableHead>
                  <TableHead className="text-yellow-400">Created</TableHead>
                  <TableHead className="text-yellow-400">Status</TableHead>
                  <TableHead className="text-right text-yellow-400">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((row) => (
                  <TableRow key={row.id} className="border-gray-700">
                    <TableCell>{row.name}</TableCell>
                    <TableCell className="font-mono">{row.masked}</TableCell>
                    <TableCell>
                      {new Date(row.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {row.revoked ? (
                        <Badge variant="secondary">Revoked</Badge>
                      ) : (
                        <Badge>ACTIVE</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="destructive"
                        size="sm"
                        className="bg-red-600 hover:bg-red-700"
                        disabled={row.revoked}
                        onClick={() => revokeKey(row.id)}
                      >
                        Revoke
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {items.length === 0 && (
                  <TableRow className="border-gray-700">
                    <TableCell
                      colSpan={5}
                      className="text-gray-500 text-center text-sm"
                    >
                      No keys available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Separator className="bg-gray-700" />
        <p className="text-gray-300 text-sm">
          To upload artwork, include the{" "}
          <code className="text-yellow-400">x-access-key</code> header in your
          request. See the{" "}
          <Link className="underline text-yellow-400" href={"/docs"}>
            guide
          </Link>{" "}
          for details.
        </p>
      </main>
    </div>
  );
}
