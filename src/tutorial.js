// tutorial.js

//var React = require('react');
//var ReactDOM = require('react-dom');
//var CommentBox = require("./CommentBox.jsx");

import React from 'react';
import ReactDOM from 'react-dom';
import MaterialBox from './MaterialBox.jsx';

ReactDOM.render(
    <MaterialBox url="/api/comments" pollInterval={2000} />,
    document.getElementById('content')
);