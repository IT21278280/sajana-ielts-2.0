# Software Requirements Specification (SRS)
## Project Name: Sajana IELTS 2.0
**Document Version:** 1.0.0  
**Date:** June 2026  
**Target Architecture:** Decoupled Headless Stack (Next.js, PostgreSQL, Prisma, Sanity CMS)

---

## 1. Introduction & Project Goals

### 1.1 Purpose
This document specifies the functional, non-functional, business, and architectural requirements for **Sajana IELTS 2.0**. This platform serves as a modern, high-performance web presence for a premium English language academy, streamlining student lead generation and content distribution.

### 1.2 Business & Project Goals
*   **Promote IELTS Services:** Market elite educational packages tailored for IELTS Academic, IELTS General, and Spoken English.
*   **Content Hub:** Host high-quality, searchable preparation materials (Cue cards, essays, vocabulary) to maximize organic search rankings.
*   **Lead Acquisition Engine:** Automate the collection of target-driven student leads to convert traffic into active paying enrollments.
*   **Academic & Job Portfolio Asset:** Act as a clean, highly structured reference codebase demonstrating master-level system design principles for MSc applications and software engineering evaluation tracks.

---

## 2. System Scope & Boundaries

### 2.1 Visual Color & Identity System
To reflect a premium educational institution, the interface adheres to a strict visual design palette:
*   **Primary Background:** Pure White (`#FFFFFF`)
*   **Primary Brand Tone:** Deep Blue (`#0F172A`) — used to build authority, Trust, and deep typography contrast.
*   **Accent Core Highlight:** Gold Accent (`#D4AF37`) — used exclusively for active Call-to-Action buttons, focus targets, and validation badges.

### 2.2 Explicit Site Architecture
Sajana IELTS 2.0 restricts public page availability strictly to the following target layouts:
1.  **Home Page:** Hero banner, Teacher Introduction, Courses Overview, Student Results Carousel, Latest Blog Posts, Testimonials, Contact CTA.
2.  **About Teacher:** Extensive bio, certified credentials, historical professional background, score tracking sheets.
3.  **IELTS Courses:** Fixed technical data sheets tracking parameters for Academic, General, and Spoken English (including Duration, Fee, and Weekly Schedule options).
4.  **IELTS Resources:** Grouped landing directories parsing nested categories: *Speaking, Writing, Reading, Listening, Vocabulary*.
5.  **Blog:** Paginated index surfaces parsing real-time headless CMS documents.
6.  **Student Results:** Historical band grids sorting raw student achievements and validation reviews.
7.  **Contact:** Explicit communication form containing immediate social entry configurations (WhatsApp click-to-chat api, Facebook profile links, direct email links).

---

## 3. Detailed Requirements Spec

### 3.1 Functional Requirements (FR)

#### FR-1: Lead Management Engine
*   **Persistent Entry Vectors:** Every public view layer must feature a persistent "Book Free Demo" activation module.
*   **Form Content Matrices:** The system must validate and capture standard data parameters: *Student Name, Phone Number, Email Address, Target Band Score (Dropdown selector matching increments of 0.5 within limits of 4.0 to 9.0)*, and an optional custom *Message*.
*   **Database Isolation:** All generated inquiries must bypass public view layers and write directly into a local PostgreSQL transactional schema pool via Prisma ORM execution layers.

#### FR-2: Decoupled CMS Integration
*   **Zero-Code Asset Alterations:** Instructors must be able to inject rich text resources—including **Speaking Cue Cards**, **Sample Essays**, and **Vocabulary Modules**—remotely via a decoupled Sanity Studio interface, eliminating the need to modify source files or trigger deployment pipelines.
*   **Dynamic Resource Sorters:** Sanity document collections must be automatically distributed across corresponding UI routes matching their respective categories.

#### FR-3: Restricted Administrator Space
*   **Secure Administration Shell:** Features a simple, secure authentication gate (`/admin` / `/studio`) protected by token encryption validation layers.
*   **Dynamic Data Controls:** Authenticated administrators can perform complete CRUD actions (Create, Read, Update, Delete) on student feedback entries and test performance charts.

### 3.2 Non-Functional Requirements (NFR)

#### NFR-1: Search Engine Optimization (SEO) Architecture
*   **Topic-Focused Semantic Routing:** Standardize URL generations using clean semantic patterns rather than database row primary IDs:
    *   `/ielts-speaking-cue-card-2026`
    *   `/ielts-writing-task-2-opinion-essay`
    *   `/ielts-vocabulary-for-education`
*   **Automated Document Delivery:** Next.js metadata compilation loops must automatically inject dynamic Meta Titles, Descriptions, `robots.txt` instructions, and a programmatically updated `sitemap.xml` file.
*   **Rich Schema Injection:** Build interactive validation scripts using JSON-LD schemas mapped directly onto courses and resource pages to capture high-visibility Google Rich Snippets.

#### NFR-2: Accessibility Framework (WCAG 2.1 AA Compliance)
*   **Input Label Formats:** Every input field must declare an explicit markup label tag element.
*   **Keyboard Focus Infrastructure:** Focus highlights must follow standard patterns (`focus:ring-2 focus:ring-[#D4AF37] focus:outline-none`), allowing users to navigate via keyboard tabs without relying on mouse pointers.
*   **Semantic ARIA Parameters:** Form structures, drop-down wrappers, and asynchronous button triggers must integrate descriptive ARIA tags (`aria-label`, `aria-expanded`).

#### NFR-3: Operational & Performance Bounds
*   **Execution Speeds:** Core content directories must utilize Incremental Static Regeneration (ISR) to maintain a Time-to-First-Byte benchmark of $t \le 200\text{ms}$.
*   **Mobile Responsiveness:** All layouts must employ mobile-first media query breakpoints via Tailwind CSS to ensure rendering fidelity across diverse devices.

---

## 4. Advanced System Design

### 4.1 System Architecture Topology