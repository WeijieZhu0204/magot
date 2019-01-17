import { ReactNode, CSSProperties } from 'react';
import cx from 'classnames';

export const prefix = 'mgt';

export type ComponentSize = 'normal' | 'small' | 'large';

export interface ComponentBase {
  /**
   * 自定义组件样式类，可用于实现自定义样式
   */
  className?: string;

  /**
   * 高优先级的内联自定义样式，可用于覆盖某些默认样式
   */
  style?: CSSProperties;
}

export interface NestedComponent {
  children?: ReactNode;
}

export interface SizedComponent {
  /**
   * 设置组件尺寸大小，可选值有: `normal`, `small`, `large`。
   * @default 'normal'
   */
  size?: ComponentSize;
}

export interface DisableComponent {
  /**
   * 是否是禁用状态，当禁用后，组件不可交互
   * @default false
   */
  disabled?: boolean;
}

export interface ClickableComponent<T extends HTMLElement> {
  /**
   * 点击组件时的回调函数
   */
  onClick?: (e: React.MouseEvent<T>) => void;
}

/**
 *
 *
 * @export
 * @param {string} type 组件类型
 * @returns {string}
 */
export function getComponentPrefix(type: string) {
  return `${prefix}-${type}`;
}

/**
 *
 *
 * @export
 * @param {string} type 组件类型
 * @param {(Partial<ComponentBase & SizedComponent & DisableComponent>)} props 组件Props
 * @param {...any[]} classes 额外样式
 * @returns {string}
 */
export function getComponentClasses(
  type: string,
  props: Partial<ComponentBase & SizedComponent & DisableComponent>,
  ...classes: any[]
) {
  const main = getComponentPrefix(type);
  return cx(
    main,
    {
      [`${main}-sm`]: props.size === 'small',
      [`${main}-lg`]: props.size === 'large',
      [`${main}-disabled`]: !!props.disabled,
    },
    ...classes,
    props.className
  );
}

/**
 *
 *
 * @export
 * @returns {SizedComponent}
 */
export function getDefaultSizedProps() {
  const props: SizedComponent = { size: 'normal' };
  return props;
}

/**
 *
 *
 * @export
 * @returns {DisableComponent}
 */
export function getDefaultDisabledProps() {
  return { disabled: false };
}