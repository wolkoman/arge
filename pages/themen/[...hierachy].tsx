import React from 'react';
import HierachyArticles from '../../components/HierachyArticles';

const hierarchyArticles = HierachyArticles('topics', 'themen', 'Themen');

export default hierarchyArticles.component;
export const getStaticPaths = hierarchyArticles.paths;
export const getStaticProps = hierarchyArticles.props;


