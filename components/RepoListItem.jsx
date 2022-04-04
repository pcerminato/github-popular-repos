export const RepoListItem = ({
  description,
  url,
  name,
  onStarClick,
  stars,
  isStared,
}) => (
  <div className="card">
    <h3>
      <a href={url} title="Open at github" target="_blank" rel="noreferrer">
        {name}
      </a>
    </h3>
    <p>{description ?? "(No available description)"}</p>
    <p>
      {stars} {isStared ? " +1 (yours)" : ""}
    </p>
    <button onClick={onStarClick}>{isStared ? "Unstar" : "Star"}</button>
  </div>
);
