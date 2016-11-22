import React from 'react';
import $ from 'jquery';
import CSSModules from 'react-css-modules';
import 'whatwg-fetch';

import styles from './MainStyles.less';

class LoadMaterials extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      materials: []
    }
    this.loadMaterialListFromServer = this.loadMaterialListFromServer.bind(this);
  }

  loadMaterialListFromServer(url) {
    const myRequest = new Request(url,myInit);
    const myInit = {
      method: 'GET',
      'Content-Type': 'text/plain',
      cache: 'default',
      credentials: 'include'
    };

    return fetch(myRequest,myInit)
    .then((response) => {
      if (!response.ok) {
        console.error('The Fetch request of ' + myRequest.url + ' failed.' , myRequest, response);
        return;
      }
      return response.json();
    }).then((data)=>{
      this.setState({
        materials: data
      });
    });
  }

  componentDidMount() {
    this.loadMaterialListFromServer(this.props.route.url);
    setInterval(
      ()=>{
        this.loadMaterialListFromServer(this.props.route.url)
      }, this.props.route.pollInterval );
  }

  render(){
    const { materials } = this.state;
    return (
      <div>
        {React.cloneElement(this.props.children, { materials })}
      </div>
    )
  }
}

export default CSSModules(LoadMaterials, styles)