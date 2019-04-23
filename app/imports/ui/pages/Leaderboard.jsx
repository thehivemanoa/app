class App extends React.Component {
  constructor() {
    super();
    this.state = {
      list: []
    }
    this._clickAllTime = this._clickAllTime.bind(this);
    this._clickRecent = this._clickRecent.bind(this);
  }

  componentDidMount() {
    const fetchInit = {
      method: 'GET',
      mode: 'cors'
    };

    fetch(`${this.props.apiURL}`, fetchInit)
        .then(response => response.json())
        .then(data => {
          this.setState({
            list: data
          });
        })
        .catch(err => console.log('fetch error : ', err))
  }

  _clickAllTime(e) {
    let sorted = this.state.list.sort((a, b) => b.alltime - a.alltime);
    this.setState(sorted);
  }

  _clickRecent(e) {
    let sorted = this.state.list.sort((a, b) => b.recent - a.recent);
    this.setState(sorted);
  }

  render() {
    let userlist = this.state.list.map((user, i) => <User username={user.username} rank={i + 1} img={user.img}
                                                          recent={user.recent} alltime={user.alltime}/>);

    return (
        <div className="container">
          <LeaderboardHeader/>
          <ColumnHeader onClickAll={this._clickAllTime} onClick={this._clickRecent}/>
          {userlist}
        </div>
    )
  }

}

const LeaderboardHeader = () => {
  return (
      <div className="leadheader">
        <h2>Leaderboard</h2>
      </div>
  )
}

const ColumnHeader = ({
                        onClick,
                        onClickAll
                      }) => (
    <div className="row colheader">
      <div className="col-xs-1">
        <h4>#</h4>
      </div>
      <div className="col-xs-5">
        <h4>Name</h4>
      </div>
      <div className="col-xs-3 recent">
        <h4 onClick={onClick}>Last 30 days</h4>
      </div>
      <div className="col-xs-3 alltime">
        <h4 onClick={onClickAll}>All time</h4>
      </div>
    </div>
);

ColumnHeader.propTypes = {
  onClick: React.PropTypes.func,
  onClickAll: React.PropTypes.func
}

const User = ({ rank, img, username, recent, alltime }) => {
  return (
      <div className="row users  vcenter">
        <div className="col-xs-1 rank">
          <h4>{rank}</h4>
        </div>
        <div className="col-xs-5 name">
          <img src={img} alt='avatar'/> <a href={`https://www.freecodecamp.com/${username}`}
                                           target="_blank">{username}</a>
        </div>
        <div className="col-xs-3">
          <h4>{recent}</h4>
        </div>
        <div className="col-xs-3">
          <h4>{alltime}</h4>
        </div>
      </div>
  )
}

User.propTypes = {
  rank: React.PropTypes.number.isRequired,
  img: React.PropTypes.string.isRequired,
  username: React.PropTypes.string.isRequired,
  recent: React.PropTypes.number.isRequired,
  alltime: React.PropTypes.number.isRequired
}

ReactDOM.render(<App
    apiURL='https://fcctop100.herokuapp.com/api/fccusers/top/recent'/>, document.getElementById('app'));