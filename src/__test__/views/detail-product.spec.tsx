import { render } from "@testing-library/react"
import DetailProduct from "@/views/DetailProduct"

describe("Detail Product View", () => {
    const mockProducts = {
        id: "1",
        name: "Test Product",
        price: 100000,
        image: "/test.jpg",
        category: "Test Category"
    }

    it("renders detail product view correctly", () => {
        const { container } = render(<DetailProduct products={mockProducts} />)
        expect(container).toMatchSnapshot()
    })

    it("displays product name", () => {
        const { container } = render(<DetailProduct products={mockProducts} />)
        const productName = container.querySelector(".produkdetail__name")
        expect(productName?.textContent).toBe("Test Product")
    })

    it("displays product category", () => {
        const { container } = render(<DetailProduct products={mockProducts} />)
        const category = container.querySelector(".produkdetail__category")
        expect(category?.textContent).toBe("Test Category")
    })

    it("displays formatted price", () => {
        const { container } = render(<DetailProduct products={mockProducts} />)
        const price = container.querySelector(".produkdetail__price")
        expect(price?.textContent).toContain("100")
    })

    it("renders product image", () => {
        const { container } = render(<DetailProduct products={mockProducts} />)
        const image = container.querySelector("img")
        expect(image).toBeTruthy()
    })

    it("displays detail title", () => {
        const { container } = render(<DetailProduct products={mockProducts} />)
        const title = container.querySelector("h1")
        expect(title?.textContent).toBe("Detail Produk")
    })
})
