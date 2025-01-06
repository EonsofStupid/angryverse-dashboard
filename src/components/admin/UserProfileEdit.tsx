import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Profile } from "@/types/profile";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface UserProfileEditProps {
  userId: string;
}

interface ProfileFormData {
  username: string;
  email: string;
}

export const UserProfileEdit = ({ userId }: UserProfileEditProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const form = useForm<ProfileFormData>();

  // Redirect if no userId is provided
  useEffect(() => {
    if (!userId) {
      toast.error("No user ID provided");
      navigate("/admin");
    }
  }, [userId, navigate]);

  const { data: profile, isLoading } = useQuery({
    queryKey: ['user-profile', userId],
    queryFn: async () => {
      // Get profile data
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) throw profileError;

      // Get user email
      const { data: { user }, error: userError } = await supabase.auth.admin.getUserById(userId);
      
      if (userError) throw userError;

      return {
        ...profileData,
        email: user?.email
      };
    },
    enabled: !!userId,
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        username: profile.username || '',
        email: profile.email || ''
      });
    }
  }, [profile, form]);

  const updateProfileMutation = useMutation({
    mutationFn: async (data: ProfileFormData) => {
      const updates: Record<string, any> = {};
      const emailUpdates: Record<string, any> = {};

      // Track what changed for email notification
      if (data.username !== profile?.username) {
        updates.username = data.username;
      }
      if (data.email !== profile?.email) {
        emailUpdates.email = data.email;
      }

      // Update profile in database
      if (Object.keys(updates).length > 0) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update(updates)
          .eq('id', userId);

        if (profileError) throw profileError;
      }

      // Update email in auth if changed
      if (Object.keys(emailUpdates).length > 0) {
        const { error: emailError } = await supabase.auth.admin.updateUserById(
          userId,
          emailUpdates
        );

        if (emailError) throw emailError;
      }

      // Send notification email
      if (Object.keys(updates).length > 0 || Object.keys(emailUpdates).length > 0) {
        const { error } = await supabase.functions.invoke('send-profile-update-email', {
          body: {
            userId,
            updates: { ...updates, ...emailUpdates }
          }
        });

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile', userId] });
      toast.success("Profile updated successfully");
    },
    onError: (error) => {
      console.error('Update error:', error);
      toast.error("Failed to update profile");
    }
  });

  const onSubmit = (data: ProfileFormData) => {
    updateProfileMutation.mutate(data);
  };

  if (!userId) return null;

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter username" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="Enter email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit"
              disabled={updateProfileMutation.isPending}
            >
              {updateProfileMutation.isPending ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};