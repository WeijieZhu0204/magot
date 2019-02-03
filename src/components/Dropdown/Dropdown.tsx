import React from 'react';
import cx from 'classnames';

import { MenuProps } from '../Menu';
import Popup, { PopupTrigger } from '../Popup';
import * as component from '../component';
import { Placement } from '../../utils/placement';
import Button, { ButtonProps } from 'components/Button';

import './Dropdown.less';

export interface DropdownProps
  extends component.BaseComponent,
    component.DisableComponent,
    component.NestedComponent {
  /**
   * 下拉菜单对齐位置，可选值：`top`, `bottom, `topLeft`, `topRight`, `bottomLeft`, `bottomRight`，默认`bottomLeft`
   * @default bottomLeft
   */
  placement?: Extract<
    Placement,
    'top' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
  >;

  /**
   * 触发下拉菜单的行为方式，可选值：`hover`, `click`, `contextMenu`，默认`hover`
   * @default hover
   */
  trigger?: PopupTrigger;

  /**
   * 下拉菜单组件(Menu)
   */
  menu: React.ReactElement<MenuProps>;
}

const defaultProps: Partial<DropdownProps> = {
  ...component.getDefaultDisabledProps(),
  placement: 'bottomLeft',
  trigger: 'hover',
};

function Dropdown(props: DropdownProps) {
  const type = 'dropdown';
  const prefix = component.getComponentPrefix(type);
  const cls = component.getComponentClasses(type, props);

  const dropdown = (
    <div className={cls} style={props.style}>
      {props.menu}
    </div>
  );

  const children = React.cloneElement(React.Children.only(props.children), {
    disabled: props.disabled,
    className: cx(prefix + '-trigger', {
      [prefix + '-disabled']: !!props.disabled,
    }),
  });

  return (
    <Popup
      placement={props.placement}
      preventOut={true}
      trigger={props.trigger}
      overlay={dropdown}>
      {children}
    </Popup>
  );
}

function ButtonDropdown(props: DropdownProps & ButtonProps) {
  const {
    placement,
    trigger,
    menu,
    disabled,
    className,
    style,
    ...btnProps
  } = props;
  const button = <Button {...btnProps}>{props.children}</Button>;
  return (
    <Dropdown
      placement={placement}
      trigger={trigger}
      menu={menu}
      disabled={disabled}
      className={className}
      style={style}>
      {button}
    </Dropdown>
  );
}

Dropdown.defaultProps = defaultProps;
Dropdown.Button = ButtonDropdown;

export default Dropdown;
