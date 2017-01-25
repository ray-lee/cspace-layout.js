import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from '../../styles/cspace-layout/Panel.css';
import buttonBarStyles from '../../styles/cspace-layout/PanelButtonBar.css';

const propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.node),
  children: PropTypes.node,
  className: PropTypes.string,
  collapsible: React.PropTypes.bool,
  collapsed: React.PropTypes.bool,
  header: PropTypes.node,
  name: PropTypes.string,
  onToggleCollapsed: PropTypes.func,
};

const defaultProps = {
  collapsible: false,
  collapsed: false,
};

export default class Panel extends Component {
  constructor(props) {
    super(props);

    this.handleHeaderClick = this.handleHeaderClick.bind(this);
  }

  handleHeaderClick() {
    const {
      collapsible,
      collapsed,
      name,
      onToggleCollapsed,
    } = this.props;

    if (collapsible && onToggleCollapsed) {
      onToggleCollapsed(name, !collapsed);
    }
  }

  renderHeader() {
    const {
      buttons,
      header,
    } = this.props;

    if (!header) {
      return null;
    }

    let buttonBar = null;

    if (buttons && buttons.length > 0) {
      buttonBar = (
        <div className={buttonBarStyles.common}>
          {buttons}
        </div>
      );
    }

    return (
      <header>
        <button type="button" onClick={this.handleHeaderClick}>
          {header}
        </button>
        {buttonBar}
      </header>
    );
  }

  renderBody() {
    const {
      collapsible,
      collapsed,
      children,
    } = this.props;

    if (collapsible && collapsed) {
      return null;
    }

    return (
      <div>
        {children}
      </div>
    );
  }

  render() {
    const header = this.renderHeader();
    const body = this.renderBody();

    const {
      className,
      collapsible,
      collapsed,
    } = this.props;

    const classes = classNames(
      className, (collapsible && collapsed) ? styles.collapsed : styles.normal
    );

    return (
      <section className={classes}>
        {header}
        {body}
      </section>
    );
  }
}

Panel.propTypes = propTypes;
Panel.defaultProps = defaultProps;