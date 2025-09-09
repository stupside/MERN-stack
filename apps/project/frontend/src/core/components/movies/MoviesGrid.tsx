import type { ReactNode } from "react";
import Link from "next/link";

export const MoviesGrid = <TMovie,>({
  movies,
  emptyState,
  renderMovie,
}: {
  movies: readonly TMovie[];
  renderMovie: (movie: TMovie) => ReactNode;
  emptyState: {
    title: string;
    subtitle: string;
    action?: {
      href: string;
      label: string;
    };
  };
}) => {
  if (movies.length === 0 && emptyState) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          {/** biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="No movies">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 3v13a2 2 0 002 2h8a2 2 0 002-2V7H7z" />
          </svg>
        </div>
        <p className="text-gray-600 text-lg font-medium mb-1">{emptyState.title}</p>
        <p className="text-gray-500 text-sm mb-6">{emptyState.subtitle}</p>
        {emptyState.action && (
          <Link
            href={emptyState.action.href}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white rounded-lg transition-all font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Search">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {emptyState.action.label}
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {movies.map(renderMovie)}
    </div>
  );
};
