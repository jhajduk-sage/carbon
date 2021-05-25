import * as React from "react";
import { SpaceProps } from "styled-system";
import { TintValueType } from "./vertical-divider-types";

export interface VerticalDividerPropTypes extends SpaceProps {
  h?: number | string;
  displayInline?: boolean;
  tint?: TintValueType;
}

declare function VerticalDivider(props: VerticalDividerPropTypes): JSX.Element;

export default VerticalDivider;
