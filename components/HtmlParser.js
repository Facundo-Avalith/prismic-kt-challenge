export const components = {
  heading1: ({ node, children }) => (
    <h1 className="my-4 text-center text-5xl">{children}</h1>
  ),
  heading2: ({ node, children }) => (
    <h2 className="my-2 text-center text-3xl">{children}</h2>
  ),
  heading3: ({ node, children }) => (
    <h3 className="my-2 text-2xl">{children}</h3>
  ),
  paragraph: ({ node, children }) => <p className="text-normal">{children}</p>,
};
