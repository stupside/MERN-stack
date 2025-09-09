import type { ReactNode } from "react";

export interface MoviesGridProps<TMovie> {
    movies: readonly TMovie[];
    renderMovie: (movie: TMovie) => ReactNode;
    emptyState: {
        title: string;
        subtitle: string;
    };
    className?: string;
}

export const MoviesGrid = <TMovie,>({
    movies,
    emptyState,
    renderMovie,
    className = ""
}: MoviesGridProps<TMovie>) => {
    if (movies.length === 0 && emptyState) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">{emptyState.title}</p>
                <p className="text-gray-400 text-sm mt-2">{emptyState.subtitle}</p>
            </div>
        );
    }

    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
            {movies.map(renderMovie)}
        </div>
    );
};