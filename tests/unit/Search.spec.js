import { mount } from "@vue/test-utils";
import Search from "../../src/components/Search";

it("Search Component", () => {
  const wrapper = mount(Search);
  expect(wrapper.element).toMatchSnapshot();
});
