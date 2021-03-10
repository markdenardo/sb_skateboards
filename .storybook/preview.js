import "styles/main.scss";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  default: "light",
  backgrounds: {
    default: "light",
    values: [
      {
        name: "light",
        value: "#FFFFFF",
      },
      {
        name: "dark",
        value: "#333333",
      },
    ],
  },
};
