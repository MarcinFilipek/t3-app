import { empty } from "@prisma/client/runtime";
import Link from "next/link";
import { styles } from "../styles/styles";
import { DefaultQueryCell } from "../utils/DefaultQueryCell";
import { trpc } from "../utils/trpc";

type BlogPostProps = {
  id: string;
  title: string;
};

export const PostsCell = () => {
  const postQuery = trpc.useQuery(["post.all"]);

  return (
    <>
      <h2 className={styles.blogHeader}>Posts</h2>

      {postQuery.status === "loading"}

      <DefaultQueryCell
        query={postQuery}
        success={({ data }: any) =>
          data.map(({ id, title }: BlogPostProps) => (
            <Link key={id} href={`/post/${id}`}>
              <p className={styles.link}>{title}</p>
            </Link>
          ))
        }
        empty={() => <p>WE NEED POSTS!!!</p>}
      />
    </>
  );
};
