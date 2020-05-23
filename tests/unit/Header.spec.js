import { mount } from "@vue/test-utils";
import Header from "../../src/components/layout/Header";

it("Header Component", () => {
  const wrapper = mount(Header);
  expect(wrapper.element).toMatchSnapshot();
});
