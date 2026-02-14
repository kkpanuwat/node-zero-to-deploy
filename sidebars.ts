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
            'nodejs-zero-to-hero/day-2-nodejs-project-structure/day-2-http-routing',
            {
              type: 'category',
              label: 'Hands-on Labs',
              link: {
                type: 'doc',
                id: 'nodejs-zero-to-hero/day-2-nodejs-project-structure/labs/day-2-lab-1-project-foundation'
              },
              items: [
                'nodejs-zero-to-hero/day-2-nodejs-project-structure/labs/day-2-lab-1-project-foundation',
                'nodejs-zero-to-hero/day-2-nodejs-project-structure/labs/day-2-lab-2-first-http-server',
                'nodejs-zero-to-hero/day-2-nodejs-project-structure/labs/day-2-lab-3-professional-workflow',
                'nodejs-zero-to-hero/day-2-nodejs-project-structure/labs/day-2-lab-4-advanced-routing-and-response',
                'nodejs-zero-to-hero/day-2-nodejs-project-structure/labs/day-2-lab-5-persistence-and-json-file',
                'nodejs-zero-to-hero/day-2-nodejs-project-structure/labs/day-2-lab-6-post-validation-and-crud',
                'nodejs-zero-to-hero/day-2-nodejs-project-structure/labs/day-2-lab-7-refactor-to-professional-structure',
                'nodejs-zero-to-hero/day-2-nodejs-project-structure/labs/day-2-lab-8-debugging-and-api-testing-drills',
              ],
            },
            'nodejs-zero-to-hero/day-2-nodejs-project-structure/day-2-debugging-checklist',
            'nodejs-zero-to-hero/day-2-nodejs-project-structure/day-2-mini-project',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
