from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
from detector import find_duplicates

app = Flask(__name__)
CORS(app)

FILE = "todos.json"

def load_todos():
    if os.path.exists(FILE):
        with open(FILE, "r") as f:
            return json.load(f)
    return []

def save_todos(todos):
    with open(FILE, "w") as f:
        json.dump(todos, f)

todos = load_todos()

@app.route("/todos", methods=["GET"])
def get_todos():
    return jsonify(todos)

@app.route("/todos", methods=["POST"])
def add_todo():
    data = request.json
    todos.append(data["text"])
    save_todos(todos)
    return jsonify(todos), 201

@app.route("/todos/<int:index>", methods=["DELETE"])
def delete_todo(index):
    todos.pop(index)
    save_todos(todos)
    return jsonify(todos)
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/upload-images", methods=["POST"])
def upload_images():
    files = request.files.getlist("images")
    for file in files:
        file.save(os.path.join(UPLOAD_FOLDER, file.filename))
    return jsonify({"message": "Images uploaded"})

@app.route("/detect-duplicates", methods=["GET"])
def detect_duplicates():
    duplicates = find_duplicates(UPLOAD_FOLDER)
    return jsonify(duplicates)

@app.route("/delete-images", methods=["POST"])
def delete_images():
    data = request.json
    files = data["files"]

    for file in files:
        path = os.path.join(UPLOAD_FOLDER, file)
        if os.path.exists(path):
            os.remove(path)

    return jsonify({"message": "Deleted"})

if __name__ == "__main__":
    app.run(debug=True)

