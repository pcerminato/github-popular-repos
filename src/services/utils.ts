const ONE_DAY_TIME_MILLIS = 1 * 24 * 60 * 60 * 1000;
const NOW_MILLIS = Date.now();
const ONE_WEEK_AGO_MILLIS = new Date(NOW_MILLIS - ONE_DAY_TIME_MILLIS * 7);

export const aWeekAgoISO = () =>
  ONE_WEEK_AGO_MILLIS.toISOString().split("T")[0];
