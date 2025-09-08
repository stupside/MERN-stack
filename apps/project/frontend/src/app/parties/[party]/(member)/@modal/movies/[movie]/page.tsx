import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { getMovieById } from "./action";

const Page: NextPage<{
    params: Promise<{ party: string; movie: number }>
}> = async (props) => {
    const params = await props.params;

    const movie = await getMovieById({ id: params.movie });

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-gray-100">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-light text-gray-800">Movie Details</h2>
                    <Link
                        href=".."
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
                    >
                        ×
                    </Link>
                </div>
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            {movie.images.poster && (
                                <div className="aspect-[2/3] relative rounded-xl overflow-hidden shadow-lg">
                                    <Image 
                                        src={movie.images.poster} 
                                        alt={`${movie.title} poster`} 
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-light text-gray-800 mb-2">{movie.title}</h1>
                                <p className="text-gray-500">TMDB ID: {movie.ref}</p>
                            </div>
                            
                            {movie.images.backdrop && (
                                <div>
                                    <h3 className="text-lg font-medium text-gray-800 mb-3">Backdrop</h3>
                                    <div className="aspect-video relative rounded-xl overflow-hidden shadow-lg">
                                        <Image 
                                            src={movie.images.backdrop} 
                                            alt={`${movie.title} backdrop`} 
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page;