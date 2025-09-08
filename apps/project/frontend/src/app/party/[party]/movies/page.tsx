"use client"

import { useState, useEffect } from "react";

import type { z } from "zod";
import type { NextPage } from "next";
import type { searchMoviesResBodySchema } from "api";

import { searchMovies } from "./action";
import { Movies } from "./_private/Movies";

const Page: NextPage = () => {

    const [name, setName] = useState<string>();
    const [movies, setMovies] = useState<z.infer<typeof searchMoviesResBodySchema>>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const result = await searchMovies({ name: name ?? "" });
                if (result.success) {
                    setMovies(result.data);
                } else {
                    console.error("Failed to parse movies response", result.error);
                }
            } catch (error) {
                console.error("Failed to fetch movies", error);
            }
        }

        fetchMovies();
    }, [name])

    return <div>
        <div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Search movies..." />
        </div>
        <Movies movies={movies} />
    </div>;
}

export default Page;