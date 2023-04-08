//Next imports
import Head from "next/head";

//Prismic Imports
import * as prismicH from "@prismicio/helpers";
import * as prismic from "@prismicio/client";
import { createClient } from "../prismicio";
import { PrismicImage, PrismicRichText } from "@prismicio/react";

//Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";

//Components Imports
import {
  Bounded,
  Layout,
  HorizontalDivider,
  PostComponent,
  ProductComponent,
} from "../components";

const Index = ({ page, posts, featuredProducts, navigation, settings }) => {
  SwiperCore.use([Autoplay]);
  return (
    <Layout
      withHeaderDivider={false}
      navigation={navigation}
      settings={settings}
    >
      <Head>
        <title>{prismicH.asText(settings.data.name)}</title>
      </Head>

      {/* Banner Section */}
      <Bounded as="main">
        <div className="flex h-full w-full flex-row justify-center ">
          <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="text-center">
              <h1 className="text-5xl">{page.data.hometitle}</h1>
              <p className="mt-4 text-xl">
                {page.data.homedescription[0].text}
              </p>
            </div>
            <div className="w-full text-center">
              <PrismicImage field={page.data.homebanner} />
              <PrismicRichText field={page.data.bannerdescription} />
            </div>
          </div>
        </div>

        {/* New Posts Section*/}
        <div className="mt-8 w-full">
          <h1 className="mb-4 text-5xl">Posts destacados</h1>
          <HorizontalDivider />
          {posts.results.map((data) => {
            return (
              <div key={data.id}>
                <PostComponent data={data} />
                <HorizontalDivider />
              </div>
            );
          })}
        </div>

        {/* Featured Products Section*/}
        <div className="mt-8 w-full">
          <h1 className="mb-4 text-5xl">Productos destacados</h1>
          <HorizontalDivider />
          <Swiper
            spaceBetween={30}
            slidesPerView={3}
            autoplay={{
              delay: 2000,
            }}
          >
            {featuredProducts.results.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <ProductComponent item={item} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </Bounded>
    </Layout>
  );
};

export default Index;

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData });

  const page = await client.getSingle("home");
  const featuredProducts = await client.getByType("article", {
    limit: 4,
    predicates: [prismic.predicate.at("my.article.featured", true)],
    orderings: [
      { field: "my.article.first_publication_date", direction: "desc" },
    ],
  });

  const posts = await client.getByType("post", {
    limit: 4,
    orderings: [
      { field: "my.article.first_publication_date", direction: "desc" },
    ],
  });

  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");

  return {
    props: {
      page,
      posts,
      featuredProducts,
      navigation,
      settings,
    },
  };
}
