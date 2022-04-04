import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import {
  aWeekAgoDateISO,
  injectStars,
  updateLocalStorage,
  getStaredRepos,
} from "../src/services/utils";
import { ReposListPanel } from "../components/ReposListPanel";

export default function Home({ data }) {
  const [reposList, setReposList] = useState([]);
  const [staredReposList, setStaredReposList] = useState([]);
  const [showStaredOnly, setShowStaredOnly] = useState(false);

  const toggleStar = (repoId, isStared) => {
    const reposListWithStars = injectStars(reposList, [`${repoId}`], !isStared);
    setReposList([...reposListWithStars]);
    updateLocalStorage(repoId, isStared);
  };

  const handleShowStaredClick = () => {
    setShowStaredOnly((value) => !value);
  };

  // initial data setup
  useEffect(() => {
    const staredReposList = getStaredRepos();
    const reposListWithStars = injectStars([...data.items], staredReposList);

    setReposList([...reposListWithStars]);
  }, [data.items]);

  useEffect(() => {
    if (showStaredOnly) {
      const stared = reposList.filter((repo) => repo.isStared);
      setStaredReposList([...stared]);
    }
  }, [showStaredOnly, reposList]);

  return (
    <div className="container">
      <header>
        <h1 className="title">Trending repositories on GitHub</h1>
      </header>
      <main className="main">
        <section className="description">
          <label htmlFor="stared-only-check">
            Only stared repos
            <input
              type="checkbox"
              id="stared-only-check"
              onClick={handleShowStaredClick}
            />
          </label>
        </section>

        <section className="grid">
          {showStaredOnly ? (
            <ReposListPanel
              list={[...staredReposList]}
              onStarClick={toggleStar}
            />
          ) : (
            <ReposListPanel list={[...reposList]} onStarClick={toggleStar} />
          )}
        </section>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    `https://api.github.com/search/repositories?q=created:%3E${aWeekAgoDateISO()}&sort=stars&order=desc`
  );
  const data = await res.json();

  return {
    props: { data },
  };
};
