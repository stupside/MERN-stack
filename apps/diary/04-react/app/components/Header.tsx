import type { FC } from "react";

const Header: FC<{
    title: string
}> = ({ title }) => {
    return (
        <header className="bg-gray-800 text-white p-4">
            <h1>{title}</h1>
        </header>
    );
}
export default Header;