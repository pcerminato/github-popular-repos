export const StaredReposCheckbox = ({ onShowStaredClick }) => (
  <label htmlFor="stared-only-check">
    Only stared repos
    <input type="checkbox" id="stared-only-check" onClick={onShowStaredClick} />
  </label>
);
