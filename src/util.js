import dayjs from 'dayjs';
// eslint-disable-next-line no-undef
const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);
// eslint-disable-next-line no-undef
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);


function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
  // Максимум и минимум включаются
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

export {getRandomArrayElement, getRandomIntInclusive, getEventDuration, changeDateFormat, getPointTypeOffer,getDestinationById};


