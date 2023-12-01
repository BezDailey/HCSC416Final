import React from "react";

class BasicForm extends React.Component {
  static displayName = "basic-input";
  state = {
    people: [],
    fields: { name: "", email: "", phone: "" },
    fieldErrors: [],
    inputErrors: { name: "", email: "", phone: "" },
  }; // <-- initial state

  onFormSubmit = (evt) => {
    evt.preventDefault();
    const person = this.state.fields;
    const fieldErrors = this.validate(person);
    this.setState({ fieldErrors: fieldErrors });
    if (fieldErrors.length === 0) {
      this.setState((prevState) => ({
        people: prevState.people.concat(person),
        fields: { name: "", email: "", phone: "" },
        inputErrors: {
          name: "Name Required",
          email: "Email Required",
          phone: "Phone Required",
        },
      }));
    } else {
      this.setState({ fieldErrors });
    }
  };

  validate = (person) => {
    const errors = [];
    if (!person.name) errors.push("Name Required");
    if (!person.email) errors.push("Email Required");
    if (!person.phone) errors.push("Phone Required");
    return errors;
  };

  onInputChange = (evt) => {
    const fields = Object.assign({}, this.state.fields);
    const inputErrors = Object.assign({}, this.state.inputErrors);
    fields[evt.target.name] = evt.target.value;

    const value = fields[evt.target.name];
    const target = evt.target.name;

    if (value === "") {
      inputErrors[target] = "Value is required";
    }

    switch (target) {
      case "name":
        if (value === "") {
          inputErrors[target] = "Name is required";
        } else {
          inputErrors[target] = "";
        }
        break;
      case "phone":
        let phoneRegex = /^[0-9()-]+$/;
        if (!phoneRegex.test(value)) {
          inputErrors[target] =
            "This phone number is invalid. ONLY use numbers";
        } else {
          inputErrors[target] = "";
        }
        break;
      case "email":
        let emailRegex = /(.+)@(.+){2,}\.(.+){2,}/;
        if (!emailRegex.test(value)) {
          inputErrors[target] = "This email is invalid";
        } else {
          inputErrors[target] = "";
        }
        break;
      default:
        inputErrors[target] = "";
    }

    this.setState({ fields });
    this.setState({ inputErrors });
    console.log(inputErrors);
  };

  render() {
    return (
      <div>
        <h1>Sign Up Sheet</h1>

        <form onSubmit={this.onFormSubmit}>
          <br />
          <input
            placeholder="Name"
            name="name"
            value={this.state.fields.name}
            onChange={this.onInputChange}
          />
          <p style={{ color: "red" }}>{this.state.inputErrors.name}</p>
          <br />
          <input
            placeholder="Email"
            value={this.state.fields.email}
            name="email"
            onChange={this.onInputChange}
          />
          <p style={{ color: "red" }}>{this.state.inputErrors.email}</p>
          <br />
          <input
            placeholder="Phone"
            value={this.state.fields.phone}
            name="phone"
            onChange={this.onInputChange}
          />
          <p style={{ color: "red" }}>{this.state.inputErrors.phone}</p>
          <br />
          <input type="submit" />
        </form>
        <div>
          <h3>Errors</h3>
          <ul>
            {this.state.fieldErrors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3>People</h3>
          <ul>
            {this.state.people.map((person, i) => (
              <li key={i}>
                Name: {person.name}, Phone: {person.phone}, Email:{" "}
                {person.email}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default BasicForm;
