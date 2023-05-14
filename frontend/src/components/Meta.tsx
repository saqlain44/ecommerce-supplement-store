import React from 'react';
import { Helmet } from 'react-helmet-async';

type Props = {
  title: string;
  description: string;
  keywords: string;
};

const Meta = ({ title, description, keywords }: Props) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome to Nutri-Strat',
  keywords: 'supplements, buy proteins, bcaa',
  description: 'Sells high quality health supplements',
};

export default Meta;
