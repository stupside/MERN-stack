import { NextPage } from "next";

const Page: NextPage<{
    params: Promise<{ party: string; movie: string }>;
}> = async (props) => {
    const params = await props.params;

    const url = `https://vidsrc.to/embed/movie/${params.movie}`;

    return (
        <iframe
            src={url}
            className="fixed inset-0 w-full h-full bg-black z-50"
            title="Video Player"
            allow="autoplay; fullscreen"
            allowFullScreen
        />
    );
};

export default Page;