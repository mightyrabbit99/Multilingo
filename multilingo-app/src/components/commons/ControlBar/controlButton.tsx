import { Button, Icon } from "semantic-ui-react";
import * as React from "react";

type controlButtonOptionals = {
  className?: string;
  labelPosition?: string;
};

const defaultOptions = {
  className: "",
  labelPosition: "left"
};

export function controlButton(
  label: string,
  icon: Icon | null,
  onClick: (() => void) | null = null,
  disabled: boolean = false
) {
  const props: any = { disabled };
  if (icon) {
    props.icon = icon;
  }
  if (onClick) {
    props.onClick = onClick;
  }
  return <Button {...props}>{label}</Button>;
}
