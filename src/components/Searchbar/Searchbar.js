import css from './Searchbar.module.css';
import { Component } from 'react';

export class Searchbar extends Component {
  handleFormSubmit = event => {
    event.preventDefault();
    const query = event.target.elements.input.value;
    this.props.onSubmit({ query });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleFormSubmit}>
          <button type="submit" className={css.SearchFormButton}>
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
  }
}
