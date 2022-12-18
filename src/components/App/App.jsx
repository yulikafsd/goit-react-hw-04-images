import css from './App.module.css';
import { Component } from 'react';
import axios from 'axios';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';

export class App extends Component {

  state = {
    query: '',
    page: 1,
    images: [],
  }

  increasePage = async () => {
    this.setState(prevState => { return { page: prevState.page + 1 } });
  }

  handleSubmit = async ({ query }) => {
    this.setState({page: 1});
    this.setState({ query: query });
    await this.fetchImages(query);
  }

  handleClick = () => {
  //    this.fetchImages(query);
  }

  fetchImages = async (newQuery) => {

    const paramsObj = {
      q: newQuery,
      page: this.state.page,
      key: '30604189-8e45b74ccc7e3af0dfc4ff4c6',
      per_page: 12,
      image_type: 'photo',
      orientation: 'horizontal',
    };

    const searchParams = new URLSearchParams(paramsObj);
    const apiUrl = 'https://pixabay.com/api/'; 
    const url = `${apiUrl}?${searchParams}`;

  try {
    const response = await axios.get(url);
    this.setState({ images: response.data.hits });
    } catch (error) {
    console.error(error);
  }
  }

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        <main>
          <ImageGallery images={this.state.images} />
          {this.state.images.length > 0 && <Button onClick={this.handleClick} />}
          </main>
      </div>
  )}
};
