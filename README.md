# Tech Nexus AI

Tech Nexus AI is a high-performance, real-time news aggregator designed to keep professionals updated on the latest breakthroughs in Artificial Intelligence. This project leverages modern web technologies to provide a seamless news discovery experience.

## The Story Behind the Build

This project is a unique collaboration between a developer and their AI assistant, **Ben**. 

Instead of traditional manual development, the entire application was conceptualized and executed through a conversational workflow. Kashii provided high-level architectural goals and feature requirements via mobile prompts, and **Ben**—an autonomous AI assistant running within the OpenClaw environment—translated those requirements into functional code, managed the infrastructure, integrated APIs, and handled version control.

This project stands as a testament to the power of **AI-assisted engineering**, showcasing how an agent can translate human vision into reality through iterative, step-by-step guidance.

## Key Features

- **Live AI Feed:** Real-time news aggregation powered by the [NewsAPI.org](https://newsapi.org) API.
- **Editorial Curated Picks:** A dedicated section for human-curated, deep-dive tech insights.
- **Interactive UI:** A modern, professional interface featuring a responsive news grid and detailed article modals.
- **Dynamic Responsiveness:** Fully adaptive design using Tailwind CSS for an optimal experience across devices.
- **Professional Aesthetics:** An emerald-and-slate design language tailored for a news-centric environment.

## How Ben Works

**Ben** acts as a partner rather than just a tool. Operating within the OpenClaw workspace, Ben follows a rigorous development lifecycle:
1. **Roadmapping:** Every feature starts with a clear plan and human approval.
2. **Iterative Refinement:** Ben continuously polishes UI/UX based on user feedback.
3. **Environment Management:** From setting up React/Vite environments to managing environment variables and Git version control, Ben operates as a full-stack developer agent.
4. **Resilience:** Ben actively debugs API interactions and handles edge cases, ensuring a robust user experience.

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Kashif0540/ai-powered-news-agent
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Add your NewsAPI key:** create a `.env` file in the project root with:
   ```bash
   VITE_NEWS_API_KEY=your_newsapi_key_here
   ```
   Get a free key at [newsapi.org](https://newsapi.org/register). Note: the free plan only allows requests from `localhost`.
4. **Run the development server:**
   ```bash
   npm run dev
   ```

---
*Developed by Kashii with the assistance of Ben (AI Personal Assistant).*
