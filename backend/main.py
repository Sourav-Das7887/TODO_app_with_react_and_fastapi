from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from datetime import date
from typing import Optional

class Todo(BaseModel):
    title: str
    deadline: Optional[str] = None  # ISO date string, e.g., "2025-08-30"

# Update helper
def todo_helper(todo) -> dict:
    return {
        "id": str(todo["_id"]),
        "title": todo["title"],
        "completed": todo.get("completed", False),
        "deadline": todo.get("deadline"),
    }

app = FastAPI()

# allow frontend (React) to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB setup
MONGO_URL = "mongodb://localhost:27017/todo_db"
client = AsyncIOMotorClient(MONGO_URL)
db = client.todo_db
collection = db.todos

# When adding a todo
@app.post("/todos")
async def add_todo(todo: Todo):
    new_todo = {
        "title": todo.title,
        "completed": False,
        "deadline": todo.deadline,
    }
    result = await collection.insert_one(new_todo)
    new_todo["_id"] = result.inserted_id
    return todo_helper(new_todo)

@app.get("/todos")
async def get_todos():
    todos = []
    async for todo in collection.find():
        todos.append(todo_helper(todo))
    return todos



@app.patch("/todos/{todo_id}")
async def toggle_todo(todo_id: str):
    todo = await collection.find_one({"_id": ObjectId(todo_id)})
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    new_status = not todo.get("completed", False)
    await collection.update_one({"_id": ObjectId(todo_id)}, {"$set": {"completed": new_status}})
    todo["completed"] = new_status
    return todo_helper(todo)

@app.delete("/todos/{todo_id}")
async def delete_todo(todo_id: str):
    result = await collection.delete_one({"_id": ObjectId(todo_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Todo not found")
    return {"message": "Todo deleted"}
