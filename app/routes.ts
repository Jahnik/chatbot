import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("chatbot", "routes/chatbot.tsx")
] satisfies RouteConfig;
