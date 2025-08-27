"use client";

import { useState } from "react";
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

export default function KeysPage() {
  const sampleApiKey = "museum-access-key-123";
  const { user } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

        {/* User menu at bottom */}
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
        {/* Top Toolbar */}
        <div className="flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="h-6 w-6 text-gray-400 hover:text-yellow-500" />
          </button>
          <h1 className="text-2xl font-bold text-yellow-500">
            Access Keys
          </h1>
        </div>

        {/* Generate Access Key */}
        <Card className="border-gray-700 bg-black text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-lg text-yellow-400">
              Generate Access Key
            </CardTitle>
            <Button
              className="flex items-center gap-2 bg-yellow-500 text-black hover:bg-yellow-400"
            >
              <Plus />
              Create
            </Button>
          </CardHeader>

          <CardContent className="space-y-3">
            <Input
              placeholder="Key name (e.g., Exhibition 2025)"
              className="bg-black border-gray-600 text-white placeholder-gray-400"
            />

            <div className="rounded-md border border-gray-700 p-3 bg-gray-900">
              <p className="text-sm font-medium text-yellow-300">
                Newly generated key (visible once):
              </p>
              <div className="mt-2 flex items-center gap-2">
                <code className="text-sm break-all text-gray-200">
                  {sampleApiKey}
                </code>
                <div className="text-black">
                  <CopyButton value={sampleApiKey} />
                </div>
              </div>
              <p className="text-gray-400 mt-2 text-xs">
                Please store this key securely. It will not be displayed again.
              </p>
            </div>
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
                <TableRow className="border-gray-700">
                  <TableCell>Exhibition Key</TableCell>
                  <TableCell className="font-mono">{sampleApiKey}</TableCell>
                  <TableCell>8/21/2025</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Active</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="sm"
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Revoke
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow className="border-gray-700">
                  <TableCell
                    colSpan={5}
                    className="text-gray-500 text-center text-sm"
                  >
                    No keys available.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Separator className="bg-gray-700" />
        <p className="text-gray-300 text-sm">
          To upload artwork, include the{" "}
          <code className="text-yellow-400">x-access-key</code> header in your request.  
          See the{" "}
          <Link className="underline text-yellow-400" href={"/docs"}>
            guide
          </Link>{" "}
          for details.
        </p>
      </main>
    </div>
  );
}