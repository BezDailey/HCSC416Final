import React from "react";

class Board extends React.Component {
  render() {
    const segmentComponents = this.props.segments.map((segment) => (
      <Segment
        key={"segment-" + segment.id}
        id={segment.id}
        value={segment.value}
        handleSegmentSelect={this.props.handleSegmentSelect}
      />
    ));

    return <div className="grid-container">{segmentComponents}</div>;
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      segments: [],
      player: "x",
      moves: 0,
      message: "",
      gameOver: false,
    };

    this.handleSegmentSelect = this.handleSegmentSelect.bind(this);
    this.checkWin = this.checkWin.bind(this);
    this.newGame = this.newGame.bind(this);
  }

  handleSegmentSelect(Id) {
    let selectedSegment = this.state.segments.find(
      (segment) => segment.id === Id,
    );
    if (selectedSegment.value !== " " || this.state.gameOver) return;

    let newSegments = this.state.segments.map((segment) => {
      if (segment.id === Id) {
        return Object.assign({}, segment, {
          id: Id,
          value: this.state.player,
        });
      } else {
        return segment;
      }
    });

    // saving player move
    this.setState({ segments: newSegments });

    // changing player
    let newPlayer = this.state.player === "x" ? "o" : "x";
    this.setState({ player: newPlayer });

    // changing move count
    let newMoves = this.state.moves + 1;
    this.setState({ moves: newMoves });

    // checkingWin
    let win = this.checkWin(newSegments);
    console.log(win);

    if (win !== "") {
      let newMessage = "";
      newMoves = 0;
      newPlayer = "x";

      if (win !== "draw") {
        newMessage = "Player " + win + " won";
      } else {
        newMessage = "Game Draw";
      }

      this.setState({
        message: newMessage,
        moves: newMoves,
        player: newPlayer,
        gameOver: true,
      });
    }
  }

  checkWin(segments) {
    const winningCombinations = [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
      ["1", "4", "7"],
      ["2", "5", "8"],
      ["3", "6", "9"],
      ["1", "5", "9"],
      ["3", "5", "7"],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      const segmentA = segments.find((segment) => segment.id === a);
      const segmentB = segments.find((segment) => segment.id === b);
      const segmentC = segments.find((segment) => segment.id === c);

      if (
        segmentA.value === segmentB.value &&
        segmentB.value === segmentC.value &&
        segmentA.value !== " "
      ) {
        return segmentA.value;
      }
    }

    if (this.state.moves === 9) {
      return "draw";
    }

    return "";
  }

  componentDidMount() {
    this.setState({
      segments: [
        { id: "1", value: " " },
        { id: "2", value: " " },
        { id: "3", value: " " },
        { id: "4", value: " " },
        { id: "5", value: " " },
        { id: "6", value: " " },
        { id: "7", value: " " },
        { id: "8", value: " " },
        { id: "9", value: " " },
      ],
    });
  }

  newGame() {
    const newMoves = 0;
    const newPlayer = "x";
    const newSegments = [
      { id: "1", value: " " },
      { id: "2", value: " " },
      { id: "3", value: " " },
      { id: "4", value: " " },
      { id: "5", value: " " },
      { id: "6", value: " " },
      { id: "7", value: " " },
      { id: "8", value: " " },
      { id: "9", value: " " },
    ];

    this.setState({
      moves: newMoves,
      player: newPlayer,
      segments: newSegments,
      message: "",
      gameOver: false,
    });
  }

  render() {
    if (this.state.gameOver) {
      return (
        <div>
          <h2>Game Over</h2>
          <p>{this.state.message}</p>
          <button className="ui button" onClick={this.newGame}>
            New Game
          </button>
        </div>
      );
    }

    return (
      <div>
        <h2>Tic-Tac-Toe</h2>
        <p>Current Player: {this.state.player}</p>
        <button className="ui button" onClick={this.newGame}>
          New Game
        </button>
        <Board
          segments={this.state.segments}
          handleSegmentSelect={this.handleSegmentSelect}
        />
      </div>
    );
  }
}

class Segment extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleSegmentSelect(this.props.id);
  }

  render() {
    return (
      <div onClick={this.handleClick} className="grid-item ui segment">
        {this.props.value}
      </div>
    );
  }
}

export default Game;
