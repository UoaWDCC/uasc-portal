import type { StorybookConfig } from "@storybook/nextjs"
import path from "path"

const config: StorybookConfig = {
  stories: ["../src/**/*.story.@(js|jsx|ts|tsx)", "../src/**/*.story.mdx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  // https://github.com/storybookjs/storybook/issues/21216#issuecomment-1513894759
  framework: {
    name: path.resolve(
      require.resolve("@storybook/nextjs/preset"),
      ".."
    ) as any,
    options: {}
  },
  docs: {
    autodocs: "tag"
  },
  staticDirs: [{ from: "../public", to: "/public" }],
  core: {
    builder: "@storybook/builder-webpack5"
  },
  webpackFinal: async (config, options) => {
    const imageRule = config.module?.rules?.find((rule) => {
      const test = (rule as { test: RegExp }).test

      if (!test) {
        return false
      }

      return test.test(".svg")
    }) as { [key: string]: any }

    imageRule.exclude = /\.svg$/

    config.module?.rules?.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    })

    //@ts-expect-error
    options!.cache!.set = () => Promise.resolve()

    return config
  }
}
export default config
