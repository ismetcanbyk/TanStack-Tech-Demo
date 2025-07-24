import { Loader } from "@/components/Loader";
import { postDetailCommentColumns } from "@/components/tables/postDetailComment/column";
import { GlobalDataTable } from "@/components/tables/shared/global-data-table";
import { commentSchema } from "@/hooks/schema/post";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";

export const Route = createFileRoute("/(app)/posts/$postId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { postId } = Route.useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComment(postId),
    staleTime: 1000 * 60, // 1 dakika boyunca "fresh"
    gcTime: 1000 * 60 * 5, // 5 dakika boyunca cache'de tut
  });

  if (isLoading) return <Loader />;
  if (isError) return <p>Hata: {error?.message}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Post Comments {postId}</h1>
      <GlobalDataTable
        columns={postDetailCommentColumns}
        data={data ?? []}
        enableView={false}
      />
    </div>
  );
}

const fetchComment = async (blogId: string) => {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${blogId}/comments`
  );
  const checkData = commentSchema.array().safeParse(res.data);
  if (!checkData.success) {
    console.log(checkData.error);
    throw new Error(checkData.error.message);
  }
  return checkData.data;
};
