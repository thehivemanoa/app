import React from 'react';
import { Header, Container } from 'semantic-ui-react';
import Leaderboard from '../components/Leaderboard';

export default class LeaderboardPage extends React.Component {
  render() {
    return (
        <div className={'page-container'}>
          <Container>
            <Header as='h1' content={'Leaderboard'}/>
            <Leaderboard/>
          </Container>
        </div>
    );
  }
}
