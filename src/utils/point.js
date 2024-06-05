import dayjs from 'dayjs';
// eslint-disable-next-line no-undef
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
dayjs.extend(isSameOrBefore);

// eslint-disable-next-line no-undef
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
dayjs.extend(isSameOrAfter);

// eslint-disable-next-line no-undef
const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

function isPointInPast(endDate) {
  return endDate && dayjs().isAfter(endDate, 'D');
}

function isPointInPresent(startDate, endDate) {
  return dayjs().isSameOrAfter(startDate, 'D') && dayjs().isSameOrBefore(endDate, 'D');
}

function isPointInFuture(startDate) {
  return startDate && dayjs().isBefore(startDate, 'D');
}

const changeDateFormat = (date, dateFormat)=> dayjs(date).format(dateFormat);

const getDifferensInMilliseconds = (dateFrom, dateTo) => dayjs(dateTo).diff(dayjs(dateFrom));

const getEventDuration = (dateFrom, dateTo) => {
  const differenceInHours = dayjs(dateTo).diff(dayjs(dateFrom), 'hour');
  let eventDuration;

  if(differenceInHours <= 1) {
    eventDuration = dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom))).format('mm[M]');
  } else if(differenceInHours < 24) {
    eventDuration = dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom))).format('HH[H] mm[M]');
  } else if(differenceInHours >= 24) {
    eventDuration = dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom))).format('DD[D] HH[H] mm[M]');
  }
  return eventDuration;
};

const getPointTypeOffer = (offersMocks,pointMocks) => offersMocks.find((offer)=> offer.type === pointMocks.type);

const getDestinationById = (destMocks, pointMocks) => destMocks.find((item)=>item.id === pointMocks.destination);

const getDestinationByTargetName = (destMocks, targetName) => destMocks.find((item)=>item.name === targetName);

function sortPointTime(pointA, pointB) {
  const durationInHoursA = getDifferensInMilliseconds(pointA.dateFrom, pointA.dateTo);
  const durationInHoursB = getDifferensInMilliseconds(pointB.dateFrom, pointB.dateTo);
  return durationInHoursB - durationInHoursA;
}

function sortPointDay(pointA, pointB) {
  return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function sortPointPrice(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

export {isPointInPast, isPointInPresent, isPointInFuture, getPointTypeOffer,getDestinationById, changeDateFormat, getEventDuration, sortPointTime,sortPointPrice, sortPointDay, getDestinationByTargetName};
