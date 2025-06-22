export type QuoteStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
export type ServiceType =
  | "moving"
  | "office"
  | "tv"
  | "longDistance"
  | "errand";

export interface Quote {
  id: string;
  userId: string;
  moverId?: string | null;
  origin: string;
  destination: string;
  moveDate: string;
  message?: string | null;
  serviceType: ServiceType;
  status: QuoteStatus;
  createdAt: string;
  updatedAt: string;
  user?: {
    name: string;
    email: string;
    phone?: string;
  };
}
