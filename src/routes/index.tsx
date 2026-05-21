import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/tatva/nav";
import { Hero } from "@/components/tatva/hero";
import { Ticker } from "@/components/tatva/ticker";
import { Forkable } from "@/components/tatva/forkable";
import { DNA } from "@/components/tatva/dna";
import { Builder } from "@/components/tatva/builder";
import { Rooms } from "@/components/tatva/rooms";
import { Agents } from "@/components/tatva/agents";
import { Simulator } from "@/components/tatva/simulator";
import { Auth } from "@/components/tatva/auth";
import { Footer } from "@/components/tatva/footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="grain relative min-h-screen bg-ink-0 text-fg">
      <Nav />
      <Hero />
      <Ticker />
      <Forkable />
      <DNA />
      <Builder />
      <Rooms />
      <Agents />
      <Simulator />
      <Auth />
      <Footer />
    </main>
  );
}
