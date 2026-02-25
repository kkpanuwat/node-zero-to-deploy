import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useThemeConfig} from '@docusaurus/theme-common';

export default function Logo(props: any) {
  const {
    navbar: {logo},
  } = useThemeConfig();

  const {className, ...restProps} = props ?? {};
  const logoLink = useBaseUrl(logo?.href || '/');

  return (
    <Link
      {...restProps}
      to={logoLink}
      className={className}
    >
      <h1 className="kcode-logo text-2xl font-bold text-gray-900 tracking-tight">
        Kcode<span className="text-blue-500">.</span>
      </h1>
    </Link>
  );
}
