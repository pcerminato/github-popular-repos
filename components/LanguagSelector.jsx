export const LanguageSelector = ({
  onLanguageChange,
  languages = [],
  language,
}) => (
  <select onChange={onLanguageChange} value={language} className="languages">
    <option value="all" key="all-langs">
      All languages
    </option>
    {languages.map((lang) => (
      <option value={lang} key={lang}>
        {lang}
      </option>
    ))}
  </select>
);
