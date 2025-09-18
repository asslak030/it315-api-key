// app/gallery/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Gamepad2,
  Menu,
  Sparkles,
  ArrowLeft,
  ImageIcon,
  User,
  Calendar,
  Terminal,
  Key,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Badge } from "~/components/ui/badge";

//
// ✅ Universal Fallback Image Component
//
function FallbackImage({
  src,
  alt,
  className,
  avatar = false,
}: {
  src: string;
  alt: string;
  className?: string;
  avatar?: boolean; // small avatar images (no fill)
}) {
  const [imgSrc, setImgSrc] = useState(src);

  if (avatar) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        width={40}
        height={40}
        className={`rounded-full object-cover ${className || ""}`}
        unoptimized
        onError={() => setImgSrc("/placeholder-image.png")}
      />
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className={`object-cover ${className || ""}`}
      unoptimized
      onError={() => setImgSrc("/placeholder-image.png")}
    />
  );
}

//
// ✅ Types
//
interface Upload {
  uploaderName: string;
  user: {
    id: string;
    name: string;
    profileImage: string;
  };
  url: string; // ✅ FIXED (was imageUrl before)
  createdAt: string;
}

interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  uploads: Upload[];
}

interface GalleryResponse {
  error?: any;
  ok: boolean;
  message: string;
  keyId: string;
  users: UserProfile[];
  totalUsers: number;
  totalUploads: number;
}

