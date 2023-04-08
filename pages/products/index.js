// NextJs immports
import Head from "next/head";

//Prismic imports
import { PrismicRichText } from "@prismicio/react";
import { createClient } from "../../prismicio";

//Components imports
import { Layout, HorizontalDivider } from "../../components";

const customComponent = {
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

const Article = ({ navigation, settings, products, page }) => {
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
          <h1 className="text-6xl">{page.data.title}</h1>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          {products.map((product) => {
            return (
              <div key={product.uid} className="p-4">
                <a
                  href={`products/${product.uid}`}
                  className="flex flex-col content-center items-center justify-center hover:bg-white"
                >
                  <PrismicRichText
                    field={product.data.title}
                    components={customComponent}
                  />
                  <img
                    alt={product.uid}
                    src={product.data.featuredImage.url}
                    className="m-h-96 h-auto w-2/4 object-scale-down"
                  />
                  <div className="w-full p-8">
                    <p>Price: ${product.data.slices[0].primary.price}</p>
                    <p>Publication date: {product.data.publishDate}</p>
                  </div>
                </a>
                <HorizontalDivider />
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Article;

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData });

  const page = await client.getSingle("productspage");
  const products = await client.getAllByType("article");
  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");
  return {
    props: {
      page,
      products,
      navigation,
      settings,
    },
  };
}
