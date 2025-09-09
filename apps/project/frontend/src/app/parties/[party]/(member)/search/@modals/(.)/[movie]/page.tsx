import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { getMovieById } from "./action";

const Page: NextPage<{
    params: Promise<{ party: string; movie: string }>;
}> = async (props) => {
    const params = await props.params;

    const movie = await getMovieById({ id: Number.parseInt(params.movie, 10) });
    if (!movie.success || !movie.data) {
        return <div className="fixed inset-0 bg-black/25 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                <div className="p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        Movie not found
                    </h2>
                    <p className="text-gray-600 mb-6">
                        No movie found with id {params.movie}
                    </p>
                    <Link
                        href={`/parties/${params.party}/search`}
                        className="block w-full px-4 py-2 text-center text-gray-600 hover:text-gray-800 border border-gray-300 hover:border-gray-400 rounded-lg transition-colors"
                    >
                        Close
                    </Link>
                </div>
            </div>
        </div>;
    }
    if (!movie.data) {
        return <div>Unexpected error</div>;
    }

    return (
        <div className="fixed inset-0 bg-black/25 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                <div className="p-8">
                    <div className="flex items-start space-x-6">
                        {movie.data.images.poster && (
                            <div className="w-32 h-48 flex-shrink-0 overflow-hidden rounded-lg relative">
                                <Image
                                    src={movie.data.images.poster}
                                    alt={`${movie.data.title} poster`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                {movie.data.title}
                            </h2>
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    {movie.data.release && (
                                        <span>{new Date(movie.data.release).getFullYear()}</span>
                                    )}
                                    {movie.data.rating && (
                                        <span>★ {movie.data.rating.toFixed(1)}</span>
                                    )}
                                    {movie.data.language && (
                                        <span className="px-2 py-1 bg-gray-800 text-white text-xs rounded uppercase font-medium">{movie.data.language}</span>
                                    )}
                                </div>
                                {movie.data.genres.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {movie.data.genres.map((genre) => (
                                            <span
                                                key={genre.id}
                                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                                            >
                                                {genre.name}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                {movie.data.overview && (
                                    <p className="text-gray-600 leading-relaxed text-sm">
                                        {movie.data.overview}
                                    </p>
                                )}
                                {movie.data.production && movie.data.production.length > 0 && (
                                    <div className="mt-4">
                                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                            Production
                                        </h4>
                                        <div className="flex flex-wrap gap-1">
                                            {movie.data.production.map((company) => (
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
                            <div className="space-y-3">
                                <button
                                    type="button"
                                    className="w-full px-4 py-2 bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white rounded-lg transition-all font-medium"
                                >
                                    Add to Watchlist
                                </button>
                                <Link
                                    replace
                                    href={`/parties/${params.party}/search`}
                                    className="block w-full px-4 py-2 text-center text-gray-600 hover:text-gray-800 border border-gray-300 hover:border-gray-400 rounded-lg transition-colors"
                                >
                                    Close
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;