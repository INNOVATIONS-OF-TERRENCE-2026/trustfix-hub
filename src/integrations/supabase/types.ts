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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      cases: {
        Row: {
          admin_notes: string[] | null
          assigned_agent_id: string | null
          completed_at: string | null
          created_at: string
          current_stage: Database["public"]["Enums"]["case_stage"] | null
          guarantee_deadline: string | null
          guarantee_triggered: boolean | null
          id: string
          notes: Json | null
          refund_processed: boolean | null
          started_at: string | null
          status: Database["public"]["Enums"]["case_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_notes?: string[] | null
          assigned_agent_id?: string | null
          completed_at?: string | null
          created_at?: string
          current_stage?: Database["public"]["Enums"]["case_stage"] | null
          guarantee_deadline?: string | null
          guarantee_triggered?: boolean | null
          id?: string
          notes?: Json | null
          refund_processed?: boolean | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["case_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_notes?: string[] | null
          assigned_agent_id?: string | null
          completed_at?: string | null
          created_at?: string
          current_stage?: Database["public"]["Enums"]["case_stage"] | null
          guarantee_deadline?: string | null
          guarantee_triggered?: boolean | null
          id?: string
          notes?: Json | null
          refund_processed?: boolean | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["case_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          admin_viewed_at: string | null
          admin_viewed_by: string | null
          case_id: string
          checksum: string | null
          content_type: string
          file_path: string
          file_size: number
          id: string
          ocr_summary: Json | null
          redacted_preview_path: string | null
          type: Database["public"]["Enums"]["document_type"]
          uploaded_at: string
          uploader_ip: string | null
          user_id: string
          verification_status: string | null
        }
        Insert: {
          admin_viewed_at?: string | null
          admin_viewed_by?: string | null
          case_id: string
          checksum?: string | null
          content_type: string
          file_path: string
          file_size: number
          id?: string
          ocr_summary?: Json | null
          redacted_preview_path?: string | null
          type: Database["public"]["Enums"]["document_type"]
          uploaded_at?: string
          uploader_ip?: string | null
          user_id: string
          verification_status?: string | null
        }
        Update: {
          admin_viewed_at?: string | null
          admin_viewed_by?: string | null
          case_id?: string
          checksum?: string | null
          content_type?: string
          file_path?: string
          file_size?: number
          id?: string
          ocr_summary?: Json | null
          redacted_preview_path?: string | null
          type?: Database["public"]["Enums"]["document_type"]
          uploaded_at?: string
          uploader_ip?: string | null
          user_id?: string
          verification_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
        ]
      }
      guarantee_timers: {
        Row: {
          case_id: string
          created_at: string
          deadline_at: string
          id: string
          pause_reason: string | null
          paused_at: string | null
          refund_eligible: boolean | null
          refund_notified_at: string | null
          start_at: string
          status: Database["public"]["Enums"]["timer_status"]
          updated_at: string
          webhook_history: Json | null
        }
        Insert: {
          case_id: string
          created_at?: string
          deadline_at: string
          id?: string
          pause_reason?: string | null
          paused_at?: string | null
          refund_eligible?: boolean | null
          refund_notified_at?: string | null
          start_at: string
          status?: Database["public"]["Enums"]["timer_status"]
          updated_at?: string
          webhook_history?: Json | null
        }
        Update: {
          case_id?: string
          created_at?: string
          deadline_at?: string
          id?: string
          pause_reason?: string | null
          paused_at?: string | null
          refund_eligible?: boolean | null
          refund_notified_at?: string | null
          start_at?: string
          status?: Database["public"]["Enums"]["timer_status"]
          updated_at?: string
          webhook_history?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "guarantee_timers_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: true
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          attachments: Json | null
          case_id: string | null
          content: string
          created_at: string
          from_user_id: string
          id: string
          is_admin_message: boolean | null
          read_at: string | null
          to_user_id: string | null
        }
        Insert: {
          attachments?: Json | null
          case_id?: string | null
          content: string
          created_at?: string
          from_user_id: string
          id?: string
          is_admin_message?: boolean | null
          read_at?: string | null
          to_user_id?: string | null
        }
        Update: {
          attachments?: Json | null
          case_id?: string | null
          content?: string
          created_at?: string
          from_user_id?: string
          id?: string
          is_admin_message?: boolean | null
          read_at?: string | null
          to_user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          link: string | null
          message: string
          read: boolean | null
          read_at: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          link?: string | null
          message: string
          read?: boolean | null
          read_at?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          link?: string | null
          message?: string
          read?: boolean | null
          read_at?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          case_id: string | null
          confirmation_sent_at: string | null
          created_at: string
          currency: string | null
          id: string
          metadata: Json | null
          paid_at: string | null
          payment_status: string
          plan: Database["public"]["Enums"]["plan_type"]
          receipt_url: string | null
          refund_processed: boolean | null
          refund_requested: boolean | null
          user_id: string
        }
        Insert: {
          amount: number
          case_id?: string | null
          confirmation_sent_at?: string | null
          created_at?: string
          currency?: string | null
          id?: string
          metadata?: Json | null
          paid_at?: string | null
          payment_status?: string
          plan: Database["public"]["Enums"]["plan_type"]
          receipt_url?: string | null
          refund_processed?: boolean | null
          refund_requested?: boolean | null
          user_id: string
        }
        Update: {
          amount?: number
          case_id?: string | null
          confirmation_sent_at?: string | null
          created_at?: string
          currency?: string | null
          id?: string
          metadata?: Json | null
          paid_at?: string | null
          payment_status?: string
          plan?: Database["public"]["Enums"]["plan_type"]
          receipt_url?: string | null
          refund_processed?: boolean | null
          refund_requested?: boolean | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          consent_given_at: string | null
          created_at: string
          dob: string | null
          email_verified: boolean | null
          encryption_key_id: string | null
          experian_password_encrypted: string | null
          experian_username: string | null
          full_name: string
          id: string
          last_login_at: string | null
          phone: string | null
          phone_verified: boolean | null
          retention_expiry: string | null
          soft_deleted: boolean | null
          ssn_last4: string | null
          twofa_enabled: boolean | null
          updated_at: string
          verified_at: string | null
        }
        Insert: {
          address?: string | null
          consent_given_at?: string | null
          created_at?: string
          dob?: string | null
          email_verified?: boolean | null
          encryption_key_id?: string | null
          experian_password_encrypted?: string | null
          experian_username?: string | null
          full_name: string
          id: string
          last_login_at?: string | null
          phone?: string | null
          phone_verified?: boolean | null
          retention_expiry?: string | null
          soft_deleted?: boolean | null
          ssn_last4?: string | null
          twofa_enabled?: boolean | null
          updated_at?: string
          verified_at?: string | null
        }
        Update: {
          address?: string | null
          consent_given_at?: string | null
          created_at?: string
          dob?: string | null
          email_verified?: boolean | null
          encryption_key_id?: string | null
          experian_password_encrypted?: string | null
          experian_username?: string | null
          full_name?: string
          id?: string
          last_login_at?: string | null
          phone?: string | null
          phone_verified?: boolean | null
          retention_expiry?: string | null
          soft_deleted?: boolean | null
          ssn_last4?: string | null
          twofa_enabled?: boolean | null
          updated_at?: string
          verified_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "client" | "admin" | "agent" | "auditor"
      case_stage:
        | "reviewing_docs"
        | "drafting_disputes"
        | "submitted"
        | "processing_48hr"
        | "complete"
      case_status:
        | "not_started"
        | "files_needed"
        | "under_review"
        | "in_progress"
        | "completed"
        | "refunded"
        | "guarantee_triggered"
      document_type:
        | "id_front"
        | "id_back"
        | "ss_card"
        | "proof_address"
        | "authorization_form"
        | "creditor_statement"
        | "payoff_letter"
      plan_type: "basic" | "premium" | "enterprise"
      timer_status: "running" | "completed" | "triggered" | "canceled"
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
      app_role: ["client", "admin", "agent", "auditor"],
      case_stage: [
        "reviewing_docs",
        "drafting_disputes",
        "submitted",
        "processing_48hr",
        "complete",
      ],
      case_status: [
        "not_started",
        "files_needed",
        "under_review",
        "in_progress",
        "completed",
        "refunded",
        "guarantee_triggered",
      ],
      document_type: [
        "id_front",
        "id_back",
        "ss_card",
        "proof_address",
        "authorization_form",
        "creditor_statement",
        "payoff_letter",
      ],
      plan_type: ["basic", "premium", "enterprise"],
      timer_status: ["running", "completed", "triggered", "canceled"],
    },
  },
} as const
