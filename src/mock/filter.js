import {filterObject} from '../utils/filterObject.js';

function generateFilter() {
  return Object.entries(filterObject).map(
    ([filterType]) => ({
      type: filterType,
    }),
  );
}

export {generateFilter};
