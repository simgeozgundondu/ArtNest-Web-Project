from PIL import Image
import os

# Resimlerin bulunduğu klasörün yolu
image_folder = 'img/artistImg/'
# Yeni boyutlar
new_size = (445, 542)  # 300x300 piksel örneği

# Klasördeki tüm resimleri döngüyle işleyin
for filename in os.listdir(image_folder):
    if filename.endswith(('.jpg', '.png', '.webp')):
        image_path = os.path.join(image_folder, filename)
        with Image.open(image_path) as img:
            # Resmi yeniden boyutlandır ve kaydet
            img = img.resize(new_size, Image.Resampling.LANCZOS)
            img.save(image_path)
