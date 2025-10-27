"use client";

import type { searchMoviesSchema } from "api/schemas/movies";
import type { NextPage } from "next";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type z from "zod";
import { Movies } from "./_private/Movies";
import { searchMovies } from "../../../../../../../core/api";

const Page: NextPage = () => {
  const params = useParams() as { party: string };

  const [name, setName] = useState<string>();
  const [movies, setMovies] = useState<
    z.infer<typeof searchMoviesSchema.result>
  >([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchMovies = async () => {
        if (!name?.trim()) {
          setMovies([]);
        } else {
          const movies = await searchMovies({ name });
          if (movies.error) {
            throw new Error("Failed to search movies");
          }
          if (!movies.value) {
            throw new Error("No movies found");
          }
          setMovies(movies.value);
        }
      };

      fetchMovies();
    }, 1500);

    return () => clearTimeout(timer);
  }, [name]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Search Movies</h2>
        <Link
          href={`/parties/${params.party}/movies`}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
        >
          {/** biome-ignore lint/a11y/noSvgWithoutTitle: ignore */}
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-label="Back"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Movies
        </Link>
      </div>

      <div className="mb-6">
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Search movies..."
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none transition-all text-gray-800 placeholder-gray-500"
        />
      </div>
      <Movies name={name} party={params.party} movies={movies} />
    </div>
  );
};

export default Page;
