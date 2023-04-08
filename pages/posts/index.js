//Next imports
import Head from "next/head";

//Prismic imports
import { PrismicRichText } from "@prismicio/react";
import { createClient } from "../../prismicio";

//Component imports
import { Layout, HorizontalDivider, PostComponent } from "../../components";

export const customComponent = {
  heading1: ({ node, children }) => (
    <h1 className="p-2 text-center text-2xl">{children}</h1>
  ),
  heading2: ({ node, children }) => (
    <h2 className="my-2 text-center text-3xl">{children}</h2>
  ),
  heading3: ({ node, children }) => (
    <h3 className="my-2 text-2xl">{children}</h3>
  ),
  paragraph: ({ node, children }) => <p className="text-normal">{children}</p>,
};

const Article = ({ navigation, settings, posts, page }) => {
  return (
    <Layout
      withHeaderDivider={false}
      navigation={navigation}
      settings={settings}
    >
      <Head>
        <title>{page.data.title}</title>
      </Head>

      <div className="mx-auto my-auto max-w-7xl bg-slate-100 px-4 py-8">
        <div>
          <h1 className="text-5xl">{page.data.title}</h1>
        </div>
        <div className="flex flex-col">
          {posts.map((post) => {
            return <PostComponent key={post.id} data={post} />;
          })}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4"></div>
      </div>
    </Layout>
  );
};

export default Article;

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData });

  const page = await client.getSingle("postspage");
  const posts = await client.getAllByType("post");
  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");
  return {
    props: {
      page,
      posts,
      navigation,
      settings,
    },
  };
}
