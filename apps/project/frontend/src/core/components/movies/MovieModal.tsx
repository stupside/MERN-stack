import type { FC, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

export const MovieModal: FC<{
  actions?: ReactNode;
  closeHref: string;
  playerHref?: string;
  movie: {
    title?: string | null;
    rating?: number | null;
    release?: string | null;
    language?: string | null;
    overview?: string | null;
    genres?: Array<{ id: number; name: string | null }>;
    production?: Array<{ id: number; company: string | null }>;
    images: {
      poster?: string | null;
      backdrop?: string | null;
    };
  };
}> = ({
  movie,
  actions,
  closeHref,
  playerHref,
}) => {
    return (
      <div className={`fixed inset-0 bg-black/25 flex items-center justify-center p-4 z-50`}>
        <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative">
          <Link
            href={closeHref}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            ✕
          </Link>
          <div className="p-8">
            <div className="flex items-start space-x-6">
              {movie.images?.poster && (
                <div className="flex-shrink-0">
                  <div className="w-32 h-48 overflow-hidden rounded-lg relative mb-3">
                    <Image
                      src={movie.images.poster}
                      alt={`${movie.title || "Movie"} poster`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {playerHref && (
                    <Link
                      href={playerHref}
                      className="w-32 px-3 py-2 bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white text-center text-sm font-medium rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] block"
                    >
                      ▶ Watch Now
                    </Link>
                  )}
                </div>
              )}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {movie.title || "Untitled"}
                </h2>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    {movie.release && (
                      <span>{new Date(movie.release).getFullYear()}</span>
                    )}
                    {movie.rating && (
                      <span>★ {movie.rating.toFixed(1)}</span>
                    )}
                    {movie.language && (
                      <span className="px-2 py-1 bg-gray-800 text-white text-xs rounded uppercase font-medium">
                        {movie.language}
                      </span>
                    )}
                  </div>
                  {movie.genres && movie.genres.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {movie.genres.map((genre, index) => (
                        <span
                          key={typeof genre === 'string' ? genre : genre.id || index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {typeof genre === 'string' ? genre : genre.name}
                        </span>
                      ))}
                    </div>
                  )}
                  {movie.overview && (
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {movie.overview}
                    </p>
                  )}
                  {movie.production && movie.production.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Production
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {movie.production.map((company) => (
                          <span
                            key={company.id}
                            className="px-2 py-1 bg-gray-200 text-gray-800 text-xs rounded-full"
                          >
                            {company.company}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {actions && (
                  <div className="text-center">
                    {actions}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };