import { render } from "@testing-library/react"
import ProductPage from "@/pages/product"

// Mock SWR
jest.mock("swr", () => ({
    __esModule: true,
    default: jest.fn(() => ({
        data: {
            data: [
                {
                    id: "1",
                    name: "Test Product",
                    price: 100000,
                    image: "/test.jpg",
                    category: "Test"
                }
            ]
        },
        error: null,
        isLoading: false
    }))
}))

// Mock next/router
jest.mock("next/router", () => ({
    useRouter: jest.fn(() => ({
        route: "/product",
        pathname: "/product",
        query: {},
        asPath: "/product",
        push: jest.fn(),
    }))
}))

describe("Product Page Wrapper", () => {
    it("renders product page wrapper correctly", () => {
        const { container } = render(<ProductPage />)
        expect(container).toMatchSnapshot()
    })

    it("renders product view component", () => {
        const { container } = render(<ProductPage />)
        const productView = container.querySelector(".produk")
        expect(productView).toBeTruthy()
    })
})
