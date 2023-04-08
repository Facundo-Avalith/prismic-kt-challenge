import { PrismicImage, PrismicRichText, PrismicText } from "@prismicio/react";
import { HorizontalDivider } from "./";
export const PostComponent = ({ data }) => {
  const { slices } = data.data;
  return (
    <div className="bg-slate-100 p-4">
      {slices.map((slice) => {
        return (
          <a href={`posts/${data.uid}`} key={data.uid}>
            <div className="flex w-full flex-col justify-center" key={slice.id}>
              <PrismicRichText field={slices[0].primary.title} />
              <div className="flex flex-row items-start justify-center gap-4">
                <div className=" w-2/4">
                  <PrismicImage field={slice.items[0].image} />
                </div>
                <div className=" w-2/4 text-2xl">
                  <PrismicRichText field={slice.items[0].subtitle} />
                </div>
              </div>
            </div>
          </a>
        );
      })}
    </div>
  );
};
