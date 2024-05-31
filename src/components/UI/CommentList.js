import React, { useState } from "react";
import moment from "moment"; // To format dates
import Rating from "../../components/Rating";
import { IoPersonCircleOutline } from "react-icons/io5"; // Correctly import the icon
import { Button } from "react-bootstrap";

const CommentsList = ({ reviews }) => {
  const [visibleComments, setVisibleComments] = useState(2);

  const loadMoreComments = () => {
    setVisibleComments((prev) => prev + 2);
  };
  const [expandedComments, setExpandedComments] = useState({});

  const truncateComment = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + " ...";
    }
    return text;
  };
  const toggleExpandComment = (createdAt) => {
    setExpandedComments((prev) => ({
      ...prev,
      [createdAt]: !prev[createdAt],
    }));
  };
  return (
    <div className="container mx-auto p-4 border border-gray-300 rounded-lg">
      <ul className="space-y-4">
        {reviews.length ? (
          <div className="my-1">
            {reviews
              .slice(0, visibleComments)
              .map(({ comment, rating, name, createdAt }) => (
                <div key={createdAt} className="mb-4">
                  <div className="flex items-center space-x-2 ">
                    <IoPersonCircleOutline className="text-3xl" />
                    <span className="text-lg font-semibold">{name}</span>
                  </div>
                  <div className="flex items-center">
                    <Rating value={rating} isComment={true} color={"#f8e825"} />
                  </div>
                  <p className="text-sm text-gray-600">
                    {moment(createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                  </p>
                  <p className="text-right">
                    {expandedComments[createdAt]
                      ? comment
                      : truncateComment(comment, 50)}
                    {comment.length > 100 && (
                      <button
                        className="text-blue-500 hover:underline ml-2"
                        onClick={() => toggleExpandComment(createdAt)}
                      >
                        {expandedComments[createdAt] ? "عرض أقل" : "عرض المزيد"}
                      </button>
                    )}
                  </p>
                </div>
              ))}
            {reviews.length > visibleComments && (
              <div className="text-center">
                <Button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                  onClick={loadMoreComments}
                  variant="secondary"
                >
                  عرض المزيد من التعليقات
                </Button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500">No reviews yet</p>
        )}
      </ul>
    </div>
  );
};

export default CommentsList;
