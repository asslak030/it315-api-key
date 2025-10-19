// app/dashboard/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Gamepad2, DollarSign, Calendar, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  // Mock data - replace with actual API calls
  const stats = {
    totalGames: 1247,
    totalSales: 45892,
    dailySales: 2345,
    weeklySales: 16420,
    monthlySales: 45892,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0c10] via-[#1f2833] to-[#0b0c10] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-[#66fcf1] to-[#ffd700] bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Games */}
          <Card className="border-[#66fcf1]/30 bg-[#1f2833]/90 backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#66fcf1]">
                Total Games
              </CardTitle>
              <Gamepad2 className="h-4 w-4 text-[#66fcf1]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalGames}</div>
              <p className="text-xs text-[#c5c6c7]">
                Available in store
              </p>
            </CardContent>
          </Card>

          {/* Total Sales */}
          <Card className="border-[#ffd700]/30 bg-[#1f2833]/90 backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#ffd700]">
                Total Sales
              </CardTitle>
              <DollarSign className="h-4 w-4 text-[#ffd700]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${stats.totalSales.toLocaleString()}</div>
              <p className="text-xs text-[#c5c6c7]">
                All-time revenue
              </p>
            </CardContent>
          </Card>

          {/* Daily Sales */}
          <Card className="border-[#4ecdc4]/30 bg-[#1f2833]/90 backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#4ecdc4]">
                Today's Sales
              </CardTitle>
              <Calendar className="h-4 w-4 text-[#4ecdc4]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${stats.dailySales.toLocaleString()}</div>
              <p className="text-xs text-[#c5c6c7]">
                +12% from yesterday
              </p>
            </CardContent>
          </Card>

          {/* Monthly Sales */}
          <Card className="border-[#ff6b6b]/30 bg-[#1f2833]/90 backdrop-blur-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#ff6b6b]">
                This Month
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-[#ff6b6b]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${stats.monthlySales.toLocaleString()}</div>
              <p className="text-xs text-[#c5c6c7]">
                +23% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-[#45a29e]/30 bg-[#1f2833]/90 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-[#66fcf1]">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex items-center justify-between p-3 bg-[#0b0c10]/50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-white">New game added</p>
                      <p className="text-xs text-[#c5c6c7]">2 hours ago</p>
                    </div>
                    <span className="px-2 py-1 bg-[#45a29e]/20 text-[#66fcf1] text-xs rounded">Game</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#45a29e]/30 bg-[#1f2833]/90 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-[#66fcf1]">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[#c5c6c7]">Weekly Sales</span>
                  <span className="text-white font-semibold">${stats.weeklySales.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#c5c6c7]">Active Users</span>
                  <span className="text-white font-semibold">1,234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#c5c6c7]">New Orders</span>
                  <span className="text-white font-semibold">56</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}