import { render } from "@testing-library/react"
import Footer from "@/components/layouts/footer"

describe("Footer Component", () => {
    it("renders footer component correctly", () => {
        const { container } = render(<Footer />)
        expect(container).toMatchSnapshot()
    })

    it("displays footer title", () => {
        const { getByTestId } = render(<Footer />)
        const footerTitle = getByTestId("footer-title")
        expect(footerTitle.textContent).toBe("Footer")
    })

    it("has footer container", () => {
        const { getByTestId } = render(<Footer />)
        const footer = getByTestId("footer")
        expect(footer).toBeTruthy()
    })
})
