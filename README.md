# Market Observability Pipeline (SentinelScale)

[![Node.js CI](https://img.shields.io/badge/Build-Passing-brightgreen)](https://github.com/nahorfelix/market-observability-pipeline)
[![Testing-Suite](https://img.shields.io/badge/Tests-2%20Passed-blue)](https://github.com/nahorfelix/market-observability-pipeline)

**SentinelScale** is a production-grade market observability tool designed to demonstrate high-level proficiency in **Fullstack Engineering**, **DevOps**, and **Automated QA**. It fetches real-time cryptocurrency data and visualizes it through a containerized microservices architecture.



---

## 🛠️ Core Competencies Demonstrated
* **Software Engineering:** Decoupled microservices architecture using Node.js/Express and React.
* **DevOps & Infrastructure:** Infrastructure containerization using Docker and orchestration with Docker-Compose.
* **Quality Assurance (QA):** Automated integration testing with Jest and Supertest.
* **Observability:** Implementation of system health checks and real-time polling logic.

## 🏗️ System Architecture
1.  **Backend API:** A Node.js service that acts as a data gateway, fetching market prices and providing an SRE-compliant `/health` endpoint.
2.  **Frontend Dashboard:** A React-based interface with state-driven UI updates and automatic data synchronization.
3.  **Data Layer:** Integration with the CoinGecko Public API for live market metrics.

---

## 🚦 Getting Started

### Prerequisites
* Docker & Docker Compose installed.

### Installation & Deployment
To run the entire system in a production-like environment:
```bash
# Clone the repository
git clone [https://github.com/nahorfelix/market-observability-pipeline.git](https://github.com/nahorfelix/market-observability-pipeline.git)

# Spin up the containers
docker-compose up --build