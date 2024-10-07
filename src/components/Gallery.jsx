const Gallery = ({ images }) => {
    return (
      <div className="gallery-container">
        <h2>Screenshot Gallery</h2>
        {images.length > 0 ? (
          images.map((img, index) => (
            <img key={index} src={img} alt={`Screenshot ${index}`} className="gallery-img" />
          ))
        ) : (
          <p>No screenshots yet.</p>
        )}
      </div>
    );
  };
  
  export default Gallery;
  