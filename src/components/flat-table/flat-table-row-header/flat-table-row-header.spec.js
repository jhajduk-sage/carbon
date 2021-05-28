import React from "react";
import { mount } from "enzyme";

import { StyledFlatTableRowHeader } from "./flat-table-row-header.style";
import FlatTableRowHeader from "./flat-table-row-header.component";
import {
  assertStyleMatch,
  testStyledSystemPadding,
} from "../../../__spec_helper__/test-utils";
import StyledIcon from "../../icon/icon.style";

describe("FlatTableRowHeader", () => {
  testStyledSystemPadding(
    (props) => <FlatTableRowHeader {...props} />,
    { py: "10px", px: 3 },
    null,
    { modifier: "&&& > div" }
  );

  it("renders with proper width style rule when width prop is passed", () => {
    const wrapper = mount(<FlatTableRowHeader width={40} />);
    assertStyleMatch(
      {
        width: "40px",
      },
      wrapper.find(StyledFlatTableRowHeader)
    );

    assertStyleMatch(
      {
        width: "40px",
      },
      wrapper.find(StyledFlatTableRowHeader),
      { modifier: "&&& > div" }
    );
  });

  describe("when expandable prop is true", () => {
    it("should render an arrow icon", () => {
      const wrapper = mount(<FlatTableRowHeader expandable />);

      expect(wrapper.find(StyledIcon).exists()).toEqual(true);
    });

    describe("and onClick prop is set", () => {
      it("should call the onClick function when it is clicked", () => {
        const onClickFn = jest.fn();
        const wrapper = mount(
          <FlatTableRowHeader expandable onClick={onClickFn} />
        );

        wrapper.find(StyledFlatTableRowHeader).props().onClick();

        expect(onClickFn).toHaveBeenCalled();
      });
    });

    describe("and onKeyDown prop is set", () => {
      it("should call the onKeyDown function when a key is pressed", () => {
        const onKeyDownFn = jest.fn();
        const wrapper = mount(
          <FlatTableRowHeader expandable onKeyDown={onKeyDownFn} />
        );

        wrapper.find(StyledFlatTableRowHeader).props().onKeyDown();

        expect(onKeyDownFn).toHaveBeenCalled();
      });
    });
  });

  describe("when truncate prop is true", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(<FlatTableRowHeader truncate>Foo</FlatTableRowHeader>);
    });

    it("should apply expected styling", () => {
      assertStyleMatch(
        {
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        },
        wrapper.find(StyledFlatTableRowHeader),
        { modifier: "&&& > div" }
      );
    });

    it("should set the title if children is string", () => {
      expect(wrapper.find("div").props().title).toEqual("Foo");
    });

    describe("and title prop is set", () => {
      it("should override the default behaviour", () => {
        wrapper = mount(
          <FlatTableRowHeader truncate title="Bar">
            Foo
          </FlatTableRowHeader>
        );
        expect(wrapper.find("div").props().title).toEqual("Bar");
      });
    });
  });

  describe.each([
    ["small", "1px"],
    ["medium", "2px"],
    ["large", "4px"],
  ])(
    "when the verticalBorder prop is set to %s",
    (verticalBorder, expectedValue) => {
      let wrapper;

      it("it overrides the cell border-right-width", () => {
        wrapper = mount(<FlatTableRowHeader verticalBorder={verticalBorder} />);
        assertStyleMatch(
          {
            borderRightWidth: expectedValue,
          },
          wrapper,
          { modifier: "&&&" }
        );
      });
    }
  );

  describe.each([
    ["goldTint10", "#FFBC1A"],
    ["#000", "#000"],
  ])(
    "when the verticalBorderColor prop is set to %s",
    (verticalBorderColor, expectedValue) => {
      let wrapper;

      it("it overrides the row header border-right-color", () => {
        wrapper = mount(
          <FlatTableRowHeader verticalBorderColor={verticalBorderColor} />
        );
        assertStyleMatch(
          {
            borderRightColor: expectedValue,
          },
          wrapper,
          { modifier: "&&&" }
        );
      });
    }
  );
});
