# Product Overview

This is an image reference management tool designed primarily for UX/UI designers to organize and search screenshots from various cloud storage providers. The application connects to external image storage services (no local uploads) and allows users to organize images using hashtags for quick retrieval. It's particularly useful for designers collecting UI/UX reference screenshots from apps and games.

## Current Features

- OAuth authentication with Google Drive
- Image loading from Google Drive (basic implementation)
- Role-based access control (EDITOR role)
- PostgreSQL database with Prisma ORM
- Server-side rendering with SvelteKit

## Planned Features

- **Multi-storage support**: Dropbox, Yandex Drive, and other popular cloud storage providers
- **Hashtag organization**: User-defined tags with multi-tag support per image
- **Advanced search**: Filter by hashtags, storage source, filename, date created/updated
- **AI-powered tagging**: Automatic tag suggestions for images
- **Presentations**: Curated collections of screenshots with sharing and commenting capabilities
- **Collaboration**: Share presentations with other users and gather feedback

## Architecture Principles

- No direct image uploads - all images are references to external cloud storage
- Metadata-only storage in local database
- OAuth-based authentication for storage providers
- Extensible storage provider architecture
