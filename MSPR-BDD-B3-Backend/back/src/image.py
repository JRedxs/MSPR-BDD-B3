import exifread
from PIL import Image, ImageFilter
import hashlib,io

# Supprimer les métadonnées de l'image
def remove_metadata(image_data):
    try:
        exif_dict = exifread.load(image_data)
        exif_dict["0tH"] = {}
        exif_dict["Exif"] = {}
        exif_dict["GPS"] = {}
        exif_bytes = exifread.dump(exif_dict)
        new_image_data = exifread.insert(exif_bytes, image_data)
    except:
        new_image_data = image_data
    return new_image_data



# Appliquer un flou gaussien à l'image
def apply_blur(image_data):
    image = Image.open(io.BytesIO(image_data))
    blurred_image = image.filter(ImageFilter.GaussianBlur(radius=10))
    buffered_image = io.BytesIO()
    blurred_image.save(buffered_image, format=image.format)
    return buffered_image.getvalue()


# Hacher l'image
def hash_image(image_data):
    sha256_hash = hashlib.sha256()
    sha256_hash.update(image_data)
    return sha256_hash.digest()