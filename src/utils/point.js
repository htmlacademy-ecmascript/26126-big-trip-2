import dayjs from 'dayjs';
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
dayjs.extend(isSameOrBefore);

const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
dayjs.extend(isSameOrAfter);

// eslint-disable-next-line no-undef
const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);
// eslint-disable-next-line no-undef
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

function isPointInPast(endDate) {
  return endDate && dayjs().isAfter(endDate, 'D');
}

function isPointInPresent(startDate, endDate) {
  return dayjs().isSameOrAfter(startDate, 'D') && dayjs().isSameOrBefore(endDate, 'D');
}

function isPointInFuture(startDate) {
  return startDate && dayjs().isBefore(startDate, 'D');
}

const changeDateFormat = (date, dateFormat)=> dayjs.utc(date).format(dateFormat);

const getEventDuration = (dateFrom, dateTo) => {
  const differenceInHours = dayjs.utc(dateTo).diff(dayjs.utc(dateFrom), 'hour');
  let eventDuration;

  if(differenceInHours <= 1) {
    eventDuration = dayjs.duration(dayjs.utc(dateTo).diff(dayjs.utc(dateFrom))).format('mm[M]');
  } else if(differenceInHours < 24) {
    eventDuration = dayjs.duration(dayjs.utc(dateTo).diff(dayjs.utc(dateFrom))).format('HH[H] mm[M]');
  } else if(differenceInHours >= 24) {
    eventDuration = dayjs.duration(dayjs.utc(dateTo).diff(dayjs.utc(dateFrom))).format('DD[D] HH[H] mm[M]');
  }
  return eventDuration;
};

const getPointTypeOffer = (offersMocks,pointMocks) => offersMocks.find((offer)=> offer.type === pointMocks.type);

const getDestinationById = (destMocks, pointMocks) => destMocks.find((item)=>item.id === pointMocks.destination);

export {isPointInPast, isPointInPresent, isPointInFuture, getPointTypeOffer,getDestinationById, changeDateFormat, getEventDuration};
