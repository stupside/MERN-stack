import type { ReactNode } from "react";

export const MoviesGrid = <TMovie,>({
  movies,
  emptyState,
  renderMovie,
}: {
  readonly movies: readonly TMovie[];
  readonly renderMovie: (movie: TMovie) => ReactNode;
  readonly emptyState: {
    title: string;
    subtitle: string;
  };
}) => {
  if (movies.length === 0 && emptyState) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          {/** biome-ignore lint/a11y/noSvgWithoutTitle: ignore */}
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-label="No movies"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 3v13a2 2 0 002 2h8a2 2 0 002-2V7H7z"
            />
          </svg>
        </div>
        <p className="text-gray-600 text-lg font-medium mb-1">
          {emptyState.title}
        </p>
        <p className="text-gray-500 text-sm mb-6">{emptyState.subtitle}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {movies.map(renderMovie)}
    </div>
  );
};
