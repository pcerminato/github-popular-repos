import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import {
  aWeekAgoDateISO,
  injectStars,
  updateLocalStorage,
  getStaredRepos,
} from "../src/services/utils";
import { ReposListPanel } from "../components/ReposListPanel";
import { LanguageSelector } from "../components/LanguagSelector";
import { StaredReposCheckbox } from "../components/StaredReposCheckbox";

export default function Home({ data, languages }) {
  const [originalData, setOriginalData] = useState([]);
  const [reposList, setReposList] = useState([]);
  const [staredReposList, setStaredReposList] = useState([]);
  const [showStaredOnly, setShowStaredOnly] = useState(false);
  const [language, setLanguage] = useState();

  const toggleStar = (repoId, isStared) => {
    const reposListWithStars = injectStars(reposList, [`${repoId}`], !isStared);
    setReposList([...reposListWithStars]);
    updateLocalStorage(repoId, isStared);
  };

  const handleShowStaredClick = () => {
    setShowStaredOnly((value) => !value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  // initial data setup
  useEffect(() => {
    // merges the original dataset with the localStorage stared repos
    const staredReposList = getStaredRepos();
    const reposListWithStars = injectStars([...data.items], staredReposList);

    setReposList([...reposListWithStars]);
    setOriginalData([...reposListWithStars]);
  }, [data.items]);

  useEffect(() => {
    if (language) {
      const reposListByLang =
        language === "all"
          ? [...originalData]
          : [...originalData].filter((repo) => repo.language === language);
      setReposList([...reposListByLang]);
    }
  }, [language, originalData]);

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
      <section className="options">
        <StaredReposCheckbox onShowStaredClick={handleShowStaredClick} />
        <LanguageSelector
          language={language}
          languages={languages}
          onLanguageChange={handleLanguageChange}
        />
      </section>

      <main className="main">
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

  // makes a "distinct" list of all languages in the dataset
  let languages = data?.items.reduce((list, repo) => {
    if (repo.language !== null && !list.includes(repo.language)) {
      list.push(repo.language);
    }
    return list;
  }, []);

  languages = languages.sort();

  return {
    props: { data, languages },
  };
};
