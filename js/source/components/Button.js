/* @flow */

import React from 'react';
import classNames from 'classnames';

type Props = {
  href: ?string,
  className: ?string,
};

const Button = (props: Props) => {
  const cssclasses = classNames('Button', props.className);

  return props.href
    ? <a {...props} className={cssclasses} />
    : <button {...props} className={cssclasses} />;
}

Button.defaultProps = {
  href: null,
  className: null,
};

export default Button;
