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
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-200">
          <div className="absolute bottom-2 left-2 right-2">
            <h3 className="text-white text-xs font-medium line-clamp-2 mb-1">
              {movie.title || "Untitled"}
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 text-xs text-white/90">
                {movie.release && (
                  <span>{new Date(movie.release).getFullYear()}</span>
                )}
                {movie.rating && <span>★ {movie.rating.toFixed(1)}</span>}
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
