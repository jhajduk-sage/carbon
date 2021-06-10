import React, {
  useMemo,
  useRef,
  useEffect,
  useCallback,
  useContext,
} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import StyledMenuItemWrapper from "./menu-item.style";
import OptionHelper from "../../../utils/helpers/options-helper";
import Link from "../../link";
import Box from "../../box";
import Events from "../../../utils/helpers/events";
import { MenuContext } from "../menu.component";
import Submenu from "../__internal__/submenu/submenu.component";
import SubmenuContext from "../__internal__/submenu/submenu.context";
import SubmenuBlock from "../submenu-block/submenu-block.component";
import { StyledMenuItem } from "../menu.style";
import Search from "../../../__experimental__/components/search";

const MenuItem = ({
  submenu,
  children,
  href,
  onClick,
  target,
  submenuDirection = "right",
  icon,
  selected,
  onKeyDown,
  onFocus,
  variant = "default",
  showDropdownArrow = true,
  ariaLabel,
  clickToOpen,
  ...rest
}) => {
  const menuContext = useContext(MenuContext);
  const submenuContext = useContext(SubmenuContext);
  const ref = useRef(null);
  const focusFromMenu = menuContext.isFocused;
  const focusFromSubmenu = submenuContext.isFocused;
  const isChildSearch = useRef(false);
  const childRef = useRef();
  const childrenItems = React.Children.map(children, (child) => {
    if (child && child.type === SubmenuBlock) {
      const childArray = Array.isArray(child.props.children)
        ? child.props.children
        : [child.props.children];

      return [...childArray.map((innerChild) => innerChild)];
    }
    if (child?.type === Search) {
      isChildSearch.current = true;
    }

    return child;
  });

  const focusRef = isChildSearch.current ? childRef : ref;
  useEffect(() => {
    if (focusFromSubmenu === undefined && focusFromMenu) {
      focusRef.current.focus();
    } else if (!submenuContext.blockDoubleFocus && focusFromSubmenu) {
      focusRef.current.focus();
    }
  }, [
    focusFromMenu,
    focusFromSubmenu,
    focusRef,
    submenuContext.blockDoubleFocus,
  ]);

  // useEffect(() => {
  //        if (document.activeElement === focusRef.current) {
  //         submenuContext.updateFocusIndex(submenuContext.searchIndex);
  //      }
  //   },
  //   [focusRef, onClick, submenuContext]
  // );

  const handleKeyDown = useCallback(
    (event) => {
      if (onKeyDown) {
        onKeyDown(event);
      }

      if (Events.isEscKey(event)) {
        ref.current.focus();
      }

      if (submenuContext.handleKeyDown !== undefined) {
        if (
          !(
            isChildSearch.current &&
            document.activeElement === focusRef.current &&
            focusRef.current?.value
          )
        ) {
          submenuContext.handleKeyDown(event);
        }
      } else {
        menuContext.handleKeyDown(event);
      }
    },
    [focusRef, menuContext, onKeyDown, submenuContext]
  );

  const classes = useMemo(
    () =>
      classNames({
        "carbon-menu-item--has-link": href || onClick,
      }),
    [href, onClick]
  );

  const elementProps = {
    className: classes,
    href,
    target,
    onClick,
    icon,
    selected,
    variant,
    onKeyDown: handleKeyDown,
    ref,
  };

  const clonedChildren = isChildSearch.current
    ? childrenItems.map((child) =>
        React.cloneElement(child, { inputRef: childRef })
      )
    : children;

  if (submenu) {
    return (
      <StyledMenuItem
        role="presentation"
        menuType={menuContext.menuType}
        display="inline-block"
        {...rest}
      >
        <Submenu
          {...(typeof submenu !== "boolean" && { title: submenu })}
          submenuDirection={submenuDirection}
          showDropdownArrow={showDropdownArrow}
          clickToOpen={clickToOpen}
          {...elementProps}
          {...rest}
        >
          {childrenItems}
        </Submenu>
      </StyledMenuItem>
    );
  }

  return (
    <StyledMenuItem
      role="presentation"
      menuType={menuContext.menuType}
      inSubmenu={submenuContext.handleKeyDown !== undefined}
      display="inline-block"
      {...rest}
    >
      <StyledMenuItemWrapper
        as={isChildSearch.current ? "div" : Link}
        data-component="menu-item"
        isSearch={isChildSearch.current}
        menuType={menuContext.menuType}
        {...elementProps}
        role="menuitem"
        ariaLabel={ariaLabel}
      >
        {clonedChildren}
      </StyledMenuItemWrapper>
    </StyledMenuItem>
  );
};

MenuItem.propTypes = {
  ...Box.propTypes,
  /** Either prop `icon` must be defined or this node must have children.
   * @type node
   */
  children: (props, propName, ...rest) => {
    if (!props.icon && !props.children) {
      return new Error(
        "Either prop `icon` must be defined or this node must have children."
      );
    }
    return PropTypes.node(props, propName, ...rest);
  },
  /** Custom className */
  className: PropTypes.string,
  /** onClick handler */
  onClick: PropTypes.func,
  /** Either prop `icon` must be defined or this node must have children. */
  icon: (props, propName, ...rest) => {
    if (!props.icon && !props.children) {
      return new Error(
        "Either prop `icon` must be defined or this node must have children."
      );
    }
    return PropTypes.oneOfType([
      PropTypes.oneOf(OptionHelper.icons),
      PropTypes.node,
    ])(props, propName, ...rest);
  },
  /** Defines which direction the submenu will hang eg. left/right */
  submenuDirection: PropTypes.string,
  /** Is the menu item the currently selected item. */
  selected: PropTypes.bool,
  /** A title for the menu item that has a submenu. */
  submenu: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  /** When set the submenu opens by click instead of hover */
  clickToOpen: PropTypes.bool,
  /** The href to use for the menu item. */
  href: PropTypes.string,
  /** onKeyDown handler */
  onKeyDown: PropTypes.func,
  /** The target to use for the menu item. */
  target: PropTypes.string,
  /** Flag to display the dropdown arrow when an item has a submenu */
  showDropdownArrow: PropTypes.bool,
  /** set the colour variant for a menuType */
  variant: PropTypes.oneOf(["default", "alternate"]),
  /** If no text is provided an ariaLabel should be given to facilitate accessibility. */
  ariaLabel: (props, ...rest) => {
    if (
      !props.children &&
      typeof props.submenu !== "string" &&
      !props.ariaLabel
    ) {
      return new Error(
        "If no text is provided an ariaLabel should be given to facilitate accessibility."
      );
    }
    return PropTypes.string(props, ...rest);
  },
};

export default MenuItem;
