export interface MarginSpacingProps {
  m?: number | string;
  mt?: number | string;
  mr?: number | string;
  mb?: number | string;
  ml?: number | string;
  mx?: number | string;
  my?: number | string;
}

export interface PaddingSpacingProps {
  p?: number | string;
  pt?: number | string;
  pr?: number | string;
  pb?: number | string;
  pl?: number | string;
  px?: number | string;
  py?: number | string;
}

export interface SpacingProps extends MarginSpacingProps, PaddingSpacingProps {}

export interface ColorProps {
  color?: string;
  bg?: string;
  backgroundColor?: string;
  opacity?: number;
}

export interface LayoutProps {
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  size?: number | string;
  display?: string;
  verticalAlign?: string;
  overflow?: string;
  overflowX?: string;
  overflowY?: string;
}

export interface FlexBoxProps {
  alignItems?: string;
  alignContent?: string;
  justifyItems?: string;
  justifyContent?: string;
  flexWrap?: string;
  flexDirection?: string;
  flex?: string;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: string;
  justifySelf?: string;
  alignSelf?: string;
  order?: number;
}

export interface BackgroundProps {
  background?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
}
