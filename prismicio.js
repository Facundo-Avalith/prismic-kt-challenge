import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";

import sm from "./sm.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName = prismic.getRepositoryName(sm.apiEndpoint);

/**
 * The project's Prismic Route Resolvers. This list determines a Prismic document's URL.
 *
 * @type {prismic.ClientConfig['routes']}
 */
const routes = [
  {
    type: "home",
    path: "/",
  },
  {
    type: "productspage",
    path: "/products",
  },
  {
    type: "article",
    path: "/products/:uid",
  },
  {
    type: "postspage",
    path: "/posts",
  },
  {
    type: "post",
    path: "/posts/:uid",
  },
];
/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config {prismicNext.CreateClientConfig} - A configuration object to
 */
export const createClient = ({ previewData, req, ...config } = {}) => {
  const client = prismic.createClient(sm.apiEndpoint, {
    routes,
    ...config,
  });

  prismicNext.enableAutoPreviews({ client, previewData, req });

  return client;
};
