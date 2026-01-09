from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

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

if __name__ == "__main__":
    app.run(debug=True)

