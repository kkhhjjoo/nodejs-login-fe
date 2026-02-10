import React from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({ item, deleteItem, toggleComplete, user }) => {
  const isAuthor = user?._id === item.author?._id;
  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item ${item.isComplete ? "item-complete" : ""}`}>
          <div className="todo-content">{item.task}</div>
          <div>by {item.author?.name}</div>

          {isAuthor && (
            <div>
              <button
                className="button-delete"
                onClick={() => deleteItem(item._id)}
              >
                삭제
              </button>
              <button
                className="button-delete"
                onClick={() => toggleComplete(item._id)}
              >
                {item.isComplete ? `안끝남` : `끝남`}
              </button>
            </div>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
