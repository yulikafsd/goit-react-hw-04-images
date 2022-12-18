import css from './App.module.css';
import { Component } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';

export class App extends Component {

  state = {
    query: '',
    page: 1,
    images: [],
  }

  handleSubmit = (response) => {
    this.setState({images: response})
  }

  fetchData = () => {
    const { query, page } = this.state;

    const paramsObj = {
      q: query,
      page: page,
      key: '30604189-8e45b74ccc7e3af0dfc4ff4c6',
      per_page: 12,
      image_type: 'photo',
      orientation: 'horizontal',
    };

    const searchParams = new URLSearchParams(paramsObj);
    const apiUrl = 'https://pixabay.com/api/'; 
    const url = `${apiUrl}?${searchParams}`;

    // add axios
  }

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={this.state.images} />
        {this.state.images > 0 && <Button />}
      </div>
  )}
};
