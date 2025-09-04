"use client";
import { Separator } from "@radix-ui/react-separator";
import { KeyRound, Terminal, Cpu, Server, Zap, Scan, Gamepad2, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
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

  async function runGET() {
    const res = await fetch(`${baseUrl}/api/ping`, {
      headers: { "x-api-key": key },
    });
    setOut(JSON.stringify(await res.json(), null, 2));
  }

  async function runPOST() {
    const res = await fetch(`${baseUrl}/api/echo`, {
      method: "POST",
      headers: { "x-api-key": key, "Content-Type": "application/json" },
      body: JSON.stringify({ postBody }),
    });
    setOut(JSON.stringify(await res.json(), null, 2));
  }

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
            <div className="space-y-3">
              <p className="text-cyan-200">
                All quantum requests must include a{" "}
                <code className="rounded bg-cyan-500/20 px-2 py-1 text-cyan-300 border border-cyan-500/30 font-mono">
                  x-api-key
                </code>{" "}
                security header.
              </p>
              <p className="text-purple-200">
                Generate access tokens in the{" "}
                <code className="rounded bg-purple-500/20 px-2 py-1 text-purple-300 border border-purple-500/30 font-mono">
                  /keys
                </code>{" "}
                control panel and store in secure quantum memory.
              </p>
            </div>

            <Separator className="bg-cyan-500/30" />

            {/* Base URL */}
            <div>
              <h3 className="mb-3 font-semibold text-cyan-300 flex items-center gap-2">
                <Server className="h-4 w-4" />
                QUANTUM SERVER NODE
              </h3>
              <pre className="overflow-x-auto rounded-lg bg-gray-800/50 p-4 text-sm text-green-400 border border-green-500/30 font-mono shadow-inner">
                <code>{baseUrl + "/api"}</code>
              </pre>
            </div>

            <Separator className="bg-cyan-500/30" />

            {/* GET Example */}
            <div className="space-y-4">
              <h3 className="font-semibold text-cyan-300 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                GET /api/ping
              </h3>
              <pre className="overflow-x-auto rounded-lg bg-gray-800/50 p-4 text-sm text-green-400 border border-green-500/30 font-mono shadow-inner">
                <code>{`curl -H 'x-api-key: <QUANTUM_TOKEN>' ${baseUrl}/api/ping`}</code>
              </pre>
              <pre className="overflow-x-auto rounded-lg bg-gray-800/50 p-4 text-sm text-green-400 border border-green-500/30 font-mono shadow-inner">
                <code>{`const response = await fetch('${baseUrl}/api/ping', {
  headers: { 'x-api-key': process.env.QUANTUM_KEY! }
});`}</code>
              </pre>
            </div>

            <Separator className="bg-cyan-500/30" />

            {/* POST Example */}
            <div className="space-y-4">
              <h3 className="font-semibold text-cyan-300 flex items-center gap-2">
                <Scan className="h-4 w-4" />
                POST /api/echo
              </h3>
              <pre className="overflow-x-auto rounded-lg bg-gray-800/50 p-4 text-sm text-green-400 border border-green-500/30 font-mono shadow-inner">
                <code>{`curl -X POST \\
  -H 'x-api-key: <QUANTUM_TOKEN>' \\
  -H 'content-type: application/json' \\
  -d '{"message":"quantum data"}' \\
  ${baseUrl}/api/echo`}</code>
              </pre>
              <pre className="overflow-x-auto rounded-lg bg-gray-800/50 p-4 text-sm text-green-400 border border-green-500/30 font-mono shadow-inner">
                <code>{`const response = await fetch('${baseUrl}/api/echo', {
  method: 'POST',
  headers: {
    'x-api-key': process.env.QUANTUM_KEY!,
    'content-type': 'application/json'
  },
  body: JSON.stringify({ data: 'quantum payload' })
});`}</code>
              </pre>
            </div>
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
              <Label className="text-cyan-300 font-mono text-sm">QUANTUM ACCESS TOKEN</Label>
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
                className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:from-cyan-600 hover:to-cyan-700 transition-all border border-cyan-400/30"
              >
                <Zap className="h-4 w-4 mr-2" />
                TEST QUANTUM PING
              </Button>
              <Button 
                onClick={runPOST} 
                variant="outline"
                className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30 hover:text-white transition-all"
              >
                <Scan className="h-4 w-4 mr-2" />
                TEST QUANTUM ECHO
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label className="text-purple-300 font-mono text-sm">QUANTUM DATA PAYLOAD (JSON)</Label>
              <Textarea 
                rows={5}
                value={postBody}
                onChange={(e) => setPostBody(e.target.value)}
                className="bg-gray-800/50 border-purple-500/30 text-purple-200 placeholder-purple-400/50 font-mono"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-green-300 font-mono text-sm">QUANTUM RESPONSE FEED</Label>
              <Textarea 
                rows={10} 
                readOnly 
                value={out} 
                className="bg-gray-800/50 border-green-500/30 text-green-300 font-mono"
              />
            </div>
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