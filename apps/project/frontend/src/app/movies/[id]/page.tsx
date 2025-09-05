import type { NextPage } from "next";
import { Player } from "./_private/Player";

const Page: NextPage<{
    params: Promise<{ id: string }>
}> = async (props) => {
    const params = await props.params;

    const movie = {
        title: "Movie Title",
    }

    return <div>
        <Player title={movie.title} tmdbId={params.id} />
    </div>;
}

export default Page;