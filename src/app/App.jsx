import css from './App.module.css';
import { Component } from 'react';
import { ApiService } from 'services/ApiService';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';

const apiService = new ApiService();

export class App extends Component {

  state = {
    loading: false,
    largeImgSrc: '',
    tags: '',
    images: []
  }

  handleSubmit = async ({ newQuery }) => {
    apiService.query = newQuery;
    apiService.resetPage();

    try {
      this.setState({ loading: true });
      const promise = await apiService.fetchPictures();
      const { totalHits } = promise;
      // const { hits } = promise;

      if (totalHits < 1) {
      // notifyFailure();
      // clearGallery();
        console.log(`nothing found`);
      } else {
        apiService.totalHits = totalHits;  
        this.setState({ images: [...apiService.images], totalHits });
        // clearGallery();
        // notifySuccess(totalHits);
        // checkLastPage();
        console.log(`found ${totalHits} results => render`)
      }
      this.setState({ loading: false });
    } catch (error) {
      console.log(error);
    }

  }

  handleImageClick = ({ largeImageURL, alt }) => {
    console.log(largeImageURL);
    console.log(alt);
    this.setState({ largeImgSrc: largeImageURL, tags: alt });

  }

  handleBtnClick = () => {
  //    this.fetchImages(query);
  }

  handleModalClose = () => {
    this.setState({ largeImgSrc: '', tags: ''});
  }

  render() {

    const { images, largeImgSrc, tags } = this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSubmit} />
        <main>
          {this.state.loading && <p>LOADING.....</p>}
          <ImageGallery images={images} onClick={this.handleImageClick} />
          {apiService.totalHits > 12 && <Button onClick={this.handleBtnClick} />}
          {largeImgSrc && <Modal onClose={this.handleModalClose} src={largeImgSrc} alt={tags} />}
        </main>
      </div>
  )}
};
