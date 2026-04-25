import { render } from "@testing-library/react"
import Custom404 from "@/pages/404"

describe("404 Page", () => {
    it("renders 404 page correctly", () => {
        const { container } = render(<Custom404 />)
        expect(container).toMatchSnapshot()
    })

    it("displays 404 heading", () => {
        const { container } = render(<Custom404 />)
        const heading = container.querySelector("h1")
        expect(heading?.textContent).toBe("404 - Halaman Tidak Ditemukan")
    })

    it("displays error message", () => {
        const { container } = render(<Custom404 />)
        const message = container.querySelector("p")
        expect(message?.textContent).toContain("Maaf, halaman yang Anda cari tidak tersedia")
    })
})
