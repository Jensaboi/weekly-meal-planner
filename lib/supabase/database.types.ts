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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      groceries: {
        Row: {
          added_by: Database["public"]["Enums"]["added_by_type"]
          amount: number
          created_at: string
          household_id: number | null
          id: number
          ingredient_id: number
          is_bought: boolean
          meal_id: number | null
          unit: Database["public"]["Enums"]["ingredient_unit"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          added_by?: Database["public"]["Enums"]["added_by_type"]
          amount: number
          created_at?: string
          household_id?: number | null
          id?: never
          ingredient_id: number
          is_bought?: boolean
          meal_id?: number | null
          unit: Database["public"]["Enums"]["ingredient_unit"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          added_by?: Database["public"]["Enums"]["added_by_type"]
          amount?: number
          created_at?: string
          household_id?: number | null
          id?: never
          ingredient_id?: number
          is_bought?: boolean
          meal_id?: number | null
          unit?: Database["public"]["Enums"]["ingredient_unit"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "groceries_household_id_fkey"
            columns: ["household_id"]
            isOneToOne: false
            referencedRelation: "household_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "groceries_household_id_fkey"
            columns: ["household_id"]
            isOneToOne: false
            referencedRelation: "households"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "groceries_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "groceries_meal_id_fkey"
            columns: ["meal_id"]
            isOneToOne: false
            referencedRelation: "meal_card"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "groceries_meal_id_fkey"
            columns: ["meal_id"]
            isOneToOne: false
            referencedRelation: "meals"
            referencedColumns: ["id"]
          },
        ]
      }
      household_members: {
        Row: {
          household_id: number
          id: number
          role: Database["public"]["Enums"]["role_type"]
          user_id: string
        }
        Insert: {
          household_id: number
          id?: never
          role?: Database["public"]["Enums"]["role_type"]
          user_id: string
        }
        Update: {
          household_id?: number
          id?: never
          role?: Database["public"]["Enums"]["role_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "households_members_household_id_fkey"
            columns: ["household_id"]
            isOneToOne: false
            referencedRelation: "household_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "households_members_household_id_fkey"
            columns: ["household_id"]
            isOneToOne: false
            referencedRelation: "households"
            referencedColumns: ["id"]
          },
        ]
      }
      households: {
        Row: {
          created_at: string
          creator_id: string
          id: number
          invite_code: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          creator_id: string
          id?: never
          invite_code?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          creator_id?: string
          id?: never
          invite_code?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      ingredients: {
        Row: {
          id: number
          livsmedel_id: number | null
          name: string
        }
        Insert: {
          id?: never
          livsmedel_id?: number | null
          name: string
        }
        Update: {
          id?: never
          livsmedel_id?: number | null
          name?: string
        }
        Relationships: []
      }
      meals: {
        Row: {
          created_at: string
          date: string
          household_id: number | null
          id: number
          meal_type: Database["public"]["Enums"]["meal_type"]
          portions: number
          recipe_id: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          date?: string
          household_id?: number | null
          id?: never
          meal_type: Database["public"]["Enums"]["meal_type"]
          portions?: number
          recipe_id: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          date?: string
          household_id?: number | null
          id?: never
          meal_type?: Database["public"]["Enums"]["meal_type"]
          portions?: number
          recipe_id?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meals_household_id_fkey"
            columns: ["household_id"]
            isOneToOne: false
            referencedRelation: "household_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meals_household_id_fkey"
            columns: ["household_id"]
            isOneToOne: false
            referencedRelation: "households"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meals_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipe_card"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meals_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipe_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meals_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_categories: {
        Row: {
          created_at: string
          id: number
          name: string
          type: Database["public"]["Enums"]["recipe_type"]
        }
        Insert: {
          created_at?: string
          id?: never
          name: string
          type: Database["public"]["Enums"]["recipe_type"]
        }
        Update: {
          created_at?: string
          id?: never
          name?: string
          type?: Database["public"]["Enums"]["recipe_type"]
        }
        Relationships: []
      }
      recipe_categories_map: {
        Row: {
          category_id: number
          id: number
          recipe_id: number
        }
        Insert: {
          category_id: number
          id?: never
          recipe_id: number
        }
        Update: {
          category_id?: number
          id?: never
          recipe_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "recipe_categories_map_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "recipe_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_categories_map_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipe_card"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_categories_map_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipe_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_categories_map_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_favorites: {
        Row: {
          created_at: string
          id: number
          recipe_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: never
          recipe_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: never
          recipe_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipe_favorites_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipe_card"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_favorites_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipe_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_favorites_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_images: {
        Row: {
          created_at: string
          id: string
          is_default: boolean
          path: string
          recipe_id: number
        }
        Insert: {
          created_at?: string
          id: string
          is_default?: boolean
          path: string
          recipe_id: number
        }
        Update: {
          created_at?: string
          id?: string
          is_default?: boolean
          path?: string
          recipe_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "recipe_images_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipe_card"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_images_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipe_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_images_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_ingredients: {
        Row: {
          amount: number
          id: number
          ingredient_id: number
          recipe_id: number
          unit: Database["public"]["Enums"]["ingredient_unit"]
        }
        Insert: {
          amount: number
          id?: never
          ingredient_id: number
          recipe_id: number
          unit: Database["public"]["Enums"]["ingredient_unit"]
        }
        Update: {
          amount?: number
          id?: never
          ingredient_id?: number
          recipe_id?: number
          unit?: Database["public"]["Enums"]["ingredient_unit"]
        }
        Relationships: [
          {
            foreignKeyName: "recipe_ingredients_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_ingredients_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipe_card"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_ingredients_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipe_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_ingredients_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_instructions: {
        Row: {
          description: string
          id: number
          recipe_id: number
          step: number
        }
        Insert: {
          description: string
          id?: never
          recipe_id: number
          step: number
        }
        Update: {
          description?: string
          id?: never
          recipe_id?: number
          step?: number
        }
        Relationships: [
          {
            foreignKeyName: "recipe_instructions_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipe_card"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_instructions_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipe_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_instructions_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_reviews: {
        Row: {
          author_id: string
          comment: string | null
          created_at: string
          id: number
          rating: number
          recipe_id: number
          updated_at: string
        }
        Insert: {
          author_id: string
          comment?: string | null
          created_at?: string
          id?: never
          rating: number
          recipe_id: number
          updated_at?: string
        }
        Update: {
          author_id?: string
          comment?: string | null
          created_at?: string
          id?: never
          rating?: number
          recipe_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipe_reviews_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipe_card"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_reviews_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipe_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_reviews_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipes: {
        Row: {
          author_id: string
          cooking_time: number
          created_at: string
          description: string
          id: number
          name: string
          portions: number
          prep_time: number
          updated_at: string
          visibility: Database["public"]["Enums"]["visibility_type"]
        }
        Insert: {
          author_id: string
          cooking_time: number
          created_at?: string
          description: string
          id?: never
          name: string
          portions: number
          prep_time: number
          updated_at?: string
          visibility?: Database["public"]["Enums"]["visibility_type"]
        }
        Update: {
          author_id?: string
          cooking_time?: number
          created_at?: string
          description?: string
          id?: never
          name?: string
          portions?: number
          prep_time?: number
          updated_at?: string
          visibility?: Database["public"]["Enums"]["visibility_type"]
        }
        Relationships: []
      }
    }
    Views: {
      groceries_view: {
        Row: {
          added_by: Database["public"]["Enums"]["added_by_type"] | null
          amount: number | null
          created_at: string | null
          household_id: number | null
          id: number | null
          ingredient_id: number | null
          is_bought: boolean | null
          livsmedel_id: number | null
          meal_date: string | null
          meal_id: number | null
          meal_name: string | null
          meal_type: Database["public"]["Enums"]["meal_type"] | null
          name: string | null
          unit: Database["public"]["Enums"]["ingredient_unit"] | null
          updated_at: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "groceries_household_id_fkey"
            columns: ["household_id"]
            isOneToOne: false
            referencedRelation: "household_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "groceries_household_id_fkey"
            columns: ["household_id"]
            isOneToOne: false
            referencedRelation: "households"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "groceries_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "groceries_meal_id_fkey"
            columns: ["meal_id"]
            isOneToOne: false
            referencedRelation: "meal_card"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "groceries_meal_id_fkey"
            columns: ["meal_id"]
            isOneToOne: false
            referencedRelation: "meals"
            referencedColumns: ["id"]
          },
        ]
      }
      household_view: {
        Row: {
          created_at: string | null
          creator_id: string | null
          id: number | null
          invite_code: string | null
          members: Json | null
          name: string | null
          updated_at: string | null
          user_id: string | null
        }
        Relationships: []
      }
      meal_card: {
        Row: {
          author_id: string | null
          avg_rating: number | null
          categories: Json | null
          cooking_time: number | null
          created_at: string | null
          date: string | null
          description: string | null
          household_id: number | null
          id: number | null
          image: string | null
          meal_type: Database["public"]["Enums"]["meal_type"] | null
          name: string | null
          portions: number | null
          prep_time: number | null
          recipe_id: number | null
          total_ingredients: number | null
          total_instructions: number | null
          total_reviews: number | null
          updated_at: string | null
          user_id: string | null
          visibility: Database["public"]["Enums"]["visibility_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "meals_household_id_fkey"
            columns: ["household_id"]
            isOneToOne: false
            referencedRelation: "household_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meals_household_id_fkey"
            columns: ["household_id"]
            isOneToOne: false
            referencedRelation: "households"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meals_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipe_card"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meals_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipe_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meals_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      recipe_card: {
        Row: {
          author_id: string | null
          avg_rating: number | null
          categories: Json | null
          cooking_time: number | null
          created_at: string | null
          description: string | null
          id: number | null
          image: string | null
          name: string | null
          portions: number | null
          prep_time: number | null
          total_ingredients: number | null
          total_instructions: number | null
          total_review_comments: number | null
          total_reviews: number | null
          updated_at: string | null
          visibility: Database["public"]["Enums"]["visibility_type"] | null
        }
        Insert: {
          author_id?: string | null
          avg_rating?: never
          categories?: never
          cooking_time?: number | null
          created_at?: string | null
          description?: string | null
          id?: number | null
          image?: never
          name?: string | null
          portions?: number | null
          prep_time?: number | null
          total_ingredients?: never
          total_instructions?: never
          total_review_comments?: never
          total_reviews?: never
          updated_at?: string | null
          visibility?: Database["public"]["Enums"]["visibility_type"] | null
        }
        Update: {
          author_id?: string | null
          avg_rating?: never
          categories?: never
          cooking_time?: number | null
          created_at?: string | null
          description?: string | null
          id?: number | null
          image?: never
          name?: string | null
          portions?: number | null
          prep_time?: number | null
          total_ingredients?: never
          total_instructions?: never
          total_review_comments?: never
          total_reviews?: never
          updated_at?: string | null
          visibility?: Database["public"]["Enums"]["visibility_type"] | null
        }
        Relationships: []
      }
      recipe_details: {
        Row: {
          author_id: string | null
          avg_rating: number | null
          categories: Json | null
          cooking_time: number | null
          created_at: string | null
          description: string | null
          id: number | null
          images: Json | null
          ingredients: Json | null
          instructions: Json | null
          name: string | null
          portions: number | null
          prep_time: number | null
          total_review_comments: number | null
          total_reviews: number | null
          updated_at: string | null
          visibility: Database["public"]["Enums"]["visibility_type"] | null
        }
        Insert: {
          author_id?: string | null
          avg_rating?: never
          categories?: never
          cooking_time?: number | null
          created_at?: string | null
          description?: string | null
          id?: number | null
          images?: never
          ingredients?: never
          instructions?: never
          name?: string | null
          portions?: number | null
          prep_time?: number | null
          total_review_comments?: never
          total_reviews?: never
          updated_at?: string | null
          visibility?: Database["public"]["Enums"]["visibility_type"] | null
        }
        Update: {
          author_id?: string | null
          avg_rating?: never
          categories?: never
          cooking_time?: number | null
          created_at?: string | null
          description?: string | null
          id?: number | null
          images?: never
          ingredients?: never
          instructions?: never
          name?: string | null
          portions?: number | null
          prep_time?: number | null
          total_review_comments?: never
          total_reviews?: never
          updated_at?: string | null
          visibility?: Database["public"]["Enums"]["visibility_type"] | null
        }
        Relationships: []
      }
    }
    Functions: {
      create_household: { Args: { name: string }; Returns: number }
      create_meal_and_groceries: {
        Args: {
          p_date: string
          p_meal_type: Database["public"]["Enums"]["meal_type"]
          p_portions: number
          p_recipe_id: number
        }
        Returns: undefined
      }
      join_household: { Args: { code: string }; Returns: number }
      leave_household: { Args: never; Returns: undefined }
    }
    Enums: {
      added_by_type: "meal" | "manual"
      ingredient_unit:
        | "g"
        | "kg"
        | "ml"
        | "cl"
        | "dl"
        | "l"
        | "tbsp"
        | "tsp"
        | "pcs"
      meal_type: "dinner" | "lunch" | "breakfast" | "snack"
      recipe_type:
        | "dietary"
        | "cuisine"
        | "course"
        | "holiday"
        | "method"
        | "tag"
      role_type: "owner" | "admin" | "member"
      visibility_type: "public" | "private" | "unlisted"
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
      added_by_type: ["meal", "manual"],
      ingredient_unit: ["g", "kg", "ml", "cl", "dl", "l", "tbsp", "tsp", "pcs"],
      meal_type: ["dinner", "lunch", "breakfast", "snack"],
      recipe_type: ["dietary", "cuisine", "course", "holiday", "method", "tag"],
      role_type: ["owner", "admin", "member"],
      visibility_type: ["public", "private", "unlisted"],
    },
  },
} as const
