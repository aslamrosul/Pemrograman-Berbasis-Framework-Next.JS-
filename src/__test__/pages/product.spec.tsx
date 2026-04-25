import { render } from "@testing-library/react"
import TampilanProduk from "@/views/product"

describe("Product View Component", () => {
    const mockProducts = [
        {
            id: "1",
            name: "Test Product",
            price: 100000,
            image: "/test.jpg",
            category: "Test Category"
        },
        {
            id: "2",
            name: "Test Product 2",
            price: 200000,
            image: "/test2.jpg",
            category: "Test Category 2"
        }
    ]

    it("renders product view correctly", () => {
        const { container } = render(<TampilanProduk products={mockProducts} />)
        expect(container).toMatchSnapshot()
    })

    it("displays correct title", () => {
        const { getByTestId } = render(<TampilanProduk products={mockProducts} />)
        const title = getByTestId("title")
        expect(title.textContent).toBe("Daftar Produk")
    })

    it("shows skeleton when no products", () => {
        const { container } = render(<TampilanProduk products={[]} />)
        const skeletons = container.querySelectorAll(".produk__content__skeleton")
        expect(skeletons.length).toBe(3)
    })

    it("renders product items when products exist", () => {
        const { container } = render(<TampilanProduk products={mockProducts} />)
        const productItems = container.querySelectorAll(".produk__content__item")
        expect(productItems.length).toBe(2)
    })

    it("displays product name correctly", () => {
        const { container } = render(<TampilanProduk products={mockProducts} />)
        const productName = container.querySelector(".produk__content__item__name")
        expect(productName?.textContent).toBe("Test Product")
    })

    it("displays formatted price correctly", () => {
        const { container } = render(<TampilanProduk products={mockProducts} />)
        const productPrice = container.querySelector(".produk__content__item__price")
        expect(productPrice?.textContent).toBe("Rp 100.000")
    })
})
