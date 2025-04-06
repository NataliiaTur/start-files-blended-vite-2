import PhotosGalleryItem from '../PhotosGalleryItem/PhotosGalleryItem';
import Grid from '../Grid/Grid';
import GridItem from '../GridItem/GridItem';

const PhotosGallery = ({ photos, openModal }) => {
  return (
    <>
      <Grid>
        {photos.map(photo => (
          <GridItem key={photo.id}>
            <PhotosGalleryItem
              src={photo.src}
              alt={photo.alt}
              avg_color={photo.avg_color}
              openModal={openModal}
            />
          </GridItem>
        ))}
      </Grid>
    </>
  );
};
export default PhotosGallery;
