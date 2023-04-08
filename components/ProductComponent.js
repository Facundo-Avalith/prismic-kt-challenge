import { PrismicImage, PrismicLink, PrismicRichText } from "@prismicio/react";

const components = {
  heading1: ({ node, children, uid }) => (
    <h1 className="text-xl">{children}</h1>
  ),
};

export const ProductComponent = ({ item }) => {
  const { data, uid } = item;
  const { slices } = data;
  return (
    <div className="h-96 w-full bg-slate-100 p-4">
      {slices.map((slice) => {
        return (
          <a key={uid} href={`products/${uid}`}>
            <PrismicRichText
              field={slice.primary.title}
              components={components}
            />
            <PrismicImage field={slice.items[0].carrousel} />
          </a>
        );
      })}
    </div>
  );
};
