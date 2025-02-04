import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { SearchBar } from "@/components/SearchBar"

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
    }
  },
}))

describe("SearchBar", () => {
  it("renders correctly", () => {
    render(<SearchBar />)
    expect(screen.getByPlaceholderText("Pesquisar...")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Pesquisar" })).toBeInTheDocument()
  })

  it("updates input value on change", () => {
    render(<SearchBar />)
    const input = screen.getByPlaceholderText("Pesquisar...")
    fireEvent.change(input, { target: { value: "teste" } })
    expect(input).toHaveValue("teste")
  })

  it("calls router.push with correct query on form submission", () => {
    const { push } = require("next/navigation").useRouter()
    render(<SearchBar />)
    const input = screen.getByPlaceholderText("Pesquisar...")
    const form = screen.getByRole("form")

    fireEvent.change(input, { target: { value: "teste" } })
    fireEvent.submit(form)

    expect(push).toHaveBeenCalledWith("/pesquisa?q=teste")
  })
})

