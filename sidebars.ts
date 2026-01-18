import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Node.js Zero→Hero',
      collapsed: false,
      link: {type: 'doc', id: 'nodejs-zero-to-hero/nodejs-zero-to-hero'},
      items: [
        {
          type: 'category',
          label: 'Day 1 — Hello Library',
          collapsed: false,
          link: {type: 'doc', id: 'nodejs-zero-to-hero/day-1-introduction/day-1-introduction'},
          items: [
            'nodejs-zero-to-hero/day-1-introduction/day-1-core-concepts',
            {
              type: 'category',
              label: 'JS Fundamentals',
              collapsed: false,
              link: {type: 'doc', id: 'nodejs-zero-to-hero/day-1-introduction/javascript-fundamentals/day-1-javascript-fundamentals'},
              items: [
                'nodejs-zero-to-hero/day-1-introduction/javascript-fundamentals/day-1-javascript-variables',
                'nodejs-zero-to-hero/day-1-introduction/javascript-fundamentals/day-1-javascript-data-types',
                'nodejs-zero-to-hero/day-1-introduction/javascript-fundamentals/day-1-javascript-conditional-logic',
                'nodejs-zero-to-hero/day-1-introduction/javascript-fundamentals/day-1-javascript-functions',
                'nodejs-zero-to-hero/day-1-introduction/javascript-fundamentals/day-1-javascript-array-methods',
                'nodejs-zero-to-hero/day-1-introduction/javascript-fundamentals/day-1-javascript-loops',
                'nodejs-zero-to-hero/day-1-introduction/javascript-fundamentals/day-1-javascript-modules',
              ],
            },
            'nodejs-zero-to-hero/day-1-introduction/day-1-git-basics',
            'nodejs-zero-to-hero/day-1-introduction/day-1-hands-on-labs'
          ],
        },
        {
          type: 'category',
          label: 'Day 2 — Project Structure',
          collapsed: false,
          link: {type: 'doc', id: 'nodejs-zero-to-hero/day-2-nodejs-project-structure/day-2-nodejs-project-structure'},
          items: [
            'nodejs-zero-to-hero/day-2-nodejs-project-structure/day-2-core-concepts',
            'nodejs-zero-to-hero/day-2-nodejs-project-structure/day-2-hands-on-labs',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
