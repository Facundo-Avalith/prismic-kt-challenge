import * as prismicH from "@prismicio/helpers";
import { PrismicLink } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

import { Bounded } from "./Bounded";

export const Header = ({
  withDivider = true,
  withProfile = true,
  navigation,
  settings,
}) => {
  return (
    <Bounded as="header">
      <div className="flex w-full flex-row content-center items-center justify-between">
        {withProfile && (
          <Profile profilePicture={settings.data.profilePicture} />
        )}

        <nav className="w-2/4">
          <ul className="flex w-full flex-row justify-between">
            {navigation.data?.links.map((item) => {
              return (
                <NavItem key={prismicH.asText(item.label)}>
                  <a href={item.link && item.link.url}> {item.label[0].text}</a>
                </NavItem>
              );
            })}
          </ul>
        </nav>
      </div>
    </Bounded>
  );
};

const Profile = ({ name, description, profilePicture }) => {
  return (
    <div className="px-4">
      <div className=" max-w-lg">
        <PrismicLink href="/" tabIndex="-1">
          <div className="relative h-16 w-16 overflow-hidden rounded-full bg-slate-300">
            {prismicH.isFilled.image(profilePicture) && (
              <PrismicNextImage
                field={profilePicture}
                fill={true}
                className="object-cover"
              />
            )}
          </div>
        </PrismicLink>
      </div>
    </div>
  );
};

const NavItem = ({ children }) => {
  return (
    <li className="font-semibold tracking-tight text-slate-800">{children}</li>
  );
};
