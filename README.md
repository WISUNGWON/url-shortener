# 🔗 URL Shortener

A modern, high-performance URL shortener Designed with scalability, maintainability, and cloud-native deployment in mind.

## 🚀 Features

- Shorten long URLs with unique Base62-encoded keys (7characters)
- Redirect to original URLs with blazing fast performance
- Scalable and modular monorepo architecture using Turborepo
- Optimized for cloud deployment using Docker and Kubernetes
- Expiration and analytics-ready structure (planned)

## 🛠️ Tech Stack

### Frontend
- **Next.js** 
- **TypeScript**
- **Tailwind CSS**

### Backend
- **Express.js** 
- **Knex.js** — SQL query builder for PostgreSQL
- **PostgreSQL** 

### Monorepo & Tooling
- **Turborepo** — Efficient monorepo management
- **Docker** — Containerized development and deployment
- **ESLint / Prettier** 

### Infrastructure
- **AWS ECR** — Container image registry
- **AWS EKS** — Kubernetes-managed container orchestration
- **Redis** — In-memory caching for fast redirects

