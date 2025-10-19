// app/analytics/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { 
  BarChart3, 
  Menu,
  Package,
  ShoppingCart,
  Terminal,
  ShoppingBag,
  Gamepad2,
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart as CartIcon,
  Target,
  Calendar,
  Filter,
  Download,
  Sparkles
} from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";

const categoryData = [
  { name: 'RPG', value: 35, color: '#10b981', fill: '#10b98140', gradient: 'from-emerald-500 to-emerald-600' },
  { name: 'FPS', value: 25, color: '#3b82f6', fill: '#3b82f640', gradient: 'from-blue-500 to-blue-600' },
  { name: 'Sports', value: 15, color: '#f59e0b', fill: '#f59e0b40', gradient: 'from-amber-500 to-amber-600' },
  { name: 'Strategy', value: 12, color: '#8b5cf6', fill: '#8b5cf640', gradient: 'from-purple-500 to-purple-600' },
  { name: 'Adventure', value: 8, color: '#ef4444', fill: '#ef444440', gradient: 'from-red-500 to-red-600' },
  { name: 'Other', value: 5, color: '#6b7280', fill: '#6b728040', gradient: 'from-gray-500 to-gray-600' }
];

const salesData = [
  { month: 'Jan', sales: 4200, revenue: 28400, users: 1200 },
  { month: 'Feb', sales: 3800, revenue: 23980, users: 1100 },
  { month: 'Mar', sales: 5200, revenue: 39800, users: 1500 },
  { month: 'Apr', sales: 4780, revenue: 35908, users: 1400 },
  { month: 'May', sales: 5890, revenue: 44800, users: 1600 },
  { month: 'Jun', sales: 6390, revenue: 48800, users: 1800 },
  { month: 'Jul', sales: 7490, revenue: 55300, users: 2100 }
];

