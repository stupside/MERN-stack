"use client";

import type { getPartyByIdResBodySchema } from "api/schemas/parties";

import type { FC } from "react";
import type z from "zod";
import Image from "next/image";
import { useActionState, useEffect } from "react";
import { removeMovieFromWatchlist } from "../../../action";
import { useRouter } from "next/navigation";

export const Movie: FC<{
    movie: z.infer<typeof getPartyByIdResBodySchema>["movies"][number];
    party: string;
}> = ({ movie, party }) => {

    const router = useRouter();

    const [state, dispatch, isPending] = useActionState(async (_: unknown, __: FormData) => removeMovieFromWatchlist({
        id: party,
        movie: movie.id,
    }), false);

    useEffect(() => {
        if (state) {
            router.refresh();
        }
    }, [state, router]);

    return (
        <div className="group cursor-pointer relative overflow-hidden rounded-lg aspect-[2/3] block">
            {movie.images?.poster ? (
                <Image
                    src={movie.images.poster}
                    alt={`${movie.title} poster`}
                    fill
                    className="object-cover"
                />
            ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="text-gray-400 text-center">
                        <div className="text-2xl mb-1">🎬</div>
                    </div>
                </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white text-sm font-medium line-clamp-2 mb-1">
                        {movie.title}
                    </h3>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs text-white/80">
                            {movie.release && (
                                <span>{new Date(movie.release).getFullYear()}</span>
                            )}
                            {movie.rating && (
                                <span>★ {movie.rating.toFixed(1)}</span>
                            )}
                            {movie.language && (
                                <span className="px-1.5 py-0.5 bg-white/20 text-white text-xs rounded uppercase font-medium">{movie.language}</span>
                            )}
                        </div>
                        <form action={dispatch}>
                            <button
                                type="submit"
                                className="p-1 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors disabled:opacity-50 cursor-pointer"
                                title="Remove from watchlist"
                            >
                                {isPending ? (
                                    <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25" />
                                        <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" opacity="0.75" />
                                    </svg>
                                ) : (
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}