import * as React from 'react';
import { JSX } from 'react/jsx-runtime';

function IconGymnastics(
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="2rem"
      width="2rem"
      {...props}
    >
      <path d="M4 6c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2M1 9h6l7-5 1.31 1.5-4.17 3H14L21.8 4 23 5.4 14.5 12 14 22h-2l-.5-10L8 11H1V9z" />
    </svg>
  );
}

export default IconGymnastics;
