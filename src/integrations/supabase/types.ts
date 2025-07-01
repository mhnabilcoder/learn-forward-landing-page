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
      about_tiles: {
        Row: {
          color_scheme: string
          created_at: string
          description: string
          icon_name: string
          id: string
          order_index: number
          section_tagline: string | null
          section_title: string | null
          title: string
          updated_at: string
        }
        Insert: {
          color_scheme: string
          created_at?: string
          description: string
          icon_name: string
          id?: string
          order_index: number
          section_tagline?: string | null
          section_title?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          color_scheme?: string
          created_at?: string
          description?: string
          icon_name?: string
          id?: string
          order_index?: number
          section_tagline?: string | null
          section_title?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          password_hash: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          password_hash: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          password_hash?: string
          updated_at?: string
        }
        Relationships: []
      }
      advisors: {
        Row: {
          color_scheme: string
          created_at: string
          credentials: string
          description: string
          expertise: string
          has_image: boolean | null
          id: string
          image_url: string | null
          name: string
          order_index: number
          section_tagline: string | null
          section_title: string | null
          updated_at: string
        }
        Insert: {
          color_scheme: string
          created_at?: string
          credentials: string
          description: string
          expertise: string
          has_image?: boolean | null
          id?: string
          image_url?: string | null
          name: string
          order_index: number
          section_tagline?: string | null
          section_title?: string | null
          updated_at?: string
        }
        Update: {
          color_scheme?: string
          created_at?: string
          credentials?: string
          description?: string
          expertise?: string
          has_image?: boolean | null
          id?: string
          image_url?: string | null
          name?: string
          order_index?: number
          section_tagline?: string | null
          section_title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      client_organizations: {
        Row: {
          created_at: string
          id: string
          logo_text: string
          name: string
          order_index: number
          rating: number
          section_tagline: string | null
          section_title: string | null
          testimonial: string
          updated_at: string
          website: string
        }
        Insert: {
          created_at?: string
          id?: string
          logo_text: string
          name: string
          order_index: number
          rating?: number
          section_tagline?: string | null
          section_title?: string | null
          testimonial: string
          updated_at?: string
          website: string
        }
        Update: {
          created_at?: string
          id?: string
          logo_text?: string
          name?: string
          order_index?: number
          rating?: number
          section_tagline?: string | null
          section_title?: string | null
          testimonial?: string
          updated_at?: string
          website?: string
        }
        Relationships: []
      }
      features: {
        Row: {
          color_scheme: string
          created_at: string
          description: string
          icon_name: string
          id: string
          order_index: number
          section_tagline: string | null
          section_title: string | null
          title: string
          updated_at: string
        }
        Insert: {
          color_scheme: string
          created_at?: string
          description: string
          icon_name: string
          id?: string
          order_index: number
          section_tagline?: string | null
          section_title?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          color_scheme?: string
          created_at?: string
          description?: string
          icon_name?: string
          id?: string
          order_index?: number
          section_tagline?: string | null
          section_title?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      footer_settings: {
        Row: {
          access_platform_url: string
          company_description: string
          company_name: string
          created_at: string
          email: string
          facebook_url: string | null
          id: string
          instagram_url: string | null
          linkedin_url: string | null
          platform_links: Json | null
          updated_at: string
          youtube_url: string | null
        }
        Insert: {
          access_platform_url?: string
          company_description?: string
          company_name?: string
          created_at?: string
          email?: string
          facebook_url?: string | null
          id?: string
          instagram_url?: string | null
          linkedin_url?: string | null
          platform_links?: Json | null
          updated_at?: string
          youtube_url?: string | null
        }
        Update: {
          access_platform_url?: string
          company_description?: string
          company_name?: string
          created_at?: string
          email?: string
          facebook_url?: string | null
          id?: string
          instagram_url?: string | null
          linkedin_url?: string | null
          platform_links?: Json | null
          updated_at?: string
          youtube_url?: string | null
        }
        Relationships: []
      }
      founders: {
        Row: {
          avatar_text: string
          created_at: string
          description: string
          has_image: boolean | null
          id: string
          image_url: string | null
          name: string
          order_index: number
          portfolio_url: string | null
          section_tagline: string | null
          section_title: string | null
          title: string
          updated_at: string
        }
        Insert: {
          avatar_text: string
          created_at?: string
          description: string
          has_image?: boolean | null
          id?: string
          image_url?: string | null
          name: string
          order_index: number
          portfolio_url?: string | null
          section_tagline?: string | null
          section_title?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          avatar_text?: string
          created_at?: string
          description?: string
          has_image?: boolean | null
          id?: string
          image_url?: string | null
          name?: string
          order_index?: number
          portfolio_url?: string | null
          section_tagline?: string | null
          section_title?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      general_settings: {
        Row: {
          access_platform_url: string
          created_at: string
          id: string
          meta_description: string
          motto: string
          scroll_text: string
          site_title: string
          tagline: string
          updated_at: string
        }
        Insert: {
          access_platform_url?: string
          created_at?: string
          id?: string
          meta_description?: string
          motto?: string
          scroll_text?: string
          site_title?: string
          tagline?: string
          updated_at?: string
        }
        Update: {
          access_platform_url?: string
          created_at?: string
          id?: string
          meta_description?: string
          motto?: string
          scroll_text?: string
          site_title?: string
          tagline?: string
          updated_at?: string
        }
        Relationships: []
      }
      hero_content: {
        Row: {
          brand_name: string
          created_at: string
          description: string
          id: string
          primary_button_text: string
          primary_button_url: string | null
          secondary_button_text: string
          secondary_button_url: string | null
          stat1_label: string
          stat1_number: string
          stat2_label: string
          stat2_number: string
          stat3_label: string
          stat3_number: string
          subtitle: string
          title: string
          updated_at: string
        }
        Insert: {
          brand_name?: string
          created_at?: string
          description: string
          id?: string
          primary_button_text: string
          primary_button_url?: string | null
          secondary_button_text: string
          secondary_button_url?: string | null
          stat1_label: string
          stat1_number: string
          stat2_label: string
          stat2_number: string
          stat3_label: string
          stat3_number: string
          subtitle: string
          title: string
          updated_at?: string
        }
        Update: {
          brand_name?: string
          created_at?: string
          description?: string
          id?: string
          primary_button_text?: string
          primary_button_url?: string | null
          secondary_button_text?: string
          secondary_button_url?: string | null
          stat1_label?: string
          stat1_number?: string
          stat2_label?: string
          stat2_number?: string
          stat3_label?: string
          stat3_number?: string
          subtitle?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      supporting_organizations: {
        Row: {
          created_at: string
          id: string
          logo_text: string
          name: string
          order_index: number
          section_tagline: string | null
          section_title: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          logo_text: string
          name: string
          order_index: number
          section_tagline?: string | null
          section_title?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          logo_text?: string
          name?: string
          order_index?: number
          section_tagline?: string | null
          section_title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          avatar_text: string
          comment: string
          created_at: string
          id: string
          name: string
          order_index: number
          rating: number
          role: string
          section_tagline: string | null
          section_title: string | null
          updated_at: string
        }
        Insert: {
          avatar_text: string
          comment: string
          created_at?: string
          id?: string
          name: string
          order_index: number
          rating?: number
          role: string
          section_tagline?: string | null
          section_title?: string | null
          updated_at?: string
        }
        Update: {
          avatar_text?: string
          comment?: string
          created_at?: string
          id?: string
          name?: string
          order_index?: number
          rating?: number
          role?: string
          section_tagline?: string | null
          section_title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      vision_mission: {
        Row: {
          created_at: string
          id: string
          mission_content: string
          mission_title: string
          updated_at: string
          vision_content: string
          vision_title: string
          what_sets_us_apart_content: string
          what_sets_us_apart_title: string
        }
        Insert: {
          created_at?: string
          id?: string
          mission_content?: string
          mission_title?: string
          updated_at?: string
          vision_content?: string
          vision_title?: string
          what_sets_us_apart_content?: string
          what_sets_us_apart_title?: string
        }
        Update: {
          created_at?: string
          id?: string
          mission_content?: string
          mission_title?: string
          updated_at?: string
          vision_content?: string
          vision_title?: string
          what_sets_us_apart_content?: string
          what_sets_us_apart_title?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
