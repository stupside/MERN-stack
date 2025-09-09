"use client";

import Image from "next/image";
import Link from "next/link";
import type { FC, ReactNode } from "react";

export const MovieCard: FC<{
  href?: string;
  actions?: ReactNode;
  movie: {
    ref: number;
    title?: string | null;
    rating?: number | null;
    release?: string | null;
    language?: string | null;
    images: {
      poster?: string | null;
      backdrop?: string | null;
    };
  };
}> = ({
  href,
  movie,
  actions,
}) => {
    const cardContent = (
      <>
        {movie.images?.poster ? (
          <Image
            src={movie.images.poster}
            alt={`${movie.title || "Movie"} poster`}
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
              {movie.title || "Untitled"}
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-white/80">
                {movie.release && (
                  <span>{new Date(movie.release).getFullYear()}</span>
                )}
                {movie.rating && <span>★ {movie.rating.toFixed(1)}</span>}
                {movie.language && (
                  <span className="px-1.5 py-0.5 bg-white/20 text-white text-xs rounded uppercase font-medium">
                    {movie.language}
                  </span>
                )}
              </div>
              {actions && (
                <div className="flex items-center space-x-1">{actions}</div>
              )}
            </div>
          </div>
        </div>
      </>
    );

    const baseClassName = `group cursor-pointer relative overflow-hidden rounded-lg aspect-[2/3] block`;

    if (href) {
      return (
        <Link href={href} className={baseClassName}>
          {cardContent}
        </Link>
      );
    }

    return <div className={baseClassName}>{cardContent}</div>;
  };
