<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# El Camino de la Vida - Spiritual Therapy Landing Page

## Project Context
This is a spiritual therapy and wellness tourism landing page for "El Camino de la Vida" based in Tarragona, Spain. The business offers:

- **Spiritual Therapies**: Tarot evolutivo, energy healing, meditation
- **Therapeutic Accommodations**: Sacred spaces (Cabaña Luna, Suite Sol, Refugio Estrella)
- **Wellness Packages**: Combined therapy + accommodation experiences
- **Group Workshops**: Community healing experiences

## Technical Stack
- **Framework**: Astro 5.12.8 with TypeScript
- **Styling**: Tailwind CSS v4 with custom brand colors
- **Integrations**: React support for interactive components
- **Language**: Spanish (es) - all content should be in Spanish
- **Target Audience**: Spanish-speaking wellness seekers and spiritual tourists

## Brand Guidelines
### Colors (defined in src/styles/global.css with @theme):
- **Primary**: `lavanda` (#e8d7ff), `golden` (#be772c)
- **Background**: `background` (#fcf6ed)
- **Secondary**: `rosa-empolvado` (#fadadd), `menta-ligera` (#bcffcf), `amarillo-crema` (#FFF9D4)

### Typography:
- **Display**: Montserrat (headings, brand name)
- **Body**: DM Sans (body text, UI)

### Content Tone:
- Spiritual but professional
- Authentic and transformative
- Welcoming and peaceful
- Focus on personal transformation and healing

## Component Structure
- **Layout Components**: Layout.astro, Container.astro, Header.astro, Footer.astro
- **Section Components**: Hero.astro, Therapies.astro, Accommodations.astro, Packs.astro, Workshops.astro, Contact.astro
- **UI Components**: Reusable elements (future)

## Development Notes
- All text content should be in Spanish
- Focus on SEO optimization for spiritual therapy keywords in Spanish
- Mobile-first responsive design
- Semantic HTML for accessibility
- Performance optimization (static site generation)
- Uses Tailwind CSS v4 with @theme directive for custom colors
- Future integrations planned: GSAP animations, booking system

## Content Guidelines
When generating content:
- Use authentic Spanish (Spain variant, not Latin American)
- Focus on transformation, healing, and spiritual growth themes
- Emphasize the Tarragona/Cataluña location advantage
- Maintain professional yet spiritual tone
- Include relevant wellness and spiritual therapy keywords
- Always consider the target demographic: Spanish wellness seekers
