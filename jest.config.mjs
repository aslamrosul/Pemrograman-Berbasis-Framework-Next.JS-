import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
    dir: './',
})

const config = {
    testEnvironment: 'jsdom',
    modulePaths: ['<rootDir>/src/'],
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.d.ts',
        '!src/pages/_app.tsx',
        '!src/pages/_document.tsx',
        '!src/pages/api/**',
        '!src/middleware.ts',
        '!src/Middleware/**',
        '!src/utils/**',
        '!src/pages/product/[product].tsx',
        '!src/pages/product/[product]_Duplicate.tsx',
        '!src/pages/product/index_Duplicate.tsx',
        '!src/pages/product/server.tsx',
        '!src/pages/product/static.tsx',
        '!src/pages/blog/**',
        '!src/pages/category/**',
        '!src/pages/shop/**',
        '!src/pages/user/**',
        '!src/pages/profile/**',
        '!src/pages/setting/**',
        '!src/pages/admin/**',
        '!src/pages/editor/**',
        '!src/pages/auth/**',
        '!src/pages/index.tsx',
        '!src/components/layouts/AppShell/**',
        '!src/components/layouts/navbar/**',
    ]
}

export default createJestConfig(config)