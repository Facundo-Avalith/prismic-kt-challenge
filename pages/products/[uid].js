//Next & React imports
import Head from "next/head";
import { useState, useEffect } from "react";

//Prismic imports
import { PrismicRichText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { createClient } from "../../prismicio";

//Components imports
import { Layout, HorizontalDivider, components } from "../../components";

const Article = ({ navigation, settings, page }) => {
  const [mainImage, setMainImage] = useState();

  const handleOnMouseEnter = (item) => {
    setMainImage(item);
  };
  const handleOnMovueLeave = () => {
    setMainImage(page.data.featuredImage);
  };

  useEffect(() => {
    setMainImage(page.data.featuredImage);
  }, []);

  return (
    <Layout
      withHeaderDivider={false}
      navigation={navigation}
      settings={settings}
    >
      <Head>
        <title>
          {prismicH.asText(page.data.title)} |{" "}
          {prismicH.asText(settings.data.name)}
        </title>
      </Head>
      <div className="mx-auto my-auto max-w-7xl bg-slate-100 px-4 py-8">
        <div className="grid w-full grid-cols-5 gap-8">
          {/* Left Col */}
          <div className="col-start-1 col-end-2 grid auto-rows-min grid-cols-1 gap-y-2 p-2">
            {page.data.slices[0].items.map((item) => {
              return (
                <div
                  onMouseEnter={() => handleOnMouseEnter(item.carrousel)}
                  onMouseLeave={() => handleOnMovueLeave(item.carrousel)}
                  className="max-h-36 w-36 justify-self-center object-scale-down"
                  key={item.carrousel.url}
                >
                  <img
                    className="h-full w-full object-scale-down"
                    src={item.carrousel.url}
                    alt={item.carrousel.alt}
                  />
                </div>
              );
            })}
          </div>

          {/* Center Col */}
          <div className="col-start-2 col-end-4 justify-self-center">
            <img
              className="object-scale-down p-8"
              src={mainImage?.url ? mainImage.url : page.data.featuredImage.url}
              alt={mainImage?.alt ? mainImage.alt : page.data.featuredImage.url}
            />
          </div>

          {/* Right Col */}
          <div className="col-start-4 col-end-6 mt-4 justify-self-center p-2">
            <PrismicRichText field={page.data.slices[0].primary.title} />
            <HorizontalDivider />
            <div className="col-start-4 col-end-6">
              <h1>Price: ${page.data.slices[0].primary.price}</h1>
              <h1>Publication Date: {page.data.publishDate}</h1>
              <HorizontalDivider />
              <PrismicRichText
                field={page.data.slices[0].primary.description}
                components={components}
              />
              <HorizontalDivider />
            </div>
            <div className="flex flex-row content-center items-center justify-evenly">
              <button className="w-1/4 rounded-xl border bg-white p-4">
                +1
              </button>
              <p className="rounded-xl border bg-white p-4">{0}</p>
              <button className="w-1/4 rounded-xl border bg-white p-4">
                -1
              </button>
              <button className="w-1/4 rounded-xl border bg-slate-800 p-4 text-white">
                Comprar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Article;

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData });
  const page = await client.getByUID("article", params.uid);
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
  const articles = await client.getAllByType("article");
  return {
    paths: articles.map((article) => prismicH.asLink(article)),
    fallback: false,
  };
}
