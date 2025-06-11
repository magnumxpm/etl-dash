import { serve } from "bun";
import index from "./index.html";
import { dbService } from "./lib/database";

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async req => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },

    "/api/dashboard/metrics": {
      async GET(req) {
        try {
          const metrics = await dbService.getDashboardMetrics();
          return Response.json(metrics);
        } catch (error) {
          console.error("Error fetching dashboard metrics:", error);
          return Response.json(
            { error: "Failed to fetch dashboard metrics" },
            { status: 500 }
          );
        }
      },
    },

    "/api/dashboard/trends": {
      async GET(req) {
        try {
          const trends = await dbService.getMonthlyTrends();
          return Response.json(trends);
        } catch (error) {
          console.error("Error fetching monthly trends:", error);
          return Response.json(
            { error: "Failed to fetch monthly trends" },
            { status: 500 }
          );
        }
      },
    },

    "/api/dashboard/categories": {
      async GET(req) {
        try {
          const categories = await dbService.getCategoryData();
          return Response.json(categories);
        } catch (error) {
          console.error("Error fetching category data:", error);
          return Response.json(
            { error: "Failed to fetch category data" },
            { status: 500 }
          );
        }
      },
    },

    "/api/dashboard/states": {
      async GET(req) {
        try {
          const states = await dbService.getStateData();
          return Response.json(states);
        } catch (error) {
          console.error("Error fetching state data:", error);
          return Response.json(
            { error: "Failed to fetch state data" },
            { status: 500 }
          );
        }
      },
    },

    "/api/query": {
      async POST(req) {
        try {
          const body = await req.json();
          const { query } = body;
          
          if (!query || typeof query !== 'string') {
            return Response.json(
              { error: "Query parameter is required and must be a string" },
              { status: 400 }
            );
          }

          const result = await dbService.getCustomQuery(query);
          return Response.json(result);
        } catch (error) {
          console.error("Error executing custom query:", error);
          return Response.json(
            { error: "Failed to execute query" },
            { status: 500 }
          );
        }
      },
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
