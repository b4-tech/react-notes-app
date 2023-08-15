import { Provider } from "react-redux";
import store from "../../redux/store/store";
import { StoryFn } from "@storybook/react";

const ReduxDecorator: React.FC<StoryFn> = (Story) => (
  <Provider store={store}>
    <Story />
  </Provider>
);

export default ReduxDecorator;
