export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      athletes: {
        Row: {
          avatar_url: string | null
          created_at: string
          date_of_birth: string | null
          first_name: string
          gender: Database["public"]["Enums"]["Gender"]
          grade: Database["public"]["Enums"]["Grade"]
          hometown: string | null
          id: number
          last_name: string
          ncaa_player_id: number | null
          popularity_score: number
          school_id: number | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          date_of_birth?: string | null
          first_name: string
          gender: Database["public"]["Enums"]["Gender"]
          grade: Database["public"]["Enums"]["Grade"]
          hometown?: string | null
          id?: number
          last_name: string
          ncaa_player_id?: number | null
          popularity_score?: number
          school_id?: number | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          date_of_birth?: string | null
          first_name?: string
          gender?: Database["public"]["Enums"]["Gender"]
          grade?: Database["public"]["Enums"]["Grade"]
          hometown?: string | null
          id?: number
          last_name?: string
          ncaa_player_id?: number | null
          popularity_score?: number
          school_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "athletes_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
        ]
      }
      invites: {
        Row: {
          accepted_at: string | null
          accepted_by: string | null
          created_at: string
          created_by: string
          email: string
          id: string
          invite_data: Json | null
          token: string
        }
        Insert: {
          accepted_at?: string | null
          accepted_by?: string | null
          created_at?: string
          created_by: string
          email: string
          id?: string
          invite_data?: Json | null
          token?: string
        }
        Update: {
          accepted_at?: string | null
          accepted_by?: string | null
          created_at?: string
          created_by?: string
          email?: string
          id?: string
          invite_data?: Json | null
          token?: string
        }
        Relationships: [
          {
            foreignKeyName: "invites_accepted_by_fkey"
            columns: ["accepted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invites_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          favorite_team_id: number | null
          first_name: string
          id: string
          is_athlete: boolean
          is_team_manager: boolean
          last_name: string
          stripe_customer_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          favorite_team_id?: number | null
          first_name: string
          id?: string
          is_athlete?: boolean
          is_team_manager?: boolean
          last_name: string
          stripe_customer_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          favorite_team_id?: number | null
          first_name?: string
          id?: string
          is_athlete?: boolean
          is_team_manager?: boolean
          last_name?: string
          stripe_customer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_favorite_team_id_fkey"
            columns: ["favorite_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles_admin: {
        Row: {
          created_at: string
          id: number
          is_admin: boolean
          profiles_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          is_admin?: boolean
          profiles_id: string
        }
        Update: {
          created_at?: string
          id?: number
          is_admin?: boolean
          profiles_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_admin_profiles_id_fkey"
            columns: ["profiles_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles_x_athletes: {
        Row: {
          athletes_id: number
          created_at: string
          id: number
          profiles_id: string
        }
        Insert: {
          athletes_id: number
          created_at?: string
          id?: number
          profiles_id: string
        }
        Update: {
          athletes_id?: number
          created_at?: string
          id?: number
          profiles_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_x_athletes_athletes_id_fkey"
            columns: ["athletes_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_x_athletes_profiles_id_fkey"
            columns: ["profiles_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles_x_teams: {
        Row: {
          created_at: string
          id: number
          profiles_id: string
          teams_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          profiles_id: string
          teams_id: number
        }
        Update: {
          created_at?: string
          id?: number
          profiles_id?: string
          teams_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "profiles_x_teams_profiles_id_fkey"
            columns: ["profiles_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_x_teams_teams_id_fkey"
            columns: ["teams_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      raffle_results: {
        Row: {
          created_at: string
          id: number
          is_prize_claimed: boolean
          raffle_id: string
          winner_profile_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          is_prize_claimed?: boolean
          raffle_id: string
          winner_profile_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          is_prize_claimed?: boolean
          raffle_id?: string
          winner_profile_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "raffle_results_raffle_id_fkey"
            columns: ["raffle_id"]
            isOneToOne: false
            referencedRelation: "raffles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raffle_results_winner_profile_id_fkey"
            columns: ["winner_profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      raffle_ticket_purchase_errors: {
        Row: {
          created_at: string
          description: string
          id: number
          stripe_payment_id: string | null
          title: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          stripe_payment_id?: string | null
          title: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          stripe_payment_id?: string | null
          title?: string
        }
        Relationships: []
      }
      raffle_ticket_purchases: {
        Row: {
          created_at: string
          id: number
          profile_id: string
          purchased_at: string
          quantity: number
          raffle_id: string
          stripe_payment_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          profile_id: string
          purchased_at: string
          quantity: number
          raffle_id: string
          stripe_payment_id: string
        }
        Update: {
          created_at?: string
          id?: number
          profile_id?: string
          purchased_at?: string
          quantity?: number
          raffle_id?: string
          stripe_payment_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "raffle_ticket_purchases_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raffle_ticket_purchases_raffle_id_fkey"
            columns: ["raffle_id"]
            isOneToOne: false
            referencedRelation: "raffles"
            referencedColumns: ["id"]
          },
        ]
      }
      raffles: {
        Row: {
          athletes_id: number
          created_at: string
          created_by: string
          description: string | null
          end_date: string
          id: string
          prize_thumbnail: string
          prize_video_url: string
          raffle_results_id: number | null
          start_date: string
          title: string
        }
        Insert: {
          athletes_id: number
          created_at?: string
          created_by?: string
          description?: string | null
          end_date: string
          id?: string
          prize_thumbnail: string
          prize_video_url: string
          raffle_results_id?: number | null
          start_date: string
          title: string
        }
        Update: {
          athletes_id?: number
          created_at?: string
          created_by?: string
          description?: string | null
          end_date?: string
          id?: string
          prize_thumbnail?: string
          prize_video_url?: string
          raffle_results_id?: number | null
          start_date?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "raffles_athletes_id_fkey"
            columns: ["athletes_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raffles_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "raffles_raffle_results_id_fkey"
            columns: ["raffle_results_id"]
            isOneToOne: true
            referencedRelation: "raffle_results"
            referencedColumns: ["id"]
          },
        ]
      }
      roster_entries: {
        Row: {
          athlete_id: number
          created_at: string
          id: number
          jersey_number: number | null
          position: string | null
          team_id: number
        }
        Insert: {
          athlete_id: number
          created_at?: string
          id?: number
          jersey_number?: number | null
          position?: string | null
          team_id: number
        }
        Update: {
          athlete_id?: number
          created_at?: string
          id?: number
          jersey_number?: number | null
          position?: string | null
          team_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "roster_entries_athlete_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "roster_entries_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      schools: {
        Row: {
          abbreviation: string | null
          city: string
          created_at: string
          id: number
          logo_url: string | null
          name: string
          state: string
        }
        Insert: {
          abbreviation?: string | null
          city: string
          created_at?: string
          id?: number
          logo_url?: string | null
          name: string
          state: string
        }
        Update: {
          abbreviation?: string | null
          city?: string
          created_at?: string
          id?: number
          logo_url?: string | null
          name?: string
          state?: string
        }
        Relationships: []
      }
      sports: {
        Row: {
          created_at: string
          gender: Database["public"]["Enums"]["Gender"]
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          gender: Database["public"]["Enums"]["Gender"]
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          gender?: Database["public"]["Enums"]["Gender"]
          id?: number
          name?: string
        }
        Relationships: []
      }
      teams: {
        Row: {
          banner_url: string | null
          created_at: string
          id: number
          logo_url: string | null
          name: string
          ncaa_team_id: number | null
          popularity_score: number
          school_id: number
          season_year: number
          sport_id: number
        }
        Insert: {
          banner_url?: string | null
          created_at?: string
          id?: number
          logo_url?: string | null
          name: string
          ncaa_team_id?: number | null
          popularity_score?: number
          school_id: number
          season_year: number
          sport_id: number
        }
        Update: {
          banner_url?: string | null
          created_at?: string
          id?: number
          logo_url?: string | null
          name?: string
          ncaa_team_id?: number | null
          popularity_score?: number
          school_id?: number
          season_year?: number
          sport_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "teams_school_id_fkey"
            columns: ["school_id"]
            isOneToOne: false
            referencedRelation: "schools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teams_sport_id_fkey"
            columns: ["sport_id"]
            isOneToOne: false
            referencedRelation: "sports"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      athlete_raffle_summary: {
        Row: {
          athlete_id: number | null
          total_raffles_completed: number | null
          total_raffles_created: number | null
          total_tickets_sold: number | null
        }
        Relationships: [
          {
            foreignKeyName: "raffles_athletes_id_fkey"
            columns: ["athlete_id"]
            isOneToOne: false
            referencedRelation: "athletes"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_athlete_raffle_summary: {
        Row: {
          profile_id: string | null
          total_raffles_completed: number | null
          total_raffles_created: number | null
          total_tickets_sold: number | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_x_athletes_profiles_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_raffle_summary: {
        Row: {
          profile_id: string | null
          total_raffles_joined: number | null
          total_raffles_won: number | null
          total_tickets_purchased: number | null
        }
        Relationships: [
          {
            foreignKeyName: "raffle_ticket_purchases_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      has_raffle_started: {
        Args: { target_raffle_id: string }
        Returns: boolean
      }
      is_athlete_manager: {
        Args: { target_athlete_id: number }
        Returns: boolean
      }
      is_raffle_manager: {
        Args: { target_raffle_id: string }
        Returns: boolean
      }
      is_raffle_winner: {
        Args: { target_raffle_id: string }
        Returns: boolean
      }
      is_team_manager: {
        Args: { target_team_id: number }
        Returns: boolean
      }
      search_all_entities_v2: {
        Args: { page_limit?: number; page_offset?: number; query: string }
        Returns: {
          display_img_src: string
          display_subtitle: string
          display_title: string
          entity_type: string
          final_score: number
          id: number
          popularity_score: number
          similarity_score: number
        }[]
      }
    }
    Enums: {
      Gender: "Male" | "Female"
      Grade: "Senior" | "Junior" | "Sophomore" | "Freshman"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      Gender: ["Male", "Female"],
      Grade: ["Senior", "Junior", "Sophomore", "Freshman"],
    },
  },
} as const
