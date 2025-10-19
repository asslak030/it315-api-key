// app/orders/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { 
  Search, 
  ShoppingCart, 
  Menu,
  Package,
  BarChart3,
  Terminal,
  ShoppingBag,
  Gamepad2,
  Eye,
  DollarSign,
  Calendar,
  User,
  GamepadIcon,
  Package2,
  Edit
} from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";

type Order = {
  id: string;
  username: string;
  gameName: string;
  price: number;
  category: string;
  date: string;
};

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const { user } = useUser();

  const orders: Order[] = [
    {
      id: "ORD-001",
      username: "john_doe",
      gameName: "Cyberpunk 2077",
      price: 59.99,
      category: "RPG",
      date: "2024-01-15"
    },
    {
      id: "ORD-002",
      username: "jane_smith",
      gameName: "Call of Duty",
      price: 69.99,
      category: "FPS",
      date: "2024-01-14"
    },
    {
      id: "ORD-003",
      username: "gamer_pro",
      gameName: "FIFA 24",
      price: 49.99,
      category: "Sports",
      date: "2024-01-13"
    },
    {
      id: "ORD-004",
      username: "alex_wong",
      gameName: "The Witcher 3",
      price: 39.99,
      category: "RPG",
      date: "2024-01-12"
    },
    {
      id: "ORD-005",
      username: "sarah_connor",
      gameName: "Overwatch 2",
      price: 29.99,
      category: "FPS",
      date: "2024-01-11"
    },
    {
      id: "ORD-006",
      username: "mike_tyson",
      gameName: "Elden Ring",
      price: 59.99,
      category: "RPG",
      date: "2024-01-10"
    },
    {
      id: "ORD-007",
      username: "lara_croft",
      gameName: "Tomb Raider",
      price: 29.99,
      category: "Adventure",
      date: "2024-01-09"
    },
    {
      id: "ORD-008",
      username: "peter_parker",
      gameName: "Spider-Man 2",
      price: 69.99,
      category: "Action",
      date: "2024-01-08"
    }
  ];

  const filteredOrders = orders.filter(order =>
    order.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.gameName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = orders.reduce((sum, order) => sum + order.price, 0);
  const totalOrders = orders.length;

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updatedOrder: Order) => {
    // In a real app, you would update the order in your database/state
    console.log("Updated order:", updatedOrder);
    setIsEditModalOpen(false);
    setSelectedOrder(null);
  };

  const handleCloseModals = () => {
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedOrder(null);
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
              <div className="absolute inset-0 bg-emerald-500/20 blur-lg rounded-full"></div>
              <Gamepad2 className="h-10 w-10 text-emerald-400 relative z-10" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-widest bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
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
                className="flex items-center gap-3 w-full justify-start border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 hover:border-emerald-400/50 transition-all duration-300 group py-6"
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
              <div className="absolute inset-0 bg-emerald-500/20 blur-md rounded-full"></div>
              <UserButton appearance={{
                elements: { 
                  avatarBox: "h-12 w-12 border-2 border-emerald-500/50 relative z-10",
                  rootBox: "relative z-10"
                }
              }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-200 truncate">
                {user?.fullName ?? user?.username ?? user?.primaryEmailAddress?.emailAddress ?? "Francis Rafiola"}
              </p>
              <p className="text-sm text-slate-400">Order Manager</p>
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
            <Menu className="h-6 w-6 text-emerald-400 group-hover:text-emerald-300" />
          </button>
          <div className="text-center">
            <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent animate-pulse">
              ORDER MANAGEMENT
            </h1>
            <p className="text-slate-400 mt-2">Track and manage all game orders</p>
          </div>
          <div className="w-10"></div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border-emerald-500/20 hover:border-emerald-400/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-emerald-400 font-semibold">Total Orders</p>
                  <p className="text-3xl font-bold text-white mt-2">{totalOrders}</p>
                </div>
                <div className="p-3 bg-emerald-500/20 rounded-2xl">
                  <ShoppingCart className="h-6 w-6 text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20 hover:border-purple-400/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-400 font-semibold">Total Revenue</p>
                  <p className="text-3xl font-bold text-white mt-2">${totalRevenue.toFixed(2)}</p>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-2xl">
                  <DollarSign className="h-6 w-6 text-purple-400" />
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
                    placeholder="Search orders by user, game, or category..."
                    className="pl-12 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 h-12 rounded-2xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Orders Table */}
        <Card className="border-slate-700/50 bg-slate-800/30 backdrop-blur-md">
          <CardHeader className="pb-4">
            <CardTitle className="text-emerald-400 flex items-center gap-3 text-xl">
              <div className="p-2 bg-emerald-500/20 rounded-xl">
                <ShoppingCart className="h-5 w-5" />
              </div>
              Recent Orders
              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 ml-2">
                {filteredOrders.length} orders
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border border-slate-700/50 rounded-2xl overflow-hidden">
              <Table>
                <TableHeader className="bg-slate-700/20">
                  <TableRow className="border-b border-slate-700/50 hover:bg-transparent">
                    <TableHead className="text-emerald-400 font-semibold py-4">Order ID</TableHead>
                    <TableHead className="text-emerald-400 font-semibold">Customer</TableHead>
                    <TableHead className="text-emerald-400 font-semibold">Game</TableHead>
                    <TableHead className="text-emerald-400 font-semibold">Price</TableHead>
                    <TableHead className="text-emerald-400 font-semibold">Category</TableHead>
                    <TableHead className="text-emerald-400 font-semibold">Date</TableHead>
                    <TableHead className="text-emerald-400 font-semibold text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors group">
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-slate-700/50 rounded-lg">
                            <Package className="h-4 w-4 text-emerald-400" />
                          </div>
                          <span className="font-mono text-emerald-300 font-bold">{order.id}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-500/20 rounded-lg">
                            <User className="h-4 w-4 text-blue-400" />
                          </div>
                          <span className="font-semibold text-white">{order.username}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-500/20 rounded-lg">
                            <GamepadIcon className="h-4 w-4 text-purple-400" />
                          </div>
                          <span className="font-medium text-white">{order.gameName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-amber-400" />
                          <span className="text-amber-400 font-bold text-lg">{order.price.toFixed(2)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 font-medium">
                          {order.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-slate-300">
                          <Calendar className="h-4 w-4 text-slate-400" />
                          {new Date(order.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewOrder(order)}
                            className="border-blue-500/30 text-blue-400 hover:bg-blue-500/20 hover:text-blue-300 rounded-xl transition-all duration-300"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditOrder(order)}
                            className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 rounded-xl transition-all duration-300"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Empty State */}
            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <div className="p-4 bg-slate-700/30 rounded-2xl inline-block mb-4">
                  <Package className="h-12 w-12 text-slate-500" />
                </div>
                <h3 className="text-lg font-semibold text-slate-300 mb-2">No orders found</h3>
                <p className="text-slate-500">Try adjusting your search criteria</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* View Order Modal */}
        {isViewModalOpen && selectedOrder && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <Card className="w-full max-w-md border-slate-700/50 bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl">
              <CardHeader className="border-b border-slate-700/50 pb-6">
                <CardTitle className="text-2xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent font-black">
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-xl">
                    <span className="text-slate-400">Order ID:</span>
                    <span className="font-mono text-blue-400 font-bold">{selectedOrder.id}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-xl">
                    <span className="text-slate-400">Customer:</span>
                    <span className="text-white font-semibold">{selectedOrder.username}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-xl">
                    <span className="text-slate-400">Game:</span>
                    <span className="text-white font-semibold">{selectedOrder.gameName}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-xl">
                    <span className="text-slate-400">Price:</span>
                    <span className="text-amber-400 font-bold text-lg">${selectedOrder.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-xl">
                    <span className="text-slate-400">Category:</span>
                    <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                      {selectedOrder.category}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-xl">
                    <span className="text-slate-400">Date:</span>
                    <span className="text-slate-300">
                      {new Date(selectedOrder.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                <Button 
                  onClick={handleCloseModals}
                  className="w-full mt-6 bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 h-12 rounded-2xl font-semibold"
                >
                  Close
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Edit Order Modal */}
        {isEditModalOpen && selectedOrder && (
          <EditOrderModal
            order={selectedOrder}
            onSave={handleSaveEdit}
            onCancel={handleCloseModals}
          />
        )}
      </main>
    </div>
  );
}

// Edit Order Modal Component
function EditOrderModal({ order, onSave, onCancel }: {
  order: Order;
  onSave: (updatedOrder: Order) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    username: order.username,
    gameName: order.gameName,
    price: order.price,
    category: order.category,
    date: order.date
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...order,
      ...formData
    });
  };

  const handlePriceChange = (value: string) => {
    const priceValue = value === '' ? 0 : parseFloat(value) || 0;
    setFormData({ ...formData, price: priceValue });
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <Card className="w-full max-w-md border-slate-700/50 bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl">
        <CardHeader className="border-b border-slate-700/50 pb-6">
          <CardTitle className="text-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent font-black">
            Edit Order
          </CardTitle>
          <p className="text-slate-400 mt-2">Update order details</p>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-emerald-400 mb-2 block">Customer Username</label>
              <Input
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="bg-slate-800/50 border-slate-600 text-white h-12 rounded-2xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50"
                required
              />
            </div>
            
            <div>
              <label className="text-sm font-semibold text-emerald-400 mb-2 block">Game Name</label>
              <Input
                value={formData.gameName}
                onChange={(e) => setFormData({ ...formData, gameName: e.target.value })}
                className="bg-slate-800/50 border-slate-600 text-white h-12 rounded-2xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50"
                required
              />
            </div>
            
            <div>
              <label className="text-sm font-semibold text-emerald-400 mb-2 block">Price ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price === 0 ? "" : formData.price}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  className="bg-slate-800/50 border-slate-600 text-white h-12 rounded-2xl pl-12 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-emerald-400 mb-2 block">Category</label>
              <Input
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="bg-slate-800/50 border-slate-600 text-white h-12 rounded-2xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50"
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-emerald-400 mb-2 block">Date</label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="bg-slate-800/50 border-slate-600 text-white h-12 rounded-2xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50"
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button 
                type="submit" 
                className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:from-emerald-600 hover:to-cyan-600 h-12 rounded-2xl font-semibold"
              >
                Update Order
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