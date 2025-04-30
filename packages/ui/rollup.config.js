// Rollup 타입스크립트 컴파일러 플러그인
import typescript from '@rollup/plugin-typescript';
// 문자열 치환을 위한 Rollup 플러그인
import replace from '@rollup/plugin-replace';
import { glob } from 'glob';
import path from 'path';

// src/components 디렉토리의 모든 컴포넌트 파일을 찾습니다
const componentEntries = glob.sync('src/components/**/*.{ts,tsx}').reduce((acc, file) => {
  // 파일 경로에서 파일명(확장자 제외)을 추출
  const name = path.basename(file, path.extname(file));
  return {
    ...acc,
    [name]: file,
  };
}, {});

const external = [
  'react',
  'react/jsx-runtime',
  '@radix-ui/react-accordion',
  '@radix-ui/react-dialog',
  '@radix-ui/react-label',
  '@radix-ui/react-separator',
  '@radix-ui/react-slider',
  '@radix-ui/react-tooltip',
  '@radix-ui/react-slot',
  'class-variance-authority',
  'clsx',
  'tailwind-merge',
  'lucide-react',
  'react-hook-form',
  '@hookform/resolvers/zod',
  'zod',
];

const getOutput = (format) => ({
  dir: 'dist',
  format,
  preserveModules: true,
  preserveModulesRoot: 'src',
  entryFileNames: (chunk) => {
    const ext = format === 'esm' ? '.mjs' : '.cjs';
    if (chunk.facadeModuleId?.includes('/components/')) {
      return `${chunk.name}${ext}`;
    }
    return `[name]${ext}`;
  },
});

export default [
  // ESM 빌드
  {
    input: {
      index: 'src/index.ts',
      ...componentEntries,
    },
    output: getOutput('esm'),
    external,
    plugins: [
      replace({
        preventAssignment: true,
        values: {
          'use client': '',
        },
      }),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist',
        exclude: ['**/*.test.ts', '**/*.test.tsx'],
        outDir: 'dist',
        rootDir: 'src',
      }),
    ],
  },
  // CJS 빌드
  {
    input: {
      index: 'src/index.ts',
      ...componentEntries,
    },
    output: getOutput('cjs'),
    external,
    plugins: [
      replace({
        preventAssignment: true,
        values: {
          'use client': '',
        },
      }),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        exclude: ['**/*.test.ts', '**/*.test.tsx'],
        outDir: 'dist',
        rootDir: 'src',
      }),
    ],
  },
];
