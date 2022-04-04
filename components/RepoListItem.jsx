export const RepoListItem = ({
  description,
  url,
  name,
  language,
  onStarClick,
  stars,
  isStared,
}) => (
  <div className="card">
    <h3>
      <a href={url} title="Open at github" target="_blank" rel="noreferrer">
        {name}
      </a>
      <button onClick={onStarClick} className="star">
        {isStared ? "Unstar" : "Star"}
      </button>
    </h3>
    <p>{description ?? "(No available description)"}</p>
    <p>{language}</p>
    <p className="stars-info">
      Stars {stars} {isStared ? " + yours" : ""}
    </p>
  </div>
);
