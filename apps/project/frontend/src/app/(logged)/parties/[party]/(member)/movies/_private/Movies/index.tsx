import type { getPartyByIdSchema } from "api/schemas/parties";
import Link from "next/link";
import type { FC } from "react";
import type z from "zod";
import { MoviesGrid } from "../../../../../../../../core/components/movies";
import { Movie } from "./Movie";

export const Movies: FC<{
  party: string;
  movies: z.infer<typeof getPartyByIdSchema.result>["movies"];
  searchHref: string;
}> = ({ movies, party, searchHref }) => {
  const AddMovieCard = () => (
    <Link
      href={searchHref}
      className="group cursor-pointer relative overflow-hidden rounded-lg aspect-[2/3] block bg-gray-100 hover:bg-gray-200 transition-all"
    >
      <div className="w-full h-full flex items-center justify-center text-gray-500 group-hover:text-red-500 transition-colors">
        {/** biome-ignore lint/a11y/noSvgWithoutTitle: decorative icon */}
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-label="Add movie"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div>
    </Link>
  );

  if (movies.length === 0) {
    return (
      <MoviesGrid
        movies={movies}
        renderMovie={(movie) => (
          <Movie key={movie.id} movie={movie} party={party} />
        )}
        emptyState={{
          title: "No movies yet",
          subtitle: "Add some movies to your watchlist",
        }}
      />
    );
  }

  return (
    <MoviesGrid
      movies={[...movies, { id: "add-movie", isAddCard: true }]}
      renderMovie={(movie) => {
        if ("isAddCard" in movie) {
          return <AddMovieCard key="add-movie" />;
        }
        return <Movie key={movie.id} movie={movie} party={party} />;
      }}
      emptyState={{
        title: "No movies yet",
        subtitle: "Add some movies to your watchlist",
      }}
    />
  );
};
