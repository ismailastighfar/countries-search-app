import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Countries Search App" },
    { name: "description", content: "Welcome to Countries Search App!" },
  ];
}

export default function Home() {
  return <h1>Welcome to home</h1>;
}
