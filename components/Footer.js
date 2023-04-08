import { Bounded } from "./Bounded";
import { HorizontalDivider } from "./HorizontalDivider";

export const Footer = ({ withSignUpForm = true, settings }) => {
  return (
    <Bounded as="footer">
      <div className="m-8">
        <HorizontalDivider />
        <div className="mx-auto mt-8 w-full max-w-3xl text-center text-xs font-semibold tracking-tight text-slate-500">
          Powered by <b className="text-red-500"> Facundo Diaz</b>
        </div>
      </div>
    </Bounded>
  );
};
