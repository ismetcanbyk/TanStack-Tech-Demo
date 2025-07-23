import { createFileRoute } from "@tanstack/react-router";
import { Button } from "../components/ui/button";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <div className="flex gap-6">
        <Button asChild size="lg">
          <a href="/posts">Posts</a>
        </Button>
        <Button asChild size="lg" variant="outline">
          <a href="/pokemon">Pokemon</a>
        </Button>
      </div>
    </div>
  );
}
