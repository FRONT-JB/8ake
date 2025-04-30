import withPWA from 'next-pwa';

import createBundleAnalyzer from '@next/bundle-analyzer';

import { readFileSync } from 'fs';
import { join } from 'path';

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const uiPackageJson = JSON.parse(
  readFileSync(join(process.cwd(), '../../packages/ui/package.json'), 'utf8')
);

// src 파일을 읽어서 export된 모든 컴포넌트 찾기
const transforms = Object.keys(uiPackageJson.exports).reduce((acc, key) => {
  // components로 시작하는 export만 처리
  if (!key.startsWith('./components/')) {
    return acc;
  }

  const componentName = key.replace('./components/', '');
  acc[componentName] = `@repo/ui/components/${componentName}`;

  return acc;
}, {});

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui'],
  modularizeImports: {
    '@repo/ui/components': {
      transform: transforms,
      preventFullImport: true,
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

const config = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})(nextConfig);

export default withBundleAnalyzer(config);
