import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, Server, FilePlus } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Analytics data fetching functions
const fetchPostViews = async () => {
  const { data, error } = await supabase
    .from('analytics_post_views')
    .select('*')
    .order('viewed_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

const fetchSearchTerms = async () => {
  const { data, error } = await supabase
    .from('analytics_search_terms')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const DashboardOverview = () => {
  // Fetch analytics data
  const { data: postViews, isLoading: isLoadingViews } = useQuery({
    queryKey: ['postViews'],
    queryFn: fetchPostViews,
    onError: (error) => {
      toast.error('Failed to fetch post views');
      console.error('Error fetching post views:', error);
    }
  });

  const { data: searchTerms, isLoading: isLoadingSearches } = useQuery({
    queryKey: ['searchTerms'],
    queryFn: fetchSearchTerms,
    onError: (error) => {
      toast.error('Failed to fetch search terms');
      console.error('Error fetching search terms:', error);
    }
  });

  // Process data for charts
  const viewsData = postViews?.reduce((acc: any[], view: any) => {
    const date = new Date(view.viewed_at).toLocaleDateString();
    const existingDate = acc.find(item => item.date === date);
    if (existingDate) {
      existingDate.views += 1;
    } else {
      acc.push({ date, views: 1 });
    }
    return acc;
  }, []) || [];

  const searchData = searchTerms?.reduce((acc: any[], term: any) => {
    const existingTerm = acc.find(item => item.term === term.search_term);
    if (existingTerm) {
      existingTerm.count += 1;
    } else {
      acc.push({ term: term.search_term, count: 1 });
    }
    return acc;
  }, []).sort((a: any, b: any) => b.count - a.count).slice(0, 5) || [];

  return (
    <div className="space-y-6">
      {/* Quick Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{postViews?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              All time post views
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Viewers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(postViews?.map(view => view.viewer_id)).size || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Distinct users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Search Volume</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{searchTerms?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              Total searches
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Results</CardTitle>
            <FilePlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {searchTerms?.length 
                ? Math.round(searchTerms.reduce((acc, term) => acc + (term.results_count || 0), 0) / searchTerms.length)
                : 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Per search
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Views Over Time Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Views Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="views" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Popular Search Terms Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Search Terms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={searchData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ term, count }) => `${term} (${count})`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {searchData.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};