import { RepoListItem } from "./RepoListItem";

export const RepoList = ({ list, onStarClick }) =>
  list.map((repo) => (
    <RepoListItem
      url={repo.html_url}
      name={repo.name}
      description={repo.description}
      key={repo.id}
      onStarClick={() => onStarClick(repo.id, repo.isStared ?? false)}
      stars={repo.stargazers_count}
      isStared={repo.isStared}
      language={repo.language}
    />
  ));