//
// ✅ Main Page
//
export default function GalleryPage() {
  const [allUsers, setAllUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user: currentUser } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"all" | "single">("all");
  const [singleUser, setSingleUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const storedKey =
      localStorage.getItem("apiKey") || sessionStorage.getItem("apiKey");
    setApiKey(storedKey);

    if (storedKey) {
      fetchAllUsersData(storedKey);
    } else {
      setError("No API key found. Please generate one first.");
      setLoading(false);
    }
  }, []);

  async function fetchAllUsersData(key: string) {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/echo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": key,
        },
        body: JSON.stringify({
          getAllUsers: true,
        }),
      });

      const responseText = await response.text();

      if (!response.ok) {
        console.error("Server response:", responseText);
        throw new Error(
          `Failed to fetch gallery data: ${response.status} ${response.statusText}`
        );
      }

      try {
        const data: GalleryResponse = JSON.parse(responseText);

        if (data.users && Array.isArray(data.users)) {
          setAllUsers(data.users);

          if (currentUser) {
            const currentUserName =
              currentUser.fullName ||
              currentUser.username ||
              currentUser.primaryEmailAddress?.emailAddress;
            const userProfile = data.users.find(
              (u) => u.name.toLowerCase() === currentUserName?.toLowerCase()
            );
            setSingleUser(userProfile || null);
          }
        } else if (data.error) {
          setError(data.error);
        } else {
          setError("No users found");
        }
      } catch (parseError) {
        console.error("JSON parse error:", parseError, "Response:", responseText);
        setError("Invalid response from server");
      }
    } catch (err) {
      console.error("Error fetching gallery data:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load gallery data"
      );
    } finally {
      setLoading(false);
    }
  }

  function normalizeImageUrl(url?: string | null): string {
    if (!url) return "/placeholder-image.png";
    const t = url.trim();
    if (/^data:/i.test(t)) return t;
    if (/^https?:\/\//i.test(t)) return t;
    const path = t.startsWith("/") ? t : "/" + t;
    return `https://ipt315-project.vercel.app${path}`;
  }

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white font-mono items-center justify-center">
        <div className="text-cyan-300 text-xl">Loading gallery data...</div>
      </div>
    );
  }

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
            <Link href={"/keys"}>
              <Button
                variant="outline"
                className="flex items-center gap-2 w-full justify-start border-purple-500/30 bg-gray-800/50 text-purple-300 hover:bg-purple-500/20 hover:text-white transition-all"
              >
                <Key className="h-4 w-4" />
                KEY MANAGEMENT
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
                },
              }}
            />
          </div>
          <span className="text-sm font-medium truncate text-cyan-200">
            {currentUser?.fullName ??
              currentUser?.username ??
              currentUser?.primaryEmailAddress?.emailAddress}
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
          <div className="flex items-center gap-4">
            <Link href="/keys">
              <Button
                variant="outline"
                className="flex items-center gap-2 border-cyan-500/30 text-cyan-300"
              >
                <ArrowLeft className="h-4 w-4" />
                BACK TO KEYS
              </Button>
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              GALLERY ACCESS
            </h1>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-2">
          <Button
            variant={viewMode === "all" ? "default" : "outline"}
            className={
              viewMode === "all"
                ? "bg-cyan-500 text-white"
                : "border-cyan-500/30 text-cyan-300"
            }
            onClick={() => setViewMode("all")}
          >
            <Users className="h-4 w-4 mr-2" />
            ALL USERS
          </Button>
          <Button
            variant={viewMode === "single" ? "default" : "outline"}
            className={
              viewMode === "single"
                ? "bg-purple-500 text-white"
                : "border-purple-500/30 text-purple-300"
            }
            onClick={() => setViewMode("single")}
          >
            <User className="h-4 w-4 mr-2" />
            MY UPLOADS
          </Button>
        </div>

        {error ? (
          <Card className="border-cyan-500/30 bg-gray-900/80 backdrop-blur-md text-white">
            <CardContent className="pt-6 text-center">
              <p className="text-red-400 mb-4">{error}</p>
              <Link href="/keys">
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white">
                  Generate API Key
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : viewMode === "all" ? (
          <>
            {/* All Users Gallery */}
            <div className="space-y-6">
              {allUsers.map((userProfile) => (
                <Card
                  key={userProfile.id}
                  className="border-cyan-500/30 bg-gray-900/80 backdrop-blur-md text-white"
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-cyan-500/20">
                    <div className="flex items-center gap-3">
                      <FallbackImage
                        src={normalizeImageUrl(userProfile.avatar)}
                        alt={`${userProfile.name} avatar`}
                        avatar
                      />
                      <CardTitle className="text-lg text-cyan-300">
                        {userProfile.name}
                      </CardTitle>
                      <Badge className="ml-2 bg-purple-500/20 text-purple-400 border-purple-500/30">
                        {userProfile.uploads.length} UPLOADS
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    {userProfile.uploads.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {userProfile.uploads.map((upload, index) => {
                          const fixedUrl = normalizeImageUrl(upload.url);
                          return (
                            <div
                              key={index}
                              className="rounded-lg border border-cyan-500/20 bg-gray-800/50 p-4"
                            >
                              <div className="relative h-48 w-full mb-3 rounded-md overflow-hidden">
                                <FallbackImage
                                  src={fixedUrl}
                                  alt={`Upload by ${upload.uploaderName}`}
                                />
                              </div>
                              <div className="flex items-center gap-2 text-sm text-cyan-300 mb-1">
                                <User className="h-4 w-4" />
                                <span>{upload.uploaderName}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-cyan-400/70">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  {new Date(upload.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-cyan-400/70 text-center py-4">
                        No uploads found for this user
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : singleUser ? (
          <>
            {/* Single User Uploads Gallery */}
            <Card className="border-cyan-500/30 bg-gray-900/80 backdrop-blur-md text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-cyan-500/20">
                <div className="flex items-center gap-3">
                  <ImageIcon className="h-5 w-5 text-purple-400" />
                  <CardTitle className="text-lg text-purple-300">
                    YOUR UPLOADS ({singleUser.uploads.length})
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                {singleUser.uploads.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {singleUser.uploads.map((upload, index) => {
                      const fixedUrl = normalizeImageUrl(upload.url);
                      return (
                        <div
                          key={index}
                          className="rounded-lg border border-cyan-500/20 bg-gray-800/50 p-4"
                        >
                          <div className="relative h-48 w-full mb-3 rounded-md overflow-hidden">
                            <FallbackImage
                              src={fixedUrl}
                              alt={`Upload by ${upload.uploaderName}`}
                            />
                          </div>
                          <div className="flex items-center gap-2 text-sm text-cyan-300 mb-1">
                            <User className="h-4 w-4" />
                            <span>{upload.uploaderName}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-cyan-400/70">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(upload.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-cyan-400/70 text-center py-8">
                    No uploads found
                  </p>
                )}
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="border-cyan-500/30 bg-gray-900/80 backdrop-blur-md text-white">
            <CardContent className="pt-6 text-center">
              <p className="text-cyan-400/70">No user data available</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
