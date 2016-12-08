import React from 'react';
import marked from 'marked';

const Material = React.createClass({
 
  render: function() {
    return (
      <div>
        <p style={{color:'red'}}>TODO: Inloggning endast demo, Lägg till lösenord till hela sidan</p>
        
        <br/>
        <button type="submit" style={{border:'1px solid red'}}>Logga in</button>
      </div>
      );
  }
});

export default Material;