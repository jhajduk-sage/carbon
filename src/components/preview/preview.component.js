import React from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";

import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import PreviewStyle, { StyledPreview } from "./preview.style";
import { filterStyledSystemMarginProps } from "../../style/utils";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const Preview = (props) => {
  const marginProps = filterStyledSystemMarginProps(props);

  if (isLoading(props.loading, props.children)) {
    const previews = [];
    for (let i = 1; i <= props.lines; i++) {
      previews.push(createPreview(props, i));
    }
    return <StyledPreview {...marginProps}>{previews}</StyledPreview>;
  }

  return <StyledPreview {...marginProps}>{props.children}</StyledPreview>;
};

function isLoading(loading, children) {
  if (typeof loading !== "undefined") {
    return loading;
  }

  return !children;
}

function createPreview(allProps, index) {
  const { height, lines } = allProps;
  let { width } = allProps;

  if (!width && lines > 1 && lines === index) {
    width = "80%";
  }

  return (
    <PreviewStyle
      key={index}
      style={{ height, width }}
      {...tagComponent("preview", allProps)}
    />
  );
}

Preview.propTypes = {
  ...marginPropTypes,
  /** Children content to render in the component. */
  children: PropTypes.node,
  /** A custom height to be applied to the component. */
  height: PropTypes.string,
  /** The number of lines to render. */
  lines: PropTypes.number,
  /* Provides more control over when in a loading state. */
  loading: PropTypes.bool,
  /** A custom width */
  width: PropTypes.string,
};

Preview.defaultProps = {
  lines: 1,
};

export default Preview;
