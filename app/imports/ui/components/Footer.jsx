import React from 'react';
import { Button } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '6px' };
    return (
        <footer style={{ height: '150px', backgroundColor: '#000a16', color: 'white' }}>
          <div style={divStyle} className="ui fluid center aligned container">
            <hr />
            <div>
              <Button circular icon={'github'} className={'footerButton'}/>
              <Button circular icon={'github'} className={'footerButton'}/>
              <Button circular icon={'github'} className={'footerButton'}/>
              <Button circular icon={'github'} className={'footerButton'}/>
              <Button circular icon={'github'} className={'footerButton'}/>
            </div>

            The Hive Manoa • University of Hawaiʻi at Mānoa • 2500 Campus Road • Honolulu, HI 96822
          </div>
        </footer>
    );
  }
}

export default Footer;
