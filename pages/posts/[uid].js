//Next imports
import Head from "next/head";

//Prismic imports
import * as prismicH from "@prismicio/helpers";
import { PrismicImage, PrismicRichText, PrismicText } from "@prismicio/react";
import { createClient } from "../../prismicio";

//Components imports
import { Layout, HorizontalDivider, Bounded, components } from "../../components";

const Article = ({ navigation, settings, page }) => {
  return (
    <Layout
      withHeaderDivider={false}
      navigation={navigation}
      settings={settings}
    >
      <Head>
        <title>
          {prismicH.asText(page.data.title)}
          {prismicH.asText(settings.data.name)}
        </title>
      </Head>
      <div>
        <div className="mx-auto my-auto flex h-full w-full max-w-7xl flex-col items-center justify-center bg-slate-100 px-4 py-8">
          {page.data.slices.map((slice) => {
            return (
              <div>
                {slice.items.map((item) => {
                  return (
                    <>
                      <PrismicRichText
                        field={item.title}
                        components={components}
                      />
                      <PrismicRichText
                        field={item.subtitle}
                        components={components}
                      />
                      <HorizontalDivider />
                      <div>
                        <div className="my-4">
                          <PrismicImage field={item.image} />
                          <HorizontalDivider />
                        </div>
                        <div className="my-4">
                          <PrismicRichText
                            field={item.paragraph}
                            components={components}
                          />
                        </div>
                      </div>
                    </>
                  );
                })}
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
  const page = await client.getByUID("post", params.uid);
  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");

  return {
    props: {
      page,
      navigation,
      settings,
    },
  };
}
export async function getStaticPaths() {
  const client = createClient();

  const articles = await client.getAllByType("post");
  return {
    paths: articles.map((article) => prismicH.asLink(article)),
    fallback: false,
  };
}
