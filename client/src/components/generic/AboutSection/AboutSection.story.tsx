import type { Meta, StoryObj } from "@storybook/react"
import AboutSection from "./AboutSection"
import RandomImage from "assets/images/AboutBackgroundImage.png"

const meta: Meta<typeof AboutSection> = {
  component: AboutSection
}

export default meta
type Story = StoryObj<typeof meta>

export const DefaultAboutSection: Story = {
  tags: ["autodocs"],
  args: { variant: "left", imageSrc: RandomImage }
}
