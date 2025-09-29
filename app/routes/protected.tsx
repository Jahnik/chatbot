import { redirect, type LoaderFunctionArgs } from "react-router";
import type { Route } from "./+types/protected";
import { auth } from "~/lib/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
    const session = await auth.api.getSession({ headers: request.headers })
    if (session?.user) {
        return { user: session.user }
    } else {
        throw redirect("/")
    }
}

export default function Protected({ loaderData }: Route.ComponentProps) {
    return <div> Hello, {(loaderData.user.email)}</div>
}