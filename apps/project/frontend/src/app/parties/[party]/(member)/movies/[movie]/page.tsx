import { NextPage } from "next";
import Image from "next/image";
import { getMovieById } from "./action";

const Page: NextPage<{
    params: Promise<{ party: string; movie: number }>
}> = async (props) => {
    const params = await props.params;

    const movie = await getMovieById({ id: params.movie });

    return (
        <div>
            <h1>Movie Details</h1>
            <p>TMDB ID: {movie.ref}</p>
            <p>Title: {movie.title}</p>
            {movie.images.poster && <Image src={movie.images.poster} alt={`${movie.title} poster`} width={200} height={300} />}
            {movie.images.backdrop && <Image src={movie.images.backdrop} alt={`${movie.title} backdrop`} width={200} height={300} />}
        </div>
    );
}

export default Page;