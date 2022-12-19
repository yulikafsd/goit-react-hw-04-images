import css from './App.module.css';
import { Component } from 'react';
import axios from 'axios';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

export class App extends Component {

  state = {
    query: '',
    page: 1,
    images: [],
    showModal: false,
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal, }));
  };

  increasePage = () => {
    this.setState(prevState => { return { page: prevState.page + 1 } });
  }

  handleSubmit = ({ query }) => {
    this.setState({page: 1});
    this.setState({ query: query });
    this.fetchImages(query);
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

    const { images, showModal } = this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        <main>
          <ImageGallery images={images} />
          {images.length > 0 && <Button onClick={this.handleClick} />}
          <button type="button" onClick={this.toggleModal}>Open Modal</button>
          {showModal && (<Modal onClose={this.toggleModal} />)}
        </main>
      </div>
  )}
};
