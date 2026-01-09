from PIL import Image
import imagehash
import os

def find_duplicates(folder):
    hashes = {}
    duplicates = []

    for file in os.listdir(folder):
        if file.lower().endswith(".jpg"):
            path = os.path.join(folder, file)
            img = Image.open(path)
            h = imagehash.average_hash(img)

            if h in hashes:
                duplicates.append({
                    "original": hashes[h],
                    "duplicate": file
                })
            else:
                hashes[h] = file

    return duplicates
