import { NextPage } from "next";
import { getMovieById } from "./action";
import { Movie } from "./_private/Movie";

const Page: NextPage<{
    params: Promise<{ party: string; movie: string }>
}> = async (props) => {
    const params = await props.params;

    const movie = await getMovieById({ id: parseInt(params.movie) });

    return <Movie movie={movie} />;
}

export default Page;