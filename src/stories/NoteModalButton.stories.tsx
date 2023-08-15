import ReduxDecorator from "./decorators/reduxDecorator";
import { Meta, StoryFn } from "@storybook/react";
import NoteModalButton, {
  NoteModalButtonProps,
} from "../components/NoteModalButton";
import "../index.css";

export default {
  title: "Components/NoteModalButton",
  component: NoteModalButton,
  decorators: [ReduxDecorator],
  tags: ["autodocs"],
} as Meta;

const Template: StoryFn<NoteModalButtonProps> = (args) => (
  <NoteModalButton {...args} />
);

export const Default: StoryFn<NoteModalButtonProps> = Template.bind({});
Default.args = {};

export const WithNote: StoryFn<NoteModalButtonProps> = Template.bind({});
WithNote.args = {
  note: {
    id: 1,
    name: "Sample Note",
    created: "2023-08-15",
    content: "This is a sample note for storybook.",
    category: 0,
    active: true,
  },
};
