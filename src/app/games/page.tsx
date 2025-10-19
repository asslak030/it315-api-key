// app/games/page.tsx
"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Badge } from "~/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Image as ImageIcon,
  Package,
  Menu,
  ShoppingCart,
  BarChart3,
  Terminal,
  ShoppingBag,
  Gamepad2,
  Upload,
  X,
  Filter,
  Grid3X3,
  List,
  DollarSign,
  Tag,
} from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";

type Game = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
};

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([
    {
      id: "1",
      name: "Cyberpunk 2077",
      description: "Open-world action adventure RPG",
      category: "RPG",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=400&fit=crop"
    },
    {
      id: "2",
      name: "Call of Duty",
      description: "First-person shooter game",
      category: "FPS",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=400&h=400&fit=crop"
    },
    {
      id: "3",
      name: "FIFA 24",
      description: "Football simulation game",
      category: "Sports",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=400&h=400&fit=crop"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { user } = useUser();

  const categories = ["all", ...new Set(games.map(game => game.category))];

  const filteredGames = games.filter(game =>
    (game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === "all" || game.category === selectedCategory)
  );

  const handleDelete = (id: string) => {
    setGames(games.filter(game => game.id !== id));
  };

  const handleSave = (gameData: Omit<Game, "id">) => {
    if (editingGame) {
      setGames(games.map(game => game.id === editingGame.id ? { ...gameData, id: editingGame.id } : game));
      setEditingGame(null);
    } else {
      setGames([...games, { ...gameData, id: Date.now().toString() }]);
      setIsCreating(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white font-sans overflow-hidden">
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
              <h2 className="text-2xl font-black tracking-widest bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
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
                className="flex items-center gap-3 w-full justify-start border-cyan-500/30 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300 hover:border-cyan-400/50 transition-all duration-300 group py-6"
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
                className="flex items-center gap-3 w-full justify-start border-blue-500/30 bg-slate-800/50 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 hover:border-blue-400/50 transition-all duration-300 group py-6"
              >
                <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
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
              <p className="text-sm text-slate-400">Administrator</p>
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
            className="p-3 rounded-2xl border border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 hover:border-slate-600 transition-all duration-300 group"
          >
            <Menu className="h-6 w-6 text-cyan-400 group-hover:text-cyan-300" />
          </button>
          <div className="text-center">
            <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              GAME MANAGEMENT
            </h1>
            <p className="text-slate-400 mt-2">Manage your game library with ease</p>
          </div>
          <div className="w-10"></div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 border-cyan-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-cyan-400 font-semibold">Total Games</p>
                  <p className="text-3xl font-bold text-white mt-2">{games.length}</p>
                </div>
                <div className="p-3 bg-cyan-500/20 rounded-2xl">
                  <Package className="h-6 w-6 text-cyan-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border-emerald-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-emerald-400 font-semibold">Categories</p>
                  <p className="text-3xl font-bold text-white mt-2">{categories.length - 1}</p>
                </div>
                <div className="p-3 bg-emerald-500/20 rounded-2xl">
                  <Tag className="h-6 w-6 text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 border-amber-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-amber-400 font-semibold">Total Value</p>
                  <p className="text-3xl font-bold text-white mt-2">
                    ${games.reduce((sum, game) => sum + game.price, 0).toFixed(2)}
                  </p>
                </div>
                <div className="p-3 bg-amber-500/20 rounded-2xl">
                  <DollarSign className="h-6 w-6 text-amber-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-400 font-semibold">Filtered</p>
                  <p className="text-3xl font-bold text-white mt-2">{filteredGames.length}</p>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-2xl">
                  <Filter className="h-6 w-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Controls Bar */}
        <Card className="border-slate-700/50 bg-slate-800/30 backdrop-blur-md">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
              {/* Search */}
              <div className="flex-1 w-full lg:max-w-md">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Search games by name or category..."
                    className="pl-12 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 h-12 rounded-2xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Filters and View Controls */}
              <div className="flex flex-wrap gap-4 items-center">
                {/* Category Filter */}
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-slate-700/50 border border-slate-600 text-white rounded-2xl px-4 py-2 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>

                {/* View Toggle */}
                <div className="flex bg-slate-700/50 rounded-2xl p-1 border border-slate-600">
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={`rounded-xl ${viewMode === "list" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400 hover:text-white"}`}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={`rounded-xl ${viewMode === "grid" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400 hover:text-white"}`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                </div>

                {/* Add Game Button */}
                <Button
                  onClick={() => setIsCreating(true)}
                  className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-white hover:from-cyan-600 hover:to-emerald-600 h-12 px-6 rounded-2xl font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Game
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Games Display */}
        {viewMode === "list" ? (
          <Card className="border-slate-700/50 bg-slate-800/30 backdrop-blur-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-cyan-400 flex items-center gap-3 text-xl">
                <div className="p-2 bg-cyan-500/20 rounded-xl">
                  <Package className="h-5 w-5" />
                </div>
                Games Library
                <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 ml-2">
                  {filteredGames.length} games
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border border-slate-700/50 rounded-2xl overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-700/20">
                    <TableRow className="border-b border-slate-700/50 hover:bg-transparent">
                      <TableHead className="text-cyan-400 font-semibold py-4">Game</TableHead>
                      <TableHead className="text-cyan-400 font-semibold">Description</TableHead>
                      <TableHead className="text-cyan-400 font-semibold">Category</TableHead>
                      <TableHead className="text-cyan-400 font-semibold">Price</TableHead>
                      <TableHead className="text-cyan-400 font-semibold text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredGames.map((game) => (
                      <TableRow key={game.id} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors">
                        <TableCell className="py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-slate-700 rounded-xl overflow-hidden flex items-center justify-center relative group">
                              {game.image ? (
                                <img 
                                  src={game.image} 
                                  alt={game.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                              ) : (
                                <ImageIcon className="h-6 w-6 text-slate-400" />
                              )}
                            </div>
                            <div>
                              <p className="font-semibold text-white">{game.name}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-300 max-w-xs">
                          <p className="line-clamp-2">{game.description}</p>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 font-medium">
                            {game.category}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-amber-400" />
                            <span className="text-amber-400 font-bold text-lg">{game.price.toFixed(2)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2 justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300 rounded-xl transition-all duration-300"
                              onClick={() => setEditingGame(game)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-500/30 text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-xl transition-all duration-300"
                              onClick={() => handleDelete(game.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
              <Card key={game.id} className="border-slate-700/50 bg-slate-800/30 backdrop-blur-md hover:bg-slate-800/50 transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-2xl">
                    <div className="h-48 bg-gradient-to-br from-slate-700 to-slate-800 relative overflow-hidden">
                      {game.image ? (
                        <img 
                          src={game.image} 
                          alt={game.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="h-12 w-12 text-slate-500" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 backdrop-blur-sm">
                        {game.category}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-1">{game.name}</h3>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-amber-400" />
                        <span className="text-amber-400 font-bold text-lg">{game.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-slate-300 text-sm mb-4 line-clamp-2">{game.description}</p>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300 rounded-xl transition-all duration-300"
                        onClick={() => setEditingGame(game)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-500/30 text-red-400 hover:bg-red-500/20 hover:text-red-300 rounded-xl transition-all duration-300"
                        onClick={() => handleDelete(game.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Enhanced Game Form Modal */}
        {(isCreating || editingGame) && (
          <GameForm
            game={editingGame}
            onSave={handleSave}
            onCancel={() => {
              setIsCreating(false);
              setEditingGame(null);
            }}
          />
        )}
      </main>
    </div>
  );
}

function GameForm({ game, onSave, onCancel }: {
  game: Game | null;
  onSave: (data: Omit<Game, "id">) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    name: game?.name || "",
    description: game?.description || "",
    category: game?.category || "",
    price: game?.price || 0,
    image: game?.image || ""
  });

  const [imagePreview, setImagePreview] = useState(game?.image || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handlePriceChange = (value: string) => {
    const priceValue = value === '' ? 0 : parseFloat(value) || 0;
    setFormData({ ...formData, price: priceValue });
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file (JPEG, PNG, etc.)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Please select an image smaller than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        setFormData({ ...formData, image: base64 });
        setImagePreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please drop an image file (JPEG, PNG, etc.)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Please drop an image smaller than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        setFormData({ ...formData, image: base64 });
        setImagePreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const removeImage = () => {
    setFormData({ ...formData, image: "" });
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <Card className="w-full max-w-4xl border-slate-700/50 bg-slate-900/95 backdrop-blur-xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl">
        <CardHeader className="border-b border-slate-700/50 pb-6">
          <CardTitle className="text-2xl bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent font-black">
            {game ? 'Edit Game' : 'Add New Game'}
          </CardTitle>
          <p className="text-slate-400 mt-2">
            {game ? 'Update the game details' : 'Fill in the details to add a new game to your library'}
          </p>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Form Fields */}
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-semibold text-cyan-400 mb-2 block">Game Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-slate-800/50 border-slate-600 text-white h-12 rounded-2xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                    placeholder="Enter game name"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-semibold text-cyan-400 mb-2 block">Description *</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-slate-800/50 border-slate-600 text-white rounded-2xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 min-h-[120px]"
                    placeholder="Enter game description"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-semibold text-cyan-400 mb-2 block">Category *</label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="bg-slate-800/50 border-slate-600 text-white h-12 rounded-2xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                    placeholder="e.g., RPG, FPS, Sports"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-semibold text-cyan-400 mb-2 block">Price ($) *</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price === 0 ? "" : formData.price}
                      onChange={(e) => handlePriceChange(e.target.value)}
                      className="bg-slate-800/50 border-slate-600 text-white h-12 rounded-2xl pl-12 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Image Upload */}
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-semibold text-cyan-400 mb-2 block">Game Image</label>
                  
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*"
                    className="hidden"
                  />

                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={triggerFileInput}
                    className="border-2 border-dashed border-slate-600 rounded-2xl p-8 bg-slate-800/30 min-h-[300px] flex flex-col items-center justify-center cursor-pointer hover:border-cyan-500/50 hover:bg-slate-800/50 transition-all duration-300 group"
                  >
                    {imagePreview ? (
                      <div className="text-center relative w-full">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="max-w-full max-h-64 mx-auto rounded-xl mb-4 shadow-lg"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage();
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg"
                        >
                          <X className="h-4 w-4 text-white" />
                        </button>
                        <p className="text-sm text-slate-400">Click to change image</p>
                      </div>
                    ) : (
                      <div className="text-center text-slate-400 group-hover:text-slate-300 transition-colors">
                        <div className="p-4 bg-cyan-500/10 rounded-2xl mb-4 group-hover:bg-cyan-500/20 transition-colors">
                          <Upload className="h-12 w-12 mx-auto text-cyan-400" />
                        </div>
                        <p className="text-lg font-semibold mb-2">Upload Game Image</p>
                        <p className="text-sm mb-1">Click to browse or drag and drop</p>
                        <p className="text-xs text-slate-500">
                          Supports: JPG, PNG, WebP (Max 5MB)
                        </p>
                      </div>
                    )}
                  </div>

                  {!imagePreview && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={triggerFileInput}
                      className="w-full mt-4 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 h-12 rounded-2xl font-semibold"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Select Image from Computer
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6 border-t border-slate-700/50">
              <Button 
                type="submit" 
                className="flex-1 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white hover:from-cyan-600 hover:to-emerald-600 h-12 rounded-2xl font-semibold text-lg shadow-lg shadow-cyan-500/25 transition-all duration-300"
                disabled={!formData.name || !formData.description || !formData.category || formData.price <= 0}
              >
                {game ? 'Update Game' : 'Add Game to Library'}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel} 
                className="border-slate-600 text-slate-400 hover:bg-slate-700/50 hover:text-white h-12 rounded-2xl font-semibold px-8"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}