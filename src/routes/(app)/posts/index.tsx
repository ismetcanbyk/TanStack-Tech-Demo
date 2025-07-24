import { postColumns } from "@/components/tables/post/columns";
import { Loader } from "@/components/Loader";
import { postSchema } from "@/hooks/schema/post";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { GlobalDataTable } from "@/components/tables/shared/global-data-table";

export const Route = createFileRoute("/(app)/posts/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 1000 * 60, // 1 dakika boyunca "fresh"
    gcTime: 1000 * 60 * 5, // 5 dakika boyunca cache'de tut
  });

  if (isLoading) return <Loader />;
  if (isError) return <p>Hata: {error?.message}</p>;

  return (
    <GlobalDataTable
      columns={postColumns}
      data={data ?? []}
      filterColumn="title"
    />
  );
}

const fetchPosts = async () => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  const checkData = postSchema.array().safeParse(res.data);
  if (!checkData.success) {
    console.log(checkData.error);
    throw new Error(checkData.error.message);
  }
  return checkData.data;
};
