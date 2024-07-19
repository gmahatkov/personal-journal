import {
    json,
    type RequestEvent,
    type RequestHandler
} from "@sveltejs/kit";
import type { UserRole } from "@prisma/client";
import {prisma} from "$lib/server/data/utils/db";

export type APIRoute = {
    GET?: RequestHandler;
    POST?: RequestHandler;
    PUT?: RequestHandler;
    DELETE?: RequestHandler;
    PATCH?: RequestHandler;
    OPTIONS?: RequestHandler;
    HEAD?: RequestHandler;
    CONNECT?: RequestHandler;
    TRACE?: RequestHandler;
    fallback?: RequestHandler;
}

type UseAPIRoutesWithFallbackParams = {
    routes: APIRoute,
    protectedRoutes?: Array<{ method: keyof APIRoute, role: UserRole}>,
    fallbackOverride?: RequestHandler,
}

export type UseAPIRoutes = (params: UseAPIRoutesWithFallbackParams) => APIRoute;

type ProtectedHandle = (handle: RequestHandler, role: UserRole) => RequestHandler;

const protectHandle: ProtectedHandle = (handle: RequestHandler, role) =>
    async (event: RequestEvent) => {
        const session = await event.locals.auth();
        const errorResponse = json({
            message: "Unauthorized"
        }, {
            status: 401,
            statusText: "Unauthorized",
        });
        if (!session?.user?.email) return errorResponse;
        const user = await prisma.user.findUnique({
            where: {
                email: String(session.user?.email),
            },
        });
        if (user?.role !== role) return errorResponse;
        return handle(event);
    };

const fallback: RequestHandler = async (event: RequestEvent) =>
    json({
        message: `Specified method (${event.request.method}) is not implemented for route: ${event.url.pathname}.`
    }, {
        status: 501,
        statusText: "Not Implemented",
    });

export const useAPIRoutes: UseAPIRoutes =
({
    routes,
    protectedRoutes = [],
    fallbackOverride = fallback,
}) =>
{
    routes.fallback = fallbackOverride;
    if (Array.isArray(protectedRoutes) && protectedRoutes.length > 0) {
        for (const route of protectedRoutes) {
            if (typeof routes[route.method] === "function") {
                routes[route.method] = protectHandle(routes[route.method] as RequestHandler, route.role);
            }
        }
    }
    return routes;
}
