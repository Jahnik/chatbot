import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("chatbot", "routes/chatbot.tsx"),
    route("protected", "routes/protected.tsx"),
    route("api/auth/*", "routes/api.auth.$.ts")
] satisfies RouteConfig;
