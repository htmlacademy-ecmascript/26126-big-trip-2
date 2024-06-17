import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const ONE_HOUR = 1;
const ONE_DAY_HOURS = 24;

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

const getLongDuration = (dateTo, dateFrom)=> {
  const durationInDays =
    dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom))).asDays();

  const durationInHours = dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom))).asHours();

  const days = Math.round(durationInDays);

  const restDays = durationInDays - days;
  const hours = Math.round(restDays * 24);

  const restHours = durationInHours - Math.round(durationInHours);
  const minutes = Math.round(restHours * 60);
  if((hours.toString()).length === 1 || (minutes.toString()).length === 1){
    return `${days}D 0${hours}H 0${minutes}M`;
  }else {
    return`${days}D ${hours}H ${minutes}M`;
  }
};

const getEventDuration = (dateFrom, dateTo) => {
  const differenceInHours = dayjs(dateTo).diff(dayjs(dateFrom), 'hour');
  let eventDuration;

  if(differenceInHours < ONE_HOUR) {
    eventDuration = dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom))).format('mm[M]');
  } else if(differenceInHours < ONE_DAY_HOURS) {
    eventDuration = dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom))).format('HH[H] mm[M]');
  } else if(differenceInHours >= ONE_DAY_HOURS) {

    if(dayjs(dateTo).diff(dayjs(dateFrom), 'day') > 31) {
      eventDuration = getLongDuration(dateTo, dateFrom);
    }else{
      eventDuration = dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom))).format('DD[D] HH[H] mm[M]');
    }
  }
  return eventDuration;
};

const getPointTypeOffer = (offersMocks,pointMocks) => offersMocks.find((offer)=> offer.type === pointMocks.type);

const getDestinationById = (destData, pointMocks) => destData.find((item)=>item.id === pointMocks.destination);

const getDestinationByTargetName = (destMocks, targetName) => destMocks.find((item)=>item.name === targetName);

function sortPointTime(pointA, pointB) {
  const durationInHoursA = getDifferensInMilliseconds(pointA.dateFrom, pointA.dateTo);
  const durationInHoursB = getDifferensInMilliseconds(pointB.dateFrom, pointB.dateTo);
  return durationInHoursB - durationInHoursA;
}

const getIsoDate = (currentDate)=> {
  const dateIso = dayjs(currentDate).toISOString();
  return dateIso;
};

function sortPointDay(pointA, pointB) {
  return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function sortPointPrice(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

const getNewDateAddOneMinute = (currentDate)=> {
  const dateIso = dayjs(currentDate).toISOString();
  return new Date(dayjs(dateIso).add(1,'minute'));
};


export {isPointInPast, isPointInPresent, isPointInFuture, getPointTypeOffer,getDestinationById, changeDateFormat, getEventDuration, sortPointTime,sortPointPrice, sortPointDay, getDestinationByTargetName, getNewDateAddOneMinute, getIsoDate, getDifferensInMilliseconds};
