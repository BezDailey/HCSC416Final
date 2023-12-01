import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BasicForm from "./BasicForm";

describe("BasicForm Component", () => {
  test("renders form inputs and submit button", () => {
    render(<BasicForm />);
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Phone")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("validates empty fields and shows error messages", () => {
    render(<BasicForm />);
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(screen.getByText("Name Required")).toBeInTheDocument();
    expect(screen.getByText("Email Required")).toBeInTheDocument();
    expect(screen.getByText("Phone Required")).toBeInTheDocument();
  });

  test("adds a person to the list on valid submission", () => {
    render(<BasicForm />);
    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "jane@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone"), {
      target: { value: "9876543210" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(
      screen.getByText(
        "Name: Jane Doe, Phone: 9876543210, Email: jane@example.com",
      ),
    ).toBeInTheDocument();
  });
});
