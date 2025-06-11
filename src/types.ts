export interface OlistRecord {
  order_id: string;
  customer_id: string;
  order_item_id: string;
  product_id: string;
  order_status: string;
  order_purchase_timestamp: string;
  purchase_time: string;
  order_approved_timestamp: string;
  approved_time: string;
  carrier_delivery_timestamp: string;
  carrier_time: string;
  customer_delivery_timestamp: string;
  delivery_time: string;
  days_to_delivery: number;
  shipping_days: number;
  review_score: number;
  review_created_late: boolean;
  price: number;
  estimated_delivery_date: string;
  estimated_time: string;
  customer_city: string;
  customer_state: string;
  customer_zip_prefix: number;
  product_weight_g: number;
  product_length_cm: number;
  product_height_cm: number;
  product_category: string;
  seller_city: string;
  seller_state: string;
  review_answer_days: number;
  payment_installments: number;
  payment_type: string;
  payment_sequential: number;
  payment_value: number;
  seller_zip_prefix: number;
  seller_lat: number;
  seller_lng: number;
  seller_city_clean: string;
  seller_state_clean: string;
  freight_value: number;
  total_charges: number;
}

export interface DashboardMetrics {
  totalRevenue: number;
  totalOrders: number;
  uniqueCustomers: number;
  avgOrderValue: number;
  totalFreight: number;
  avgDeliveryDays: number;
  avgReviewScore: number;
  repeatCustomerRate: number;
}

export interface CategoryData {
  category: string;
  revenue: number;
  orders: number;
  avgOrderValue: number;
}

export interface StateData {
  state: string;
  revenue: number;
  orders: number;
  customers: number;
}

export interface MonthlyTrend {
  month: string;
  revenue: number;
  orders: number;
  customers: number;
}
