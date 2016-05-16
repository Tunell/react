//CommentList.jsx
//var React = require('react');
//var Comment = require("./Comment.jsx");

import React from 'react';
import Comment from './Comment.jsx';

const CommentForm = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
                {comment.text}
                </Comment>
        );
    });
    return (
      <div className="commentList">
            {commentNodes}
            </div>
      );
  }
});

export default CommentForm;