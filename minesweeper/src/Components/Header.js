import React, { PureComponent } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../Actions/UserActions";
import "./Header.css";

class Header extends PureComponent {
  handleLogout = () => {
    this.props.logout();
  };
  render() {
    return (
      <div className="header">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Link to="/" className="navbar-brand">
            Minesweeper
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/user" className="nav-link">
                User
              </Link>

              <Link to="/leaderboard" className="nav-link">
                Leader Board
              </Link>
              <Link to="/help" className="nav-link">
                Help
              </Link>
            </Nav>

            {this.props.isLoggedIn ? (
              <Nav>
                <Navbar.Text>
                  Logged in as: {this.props.FirstName} {this.props.LastName}
                </Navbar.Text>
                <Button
                  className="logout"
                  variant="outline-secondary"
                  onClick={() => this.handleLogout()}
                >
                  Logout
                </Button>
              </Nav>
            ) : (
              <Nav>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </Nav>
            )}
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  FirstName: state.user.FirstName,
  LastName: state.user.LastName
});

export default connect(
  mapStateToProps,
  { logout }
)(Header);
