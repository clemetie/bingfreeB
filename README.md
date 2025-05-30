# @latest

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
# Tailwind 기반 Vue 디자인 시스템

## 🎯 개요
- 일관된 UI/UX를 위한 디자인 시스템
- Tailwind CSS 커스터마이징 + Vue 컴포넌트 기반

## 📁 구성
- `BaseButton`, `BaseInput`, `BaseCard` 등의 재사용 컴포넌트
- `tailwind.config.js`에 정의된 디자인 토큰(color, spacing 등)

## 🧩 주요 컴포넌트
- 버튼: primary / secondary / danger
- 입력창: 기본 입력창, 포커스 상태
- 카드: 콘텐츠 박스 디자인

## 📦 기술 스택
- Vue 3 + `<script setup>`
- Tailwind CSS