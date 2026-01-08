from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow React to connect

todos = []

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

if __name__ == "__main__":
    app.run(debug=True)
