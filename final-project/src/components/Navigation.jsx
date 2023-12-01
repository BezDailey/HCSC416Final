import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/form">Form</Link>
      <Link to="/tic-tac-toe">Tic-Tac-Toe</Link>
      <Link to="/task-list">Task List</Link>
    </nav>
  );
}

export default Navigation;
