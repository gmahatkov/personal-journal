import {
    json,
    type RequestEvent,
    type RequestHandler
} from "@sveltejs/kit";

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

export function useAPIRoutesWithFallback(routesObj: APIRoute): APIRoute {
    routesObj.fallback = routesObj.fallback ?? (async (event: RequestEvent) =>
        json({
            message: `Specified method (${event.request.method}) is not implemented for route: ${event.url.pathname}.`
        }, {
            status: 501,
            statusText: "Not Implemented",
        })
    );
    return routesObj;
}
