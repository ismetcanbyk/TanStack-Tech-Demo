import { Header } from "@/components/Header";
import { Spinner } from "@/components/Spinner";
import { testContext, type TestContext } from "@/context/testContext";
import { QueryClient } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouterState,
} from "@tanstack/react-router";

function RouterSpinner() {
  const isLoading = useRouterState({ select: (s) => s.status === "pending" });
  return <Spinner show={isLoading} />;
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  testContext: TestContext;
}>()({
  component: RootComponent,
  context: () => ({
    testContext,
  }),
});

function RootComponent() {
  return (
    <>
      <Header />
      <RouterSpinner />
      <Outlet />
    </>
  );
}
