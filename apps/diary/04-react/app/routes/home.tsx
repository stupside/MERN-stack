import Header from "~/components/Header";

import type { Route } from "./+types/home";

import Footer from "~/components/Footer";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <div className="flex flex-col min-h-screen">
    <Header title="Home" />
    <main className="flex-grow container mx-auto p-4">
      <h1>Welcome to the Home Page</h1>
    </main>
    <Footer />
  </div>;
}
