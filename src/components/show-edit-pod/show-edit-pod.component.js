import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import styledSystemPropTypes from "@styled-system/prop-types";

import { filterStyledSystemMarginProps } from "../../style/utils";
import Pod from "../pod";
import Form from "../form";
import Button from "../button";
import StyledDeleteButton from "./delete-button.style";
import Events from "../../__internal__/utils/helpers/events";
import { validProps } from "../../__internal__/utils/ether";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
import LocaleContext from "../../__internal__/i18n-context";
import StyledPod from "./show-edit-pod.style";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

class ShowEditPod extends React.Component {
  state = {
    editing: false,
  };

  isControlled = this.props.editing !== undefined;

  componentDidMount() {
    if (this.props.editing) {
      this.__focusOnPod();
    }
  }

  isEditing() {
    return this.isControlled ? this.props.editing : this.state.editing;
  }

  onEdit = (ev) => {
    this.props.onEdit(ev);
    this.toggleEditingState(true);
    this.__focusOnPod();
  };

  onSaveEditForm = (ev) => {
    ev.preventDefault();
    this.props.onSave(ev);
    this.toggleEditingState(false);
  };

  onCancelEditForm = (ev) => {
    if (this.props.onCancel) {
      this.props.onCancel(ev);
    }

    this.toggleEditingState(false);
  };

  toggleEditingState = (newState) => {
    if (!this.isControlled) {
      this.setState({ editing: newState });
    }
  };

  onKeyDown = (ev) => {
    if (Events.isEscKey(ev)) {
      this.onCancelEditForm(ev);
    }
  };

  deleteButton() {
    const label = this.props.deleteText || this.context.actions.delete();

    return (
      <StyledDeleteButton
        buttonType="tertiary"
        data-element="delete-button"
        size="small"
        onClick={this.props.onDelete}
      >
        {label}
      </StyledDeleteButton>
    );
  }

  editContent() {
    return (
      <Form
        onSubmit={this.onSaveEditForm}
        buttonAlignment={this.props.buttonAlign}
        data-element="edit-form"
        leftSideButtons={
          this.props.cancel && (
            <Button
              data-element="cancel-button"
              onClick={this.onCancelEditForm}
              size="small"
            >
              {this.props.cancelText}
            </Button>
          )
        }
        saveButton={
          <Button
            disabled={this.props.saving}
            data-element="submit-button"
            buttonType="primary"
            type="submit"
            size="small"
          >
            {this.props.saveText}
          </Button>
        }
        rightSideButtons={this.props.onDelete ? this.deleteButton() : null}
        saving={this.props.saving}
      >
        {this.props.editFields}
      </Form>
    );
  }

  content() {
    if (this.isEditing()) {
      return (
        <CSSTransition
          key="1"
          classNames={this.props.transitionName}
          timeout={{ enter: 300, exit: 50 }}
        >
          <div key="edit">{this.editContent()}</div>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition
        key="2"
        classNames={this.props.transitionName}
        timeout={{ enter: 300, exit: 50 }}
      >
        <div key="show">{this.props.children}</div>
      </CSSTransition>
    );
  }

  universalProps() {
    const { onEdit, onDelete, className, ...props } = validProps(
      this,
      Object.keys(Pod.propTypes)
    );

    return props;
  }

  contentProps() {
    const { onEdit, onDelete, hideDeleteButtonInViewMode } = this.props;
    const props = this.universalProps();

    if (onEdit) {
      props.onEdit = this.onEdit;
    }

    return { ...props, onDelete: !hideDeleteButtonInViewMode && onDelete };
  }

  editingProps() {
    const props = this.universalProps();
    props.onKeyDown = this.onKeyDown;
    return props;
  }

  podProps() {
    return this.isEditing() ? this.editingProps() : this.contentProps();
  }

  __focusOnPod = () => {
    ReactDOM.findDOMNode(this.pod).focus(); // eslint-disable-line react/no-find-dom-node
  };

  render() {
    return (
      <StyledPod
        className={this.props.className}
        size="small"
        {...this.podProps()}
        ref={(node) => {
          this.pod = node;
        }}
        tabIndex="-1"
        {...tagComponent("show-edit-pod", this.props)}
      >
        <TransitionGroup>{this.content()}</TransitionGroup>
      </StyledPod>
    );
  }
}

ShowEditPod.contextType = LocaleContext;

ShowEditPod.propTypes = {
  ...marginPropTypes,
  /** Pod theme variant. */
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "tertiary",
    "tile",
    "transparent",
  ]),
  /** Enable/disable the border on the Pod. */
  border: PropTypes.bool,
  /** This component supports children. */
  children: PropTypes.node,
  /** Classes to apply to the component. */
  className: PropTypes.string,
  /** Allows developers to control the editing state manually. */
  editing: PropTypes.bool,
  /** Callback when edit button is clicked. */
  onEdit: PropTypes.func,
  /** A callback triggered when the delete action is clicked. */
  onDelete: PropTypes.func,
  /** A callback triggered when the undo action is clicked. */
  onUndo: PropTypes.func,
  /** Sets soft delete state. */
  softDelete: PropTypes.bool,
  /** Hide delete button in view mode. */
  hideDeleteButtonInViewMode: PropTypes.bool,
  /** Define fields to be rendered in the edit state */
  editFields: PropTypes.node,
  /** Define a custom transition between show and edit states */
  transitionName: PropTypes.string,
  // Props passed to Form
  /** A callback triggered after clicking the save button */
  onSave: PropTypes.func,
  /** Controls which direction the form buttons align */
  buttonAlign: PropTypes.oneOf(["left", "right"]),
  /** Set to false to hide the cancel button */
  cancel: PropTypes.bool,
  /** Supply custom text for the cancel button */
  cancelText: PropTypes.string,
  /** A callback triggered when the form is cancelled */
  onCancel: PropTypes.func,
  /** Supply custom text for the save button */
  saveText: PropTypes.string,
  /** Supply custom text for the delete button */
  deleteText: PropTypes.string,
  /** Can inform if the form is in a saving state (disables the save button) */
  saving: PropTypes.bool,
};

ShowEditPod.defaultProps = {
  variant: "transparent",
  border: false,
  buttonAlign: "right",
  transitionName: "carbon-show-edit-pod__transition",
  cancel: true,
  saving: false,
  hideDeleteButtonInViewMode: false,
};

export default ShowEditPod;

export { ShowEditPod as BaseShowEditPod };
