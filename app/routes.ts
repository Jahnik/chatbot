import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/chatbot.tsx"),
    route("protected", "routes/protected.tsx"),
    route("api/auth/*", "routes/api.auth.$.ts"),
    route("ai", "routes/ai.ts"),
] satisfies RouteConfig;