import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import BaseTheme from "../../../style/themes/base";

const TypeIconStyle = styled.div`
  align-items: center;
  background-color: ${({ theme, variant }) => theme.colors[variant]};
  display: flex;
  justify-content: center;
  line-height: 100%;
  min-width: 30px;
  text-align: center;
  span {
    &:before {
      color: ${({ theme }) => theme.colors.white};
    }
  }

  ${({ theme, transparent, variant }) =>
    transparent &&
    css`
      background-color: transparent;
      span {
        &:before {
          color: ${theme.colors[variant]};
        }
      }
    `}
`;

TypeIconStyle.defaultProps = {
  variant: "info",
  theme: BaseTheme,
  transparent: false,
};

TypeIconStyle.propTypes = {
  variant: PropTypes.oneOf([
    "default",
    "error",
    "help",
    "info",
    "maintenance",
    "new",
    "success",
    "warning",
  ]),
  border: PropTypes.bool,
  transparent: PropTypes.bool,
};

export default TypeIconStyle;
