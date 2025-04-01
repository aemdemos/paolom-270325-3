/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global window, WebImporter, XPathResult */
/* eslint-disable no-console */
import search1Parser from './parsers/search1.js';
import columns__three_columns_3Parser from './parsers/columns__three_columns_3.js';
import embed__social_4Parser from './parsers/embed__social_4.js';
import accordion5Parser from './parsers/accordion5.js';
import columns__three_columns_6Parser from './parsers/columns__three_columns_6.js';
import columns__three_columns_7Parser from './parsers/columns__three_columns_7.js';
import quote__with_attribution_8Parser from './parsers/quote__with_attribution_8.js';
import columns__three_columns_9Parser from './parsers/columns__three_columns_9.js';
import video10Parser from './parsers/video10.js';
import columns11Parser from './parsers/columns11.js';
import embed__social_13Parser from './parsers/embed__social_13.js';
import embed__video_14Parser from './parsers/embed__video_14.js';
import accordion16Parser from './parsers/accordion16.js';
import hero17Parser from './parsers/hero17.js';
import hero18Parser from './parsers/hero18.js';
import embed__video_20Parser from './parsers/embed__video_20.js';
import columns21Parser from './parsers/columns21.js';
import cards22Parser from './parsers/cards22.js';
import hero23Parser from './parsers/hero23.js';
import accordion24Parser from './parsers/accordion24.js';
import quote__with_attribution_25Parser from './parsers/quote__with_attribution_25.js';
import carousel26Parser from './parsers/carousel26.js';
import cards__no_images_27Parser from './parsers/cards__no_images_27.js';
import embed__video_28Parser from './parsers/embed__video_28.js';
import embed__video_29Parser from './parsers/embed__video_29.js';
import tabs30Parser from './parsers/tabs30.js';
import carousel31Parser from './parsers/carousel31.js';
import carousel32Parser from './parsers/carousel32.js';
import embed__video_33Parser from './parsers/embed__video_33.js';
import accordion34Parser from './parsers/accordion34.js';
import columns__three_columns_35Parser from './parsers/columns__three_columns_35.js';
import hero36Parser from './parsers/hero36.js';
import cards__no_images_37Parser from './parsers/cards__no_images_37.js';
import hero38Parser from './parsers/hero38.js';
import embed__video_39Parser from './parsers/embed__video_39.js';
import columns42Parser from './parsers/columns42.js';
import columns__three_columns_43Parser from './parsers/columns__three_columns_43.js';
import columns44Parser from './parsers/columns44.js';
import columns45Parser from './parsers/columns45.js';
import cards46Parser from './parsers/cards46.js';
import embed__social_47Parser from './parsers/embed__social_47.js';
import embed__social_50Parser from './parsers/embed__social_50.js';
import quote__with_attribution_51Parser from './parsers/quote__with_attribution_51.js';
import hero53Parser from './parsers/hero53.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import {
  generateDocumentPath,
  handleOnLoad,
  postTransformRules,
  preTransformRules,
} from './import.utils.js';

WebImporter.Import = {
  isEmpty: (cells) => {
    if (Array.isArray(cells)) {
      return cells.length === 0;
    } else if (typeof cells === 'object' && cells !== null) {
      return Object.keys(cells).length === 0;
    }
    return !cells;
  },
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (instances, url) => instances
    .filter((instance) => instance.url === url)
    .map(({ xpath }) => xpath),
};

