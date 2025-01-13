export interface IOrderStatusEmailData {
  email: string;
  orderId: string
  team?: string
  customerName?: string
  amount?: number
  arrivingDate?: string
  reason?: string
  refundTat: string
}
