import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export interface OlistFinalRecord {
  order_id?: string;
  customer_id?: string;
  product_id?: string;
  seller_id?: string;
  order_status?: string;
  purchase_date?: string;
  purchase_time?: string;
  approved_date?: string;
  approved_time?: string;
  delivered_date?: string;
  delivered_time?: string;
  estimated_date?: string;
  estimated_time?: string;
  duration_days?: number;
  duration_hours?: number;
  delivery_delay_days?: number;
  is_weekend_delivery?: boolean;
  gross_value?: number;
  shipping_date?: string;
  shipping_time?: string;
  seller_city?: string;
  seller_state?: string;
  product_weight_g?: number;
  product_length_cm?: number;
  product_height_cm?: number;
  product_width_cm?: number;
  product_category_en?: string;
  customer_city?: string;
  customer_state?: string;
  review_score?: number;
  payment_sequential?: number;
  payment_type?: string;
  payment_installments?: number;
  payment_value?: number;
  geolocation_zip_code_prefix?: string;
  latitude?: number;
  longitude?: number;
  city?: string;
  state?: string;
  Total_price?: number;
  Total_freight_value?: number;
}

export class DatabaseService {
  async getDashboardMetrics() {
    const result = await prisma.$queryRaw<Array<{
      total_revenue: number;
      total_orders: number;
      unique_customers: number;
      avg_order_value: number;
      total_freight: number;
      avg_delivery_days: number;
      avg_review_score: number;
    }>>`
      SELECT 
        ROUND(COALESCE(SUM("gross_value"), 0)::numeric, 2) as total_revenue,
        COUNT(DISTINCT order_id) as total_orders,
        COUNT(DISTINCT customer_id) as unique_customers,
        ROUND(COALESCE(AVG("gross_value"), 0)::numeric, 2) as avg_order_value,
        ROUND(COALESCE(SUM("Total_freight_value"), 0)::numeric, 2) as total_freight,
        ROUND(COALESCE(AVG(duration_days), 0)::numeric, 1) as avg_delivery_days,
        ROUND(COALESCE(AVG(review_score), 0)::numeric, 1) as avg_review_score
      FROM "Olist_Final"
      WHERE order_id IS NOT NULL
        AND "Total_price" IS NOT NULL
        AND "Total_freight_value" IS NOT NULL
    `;

    const repeatCustomerResult = await prisma.$queryRaw<Array<{ repeat_rate: number }>>`
      SELECT 
        ROUND(
          COALESCE(
            (COUNT(*) FILTER (WHERE customer_order_count > 1) * 100.0 / NULLIF(COUNT(*), 0)),
            0
          )::numeric, 
          1
        ) as repeat_rate
      FROM (
        SELECT customer_id, COUNT(*) as customer_order_count
        FROM "Olist_Final"
        WHERE customer_id IS NOT NULL
        GROUP BY customer_id
      ) customer_orders
    `;

    const metrics = result[0];
    const repeatRate = repeatCustomerResult[0]?.repeat_rate || 0;

    return {
      totalRevenue: Number(metrics?.total_revenue) || 0,
      totalOrders: Number(metrics?.total_orders) || 0,
      uniqueCustomers: Number(metrics?.unique_customers) || 0,
      avgOrderValue: Number(metrics?.avg_order_value) || 0,
      totalFreight: Number(metrics?.total_freight) || 0,
      avgDeliveryDays: Number(metrics?.avg_delivery_days) || 0,
      avgReviewScore: Number(metrics?.avg_review_score) || 0,
      repeatCustomerRate: Number(repeatRate) || 0,
    };
  }

  async getMonthlyTrends() {
    const result = await prisma.$queryRaw<Array<{
      month: string;
      revenue: number;
      orders: number;
      customers: number;
    }>>`
      SELECT 
        TO_CHAR(TO_DATE(purchase_date, 'YYYY-MM-DD'), 'Mon YYYY') as month,
        ROUND(COALESCE(SUM("gross_value"), 0)::numeric, 0) as revenue,
        COUNT(DISTINCT order_id) as orders,
        COUNT(DISTINCT customer_id) as customers
      FROM "Olist_Final"
      WHERE purchase_date IS NOT NULL 
        AND order_id IS NOT NULL
        AND "gross_value" IS NOT NULL
        AND TO_DATE(purchase_date, 'YYYY-MM-DD') >= '2017-01-01'
        AND TO_DATE(purchase_date, 'YYYY-MM-DD') < '2019-01-01'
      GROUP BY TO_CHAR(TO_DATE(purchase_date, 'YYYY-MM-DD'), 'YYYY-MM'), TO_CHAR(TO_DATE(purchase_date, 'YYYY-MM-DD'), 'Mon YYYY')
      ORDER BY TO_CHAR(TO_DATE(purchase_date, 'YYYY-MM-DD'), 'YYYY-MM')
    `;

    return result.map(row => ({
      month: row.month,
      revenue: Number(row.revenue) || 0,
      orders: Number(row.orders) || 0,
      customers: Number(row.customers) || 0,
    }));
  }

  async getCategoryData() {
    const result = await prisma.$queryRaw<Array<{
      category: string;
      revenue: number;
      orders: number;
      avg_order_value: number;
    }>>`
      SELECT 
        COALESCE(product_category_en, 'Unknown') as category,
        ROUND(COALESCE(SUM(\"Total_price\" + \"Total_freight_value\"), 0)::numeric, 2) as revenue,
        COUNT(DISTINCT order_id) as orders,
        ROUND(COALESCE(AVG(\"Total_price\" + \"Total_freight_value\"), 0)::numeric, 2) as avg_order_value
      FROM \"Olist_Final\"
      WHERE order_status = 'delivered'
        AND order_id IS NOT NULL
        AND \"Total_price\" IS NOT NULL
        AND \"Total_freight_value\" IS NOT NULL
      GROUP BY product_category_en
      ORDER BY revenue DESC
      LIMIT 20
    `;

    return result.map(row => ({
      category: row.category,
      revenue: Number(row.revenue) || 0,
      orders: Number(row.orders) || 0,
      avgOrderValue: Number(row.avg_order_value) || 0,
    }));
  }

  async getStateData() {
    const result = await prisma.$queryRaw<Array<{
      state: string;
      revenue: number;
      orders: number;
      customers: number;
    }>>`
      SELECT 
        COALESCE(customer_state, 'Unknown') as state,
        ROUND(COALESCE(SUM(\"Total_price\" + \"Total_freight_value\"), 0)::numeric, 2) as revenue,
        COUNT(DISTINCT order_id) as orders,
        COUNT(DISTINCT customer_id) as customers
      FROM \"Olist_Final\"
      WHERE order_status = 'delivered'
        AND order_id IS NOT NULL
        AND \"Total_price\" IS NOT NULL
        AND \"Total_freight_value\" IS NOT NULL
      GROUP BY customer_state
      ORDER BY revenue DESC
      LIMIT 20
    `;

    return result.map(row => ({
      state: row.state,
      revenue: Number(row.revenue) || 0,
      orders: Number(row.orders) || 0,
      customers: Number(row.customers) || 0,
    }));
  }

  async getCustomQuery(query: string) {
    return await prisma.$queryRawUnsafe(query);
  }
}

export const dbService = new DatabaseService();