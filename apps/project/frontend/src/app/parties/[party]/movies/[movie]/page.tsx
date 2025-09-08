import { NextPage } from "next";
import { getMovieById } from "./action";

const Page: NextPage<{
    params: Promise<{ party: string; movie: string }>
}> = async (props) => {
    const params = await props.params;

    const movie = await getMovieById({ id: params.movie });

    return (
        <div>
            <h1>Movie Details</h1>
            <p>TMDB ID: {movie.tmdbId}</p>
            <p>Title: {movie.title}</p>
        </div>
    );
}

export default Page;