const parsers = {
  Metadata: metadataParser,
      'Search 1': search1Parser,
    'Columns (three columns) 3': columns__three_columns_3Parser,
    'Embed (social) 4': embed__social_4Parser,
    'Accordion 5': accordion5Parser,
    'Columns (three columns) 6': columns__three_columns_6Parser,
    'Columns (three columns) 7': columns__three_columns_7Parser,
    'Quote (with attribution) 8': quote__with_attribution_8Parser,
    'Columns (three columns) 9': columns__three_columns_9Parser,
    'Video 10': video10Parser,
    'Columns 11': columns11Parser,
    'Embed (social) 13': embed__social_13Parser,
    'Embed (video) 14': embed__video_14Parser,
    'Accordion 16': accordion16Parser,
    'Hero 17': hero17Parser,
    'Hero 18': hero18Parser,
    'Embed (video) 20': embed__video_20Parser,
    'Columns 21': columns21Parser,
    'Cards 22': cards22Parser,
    'Hero 23': hero23Parser,
    'Accordion 24': accordion24Parser,
    'Quote (with attribution) 25': quote__with_attribution_25Parser,
    'Carousel 26': carousel26Parser,
    'Cards (no images) 27': cards__no_images_27Parser,
    'Embed (video) 28': embed__video_28Parser,
    'Embed (video) 29': embed__video_29Parser,
    'Tabs 30': tabs30Parser,
    'Carousel 31': carousel31Parser,
    'Carousel 32': carousel32Parser,
    'Embed (video) 33': embed__video_33Parser,
    'Accordion 34': accordion34Parser,
    'Columns (three columns) 35': columns__three_columns_35Parser,
    'Hero 36': hero36Parser,
    'Cards (no images) 37': cards__no_images_37Parser,
    'Hero 38': hero38Parser,
    'Embed (video) 39': embed__video_39Parser,
    'Columns 42': columns42Parser,
    'Columns (three columns) 43': columns__three_columns_43Parser,
    'Columns 44': columns44Parser,
    'Columns 45': columns45Parser,
    'Cards 46': cards46Parser,
    'Embed (social) 47': embed__social_47Parser,
    'Embed (social) 50': embed__social_50Parser,
    'Quote (with attribution) 51': quote__with_attribution_51Parser,
    'Hero 53': hero53Parser,
};

const pageElements = [
  {
    name: 'Metadata',
  },
];

/**
* Page transformation function
*/
function transformPage(main, { inventory: { fragments = [], blocks = [] }, ...source }) {
  const { document, params: { originalURL } } = source;

  // get dom elements for each block on the current page
  const blockElements = blocks.map((block) => {
    const foundInstance = block.instances.find((instance) => instance.url === originalURL);
    if (foundInstance) {
      /* eslint-disable no-param-reassign */
      block.element = WebImporter.Import.getElementByXPath(document, foundInstance.xpath);
    }
    return block;
  });

  // remove fragment elements from the current page
  fragments.flatMap((frg) => frg.instances)
    .filter((instance) => instance.url === originalURL)
    .map((instance) => WebImporter.Import.getElementByXPath(document, instance.xpath))
    .forEach((element) => {
      element.remove();
    });

  // transform all block elements using parsers
  [...pageElements, ...blockElements].forEach(({ name, cluster, element = main }) => {
    const parserName = cluster ? `${name} ${cluster}` : name;
    const parserFn = parsers[parserName];
    if (!parserFn) return;
    // parse the element
    let items = null;
    try {
      items = parserFn.call(this, element, { ...source });
    } catch (e) {
      console.warn(`Failed to parse block: ${name} from cluster: ${cluster}`, e);
    }
    // remove empty items
    if (Array.isArray(items)) {
      items = items.filter((item) => item);
    }
    if (!WebImporter.Import.isEmpty(items)) {
      // create the block
      const block = WebImporter.Blocks.createBlock(document, {
        name,
        cells: items,
      });
      if (block) {
        // add block to DOM
        main.append(block);
      }
    }
  });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    (fragment.instances || [])
      .filter(({ url }) => `${url}?frag=${fragment.name}` === originalURL)
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(
            ({ instances }) => instances
              .find(({ url, xpath: blockXpath }) => `${url}?frag=${fragment.name}` === originalURL && blockXpath === xpath),
          );

        if (!fragmentBlock) return;
        const { name, cluster } = fragmentBlock;
        const parserFn = parsers[`${name} ${cluster}`];
        if (!parserFn) return;

        try {
          parserFn.call(this, element, source);
        } catch (e) {
          console.warn(`Failed to parse block: ${name} from cluster: ${cluster} with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, url, params: { originalURL } } = source;

    // sanitize the original URL
    const sanitizedOriginalURL = new URL(originalURL).href;
    /* eslint-disable no-param-reassign */
    source.params.originalURL = sanitizedOriginalURL;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      // fetch the inventory
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        const inventoryResp = await fetch(inventoryUrl.href);
        inventory = await inventoryResp.json();
      } catch (e) {
        console.error('Failed to fetch inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    // pre-transform rules
    preTransformRules({
      root: document.body,
      document,
      url,
      publishUrl,
      originalURL,
    });

    // perform the transformation
    let main = null;
    let path = null;
    const sourceUrl = new URL(originalURL);
    const sourceParams = new URLSearchParams(sourceUrl.search);
    if (sourceParams.has('frag')) {
      // fragment transformation
      const fragName = sourceParams.get('frag');
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      main = document.body;
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source);
    }

    // post transform rules
    postTransformRules({
      root: main,
      document,
      originalURL,
    });

    return [{
      element: main,
      path,
    }];
  },
};
