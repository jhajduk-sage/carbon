import * as React from "react";
import { MarginProps } from "styled-system";
import { ValidationPropTypes } from "../../__internal__/validations";

interface CheckboxGroupProps extends ValidationPropTypes, MarginProps {
  /** The content for the CheckboxGroup Legend */
  legend?: string;
  /** When true, legend is placed in line with the checkboxes */
  legendInline?: boolean;
  /** Percentage width of legend (only when legend is inline)  */
  legendWidth?: number;
  /** Text alignment of legend when inline */
  legendAlign?: "left" | "right";
  /** Spacing between legend and field for inline legend, number multiplied by base spacing unit (8) */
  legendSpacing?: 1 | 2;
  /** The Checkboxes to be rendered in the group */
  children: React.ReactNode;
  /** Specifies the name prop to be applied to each button in the group */
  groupName: string;
  /** Spacing between label and a field for inline label, given number will be multiplied by base spacing unit (8) */
  labelSpacing?: 1 | 2;
  /** Flag to configure component as mandatory */
  required?: boolean;
  /** Overrides the default tooltip */
  tooltipPosition?: "top" | "bottom" | "left" | "right";
}

declare function CheckboxGroup(props: CheckboxGroupProps): JSX.Element;

export default CheckboxGroup;
