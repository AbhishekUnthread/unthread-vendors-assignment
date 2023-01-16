import React from "react";
import "./AppReactImageGallery.scss";
import ImageGallery from "react-image-gallery";
import product2 from "../../assets/images/products/product2.jpg";
import "../../../node_modules/react-image-gallery/styles/scss/image-gallery.scss";

const AppReactImageGallery = () => {
  const reactImageGallery = [
    {
      original: product2,
      thumbnail: product2,
    },
    {
      original: product2,
      thumbnail: product2,
    },
    {
      original: product2,
      thumbnail: product2,
    },
    {
      original: product2,
      thumbnail: product2,
    },
    {
      original: product2,
      thumbnail: product2,
    },
    {
      original: product2,
      thumbnail: product2,
    },
  ];

  return (
    <ImageGallery
      items={reactImageGallery}
      // thumbnailPosition="left"
      showBullets={true}
      showPlayButton={false}
      showFullscreenButton={true}
    />
  );
};

export default AppReactImageGallery;
