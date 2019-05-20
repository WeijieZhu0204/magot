import React from 'react';

import * as component from '../component';
import { ButtonProps } from '../Button/Button';

import './ButtonGroup.less';

export interface ButtonGroupProps
  extends component.BaseComponent,
    component.DisableComponent,
    component.SizedComponent,
    component.NestedComponent {
  children: React.FunctionComponentElement<ButtonProps>[];
}

const defaultProps: Partial<ButtonGroupProps> = {
  ...component.getDefaultDisabledProps(),
  ...component.getDefaultSizedProps(),
  children: [],
};

function ButtonGroup(props: ButtonGroupProps) {
  const cls = component.getComponentClasses('button-group', props);
  const btns = props.children.map((child, index) => {
    const disabled = props.disabled ? props.disabled : child.props.disabled;
    return React.cloneElement(child, {
      disabled,
      size: props.size,
      key: index,
    });
  });
  return (
    <div className={cls} style={props.style}>
      {btns}
    </div>
  );
}

ButtonGroup.defaultProps = defaultProps;

export default ButtonGroup;
