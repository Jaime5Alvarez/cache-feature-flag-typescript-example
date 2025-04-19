# cache-feature-flag-typescript-example


This project is an example implementation of feature flags with Redis caching using TypeScript, with Biome for code quality control and Bun for package management.

## Description

This project demonstrates how to implement a feature flag system with PostHog as a provider, adding a Redis caching layer to improve performance and reduce calls to the external API.

## Installation

1. Install dependencies:

```bash
bun install
```

2. Copy the .env.example file to .env and configure your credentials:

```bash
cp .env.example .env
```

3. Edit the .env file with your PostHog API key and Redis configuration.

## Usage

To run the script:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.9. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
