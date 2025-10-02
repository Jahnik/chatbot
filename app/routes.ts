import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/chatbot.tsx"),
    route("protected", "routes/protected.tsx"),
    route("api/auth/*", "routes/api.auth.$.ts"),
    route("ai", "routes/ai.ts"),
    route("authLeft", "routes/authLeft.ts"),
    route("authRight", "routes/authRight.ts"),
    route("libLeft", "routes/libLeft.ts"),
    route("libRight", "routes/libRight.ts")
] satisfies RouteConfig;