export default function AnalyticsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [timeRange, setTimeRange] = useState("monthly");
  const { user } = useUser();

  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const avgOrderValue = totalRevenue / totalSales;

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
              <div className="absolute inset-0 bg-amber-500/20 blur-lg rounded-full"></div>
              <Gamepad2 className="h-10 w-10 text-amber-400 relative z-10" />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-widest bg-gradient-to-r from-amber-400 to-purple-400 bg-clip-text text-transparent">
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
                className="flex items-center gap-3 w-full justify-start border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 hover:text-amber-300 hover:border-amber-400/50 transition-all duration-300 group py-6"
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
              <div className="absolute inset-0 bg-amber-500/20 blur-md rounded-full"></div>
              <UserButton appearance={{
                elements: { 
                  avatarBox: "h-12 w-12 border-2 border-amber-500/50 relative z-10",
                  rootBox: "relative z-10"
                }
              }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-200 truncate">
                {user?.fullName ?? user?.username ?? user?.primaryEmailAddress?.emailAddress ?? "Francis Rafiola"}
              </p>
              <p className="text-sm text-slate-400">Analytics Manager</p>
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
            className="p-3 rounded-2xl border border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 hover:border-slate-600 transition-all duration-300 group hover:scale-105"
          >
            <Menu className="h-6 w-6 text-amber-400 group-hover:text-amber-300" />
          </button>
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Sparkles className="h-6 w-6 text-amber-400 animate-pulse" />
              <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-amber-400 via-purple-400 to-amber-400 bg-clip-text text-transparent animate-pulse">
                ANALYTICS DASHBOARD
              </h1>
              <Sparkles className="h-6 w-6 text-purple-400 animate-pulse" />
            </div>
            <p className="text-slate-400 mt-2 font-medium">Comprehensive insights and performance metrics</p>
          </div>
          <div className="w-10"></div>
        </div>

        {/* Enhanced Time Range Filter */}
        <Card className="border-slate-700/50 bg-slate-800/30 backdrop-blur-md shadow-2xl">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-amber-500/20 rounded-xl">
                  <Calendar className="h-5 w-5 text-amber-400" />
                </div>
                <div>
                  <span className="text-slate-300 font-semibold block">Time Range</span>
                  <select 
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="bg-slate-700/50 border border-slate-600 text-white rounded-2xl px-4 py-2 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 mt-1 hover:border-amber-500/30 transition-colors"
                  >
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="border-amber-500/30 text-amber-400 hover:bg-amber-500/20 hover:text-amber-300 h-12 rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter Data
                </Button>
                <Button
                  variant="outline"
                  className="border-purple-500/30 text-purple-400 hover:bg-purple-500/20 hover:text-purple-300 h-12 rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 border-amber-500/20 hover:border-amber-400/50 transition-all duration-300 group hover:scale-105 shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-amber-400 font-semibold mb-2">Total Revenue</p>
                  <p className="text-3xl font-black text-white mt-2 bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text">
                    ${(totalRevenue / 1000).toFixed(1)}K
                  </p>
                  <p className="text-slate-400 text-sm mt-3">All time revenue</p>
                </div>
                <div className="p-3 bg-amber-500/20 rounded-2xl group-hover:bg-amber-500/30 transition-colors">
                  <DollarSign className="h-6 w-6 text-amber-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 group hover:scale-105 shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-400 font-semibold mb-2">Total Sales</p>
                  <p className="text-3xl font-black text-white mt-2 bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text">
                    {totalSales.toLocaleString()}
                  </p>
                  <p className="text-slate-400 text-sm mt-3">Units sold</p>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-2xl group-hover:bg-purple-500/30 transition-colors">
                  <CartIcon className="h-6 w-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20 hover:border-blue-400/50 transition-all duration-300 group hover:scale-105 shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-400 font-semibold mb-2">Active Users</p>
                  <p className="text-3xl font-black text-white mt-2 bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text">
                    {(salesData[salesData.length - 1]?.users ?? 0).toLocaleString()}
                  </p>
                  <p className="text-slate-400 text-sm mt-3">Current month</p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-2xl group-hover:bg-blue-500/30 transition-colors">
                  <Users className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border-emerald-500/20 hover:border-emerald-400/50 transition-all duration-300 group hover:scale-105 shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-emerald-400 font-semibold mb-2">Avg. Order Value</p>
                  <p className="text-3xl font-black text-white mt-2 bg-gradient-to-r from-emerald-400 to-emerald-200 bg-clip-text">
                    ${avgOrderValue.toFixed(2)}
                  </p>
                  <p className="text-slate-400 text-sm mt-3">Per transaction</p>
                </div>
                <div className="p-3 bg-emerald-500/20 rounded-2xl group-hover:bg-emerald-500/30 transition-colors">
                  <Target className="h-6 w-6 text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Enhanced Pie Chart - Categories */}
          <Card className="border-slate-700/50 bg-slate-800/30 backdrop-blur-md shadow-2xl hover:shadow-amber-500/10 transition-all duration-300">
            <CardHeader className="pb-4 border-b border-slate-700/50">
              <CardTitle className="text-amber-400 flex items-center gap-3 text-xl">
                <div className="p-2 bg-amber-500/20 rounded-xl">
                  <BarChart3 className="h-5 w-5" />
                </div>
                Game Categories Distribution
                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 ml-2 font-semibold">
                  Market Share
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }: any) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                      outerRadius={80}
                      innerRadius={40}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: any) => [`${value}%`, 'Market Share']}
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid #475569',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
                      }}
                    />
                    <Legend 
                      layout="vertical"
                      verticalAlign="middle"
                      align="right"
                      wrapperStyle={{ right: -20 }}
                      formatter={(value) => <span className="text-slate-300 text-sm font-medium">{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Bar Chart - Sales Trend */}
          <Card className="border-slate-700/50 bg-slate-800/30 backdrop-blur-md shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
            <CardHeader className="pb-4 border-b border-slate-700/50">
              <CardTitle className="text-purple-400 flex items-center gap-3 text-xl">
                <div className="p-2 bg-purple-500/20 rounded-xl">
                  <TrendingUp className="h-5 w-5" />
                </div>
                Sales & Revenue Trend
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 ml-2 font-semibold">
                  {timeRange.charAt(0).toUpperCase() + timeRange.slice(1)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" vertical={false} />
                    <XAxis 
                      dataKey="month" 
                      stroke="#94a3b8"
                      fontSize={12}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="#94a3b8"
                      fontSize={12}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid #475569',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
                      }}
                      formatter={(value: any, name: any) => {
                        if (name === 'Revenue') return [`$${value.toLocaleString()}`, name];
                        return [value.toLocaleString(), name];
                      }}
                    />
                    <Legend 
                      formatter={(value) => <span className="text-slate-300 text-sm font-medium">{value}</span>}
                    />
                    <Bar 
                      dataKey="sales" 
                      fill="#f59e0b" 
                      name="Units Sold"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar 
                      dataKey="revenue" 
                      fill="#8b5cf6" 
                      name="Revenue"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Category Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryData.map((category) => (
            <Card 
              key={category.name} 
              className="border-slate-700/50 bg-slate-800/30 backdrop-blur-md hover:bg-slate-800/50 transition-all duration-300 group hover:scale-105 shadow-2xl"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-black text-white mb-1 bg-gradient-to-r from-white to-slate-200 bg-clip-text">
                      {category.value}%
                    </div>
                    <p className="text-slate-300 text-sm font-semibold">{category.name}</p>
                    <p className="text-slate-400 text-xs mt-1">Market share</p>
                  </div>
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{ 
                      background: `linear-gradient(135deg, ${category.color}20, ${category.color}10)`,
                      border: `2px solid ${category.color}30`
                    }}
                  >
                    <div 
                      className="w-4 h-4 rounded-full shadow-lg"
                      style={{ backgroundColor: category.color }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}