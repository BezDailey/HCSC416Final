import React from "react";

class ParentComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
    };

    this.handleBtnClick = this.handleBtnClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      tasks: [
        { id: 1, name: "Wash Dishes", color: "red" },
        { id: 2, name: "Vacuum the living room", color: "yellow" },
        { id: 3, name: "Take out the trash", color: "White" },
      ],
    });
  }

  handleBtnClick(taskId) {
    const updatedTasks = this.state.tasks.map((task) => {
      if (task.id === taskId) {
        return Object.assign({}, task, {
          name: "Done",
          color: "green",
        });
      } else {
        return task;
      }
    });

    this.setState({
      tasks: updatedTasks,
    });
  }

  render() {
    const tasks = this.state.tasks;
    const taskComponents = tasks.map((task) => (
      <ChildComponent
        key={"task-" + task.id}
        id={task.id}
        name={task.name}
        color={task.color}
        onDone={this.handleBtnClick}
      />
    ));
    return <div className="ui unstackable items">{taskComponents}</div>;
  }
}

class ChildComponent extends React.Component {
  constructor(props) {
    super(props);

    this.onDone = this.onDone.bind(this);
  }

  onDone() {
    this.props.onDone(this.props.id);
  }

  render() {
    const inlineStyles = {
      background: this.props.color,
    };

    return (
      <div style={inlineStyles} className="ui centered card">
        <div className="field">
          <label>Task: {this.props.name}</label>
        </div>
        <button onClick={this.onDone} className="ui basic blue button">
          Complete!
        </button>
      </div>
    );
  }
}

export default ParentComponent;
