import React from "react";
import { render } from "@testing-library/react";
import Home from "./Home";

test("renders Home component correctly", () => {
  const { getByText } = render(<Home />);
  expect(
    getByText("Welcome to the home of my React projects"),
  ).toBeInTheDocument();
});
