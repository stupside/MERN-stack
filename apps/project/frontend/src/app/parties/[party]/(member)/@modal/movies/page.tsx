"use client"

import { useState, useEffect } from "react";

import type { z } from "zod";
import type { NextPage } from "next";
import type { searchMoviesResBodySchema } from "api";

import { searchMovies } from "./action";
import { Movies } from "./_private/Movies";
import Link from "next/link";
import { useParams } from "next/navigation";

const Page: NextPage = () => {
    const params = useParams<{
        party: string
    }>();

    const [name, setName] = useState<string>();
    const [movies, setMovies] = useState<z.infer<typeof searchMoviesResBodySchema>>([]);


    useEffect(() => {
        const timer = setTimeout(() => {
            const fetchMovies = async () => {
                try {
                    if (!name) {
                        setMovies([]);
                    } else {
                        const result = await searchMovies({ name });
                        if (result.success) {
                            setMovies(result.data);
                        } else {
                            console.error("Failed to parse movies response", result.error);
                        }
                    }
                } catch (error) {
                    console.error("Failed to fetch movies", error);
                }
            }

            fetchMovies();
        }, 1000);

        return () => clearTimeout(timer);
    }, [name])

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 p-4"
        >
            <div className="bg-white rounded-xl max-w-7xl w-full max-h-[95vh] overflow-hidden shadow-2xl border border-gray-100">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-light text-gray-800">Search Movies</h2>
                    <Link
                        href=".."
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
                    >
                        ×
                    </Link>
                </div>
                <div className="p-6 overflow-y-auto max-h-[calc(95vh-120px)]">
                    <div className="mb-6">
                        <input
                            type="text"
                            value={name || ''}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Search movies..."
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none transition-all text-gray-800 placeholder-gray-500"
                        />
                    </div>
                    <Movies party={params.party} movies={movies} />
                </div>
            </div>
        </div>
    );
}

export default Page;