import { render } from "@testing-library/react"
import LoginView from "@/views/auth/login"

// Mock next-auth
jest.mock("next-auth/react", () => ({
    signIn: jest.fn(),
}))

// Mock next/router
jest.mock("next/router", () => ({
    useRouter: jest.fn(() => ({
        push: jest.fn(),
        query: {},
    }))
}))

describe("Login View", () => {
    it("renders login view correctly", () => {
        const { container } = render(<LoginView />)
        expect(container).toMatchSnapshot()
    })

    it("displays login heading", () => {
        const { container } = render(<LoginView />)
        const heading = container.querySelector("h1")
        expect(heading?.textContent).toContain("Login")
    })

    it("has email input field", () => {
        const { container } = render(<LoginView />)
        const emailInput = container.querySelector('input[type="email"]')
        expect(emailInput).toBeTruthy()
    })

    it("has password input field", () => {
        const { container } = render(<LoginView />)
        const passwordInput = container.querySelector('input[type="password"]')
        expect(passwordInput).toBeTruthy()
    })

    it("has login button", () => {
        const { container } = render(<LoginView />)
        const loginButton = container.querySelector('button[type="submit"]')
        expect(loginButton).toBeTruthy()
    })

    it("has Google login button", () => {
        const { container } = render(<LoginView />)
        const buttons = container.querySelectorAll("button")
        const googleButton = Array.from(buttons).find(btn => 
            btn.textContent?.includes("Google")
        )
        expect(googleButton).toBeTruthy()
    })

    it("has GitHub login button", () => {
        const { container } = render(<LoginView />)
        const buttons = container.querySelectorAll("button")
        const githubButton = Array.from(buttons).find(btn => 
            btn.textContent?.includes("GitHub")
        )
        expect(githubButton).toBeTruthy()
    })
})
