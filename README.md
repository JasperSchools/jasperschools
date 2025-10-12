# Jasper Primary School Website

A modern, responsive website for Jasper Primary School in Nyairongo, Uganda - a nonprofit primary school dedicated to quality education for all children.

## Features

- **Modern Design**: Clean, professional UI built with Next.js and Tailwind CSS
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **School Branding**: Uses the official school colors from the logo
- **Accessibility**: Built with modern web standards and accessibility in mind
- **Fast Performance**: Optimized for speed and SEO

## School Colors

The website uses the official colors from the Jasper Primary School logo:

- **Primary Green**: `#2E8B57` - Used for headers, main branding
- **Primary Red**: `#E74C3C` - Used for call-to-action buttons (especially donate button)
- **Primary Blue**: `#000080` - Used for text and secondary elements
- **White**: `#FFFFFF` - Used for backgrounds and contrast

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles and Tailwind imports
│   ├── layout.tsx       # Root layout component
│   └── page.tsx         # Home page
└── components/
    ├── Header.tsx       # Navigation header
    └── Hero.tsx         # Hero section with main messaging
```

## Key Sections

- **Header**: Responsive navigation with school logo and donate button
- **Hero Section**: Compelling messaging about the school's mission
- **About Us**: Information about the school (placeholder)
- **Programs**: Educational programs offered (placeholder)
- **Impact**: School's impact on the community (placeholder)
- **Get Involved**: Ways to support the school (placeholder)
- **Contact**: Contact information (placeholder)

## Customization

The website is built with modularity in mind. Each section is a separate component that can be easily customized or extended. The color scheme is defined in `tailwind.config.ts` for easy updates.

## Technology Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Responsive Design**: Mobile-first approach

## Contributing

This is a nonprofit project. If you'd like to contribute or have suggestions for improvements, please reach out.

## License

This project is created for Jasper Primary School, Nyairongo, Uganda.