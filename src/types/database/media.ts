export interface Media {
  id: string;
  filename: string;
  url: string;
  type: string;
  size: number;
  alt_text?: string;
  description?: string;
  metadata?: Record<string, any>;
  uploaded_by?: string;
  created_at?: string;
}