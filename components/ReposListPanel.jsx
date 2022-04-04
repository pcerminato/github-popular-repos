import { RepoList } from "./RepoList";

export const ReposListPanel = ({ list, onStarClick }) =>
  list.length ? (
    <RepoList list={list} onStarClick={onStarClick} />
  ) : (
    <div>No results</div>
  );
