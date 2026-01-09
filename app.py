from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from PIL import Image
import imagehash

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

todos = []

# ---------------- TODO API ----------------
@app.route("/todos", methods=["GET"])
def get_todos():
    return jsonify(todos)

@app.route("/todos", methods=["POST"])
def add_todo():
    data = request.json
    todos.append(data["text"])
    return jsonify({"message": "Todo added"}), 201

@app.route("/todos/<int:index>", methods=["DELETE"])
def delete_todo(index):
    todos.pop(index)
    return jsonify({"message": "Todo deleted"})

# ---------------- DUPLICATE IMAGE API ----------------
@app.route("/upload-images", methods=["POST"])
def upload_images():
    files = request.files.getlist("images")
    for file in files:
        file.save(os.path.join(UPLOAD_FOLDER, file.filename))
    return jsonify({"message": "Images uploaded"})

@app.route("/detect-duplicates", methods=["GET"])
def detect_duplicates():
    hashes = {}
    duplicates = []

    for filename in os.listdir(UPLOAD_FOLDER):
        path = os.path.join(UPLOAD_FOLDER, filename)

        try:
            img = Image.open(path)
            h = imagehash.average_hash(img)
        except Exception:
            continue

        if h in hashes:
            duplicates.append({
                "original": hashes[h],
                "duplicate": filename
            })
        else:
            hashes[h] = filename

    return jsonify(duplicates)

@app.route("/delete-images", methods=["POST"])
def delete_images():
    files = request.json.get("files", [])
    for f in files:
        path = os.path.join(UPLOAD_FOLDER, f)
        if os.path.exists(path):
            os.remove(path)
    return jsonify({"message": "Deleted selected images"})

if __name__ == "__main__":
    app.run(debug=True)
