import type { searchMoviesResBodySchema } from "libraries/api";
import type { FC } from "react";
import type { z } from "zod";
import Image from "next/image";

export const Movie: FC<{ movie: z.infer<typeof searchMoviesResBodySchema>[number] }> = ({ movie }) => {
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group overflow-hidden">
            {movie.images.poster ? (
                <div className="aspect-[2/3] relative overflow-hidden">
                    <Image 
                        src={movie.images.poster} 
                        alt={`${movie.title} poster`} 
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
            ) : (
                <div className="aspect-[2/3] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="text-gray-400 text-center">
                        <div className="text-4xl mb-2">🎬</div>
                        <div className="text-sm">No poster</div>
                    </div>
                </div>
            )}
            <div className="p-3">
                <h3 className="text-sm font-medium text-gray-800 group-hover:text-red-500 transition-colors line-clamp-2 leading-tight">
                    {movie.title}
                </h3>
            </div>
        </div>
    );
}