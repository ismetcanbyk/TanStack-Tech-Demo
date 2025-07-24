import { Header } from "@/components/Header";
import { Spinner } from "@/components/Spinner";
import { testContext, type TestContext } from "@/store/testContext";
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
      <div className={`min-h-screen flex flex-col`}>
        <Header />
        <div className={`flex-1 flex`}>
          <div className={`flex-1 border-l`}>
            <RouterSpinner />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
