import Head from "next/head";
import { useRouter } from "next/router";
import { DefaultQueryCell } from "../../utils/DefaultQueryCell";
import { trpc } from "../../utils/trpc";
import { styles } from "../../styles/styles";

export default function PostPage() {
  const id = useRouter().query.id as string;
  const postQuery = trpc.useQuery(["post.byId", { id }]);
  return (
    <DefaultQueryCell
      query={postQuery}
      success={({ data }) => (
        <>
          <Head>
            <title>{data.title}</title>
            <meta name="description" content={data.description} />
          </Head>
          <main className={styles.blogContainer}>
            <h1 className={styles.blogTitle}>{data.title}</h1>
            <p className={styles.blogBody}>{data.body}</p>
            <em>Created {data.createAt.toLocaleDateString()}</em>
          </main>
        </>
      )}
    />
  );
}
