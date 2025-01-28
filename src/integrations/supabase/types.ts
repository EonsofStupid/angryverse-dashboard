export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      analytics_post_views: {
        Row: {
          id: string
          post_id: string | null
          referrer: string | null
          source: string | null
          viewed_at: string | null
          viewer_id: string | null
        }
        Insert: {
          id?: string
          post_id?: string | null
          referrer?: string | null
          source?: string | null
          viewed_at?: string | null
          viewer_id?: string | null
        }
        Update: {
          id?: string
          post_id?: string | null
          referrer?: string | null
          source?: string | null
          viewed_at?: string | null
          viewer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_post_views_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_post_views_viewer_id_fkey"
            columns: ["viewer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics_search_terms: {
        Row: {
          created_at: string | null
          id: string
          results_count: number | null
          search_term: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          results_count?: number | null
          search_term: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          results_count?: number | null
          search_term?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_search_terms_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      auth_security_logs: {
        Row: {
          created_at: string | null
          event_type: string
          id: string
          ip_address: string | null
          metadata: Json | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_type: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_type?: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      auth_sessions: {
        Row: {
          created_at: string | null
          device_id: string | null
          expires_at: string
          id: string
          ip_address: string | null
          last_active: string | null
          refresh_token: string
          remember_me: boolean | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          device_id?: string | null
          expires_at: string
          id?: string
          ip_address?: string | null
          last_active?: string | null
          refresh_token: string
          remember_me?: boolean | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          device_id?: string | null
          expires_at?: string
          id?: string
          ip_address?: string | null
          last_active?: string | null
          refresh_token?: string
          remember_me?: boolean | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          name: string
          parent_id: string | null
          slug: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          name: string
          parent_id?: string | null
          slug: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          name?: string
          parent_id?: string | null
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          author_id: string | null
          content: string
          created_at: string | null
          id: string
          is_approved: boolean | null
          parent_id: string | null
          post_id: string | null
          status: string | null
        }
        Insert: {
          author_id?: string | null
          content: string
          created_at?: string | null
          id?: string
          is_approved?: boolean | null
          parent_id?: string | null
          post_id?: string | null
          status?: string | null
        }
        Update: {
          author_id?: string | null
          content?: string
          created_at?: string | null
          id?: string
          is_approved?: boolean | null
          parent_id?: string | null
          post_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      content_categories: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          name: string
          parent_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          parent_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          parent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_categories_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "content_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      content_mapping_rules: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          mapping_rules: Json
          name: string
          source_platform: string
          target_platform: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          mapping_rules?: Json
          name: string
          source_platform: string
          target_platform: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          mapping_rules?: Json
          name?: string
          source_platform?: string
          target_platform?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_mapping_rules_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      content_tags: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_tags_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      documentation: {
        Row: {
          category: Database["public"]["Enums"]["doc_category"]
          content: Json
          created_at: string | null
          created_by: string | null
          id: string
          is_published: boolean | null
          metadata: Json | null
          slug: string
          title: string
          updated_at: string | null
          version: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["doc_category"]
          content: Json
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_published?: boolean | null
          metadata?: Json | null
          slug: string
          title: string
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["doc_category"]
          content?: Json
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_published?: boolean | null
          metadata?: Json | null
          slug?: string
          title?: string
          updated_at?: string | null
          version?: string | null
        }
        Relationships: []
      }
      documentation_sections: {
        Row: {
          content: Json
          created_at: string | null
          doc_id: string | null
          id: string
          order_index: number
          title: string
          updated_at: string | null
        }
        Insert: {
          content: Json
          created_at?: string | null
          doc_id?: string | null
          id?: string
          order_index: number
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: Json
          created_at?: string | null
          doc_id?: string | null
          id?: string
          order_index?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documentation_sections_doc_id_fkey"
            columns: ["doc_id"]
            isOneToOne: false
            referencedRelation: "documentation"
            referencedColumns: ["id"]
          },
        ]
      }
      media: {
        Row: {
          alt_text: string | null
          category: string | null
          created_at: string | null
          description: string | null
          dimensions: Json | null
          filename: string
          id: string
          metadata: Json | null
          size: number
          tags: string[] | null
          type: string
          uploaded_by: string | null
          url: string
        }
        Insert: {
          alt_text?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          dimensions?: Json | null
          filename: string
          id?: string
          metadata?: Json | null
          size: number
          tags?: string[] | null
          type: string
          uploaded_by?: string | null
          url: string
        }
        Update: {
          alt_text?: string | null
          category?: string | null
          created_at?: string | null
          description?: string | null
          dimensions?: Json | null
          filename?: string
          id?: string
          metadata?: Json | null
          size?: number
          tags?: string[] | null
          type?: string
          uploaded_by?: string | null
          url?: string
        }
        Relationships: []
      }
      page_themes: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          page_path: string
          theme_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          page_path: string
          theme_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          page_path?: string
          theme_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "page_themes_theme_id_fkey"
            columns: ["theme_id"]
            isOneToOne: false
            referencedRelation: "themes"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_posts: {
        Row: {
          created_at: string | null
          engagement_metrics: Json | null
          featured: boolean | null
          id: string
          platform: string
          platform_post_id: string | null
          posted_at: string | null
          social_post_id: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          engagement_metrics?: Json | null
          featured?: boolean | null
          id?: string
          platform: string
          platform_post_id?: string | null
          posted_at?: string | null
          social_post_id?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          engagement_metrics?: Json | null
          featured?: boolean | null
          id?: string
          platform?: string
          platform_post_id?: string | null
          posted_at?: string | null
          social_post_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "platform_posts_social_post_id_fkey"
            columns: ["social_post_id"]
            isOneToOne: false
            referencedRelation: "social_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_revisions: {
        Row: {
          author_id: string | null
          content: string | null
          created_at: string | null
          id: string
          post_id: string | null
          revision_note: string | null
          title: string
        }
        Insert: {
          author_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          post_id?: string | null
          revision_note?: string | null
          title: string
        }
        Update: {
          author_id?: string | null
          content?: string | null
          created_at?: string | null
          id?: string
          post_id?: string | null
          revision_note?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_revisions_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_revisions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          author_id: string | null
          content: string | null
          created_at: string | null
          excerpt: string | null
          featured_image: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          status: string | null
          title: string
          updated_at: string | null
          view_count: number | null
        }
        Insert: {
          author_id?: string | null
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
          view_count?: number | null
        }
        Update: {
          author_id?: string | null
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_featured_image_fkey"
            columns: ["featured_image"]
            isOneToOne: false
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
        ]
      }
      posts_categories: {
        Row: {
          category_id: string
          post_id: string
        }
        Insert: {
          category_id: string
          post_id: string
        }
        Update: {
          category_id?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_categories_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          display_name: string | null
          id: string
          last_active: string | null
          location: string | null
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          display_name?: string | null
          id: string
          last_active?: string | null
          location?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          display_name?: string | null
          id?: string
          last_active?: string | null
          location?: string | null
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      publishing_workflows: {
        Row: {
          approval_required: boolean | null
          approvers: string[] | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          name: string
          steps: Json
          updated_at: string | null
        }
        Insert: {
          approval_required?: boolean | null
          approvers?: string[] | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          steps?: Json
          updated_at?: string | null
        }
        Update: {
          approval_required?: boolean | null
          approvers?: string[] | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          steps?: Json
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "publishing_workflows_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          category: string
          created_at: string | null
          id: string
          setting_key: string
          setting_value: Json | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          setting_key: string
          setting_value?: Json | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          setting_key?: string
          setting_value?: Json | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "site_settings_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      social_connection_templates: {
        Row: {
          config: Json
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          name: string
          platform: string
          updated_at: string | null
        }
        Insert: {
          config?: Json
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          platform: string
          updated_at?: string | null
        }
        Update: {
          config?: Json
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          platform?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "social_connection_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      social_connections: {
        Row: {
          access_token: string | null
          account_type: string | null
          avatar_url: string | null
          connected_at: string | null
          connection_name: string | null
          error_logs: Json | null
          extended_config: Json | null
          id: string
          last_sync_at: string | null
          performance_metrics: Json | null
          platform: string
          platform_user_id: string | null
          platform_username: string | null
          profile_url: string | null
          refresh_token: string | null
          status: string | null
          token_expires_at: string | null
          user_id: string
        }
        Insert: {
          access_token?: string | null
          account_type?: string | null
          avatar_url?: string | null
          connected_at?: string | null
          connection_name?: string | null
          error_logs?: Json | null
          extended_config?: Json | null
          id?: string
          last_sync_at?: string | null
          performance_metrics?: Json | null
          platform: string
          platform_user_id?: string | null
          platform_username?: string | null
          profile_url?: string | null
          refresh_token?: string | null
          status?: string | null
          token_expires_at?: string | null
          user_id: string
        }
        Update: {
          access_token?: string | null
          account_type?: string | null
          avatar_url?: string | null
          connected_at?: string | null
          connection_name?: string | null
          error_logs?: Json | null
          extended_config?: Json | null
          id?: string
          last_sync_at?: string | null
          performance_metrics?: Json | null
          platform?: string
          platform_user_id?: string | null
          platform_username?: string | null
          profile_url?: string | null
          refresh_token?: string | null
          status?: string | null
          token_expires_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "social_connections_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      social_draft_posts: {
        Row: {
          content: string
          created_at: string | null
          created_by: string | null
          id: string
          mapping_rule_id: string | null
          media_urls: string[] | null
          platforms: string[] | null
          schedule_for: string | null
          status: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          mapping_rule_id?: string | null
          media_urls?: string[] | null
          platforms?: string[] | null
          schedule_for?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          mapping_rule_id?: string | null
          media_urls?: string[] | null
          platforms?: string[] | null
          schedule_for?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "social_draft_posts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "social_draft_posts_mapping_rule_id_fkey"
            columns: ["mapping_rule_id"]
            isOneToOne: false
            referencedRelation: "content_mapping_rules"
            referencedColumns: ["id"]
          },
        ]
      }
      social_posts: {
        Row: {
          content: string
          created_at: string | null
          id: string
          media_urls: string[] | null
          scheduled_for: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          media_urls?: string[] | null
          scheduled_for?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          media_urls?: string[] | null
          scheduled_for?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "social_posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      theme_backups: {
        Row: {
          advanced_effects: Json | null
          configuration: Json
          created_at: string | null
          created_by: string | null
          id: string
          notes: string | null
          theme_id: string | null
          version: number
        }
        Insert: {
          advanced_effects?: Json | null
          configuration: Json
          created_at?: string | null
          created_by?: string | null
          id?: string
          notes?: string | null
          theme_id?: string | null
          version: number
        }
        Update: {
          advanced_effects?: Json | null
          configuration?: Json
          created_at?: string | null
          created_by?: string | null
          id?: string
          notes?: string | null
          theme_id?: string | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "theme_backups_theme_id_fkey"
            columns: ["theme_id"]
            isOneToOne: false
            referencedRelation: "themes"
            referencedColumns: ["id"]
          },
        ]
      }
      theme_presets: {
        Row: {
          advanced_effects: Json | null
          category: string | null
          configuration: Json
          created_at: string | null
          created_by: string | null
          description: string | null
          effects_config: Json | null
          effects_details: Json | null
          glass_effects: Json | null
          gray_palette: Json | null
          id: string
          interaction_tokens: Json | null
          motion_tokens: Json | null
          name: string
          special_effect_tokens: Json | null
          updated_at: string | null
        }
        Insert: {
          advanced_effects?: Json | null
          category?: string | null
          configuration: Json
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          effects_config?: Json | null
          effects_details?: Json | null
          glass_effects?: Json | null
          gray_palette?: Json | null
          id?: string
          interaction_tokens?: Json | null
          motion_tokens?: Json | null
          name: string
          special_effect_tokens?: Json | null
          updated_at?: string | null
        }
        Update: {
          advanced_effects?: Json | null
          category?: string | null
          configuration?: Json
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          effects_config?: Json | null
          effects_details?: Json | null
          glass_effects?: Json | null
          gray_palette?: Json | null
          id?: string
          interaction_tokens?: Json | null
          motion_tokens?: Json | null
          name?: string
          special_effect_tokens?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      theme_usage_logs: {
        Row: {
          component_name: string
          created_at: string | null
          effects_used: Json
          id: string
          page_path: string
          theme_id: string | null
          validation_results: Json
        }
        Insert: {
          component_name: string
          created_at?: string | null
          effects_used: Json
          id?: string
          page_path: string
          theme_id?: string | null
          validation_results: Json
        }
        Update: {
          component_name?: string
          created_at?: string | null
          effects_used?: Json
          id?: string
          page_path?: string
          theme_id?: string | null
          validation_results?: Json
        }
        Relationships: [
          {
            foreignKeyName: "theme_usage_logs_theme_id_fkey"
            columns: ["theme_id"]
            isOneToOne: false
            referencedRelation: "themes"
            referencedColumns: ["id"]
          },
        ]
      }
      theme_validation_reports: {
        Row: {
          created_by: string | null
          id: string
          report_date: string | null
          severity_counts: Json
          total_components: number
          total_violations: number
          validation_results: Json
        }
        Insert: {
          created_by?: string | null
          id?: string
          report_date?: string | null
          severity_counts: Json
          total_components: number
          total_violations: number
          validation_results: Json
        }
        Update: {
          created_by?: string | null
          id?: string
          report_date?: string | null
          severity_counts?: Json
          total_components?: number
          total_violations?: number
          validation_results?: Json
        }
        Relationships: []
      }
      theme_validation_rules: {
        Row: {
          created_at: string | null
          created_by: string | null
          error_message: string
          id: string
          is_active: boolean | null
          rule_name: string
          rule_type: string
          severity: Database["public"]["Enums"]["theme_validation_severity"]
          updated_at: string | null
          validation_logic: Json
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          error_message: string
          id?: string
          is_active?: boolean | null
          rule_name: string
          rule_type: string
          severity?: Database["public"]["Enums"]["theme_validation_severity"]
          updated_at?: string | null
          validation_logic: Json
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          error_message?: string
          id?: string
          is_active?: boolean | null
          rule_name?: string
          rule_type?: string
          severity?: Database["public"]["Enums"]["theme_validation_severity"]
          updated_at?: string | null
          validation_logic?: Json
        }
        Relationships: []
      }
      themes: {
        Row: {
          advanced_effects: Json | null
          animation_effects: Json | null
          configuration: Json
          created_at: string | null
          created_by: string | null
          cybernetic_tokens: Json | null
          description: string | null
          effects_config: Json | null
          effects_details: Json | null
          glass_effects_config: Json | null
          gray_palette: Json | null
          id: string
          interaction_effects: Json | null
          interaction_tokens: Json | null
          is_default: boolean | null
          motion_effects: Json | null
          name: string
          neural_tokens: Json | null
          special_effects: Json | null
          status: Database["public"]["Enums"]["theme_status"] | null
          updated_at: string | null
        }
        Insert: {
          advanced_effects?: Json | null
          animation_effects?: Json | null
          configuration?: Json
          created_at?: string | null
          created_by?: string | null
          cybernetic_tokens?: Json | null
          description?: string | null
          effects_config?: Json | null
          effects_details?: Json | null
          glass_effects_config?: Json | null
          gray_palette?: Json | null
          id?: string
          interaction_effects?: Json | null
          interaction_tokens?: Json | null
          is_default?: boolean | null
          motion_effects?: Json | null
          name: string
          neural_tokens?: Json | null
          special_effects?: Json | null
          status?: Database["public"]["Enums"]["theme_status"] | null
          updated_at?: string | null
        }
        Update: {
          advanced_effects?: Json | null
          animation_effects?: Json | null
          configuration?: Json
          created_at?: string | null
          created_by?: string | null
          cybernetic_tokens?: Json | null
          description?: string | null
          effects_config?: Json | null
          effects_details?: Json | null
          glass_effects_config?: Json | null
          gray_palette?: Json | null
          id?: string
          interaction_effects?: Json | null
          interaction_tokens?: Json | null
          is_default?: boolean | null
          motion_effects?: Json | null
          name?: string
          neural_tokens?: Json | null
          special_effects?: Json | null
          status?: Database["public"]["Enums"]["theme_status"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_activity_logs: {
        Row: {
          action_details: Json | null
          action_type: string
          created_at: string | null
          id: string
          processed_at: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          action_details?: Json | null
          action_type: string
          created_at?: string | null
          id?: string
          processed_at?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          action_details?: Json | null
          action_type?: string
          created_at?: string | null
          id?: string
          processed_at?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_activity_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"] | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"] | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"] | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_profile_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_expired_sessions: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_tables: {
        Args: Record<PropertyKey, never>
        Returns: {
          name: string
          schema: string
          is_updatable: boolean
        }[]
      }
      log_auth_event: {
        Args: {
          p_user_id: string
          p_event_type: string
          p_ip_address: string
          p_user_agent: string
          p_metadata?: Json
        }
        Returns: string
      }
    }
    Enums: {
      doc_category: "themes" | "rls" | "authorization"
      theme_status: "active" | "inactive" | "draft"
      theme_validation_severity: "error" | "warning" | "info"
      user_role: "user" | "admin" | "gamer" | "super_admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
