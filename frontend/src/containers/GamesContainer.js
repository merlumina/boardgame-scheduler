import React from "react";
import { connect } from "react-redux";
import * as gamesActions from "../actions/gamesActions";
import * as sessionActions from "../actions/sessionActions";
import { bindActionCreators } from "redux";

import NewGameForm from "../components/games/NewGameForm";
import GameCard from "../components/games/GameCard";

class GamesContainer extends React.Component {
  componentDidMount() {
    this.props.actions.fetchGames();
  }

  render() {
    const games = this.props.games;
    const isUserLoading = this.props.sessions.loading;
    const areGamesLoading = this.props.games.loading;
    let gameForm, gameCards;
    if (isUserLoading) {
      gameForm = <p>Loading</p>;
    } else {
      gameForm = <NewGameForm user={this.props.sessions.user} />;
    }
    if (areGamesLoading) {
      gameCards = <p>Loading</p>;
    } else {
      gameCards = games.games.map((game) => <GameCard game={game} />);
    }
    return (
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold my-4">Games</h1>
        <div className="grid grid-cols-4 gap-4 my-4">{gameCards}</div>
        {gameForm}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    games: state.games,
    sessions: state.sessions,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      Object.assign({}, sessionActions, gamesActions),
      dispatch
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesContainer);
