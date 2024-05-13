import {FilterType} from '../const';
import {isPointInPast, isPointInPresent, isPointInFuture} from '../utils/point.js';

const filterObject = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointInFuture(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPointInPresent(point.dateFrom, point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointInPast(point.dateTo)),
};

export {filterObject};
