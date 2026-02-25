import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import {sidebarToggleConfig} from './sidebar.config';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// NOTE: Docusaurus sidebars type helpers aren't re-exported from the public package entry,
// and deep imports are blocked by package exports. Keep runtime-safe filtering with light types here.
type SidebarItemConfig = any;
type SidebarItemCategoryConfig = any;
type SidebarCategoriesShorthand = Record<string, any>;
type SidebarConfig = any;

function isNonEmptyArray<T>(value: T[] | undefined): value is T[] {
  return Array.isArray(value) && value.length > 0;
}

function isCategoriesShorthand(item: SidebarItemConfig): item is SidebarCategoriesShorthand {
  return typeof item === 'object' && item !== null && !('type' in item);
}

function isCategoryConfig(item: SidebarItemConfig): item is SidebarItemCategoryConfig {
  return typeof item === 'object' && item !== null && 'type' in item && item.type === 'category';
}

function isDocConfig(item: SidebarItemConfig): item is {type: 'doc'; id: string} {
  return typeof item === 'object' && item !== null && 'type' in item && item.type === 'doc' && 'id' in item;
}

function getCategoryDocIdKey(item: SidebarItemCategoryConfig): string | undefined {
  return item.link?.type === 'doc' ? item.link.id : undefined;
}

function categoryMatchesAllowlist(item: SidebarItemCategoryConfig): boolean {
  const allowDocIds = sidebarToggleConfig.enabledCategoryDocIds;
  const allowLabels = sidebarToggleConfig.enabledCategoryLabels;
  const docIdKey = getCategoryDocIdKey(item);
  const labelKey = item.label;
  const okByDocId = !!docIdKey && !!allowDocIds?.includes(docIdKey);
  const okByLabel = !!labelKey && !!allowLabels?.includes(labelKey);
  return okByDocId || okByLabel;
}

function categoriesShorthandHasAllowedCategory(shorthand: SidebarCategoriesShorthand): boolean {
  const allowLabels = sidebarToggleConfig.enabledCategoryLabels;
  for (const [label, value] of Object.entries(shorthand)) {
    if (isNonEmptyArray(allowLabels) && allowLabels.includes(label)) return true;
    if (Array.isArray(value)) {
      for (const child of value as SidebarItemConfig[]) {
        if (isCategoryConfig(child) && categoryHasAllowedCategoryDeep(child)) return true;
        if (isCategoriesShorthand(child) && categoriesShorthandHasAllowedCategory(child)) return true;
      }
    } else if (value && typeof value === 'object') {
      if (categoriesShorthandHasAllowedCategory(value as SidebarCategoriesShorthand)) return true;
    }
  }
  return false;
}

function categoryHasAllowedCategoryDeep(item: SidebarItemCategoryConfig): boolean {
  if (categoryMatchesAllowlist(item)) return true;

  const items = item.items;
  if (Array.isArray(items)) {
    for (const child of items as SidebarItemConfig[]) {
      if (isCategoryConfig(child) && categoryHasAllowedCategoryDeep(child)) return true;
      if (isCategoriesShorthand(child) && categoriesShorthandHasAllowedCategory(child)) return true;
    }
    return false;
  }

  if (items && typeof items === 'object') {
    return categoriesShorthandHasAllowedCategory(items as SidebarCategoriesShorthand);
  }

  return false;
}

function hasAllowlist(): boolean {
  const allowDocIds = sidebarToggleConfig.enabledCategoryDocIds;
  const allowLabels = sidebarToggleConfig.enabledCategoryLabels;
  return isNonEmptyArray(allowDocIds) || isNonEmptyArray(allowLabels);
}

function isCategoryDenied(item: SidebarItemCategoryConfig): boolean {
  const docIdKey = getCategoryDocIdKey(item);
  const labelKey = item.label;
  const denyDocIds = sidebarToggleConfig.disabledCategoryDocIds ?? [];
  const denyLabels = sidebarToggleConfig.disabledCategoryLabels ?? [];
  if (docIdKey && denyDocIds.includes(docIdKey)) return true;
  if (labelKey && denyLabels.includes(labelKey)) return true;
  return false;
}

function isDocEnabled(docId: string): boolean {
  const denyDocIds = sidebarToggleConfig.disabledDocIds ?? [];
  return !denyDocIds.includes(docId);
}

function filterCategoryItems(
  items: SidebarCategoriesShorthand | SidebarItemConfig[],
  ancestorAllowed: boolean,
): SidebarCategoriesShorthand | SidebarItemConfig[] {
  if (Array.isArray(items)) {
    return items
      .map((item) => filterSidebarItem(item, ancestorAllowed))
      .filter(Boolean) as SidebarItemConfig[];
  }

  const next: SidebarCategoriesShorthand = {};
  for (const [key, value] of Object.entries(items)) {
    const allowLabels = sidebarToggleConfig.enabledCategoryLabels;
    const entryAllowedByLabel = hasAllowlist() && isNonEmptyArray(allowLabels) && allowLabels.includes(key);
    const nextAncestorAllowed = ancestorAllowed || entryAllowedByLabel;

    if (hasAllowlist() && !ancestorAllowed && !entryAllowedByLabel) {
      const subtreeHasAllowed =
        Array.isArray(value) ||
        (value && typeof value === 'object')
          ? categoriesShorthandHasAllowedCategory({[key]: value as any})
          : false;
      if (!subtreeHasAllowed) continue;
    }

    const filtered = filterCategoryItems(value as any, nextAncestorAllowed);
    const isEmptyArray = Array.isArray(filtered) && filtered.length === 0;
    const isEmptyObject = !Array.isArray(filtered) && Object.keys(filtered).length === 0;
    if (!isEmptyArray && !isEmptyObject) {
      next[key] = filtered as any;
    }
  }
  return next;
}

