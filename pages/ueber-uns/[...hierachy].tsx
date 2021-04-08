import React from 'react';
import HierachyArticles from '../../components/HierachyArticles';

const hierarchyArticles = HierachyArticles('ueberuns', 'ueber-uns', '');

export default hierarchyArticles.component;
export const getStaticPaths = hierarchyArticles.paths;
export const getStaticProps = hierarchyArticles.props;


