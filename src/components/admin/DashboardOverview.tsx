import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { QuickStats } from "./dashboard/QuickStats";
import { ViewsChart } from "./dashboard/ViewsChart";
import { SearchTermsChart } from "./dashboard/SearchTermsChart";

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

export const DashboardOverview = () => {
  // Fetch analytics data with proper error handling
  const { data: postViews, isLoading: isLoadingViews } = useQuery({
    queryKey: ['postViews'],
    queryFn: fetchPostViews,
    meta: {
      onError: (error: Error) => {
        toast.error('Failed to fetch post views');
        console.error('Error fetching post views:', error);
      }
    }
  });

  const { data: searchTerms, isLoading: isLoadingSearches } = useQuery({
    queryKey: ['searchTerms'],
    queryFn: fetchSearchTerms,
    meta: {
      onError: (error: Error) => {
        toast.error('Failed to fetch search terms');
        console.error('Error fetching search terms:', error);
      }
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

  const uniqueViewers = new Set(postViews?.map(view => view.viewer_id)).size || 0;
  const avgResults = searchTerms?.length
    ? Math.round(searchTerms.reduce((acc, term) => acc + (term.results_count || 0), 0) / searchTerms.length)
    : 0;

  return (
    <div className="space-y-6">
      <QuickStats
        totalViews={postViews?.length || 0}
        uniqueViewers={uniqueViewers}
        searchVolume={searchTerms?.length || 0}
        averageResults={avgResults}
      />
      <ViewsChart data={viewsData} />
      <SearchTermsChart data={searchData} />
    </div>
  );
};