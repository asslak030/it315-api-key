"use client";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { 
  Gamepad2, 
  Zap, 
  Shield, 
  Database,
  Server,
  Terminal,
  Users,
  BarChart3,
  Play,
  Lock,
  Cloud,
  Cpu,
  Key,
  Upload,
  Eye,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Power,
  Settings,
  Network
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

function RedirectToKeys() { // Changed function name
  const router = useRouter();
  useEffect(() => {
    router.push("/keys"); // Changed from "/dashboard" to "/keys"
  }, [router]);
  return null;
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0f1c] via-[#1a1f2e] to-[#0d1223] relative overflow-hidden font-sans">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] rounded-full blur-3xl animate-pulse opacity-20"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-[#f59e0b] to-[#ec4899] rounded-full blur-3xl animate-pulse delay-1000 opacity-15"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-[#10b981] to-[#3b82f6] rounded-full blur-3xl animate-pulse delay-500 opacity-20"></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-10 w-3 h-3 bg-[#8b5cf6] rounded-full animate-bounce shadow-lg shadow-[#8b5cf6]/40"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-[#f59e0b] rounded-full animate-ping shadow shadow-[#f59e0b]/50"></div>
        <div className="absolute bottom-32 left-1/4 w-4 h-4 bg-[#10b981] rounded-full animate-bounce shadow-lg shadow-[#10b981]/40 delay-300"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-[#ec4899] rounded-full animate-pulse shadow shadow-[#ec4899]/50 delay-700"></div>
        
        {/* Enhanced grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(139,92,246,0.1)_1px,transparent_0)] bg-[length:50px_50px] opacity-30"></div>
        
        {/* Subtle noise texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWx0ZXI9InVybCgjYSkiIG9wYWNpdHk9Ii4wMiIvPjwvc3ZnPg==')]"></div>
      </div>

      <SignedOut>
        <div className="relative z-10">
          {/* Enhanced Header */}
          <div className="border-b border-[#374151] bg-[#111827]/80 backdrop-blur-2xl shadow-2xl">
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Empty space where logo used to be */}
                </div>
                <div className="flex items-center gap-4">
                  {/* Empty space where system online badge used to be */}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Hero Section */}
          <div className="container mx-auto px-6 py-20 text-center">
            <div className="max-w-5xl mx-auto">
              <div className="flex justify-center items-center gap-8 mb-10">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] rounded-full blur-2xl opacity-40 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-[#8b5cf6] via-[#06b6d4] to-[#3b82f6] p-5 rounded-3xl shadow-2xl transform hover:rotate-6 transition-transform duration-500">
                    <Gamepad2 className="w-20 h-20 text-white drop-shadow-2xl" />
                  </div>
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter bg-gradient-to-r from-[#8b5cf6] via-[#06b6d4] to-[#3b82f6] bg-clip-text text-transparent animate-gradient">
                  GAMEVAULT
                </h1>
              </div>
              <p className="text-2xl text-[#d1d5db] font-light tracking-widest mb-10 bg-[#111827]/60 backdrop-blur-xl py-4 px-8 rounded-2xl border border-[#374151]/50 inline-block shadow-lg">
                PROFESSIONAL GAMING ADMINISTRATION PLATFORM
              </p>
              <div className="flex justify-center gap-4 mb-14">
                <Badge className="bg-gradient-to-r from-[#8b5cf6]/30 to-[#06b6d4]/30 text-[#c4b5fd] border-[#8b5cf6]/50 backdrop-blur-xl px-5 py-2.5 shadow-lg">
                  <Zap className="w-4 h-4 mr-2 text-[#fbbf24]" />
                  ENTERPRISE READY
                </Badge>
                <Badge className="bg-gradient-to-r from-[#10b981]/30 to-[#059669]/30 text-[#6ee7b7] border-[#10b981]/50 backdrop-blur-xl px-5 py-2.5 shadow-lg">
                  <Shield className="w-4 h-4 mr-2 text-[#34d399]" />
                  SECURE
                </Badge>
                <Badge className="bg-gradient-to-r from-[#f59e0b]/30 to-[#d97706]/30 text-[#fcd34d] border-[#f59e0b]/50 backdrop-blur-xl px-5 py-2.5 shadow-lg">
                  <Database className="w-4 h-4 mr-2 text-[#fbbf24]" />
                  SCALABLE
                </Badge>
              </div>

              {/* Enhanced Main CTA */}
              <Card className="bg-gradient-to-br from-[#111827]/90 to-[#1f2937]/90 border-[#374151]/50 backdrop-blur-2xl shadow-3xl max-w-4xl mx-auto mb-20 transform hover:scale-[1.02] transition-all duration-500">
                <CardContent className="p-14 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#8b5cf6] via-[#06b6d4] to-[#3b82f6]"></div>
                  <div className="flex items-center justify-center gap-8 mb-10">
                    <div className="p-5 bg-gradient-to-br from-[#8b5cf6]/20 to-[#06b6d4]/20 rounded-3xl border border-[#8b5cf6]/30 backdrop-blur-lg">
                      <Lock className="w-16 h-16 text-[#c4b5fd] drop-shadow-2xl" />
                    </div>
                    <Sparkles className="w-12 h-12 text-[#fbbf24] animate-pulse drop-shadow-lg" />
                    <div className="p-5 bg-gradient-to-br from-[#3b82f6]/20 to-[#06b6d4]/20 rounded-3xl border border-[#3b82f6]/30 backdrop-blur-lg">
                      <Server className="w-16 h-16 text-[#93c5fd] drop-shadow-2xl" />
                    </div>
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-8 bg-gradient-to-r from-white to-[#d1d5db] bg-clip-text text-transparent">
                    Administrative Access Required
                  </h2>
                  <p className="text-xl text-[#d1d5db] mb-10 leading-relaxed max-w-2xl mx-auto">
                    Sign in to access the GameVault administration dashboard and manage your gaming platform with enterprise-grade tools.
                  </p>
                  <SignInButton>
                    <Button size="lg" className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] hover:from-[#7c3aed] hover:to-[#0891b2] text-white px-20 py-7 text-xl shadow-2xl hover:shadow-[#8b5cf6]/40 transform hover:scale-105 transition-all duration-300 border border-[#8b5cf6]/30">
                      <Play className="w-6 h-6 mr-3" />
                      Sign In to Admin Dashboard
                      <ArrowRight className="w-6 h-6 ml-3" />
                    </Button>
                  </SignInButton>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Enhanced Main Content */}
          <div className="container mx-auto px-6 pb-20">
            {/* Enhanced Welcome Section */}
            <div className="max-w-6xl mx-auto text-center mb-20">
              <Card className="bg-gradient-to-br from-[#111827]/90 to-[#1f2937]/90 border-[#374151]/50 backdrop-blur-2xl shadow-3xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4]"></div>
                <CardContent className="p-16">
                  <div className="p-6 bg-gradient-to-br from-[#8b5cf6]/20 to-[#06b6d4]/20 rounded-3xl inline-block mb-8 border border-[#374151]/50 backdrop-blur-lg">
                    <Cpu className="w-16 h-16 text-[#c4b5fd] drop-shadow-2xl" />
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-8 bg-gradient-to-r from-white to-[#d1d5db] bg-clip-text text-transparent">
                    Welcome to GameVault Admin Portal
                  </h2>
                  <p className="text-xl text-[#d1d5db] mb-12 leading-relaxed max-w-4xl mx-auto">
                    GameVault provides enterprise-grade administration tools for managing your gaming platform. 
                    Our secure dashboard offers comprehensive control over your gaming ecosystem while maintaining 
                    the highest standards of security and privacy.
                  </p>
                  <div className="grid md:grid-cols-3 gap-8 mt-14">
                    {[
                      { icon: Shield, title: "Secure Access", description: "Enterprise-grade authentication and authorization", color: "emerald" },
                      { icon: Settings, title: "Full Control", description: "Complete administrative capabilities", color: "blue" },
                      { icon: BarChart3, title: "Real-time Insights", description: "Comprehensive analytics and monitoring", color: "purple" }
                    ].map((item, index) => (
                      <div key={index} className="text-center p-8 bg-gradient-to-br from-[#1f2937] to-[#374151] rounded-2xl border border-[#374151] hover:border-[#8b5cf6] transition-all duration-300 transform hover:-translate-y-2 backdrop-blur-lg">
                        <div className={`p-4 rounded-2xl w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${
                          item.color === 'emerald' ? 'from-[#10b981]/20 to-[#059669]/20 border-[#10b981]/30' :
                          item.color === 'blue' ? 'from-[#3b82f6]/20 to-[#1d4ed8]/20 border-[#3b82f6]/30' :
                          'from-[#8b5cf6]/20 to-[#7c3aed]/20 border-[#8b5cf6]/30'
                        } backdrop-blur-lg`}>
                          <item.icon className={`w-8 h-8 mx-auto ${
                            item.color === 'emerald' ? 'text-[#34d399]' :
                            item.color === 'blue' ? 'text-[#93c5fd]' :
                            'text-[#c4b5fd]'
                          }`} />
                        </div>
                        <h3 className="text-white font-bold text-lg mb-3">{item.title}</h3>
                        <p className="text-[#9ca3af] text-sm leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Features Grid */}
            <div className="max-w-8xl mx-auto mb-20">
              <h2 className="text-4xl font-bold text-white text-center mb-16 bg-gradient-to-r from-white to-[#d1d5db] bg-clip-text text-transparent">
                Administrative Capabilities
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { icon: Key, title: "API Management", description: "Secure token generation and access control", color: "purple" },
                  { icon: Database, title: "Asset Control", description: "Game content and metadata management", color: "emerald" },
                  { icon: Users, title: "User Management", description: "Role-based access and permissions", color: "blue" },
                  { icon: Cloud, title: "Storage Management", description: "Cloud storage configuration", color: "amber" },
                  { icon: Terminal, title: "System Config", description: "Platform settings and configurations", color: "cyan" },
                  { icon: Network, title: "API Gateway", description: "Endpoint management and monitoring", color: "indigo" },
                  { icon: Eye, title: "Monitoring", description: "Real-time system performance", color: "rose" },
                  { icon: Upload, title: "Content Upload", description: "Batch asset processing", color: "orange" }
                ].map((feature, index) => (
                  <Card key={index} className="bg-gradient-to-br from-[#111827] to-[#1f2937] border-[#374151] hover:border-[#8b5cf6] transition-all duration-500 group hover:shadow-2xl hover:shadow-[#8b5cf6]/20 transform hover:-translate-y-2 backdrop-blur-lg">
                    <CardContent className="p-8 text-center relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className={`p-4 rounded-2xl w-16 h-16 mx-auto mb-6 bg-gradient-to-br ${
                        feature.color === 'purple' ? 'from-[#8b5cf6]/20 to-[#7c3aed]/20 border-[#8b5cf6]/30' :
                        feature.color === 'emerald' ? 'from-[#10b981]/20 to-[#059669]/20 border-[#10b981]/30' :
                        feature.color === 'blue' ? 'from-[#3b82f6]/20 to-[#1d4ed8]/20 border-[#3b82f6]/30' :
                        feature.color === 'amber' ? 'from-[#f59e0b]/20 to-[#d97706]/20 border-[#f59e0b]/30' :
                        feature.color === 'cyan' ? 'from-[#06b6d4]/20 to-[#0891b2]/20 border-[#06b6d4]/30' :
                        feature.color === 'indigo' ? 'from-[#6366f1]/20 to-[#4f46e5]/20 border-[#6366f1]/30' :
                        feature.color === 'rose' ? 'from-[#f43f5e]/20 to-[#e11d48]/20 border-[#f43f5e]/30' :
                        'from-[#f97316]/20 to-[#ea580c]/20 border-[#f97316]/30'
                      } backdrop-blur-lg group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className={`w-8 h-8 mx-auto ${
                          feature.color === 'purple' ? 'text-[#c4b5fd]' :
                          feature.color === 'emerald' ? 'text-[#6ee7b7]' :
                          feature.color === 'blue' ? 'text-[#93c5fd]' :
                          feature.color === 'amber' ? 'text-[#fcd34d]' :
                          feature.color === 'cyan' ? 'text-[#67e8f9]' :
                          feature.color === 'indigo' ? 'text-[#a5b4fc]' :
                          feature.color === 'rose' ? 'text-[#fda4af]' :
                          'text-[#fdba74]'
                        }`} />
                      </div>
                      <h3 className="text-white font-bold text-lg mb-3 group-hover:text-[#c4b5fd] transition-colors duration-300">{feature.title}</h3>
                      <p className="text-[#9ca3af] text-sm leading-relaxed">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Enhanced Security Features */}
            <div className="max-w-6xl mx-auto mb-20">
              <Card className="bg-gradient-to-br from-[#111827] to-[#1f2937] border-[#374151] backdrop-blur-2xl shadow-3xl">
                <CardHeader className="text-center pb-8">
                  <div className="p-4 bg-gradient-to-br from-[#10b981]/20 to-[#059669]/20 rounded-2xl w-16 h-16 mx-auto mb-4 border border-[#10b981]/30 backdrop-blur-lg">
                    <Shield className="w-8 h-8 text-[#34d399] mx-auto" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-white bg-gradient-to-r from-white to-[#d1d5db] bg-clip-text text-transparent">
                    Enterprise Security Features
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      {[
                        { title: "Secure Authentication", description: "Multi-factor authentication support" },
                        { title: "Role-Based Access", description: "Granular permission controls" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-4 p-6 bg-gradient-to-br from-[#1f2937] to-[#374151] rounded-2xl border border-[#374151] hover:border-[#10b981] transition-all duration-300 backdrop-blur-lg">
                          <div className="p-3 bg-gradient-to-br from-[#10b981]/20 to-[#059669]/20 rounded-xl border border-[#10b981]/30">
                            <CheckCircle className="w-6 h-6 text-[#34d399]" />
                          </div>
                          <div>
                            <h4 className="text-white font-semibold text-lg mb-2">{item.title}</h4>
                            <p className="text-[#9ca3af] text-sm">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-6">
                      {[
                        { title: "Audit Logging", description: "Comprehensive activity tracking" },
                        { title: "Data Encryption", description: "End-to-end data protection" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-4 p-6 bg-gradient-to-br from-[#1f2937] to-[#374151] rounded-2xl border border-[#374151] hover:border-[#10b981] transition-all duration-300 backdrop-blur-lg">
                          <div className="p-3 bg-gradient-to-br from-[#10b981]/20 to-[#059669]/20 rounded-xl border border-[#10b981]/30">
                            <CheckCircle className="w-6 h-6 text-[#34d399]" />
                          </div>
                          <div>
                            <h4 className="text-white font-semibold text-lg mb-2">{item.title}</h4>
                            <p className="text-[#9ca3af] text-sm">{item.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Final CTA Section */}
            <Card className="bg-gradient-to-br from-[#111827] to-[#1f2937] border-[#374151] backdrop-blur-2xl shadow-3xl max-w-5xl mx-auto transform hover:scale-[1.01] transition-all duration-500">
              <CardContent className="p-16 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#8b5cf6] via-[#06b6d4] to-[#3b82f6]"></div>
                <div className="p-6 bg-gradient-to-br from-[#8b5cf6]/20 to-[#06b6d4]/20 rounded-3xl inline-block mb-8 border border-[#8b5cf6]/30 backdrop-blur-lg">
                  <Lock className="w-16 h-16 text-[#c4b5fd] drop-shadow-2xl" />
                </div>
                <h2 className="text-4xl font-bold text-white mb-8 bg-gradient-to-r from-white to-[#d1d5db] bg-clip-text text-transparent">
                  Ready to Access Your Admin Dashboard?
                </h2>
                <p className="text-xl text-[#d1d5db] mb-10 leading-relaxed max-w-3xl mx-auto">
                  Sign in now to access the complete GameVault administration dashboard. 
                  Manage your gaming platform with enterprise-grade tools and security.
                </p>
                <SignInButton>
                  <Button size="lg" className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] hover:from-[#7c3aed] hover:to-[#0891b2] text-white px-24 py-8 text-xl shadow-2xl hover:shadow-[#8b5cf6]/40 transform hover:scale-105 transition-all duration-300 border border-[#8b5cf6]/30">
                    <Power className="w-6 h-6 mr-3" />
                    Sign In to Admin Dashboard
                    <ArrowRight className="w-6 h-6 ml-3" />
                  </Button>
                </SignInButton>
                <p className="text-[#9ca3af] text-sm mt-6 bg-[#1f2937]/50 backdrop-blur-xl py-3 px-6 rounded-full border border-[#374151]/50 inline-block">
                  Secure authentication required. Authorized personnel only.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <RedirectToKeys /> {/* Updated component name */}
      </SignedIn>
    </main>
  );
}