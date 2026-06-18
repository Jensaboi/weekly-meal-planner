export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      groceries: {
        Row: {
          created_at: string;
          household_id: number | null;
          id: number;
          is_checked: boolean;
          name: string;
          quantity: number;
          unit: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          household_id?: number | null;
          id?: never;
          is_checked?: boolean;
          name: string;
          quantity: number;
          unit: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          household_id?: number | null;
          id?: never;
          is_checked?: boolean;
          name?: string;
          quantity?: number;
          unit?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "groceries_household_id_fkey";
            columns: ["household_id"];
            isOneToOne: false;
            referencedRelation: "households";
            referencedColumns: ["id"];
          },
        ];
      };
      households: {
        Row: {
          created_at: string;
          creator_id: string;
          id: number;
          name: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          creator_id: string;
          id?: never;
          name: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          creator_id?: string;
          id?: never;
          name?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      households_members: {
        Row: {
          household_id: number;
          id: number;
          user_id: string;
        };
        Insert: {
          household_id: number;
          id?: never;
          user_id: string;
        };
        Update: {
          household_id?: number;
          id?: never;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "households_members_household_id_fkey";
            columns: ["household_id"];
            isOneToOne: false;
            referencedRelation: "households";
            referencedColumns: ["id"];
          },
        ];
      };
      meals: {
        Row: {
          created_at: string;
          date: string;
          household_id: number | null;
          id: number;
          meal_type: Database["public"]["Enums"]["meal_type"];
          recipe_id: number;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          date?: string;
          household_id?: number | null;
          id?: never;
          meal_type: Database["public"]["Enums"]["meal_type"];
          recipe_id: number;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          date?: string;
          household_id?: number | null;
          id?: never;
          meal_type?: Database["public"]["Enums"]["meal_type"];
          recipe_id?: number;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "meals_household_id_fkey";
            columns: ["household_id"];
            isOneToOne: false;
            referencedRelation: "households";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "meals_recipe_id_fkey";
            columns: ["recipe_id"];
            isOneToOne: false;
            referencedRelation: "recipe_card";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "meals_recipe_id_fkey";
            columns: ["recipe_id"];
            isOneToOne: false;
            referencedRelation: "recipe_detail";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "meals_recipe_id_fkey";
            columns: ["recipe_id"];
            isOneToOne: false;
            referencedRelation: "recipes";
            referencedColumns: ["id"];
          },
        ];
      };
      recipe_categories: {
        Row: {
          created_at: string;
          id: number;
          name: string;
          type: Database["public"]["Enums"]["recipe_type"];
        };
        Insert: {
          created_at?: string;
          id?: never;
          name: string;
          type: Database["public"]["Enums"]["recipe_type"];
        };
        Update: {
          created_at?: string;
          id?: never;
          name?: string;
          type?: Database["public"]["Enums"]["recipe_type"];
        };
        Relationships: [];
      };
      recipe_categories_map: {
        Row: {
          category_id: number;
          recipe_id: number;
        };
        Insert: {
          category_id: number;
          recipe_id: number;
        };
        Update: {
          category_id?: number;
          recipe_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "recipe_categories_map_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "recipe_categories";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "recipe_categories_map_recipe_id_fkey";
            columns: ["recipe_id"];
            isOneToOne: false;
            referencedRelation: "recipe_card";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "recipe_categories_map_recipe_id_fkey";
            columns: ["recipe_id"];
            isOneToOne: false;
            referencedRelation: "recipe_detail";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "recipe_categories_map_recipe_id_fkey";
            columns: ["recipe_id"];
            isOneToOne: false;
            referencedRelation: "recipes";
            referencedColumns: ["id"];
          },
        ];
      };
      recipe_images: {
        Row: {
          created_at: string;
          id: number;
          img_path: string;
          is_default: boolean | null;
          recipe_id: number;
        };
        Insert: {
          created_at?: string;
          id?: never;
          img_path: string;
          is_default?: boolean | null;
          recipe_id: number;
        };
        Update: {
          created_at?: string;
          id?: never;
          img_path?: string;
          is_default?: boolean | null;
          recipe_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "recipe_images_recipe_id_fkey";
            columns: ["recipe_id"];
            isOneToOne: false;
            referencedRelation: "recipe_card";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "recipe_images_recipe_id_fkey";
            columns: ["recipe_id"];
            isOneToOne: false;
            referencedRelation: "recipe_detail";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "recipe_images_recipe_id_fkey";
            columns: ["recipe_id"];
            isOneToOne: false;
            referencedRelation: "recipes";
            referencedColumns: ["id"];
          },
        ];
      };
      recipe_ingredients: {
        Row: {
          food_id: number | null;
          id: number;
          name: string;
          quantity: number;
          recipe_id: number;
          unit: string;
        };
        Insert: {
          food_id?: number | null;
          id?: never;
          name: string;
          quantity: number;
          recipe_id: number;
          unit: string;
        };
        Update: {
          food_id?: number | null;
          id?: never;
          name?: string;
          quantity?: number;
          recipe_id?: number;
          unit?: string;
        };
        Relationships: [
          {
            foreignKeyName: "recipe_ingredients_recipe_id_fkey";
            columns: ["recipe_id"];
            isOneToOne: false;
            referencedRelation: "recipe_card";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "recipe_ingredients_recipe_id_fkey";
            columns: ["recipe_id"];
            isOneToOne: false;
            referencedRelation: "recipe_detail";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "recipe_ingredients_recipe_id_fkey";
            columns: ["recipe_id"];
            isOneToOne: false;
            referencedRelation: "recipes";
            referencedColumns: ["id"];
          },
        ];
      };
      recipe_instructions: {
        Row: {
          description: string;
          id: number;
          recipe_id: number;
          step: number;
        };
        Insert: {
          description: string;
          id?: never;
          recipe_id: number;
          step: number;
        };
        Update: {
          description?: string;
          id?: never;
          recipe_id?: number;
          step?: number;
        };
        Relationships: [
          {
            foreignKeyName: "recipe_instructions_recipe_id_fkey";
            columns: ["recipe_id"];
            isOneToOne: false;
            referencedRelation: "recipe_card";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "recipe_instructions_recipe_id_fkey";
            columns: ["recipe_id"];
            isOneToOne: false;
            referencedRelation: "recipe_detail";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "recipe_instructions_recipe_id_fkey";
            columns: ["recipe_id"];
            isOneToOne: false;
            referencedRelation: "recipes";
            referencedColumns: ["id"];
          },
        ];
      };
      recipe_reviews: {
        Row: {
          author_id: string;
          comment: string | null;
          created_at: string;
          id: number;
          rating: number | null;
          recipe_id: number;
          updated_at: string;
        };
        Insert: {
          author_id: string;
          comment?: string | null;
          created_at?: string;
          id?: never;
          rating?: number | null;
          recipe_id: number;
          updated_at?: string;
        };
        Update: {
          author_id?: string;
          comment?: string | null;
          created_at?: string;
          id?: never;
          rating?: number | null;
          recipe_id?: number;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "recipe_reviews_recipe_id_fkey";
            columns: ["recipe_id"];
            isOneToOne: false;
            referencedRelation: "recipe_card";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "recipe_reviews_recipe_id_fkey";
            columns: ["recipe_id"];
            isOneToOne: false;
            referencedRelation: "recipe_detail";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "recipe_reviews_recipe_id_fkey";
            columns: ["recipe_id"];
            isOneToOne: false;
            referencedRelation: "recipes";
            referencedColumns: ["id"];
          },
        ];
      };
      recipes: {
        Row: {
          author_id: string;
          cooking_time: number;
          created_at: string;
          description: string;
          id: number;
          name: string;
          portions: number;
          prep_time: number;
          updated_at: string;
          visibility: Database["public"]["Enums"]["visibility_type"];
        };
        Insert: {
          author_id: string;
          cooking_time: number;
          created_at?: string;
          description: string;
          id?: never;
          name: string;
          portions: number;
          prep_time: number;
          updated_at?: string;
          visibility?: Database["public"]["Enums"]["visibility_type"];
        };
        Update: {
          author_id?: string;
          cooking_time?: number;
          created_at?: string;
          description?: string;
          id?: never;
          name?: string;
          portions?: number;
          prep_time?: number;
          updated_at?: string;
          visibility?: Database["public"]["Enums"]["visibility_type"];
        };
        Relationships: [];
      };
    };
    Views: {
      recipe_card: {
        Row: {
          author_id: string | null;
          avg_rating: number | null;
          categories: Json | null;
          cooking_time: number | null;
          created_at: string | null;
          description: string | null;
          id: number | null;
          image: string | null;
          name: string | null;
          portions: number | null;
          prep_time: number | null;
          total_reviews: number | null;
          updated_at: string | null;
          visibility: Database["public"]["Enums"]["visibility_type"] | null;
        };
        Insert: {
          author_id?: string | null;
          avg_rating?: never;
          categories?: never;
          cooking_time?: number | null;
          created_at?: string | null;
          description?: string | null;
          id?: number | null;
          image?: never;
          name?: string | null;
          portions?: number | null;
          prep_time?: number | null;
          total_reviews?: never;
          updated_at?: string | null;
          visibility?: Database["public"]["Enums"]["visibility_type"] | null;
        };
        Update: {
          author_id?: string | null;
          avg_rating?: never;
          categories?: never;
          cooking_time?: number | null;
          created_at?: string | null;
          description?: string | null;
          id?: number | null;
          image?: never;
          name?: string | null;
          portions?: number | null;
          prep_time?: number | null;
          total_reviews?: never;
          updated_at?: string | null;
          visibility?: Database["public"]["Enums"]["visibility_type"] | null;
        };
        Relationships: [];
      };
      recipe_detail: {
        Row: {
          author_id: string | null;
          avg_rating: number | null;
          categories: Json | null;
          cooking_time: number | null;
          created_at: string | null;
          description: string | null;
          id: number | null;
          images: Json | null;
          ingredients: Json | null;
          instructions: Json | null;
          name: string | null;
          portions: number | null;
          prep_time: number | null;
          total_reviews: number | null;
          updated_at: string | null;
          visibility: Database["public"]["Enums"]["visibility_type"] | null;
        };
        Insert: {
          author_id?: string | null;
          avg_rating?: never;
          categories?: never;
          cooking_time?: number | null;
          created_at?: string | null;
          description?: string | null;
          id?: number | null;
          images?: never;
          ingredients?: never;
          instructions?: never;
          name?: string | null;
          portions?: number | null;
          prep_time?: number | null;
          total_reviews?: never;
          updated_at?: string | null;
          visibility?: Database["public"]["Enums"]["visibility_type"] | null;
        };
        Update: {
          author_id?: string | null;
          avg_rating?: never;
          categories?: never;
          cooking_time?: number | null;
          created_at?: string | null;
          description?: string | null;
          id?: number | null;
          images?: never;
          ingredients?: never;
          instructions?: never;
          name?: string | null;
          portions?: number | null;
          prep_time?: number | null;
          total_reviews?: never;
          updated_at?: string | null;
          visibility?: Database["public"]["Enums"]["visibility_type"] | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      meal_type: "dinner" | "lunch" | "breakfast" | "snack";
      recipe_type: "dietary" | "cuisine" | "course" | "holiday" | "method";
      visibility_type: "public" | "private" | "unlisted";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      meal_type: ["dinner", "lunch", "breakfast", "snack"],
      recipe_type: ["dietary", "cuisine", "course", "holiday", "method"],
      visibility_type: ["public", "private", "unlisted"],
    },
  },
} as const;
