"use client"

import type { NextPage } from "next";

import { Player } from "./_private/Player";

const Page: NextPage<{
    params: Promise<{ movie: string }>
}> = async (props) => {
    const params = await props.params;

    const movie = {
        title: "Movie Title",
    }

    return (
        <Player title={movie.title} tmdbId={params.movie} />
    );
}

export default Page;