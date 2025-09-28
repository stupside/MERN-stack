import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { getMovieById } from "../../../../../../../core/api";
import { RemoveForm } from "./_private/RemoveForm";
import { WatchButton } from "./_private/WatchButton";

const Page: NextPage<{
  params: Promise<{ party: string; movie: string }>;
}> = async (props) => {
  const params = await props.params;

  const movie = await getMovieById({ id: Number.parseInt(params.movie, 10) });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href={`/parties/${params.party}/movies`}
            className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Back to movies
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {movie.images?.poster && (
            <div className="flex-shrink-0">
              <div className="w-64 h-96 overflow-hidden rounded-lg relative mb-4">
                <Image
                  src={movie.images.poster}
                  alt={`${movie.title || "Movie"} poster`}
                  fill
                  className="object-cover"
                />
              </div>
              <WatchButton
                party={params.party}
                movie={{
                  id: movie.ref,
                  title: movie.title,
                  poster: movie.images?.poster || null,
                }}
              />
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              {movie.title || "Untitled"}
            </h1>

            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-6 text-lg text-gray-600">
                {movie.release && (
                  <span>{new Date(movie.release).getFullYear()}</span>
                )}
                {movie.rating && <span>★ {movie.rating.toFixed(1)}</span>}
                {movie.language && (
                  <span className="px-3 py-1 bg-gray-800 text-white text-sm rounded uppercase font-medium">
                    {movie.language}
                  </span>
                )}
              </div>

              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre, index) => (
                    <span
                      key={
                        typeof genre === "string" ? genre : genre.id || index
                      }
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {typeof genre === "string" ? genre : genre.name}
                    </span>
                  ))}
                </div>
              )}

              {movie.overview && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Overview
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {movie.overview}
                  </p>
                </div>
              )}

              {movie.production && movie.production.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Production Companies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {movie.production.map((company) => (
                      <span
                        key={company.id}
                        className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-full"
                      >
                        {company.company}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-6 border-t border-gray-200">
              <RemoveForm party={params.party} movie={movie.ref} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
