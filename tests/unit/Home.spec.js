import { mount } from "@vue/test-utils";
import Home from "../../src/views/Home";
import SearchResults from "../../src/components/SearchResults";

it("Expect desired search result", () => {
  const wrapper = mount(Home);
  //Mock Data
  wrapper.setData({
    organizations: [
      {
        _id: 102,
        url: "http://initech.tokoin.io.com/api/v2/organizations/102.json",
        external_id: "7cd6b8d4-2999-4ff2-8cfd-44d05b449226",
        name: "Nutralab",
        domain_names: [
          "trollery.com",
          "datagen.com",
          "bluegrain.com",
          "dadabase.com",
        ],
        created_at: "2016-04-07T08:21:44 -10:00",
        details: "Non profit",
        shared_tickets: false,
        tags: ["Cherry", "Collier", "Fuentes", "Trevino"],
      },
    ],
  });
  wrapper.find("#entity").setValue("organizations");
  wrapper.find("#term").setValue("name");
  wrapper.find("#searchvalue").setValue("Nutralab");
  wrapper.find("button").trigger("click");
  // expect(wrapper.find({ name: "SearchResults" }).exists()).toBe(true);

  expect(wrapper.element).toMatchSnapshot();
});
