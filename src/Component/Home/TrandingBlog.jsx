import React from 'react';
import { createRoot } from 'react-dom/client';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const TrandingBlog = () => {
  const onChange = (index, item) => {
    console.log(`Item ${index} clicked:`, item);
  };

  const onClickItem = (index, item) => {
    console.log(`Item ${index} clicked:`, item);
  };

  const onClickThumb = (index, item) => {
    console.log(`Thumbnail ${index} clicked:`, item);
  };

  return (
    <Carousel 
      showArrows={true} 
      onChange={onChange} 
      onClickItem={onClickItem} 
      onClickThumb={onClickThumb}
    >
      <div>
        <img src="assets/1.jpeg" alt="Legend 1" />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img src="assets/2.jpeg" alt="Legend 2" />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img src="assets/3.jpeg" alt="Legend 3" />
        <p className="legend">Legend 3</p>
      </div>
      <div>
        <img src="assets/4.jpeg" alt="Legend 4" />
        <p className="legend">Legend 4</p>
      </div>
      <div>
        <img src="assets/5.jpeg" alt="Legend 5" />
        <p className="legend">Legend 5</p>
      </div>
      <div>
        <img src="assets/6.jpeg" alt="Legend 6" />
        <p className="legend">Legend 6</p>
      </div>
    </Carousel>
  );
};

export default TrandingBlog;

// Render the component
const container = document.querySelector('.demo-carousel');
if (container) {
  const root = createRoot(container);
  root.render(<TrandingBlog />);
} else {
  console.error('Target container is not a DOM element.');
}
