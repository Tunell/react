// tutorial.js

var React = require('react');
var ReactDOM = require('react-dom');
var CommentBox = require("./CommentBox.jsx");

ReactDOM.render(
  <CommentBox url="/api/comments" pollInterval={2000} />,
  document.getElementById('content')
);