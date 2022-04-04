const ONE_DAY_TIME_MILLIS = 1 * 24 * 60 * 60 * 1000;
const NOW_MILLIS = Date.now();
const ONE_WEEK_AGO_MILLIS = new Date(NOW_MILLIS - ONE_DAY_TIME_MILLIS * 7);

export const aWeekAgoDateISO = () =>
  ONE_WEEK_AGO_MILLIS.toISOString().split("T")[0];

export const injectStars = (resposList, starsList = [], starValue = true) => {
  return resposList.map((repo) => {
    if (starsList.includes(`${repo.id}`)) {
      repo.isStared = starValue;
    }
    return repo;
  });
};

const LOCAL_STORAGE_STARED_KEY = "staredReposList";

export const updateLocalStorage = (repoId, isStared) => {
  let ids = localStorage.getItem(LOCAL_STORAGE_STARED_KEY) ?? "";

  if (isStared) {
    ids = ids.replace(repoId + ",", "");
  } else {
    ids += repoId + ",";
  }

  localStorage.setItem(LOCAL_STORAGE_STARED_KEY, ids);
};

export const getStaredRepos = () =>
  localStorage.getItem(LOCAL_STORAGE_STARED_KEY)?.split(",");
