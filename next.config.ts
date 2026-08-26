import path from 'path'
import type { NextConfig } from 'next'

const srcDir = path.join(__dirname, 'src')
const stylesDir = path.join(srcDir, 'styles')

const nextConfig: NextConfig = {
    sassOptions: {
        loadPaths: [stylesDir]
    },
    turbopack: {
        resolveAlias: {
            '@': './src',
            '@/*': './src/*'
        }
    },
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': srcDir
        }
        return config
    }
}

export default nextConfig
