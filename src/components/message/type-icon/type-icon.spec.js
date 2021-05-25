import React from "react";
import TestRenderer from "react-test-renderer";
import TypeIconStyle from "./type-icon.style";

function render(props) {
  return TestRenderer.create(<TypeIconStyle {...props} />);
}

const messages = ["info", "error", "success", "warning"];

describe("TypeIcon", () => {
  describe("when rendered", () => {
    describe("with no additional props", () => {
      messages.forEach((variant) => {
        it(`should match the snapshot for ${variant}`, () => {
          const wrapper = render({ variant });
          expect(wrapper).toMatchSnapshot();
        });
      });
    });
  });

  describe("when transparent prop is set to true", () => {
    it("applies white background and the type icon with the proper style applied", () => {
      messages.forEach((variant) => {
        const wrapper = render({ transparent: true, variant });
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
