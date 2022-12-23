import { ThreeDots } from 'react-loader-spinner';

export const Loader = () => (
  <ThreeDots
    height="80"
    width="80"
    radius="9"
    color="#3F51B5"
    ariaLabel="three-dots-loading"
    wrapperStyle={{ margin: 'auto' }}
    visible={true}
  />
);
