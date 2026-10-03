# Tech Nexus AI

Tech Nexus AI is a high-performance, real-time news aggregator designed to keep professionals updated on the latest breakthroughs in Artificial Intelligence. This project leverages modern web technologies to provide a seamless news discovery experience.

## The Story Behind the Build

This project is a unique collaboration between a developer and their AI assistant, **Ben**. 

Instead of traditional manual development, the entire application was conceptualized and executed through a conversational workflow. Kashii provided high-level architectural goals and feature requirements via mobile prompts, and **Ben**—an autonomous AI assistant running within the OpenClaw environment—translated those requirements into functional code, managed the infrastructure, integrated APIs, and handled version control.

This project stands as a testament to the power of **AI-assisted engineering**, showcasing how an agent can translate human vision into reality through iterative, step-by-step guidance.

## Key Features

- **Live AI Feed:** Real-time news aggregation powered by the [NewsAPI.org](https://newsapi.org) API, with "Load more" pagination.
- **Top Story Layout:** The leading story is highlighted in a large featured card above the news grid.
- **Search & Topics:** Keyword search (press `/` to jump to it) plus one-click topic filters (LLMs, Machine Learning, Robotics, AI Policy, Startups). Results match on headlines and summaries to keep the feed on-topic.
- **Sorting:** Order stories by latest, most relevant, or most popular.
- **Saved Articles:** Bookmark any story and read it later from the Saved tab (persisted in the browser).
- **Dark Mode:** Light and dark themes that follow your system preference, with no flash on page load.
- **Rich Article Details:** Source, author, publish time, and estimated reading time on every story, with a detail view that supports copy-link and keyboard navigation (Esc to close).
- **Editorial Curated Picks:** A dedicated section for human-curated, deep-dive tech insights.
- **Polished Loading & Error States:** Skeleton loaders, image fallbacks, and clear error messages with retry.
- **API-Friendly Caching:** Responses are cached for 10 minutes per session to stay within NewsAPI's free-tier limits.
- **Professional Finish:** Branded logo and favicon, social-sharing meta tags, back-to-top button, and a credits footer.
- **Dynamic Responsiveness:** Fully adaptive design using Tailwind CSS for an optimal experience across devices.

## Project Structure

```
src/
├── App.jsx              # Page layout, tabs, and app state
├── components/          # Header, Toolbar, ArticleCard, ArticleModal, Footer, loading/error states
├── hooks/               # useNews (fetching + pagination), useLocalStorage
├── lib/                 # NewsAPI client with caching, date/reading-time helpers
└── data/                # Editorial picks content
```

## How Ben Works

**Ben** acts as a partner rather than just a tool. Operating within the OpenClaw workspace, Ben follows a rigorous development lifecycle:
1. **Roadmapping:** Every feature starts with a clear plan and human approval.
2. **Iterative Refinement:** Ben continuously polishes UI/UX based on user feedback.
3. **Environment Management:** From setting up React/Vite environments to managing environment variables and Git version control, Ben operates as a full-stack developer agent.
4. **Resilience:** Ben actively debugs API interactions and handles edge cases, ensuring a robust user experience.

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Kashif0540/Tech-Nexus_ai-powered-news-agent
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
