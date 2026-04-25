import { render } from "@testing-library/react"
import RegisterView from "@/views/auth/register"

// Mock next/router
jest.mock("next/router", () => ({
    useRouter: jest.fn(() => ({
        push: jest.fn(),
    }))
}))

describe("Register View", () => {
    it("renders register view correctly", () => {
        const { container } = render(<RegisterView />)
        expect(container).toMatchSnapshot()
    })

    it("displays register heading", () => {
        const { container } = render(<RegisterView />)
        const heading = container.querySelector("h1")
        expect(heading?.textContent).toContain("Register")
    })

    it("has fullname input field", () => {
        const { container } = render(<RegisterView />)
        const fullnameInput = container.querySelector('input[name="fullname"]')
        expect(fullnameInput).toBeTruthy()
    })

    it("has email input field", () => {
        const { container } = render(<RegisterView />)
        const emailInput = container.querySelector('input[type="email"]')
        expect(emailInput).toBeTruthy()
    })

    it("has password input field", () => {
        const { container } = render(<RegisterView />)
        const passwordInput = container.querySelector('input[type="password"]')
        expect(passwordInput).toBeTruthy()
    })

    it("has register button", () => {
        const { container } = render(<RegisterView />)
        const registerButton = container.querySelector('button[type="submit"]')
        expect(registerButton).toBeTruthy()
    })

    it("has link to login page", () => {
        const { container } = render(<RegisterView />)
        const loginLink = container.querySelector('a[href="/auth/login"]')
        expect(loginLink).toBeTruthy()
    })
})
