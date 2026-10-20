<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Enums\UserRole;

class VerifyIsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'message' => 'unauthenticated'
            ], 401);
        }

        if ($user->role !== UserRole::Admin) {
            return response()->json([
                'message' => 'you are not authorized to perform this action'
            ], 403);
        }

        return $next($request);
    }
}
