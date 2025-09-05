import type { NextPage } from "next";
import { searchMovies } from "./action";

const Page: NextPage = async () => {

    const movies = await searchMovies({ name: "Inception" });

    return <div>
        {JSON.stringify(movies)}
    </div>;
}

export default Page;