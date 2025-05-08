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
      athletes: {
        Row: {
          created_at: string
          date_of_birth: string | null
          first_name: string
          gender: string
          id: number
          last_name: string
          ncaa_player_id: number | null
          popularity_score: number
          school_id: number | null
        }
        Insert: {
          created_at?: string
          date_of_birth?: string | null
          first_name: string
          gender: string
          id?: number
          last_name: string
          ncaa_player_id?: number | null
          popularity_score?: number
          school_id?: number | null
        }
        Update: {
          created_at?: string
          date_of_birth?: string | null
          first_name?: string
          gender?: string
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
      profiles: {
        Row: {
          created_at: string
          favorite_team_id: number | null
          first_name: string
          id: string
          last_name: string
          stripe_customer_id: string | null
        }
        Insert: {
          created_at?: string
          favorite_team_id?: number | null
          first_name: string
          id?: string
          last_name: string
          stripe_customer_id?: string | null
        }
        Update: {
          created_at?: string
          favorite_team_id?: number | null
          first_name?: string
          id?: string
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
          gender: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          gender: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          gender?: string
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
      [_ in never]: never
    }
    Functions: {
      gtrgm_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_options: {
        Args: { "": unknown }
        Returns: undefined
      }
      gtrgm_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      search_all_entities_v2: {
        Args: { query: string; page_limit?: number; page_offset?: number }
        Returns: {
          entity_type: string
          id: number
          display_title: string
          display_subtitle: string
          display_img_src: string
          popularity_score: number
          similarity_score: number
          final_score: number
        }[]
      }
      set_limit: {
        Args: { "": number }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: { "": string }
        Returns: string[]
      }
    }
    Enums: {
      Sex: "Male" | "Female"
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
    Enums: {
      Sex: ["Male", "Female"],
    },
  },
} as const
