import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit, isSubmitting }) => {
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onSubmit}>
        <button
          type="submit"
          className={css.SearchFormButton}
          disabled={isSubmitting}
        >
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          name="input"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
