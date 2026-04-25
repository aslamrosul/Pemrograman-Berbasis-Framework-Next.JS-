import { render } from "@testing-library/react"
import AboutPage from "@/pages/about"

describe("About Page", () => {
    it("renders about page correctly", () => {
        const { container } = render(<AboutPage />)
        expect(container).toMatchSnapshot()
    })

    it("displays correct title text", () => {
        const { getByTestId } = render(<AboutPage />)
        const title = getByTestId("title")
        expect(title.textContent).toBe("About Page")
    })
})