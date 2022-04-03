export const RepoListItem = ({
  description,
  html_url,
  id,
  name,
  className,
}) => (
  <div className={className}>
    <h2>
      <a
        href={html_url}
        title="Open at github"
        target="_blank"
        rel="noreferrer"
      >
        {name}
      </a>
    </h2>
    <p>{description ?? "(No available description)"}</p>
  </div>
);
