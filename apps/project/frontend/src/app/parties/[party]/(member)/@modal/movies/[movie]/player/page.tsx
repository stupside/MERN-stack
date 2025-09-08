"use client"

import type { NextPage } from "next";
import Link from "next/link";

import { Player } from "./_private/Player";

const Page: NextPage<{
    params: Promise<{ movie: number }>
}> = async (props) => {
    const params = await props.params;

    const movie = {
        title: "Movie Title",
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
            <div className="w-full h-full max-w-7xl mx-4 relative">
                <div className="absolute top-4 right-4 z-10">
                    <Link
                        href="../.."
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white text-xl"
                    >
                        ×
                    </Link>
                </div>
                <div className="w-full h-full bg-black rounded-xl overflow-hidden shadow-2xl">
                    <Player title={movie.title} ref={params.movie} />
                </div>
            </div>
        </div>
    );
}

export default Page;