function filterSidebarItem(item: SidebarItemConfig, ancestorAllowed: boolean): SidebarItemConfig | null {
  if (typeof item === 'string') {
    return isDocEnabled(item) ? item : null;
  }

  if (isCategoriesShorthand(item)) {
    if (hasAllowlist() && !ancestorAllowed && !categoriesShorthandHasAllowedCategory(item)) return null;
    const filtered = filterCategoryItems(item, ancestorAllowed);
    return Object.keys(filtered).length > 0 ? (filtered as SidebarCategoriesShorthand) : null;
  }

  if (isDocConfig(item)) {
    return isDocEnabled(item.id) ? item : null;
  }

  if (isCategoryConfig(item)) {
    if (isCategoryDenied(item)) return null;

    let nextAncestorAllowed = ancestorAllowed;
    if (hasAllowlist()) {
      const subtreeHasAllowed = categoryHasAllowedCategoryDeep(item);
      if (!ancestorAllowed && !subtreeHasAllowed) return null;
      if (categoryMatchesAllowlist(item)) nextAncestorAllowed = true;
    }

    const nextItems = filterCategoryItems(item.items, nextAncestorAllowed);
    const isEmptyArray = Array.isArray(nextItems) && nextItems.length === 0;
    const isEmptyObject = !Array.isArray(nextItems) && Object.keys(nextItems).length === 0;
    if (isEmptyArray || isEmptyObject) {
      return item.link ? {...item, items: nextItems as any} : null;
    }
    return {...item, items: nextItems as any};
  }

  return item;
}

function filterSidebarConfig(sidebar: SidebarConfig): SidebarConfig {
  if (Array.isArray(sidebar)) {
    return sidebar.map((item) => filterSidebarItem(item, false)).filter(Boolean) as SidebarItemConfig[];
  }
  return filterCategoryItems(sidebar as SidebarCategoriesShorthand, false) as SidebarCategoriesShorthand;
}

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: filterSidebarConfig([
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
            'nodejs-zero-to-hero/day-1-introduction/day-1-nvm',
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
        {
          type: 'category',
          label: 'Day 3 — Express.js Core',
          collapsed: false,
          link: {type: 'doc', id: 'nodejs-zero-to-hero/day-3-express-core/day-3-express-core'},
          items: [
            'nodejs-zero-to-hero/day-3-express-core/day-3-http-refresher',
            'nodejs-zero-to-hero/day-3-express-core/day-3-lecture-notes',
            'nodejs-zero-to-hero/day-3-express-core/day-3-core-concepts',
            'nodejs-zero-to-hero/day-3-express-core/day-3-routing-and-middleware',
            'nodejs-zero-to-hero/day-3-express-core/day-3-params-query-and-status-codes',
            'nodejs-zero-to-hero/day-3-express-core/day-3-error-handling-and-404',
            {
              type: 'category',
              label: 'Hands-on Labs',
              link: {
                type: 'doc',
                id: 'nodejs-zero-to-hero/day-3-express-core/labs/day-3-lab-1-express-foundation'
              },
              items: [
                'nodejs-zero-to-hero/day-3-express-core/labs/day-3-lab-1-express-foundation',
                'nodejs-zero-to-hero/day-3-express-core/labs/day-3-lab-2-books-endpoint',
                'nodejs-zero-to-hero/day-3-express-core/labs/day-3-lab-3-router-controller',
                'nodejs-zero-to-hero/day-3-express-core/labs/day-3-lab-4-middleware-logger',
                'nodejs-zero-to-hero/day-3-express-core/labs/day-3-lab-5-git-checkpoint',
                'nodejs-zero-to-hero/day-3-express-core/labs/day-3-lab-6-get-book-by-id',
                'nodejs-zero-to-hero/day-3-express-core/labs/day-3-lab-7-query-search-and-limit',
                'nodejs-zero-to-hero/day-3-express-core/labs/day-3-lab-8-404-and-error-middleware',
                'nodejs-zero-to-hero/day-3-express-core/labs/day-3-lab-9-api-testing-drills',
              ],
            },
            'nodejs-zero-to-hero/day-3-express-core/day-3-debugging-checklist',
            'nodejs-zero-to-hero/day-3-express-core/day-3-mini-project',
          ],
        },
      ],
    },
  ] as SidebarItemConfig[]),
};

export default sidebars;
