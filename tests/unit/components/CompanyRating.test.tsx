import React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { CompanyRating } from "@/components/CompanyRating"

jest.mock("next-auth/react", () => ({
  useSession: () => ({
    data: { user: { id: "1", name: "Test User" } },
    status: "authenticated",
  }),
}))

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ id: "1", rating: 4, content: "Great company!", createdAt: new Date().toISOString() }),
  }),
) as jest.Mock

describe("CompanyRating", () => {
  const mockProps = {
    companyId: "1",
    companyName: "Test Company",
    initialReviews: [],
  }

  it("renders correctly", () => {
    render(<CompanyRating {...mockProps} />)
    expect(screen.getByText("Avaliações para Test Company")).toBeInTheDocument()
    expect(screen.getByText("Adicionar avaliação")).toBeInTheDocument()
  })

  it("allows users to submit a review", async () => {
    render(<CompanyRating {...mockProps} />)

    const ratingButtons = screen.getAllByRole("button", { name: /Avaliar \d estrelas/ })
    fireEvent.click(ratingButtons[3])

    const textarea = screen.getByPlaceholderText("Escreva sua avaliação...")
    fireEvent.change(textarea, { target: { value: "Great company!" } })

    const submitButton = screen.getByText("Enviar Avaliação")
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/companies/1/reviews", expect.any(Object))
    })

    expect(await screen.findByText("Great company!")).toBeInTheDocument()
  })
})

