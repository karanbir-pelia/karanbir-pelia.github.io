# Karanbir Singh Pelia - Portfolio Website

A modern, responsive portfolio website for Karanbir Singh Pelia, highlighting skills, projects, experience, and contact information. The site features a clean design with both dark and light theme options.

## Features

- Responsive design that works on all devices
- Smooth scrolling navigation
- Dark/Light theme toggle with system preference option
- Elegant animations and transitions
- Modular code structure for better maintainability
- Interactive contact form with validation
- Project showcase
- Timeline-based experience section
- Adaptive layout for all screen sizes (mobile, tablet, desktop)
- Logo that adapts to available space

## Tech Stack

- HTML5
- CSS3 (with custom properties for theming)
- Vanilla JavaScript (no frameworks)
- Font Awesome icons
- Google Fonts
- Formspree for form handling

## Project Structure

```
portfolio/
├── css/
│   ├── animations.css      # Animation styles
│   ├── font-consistency.css # Font rendering consistency
│   ├── form-validation.css # Form validation styles
│   ├── light-theme.css     # Light theme specific styles
│   ├── responsive.css      # Media queries for responsive design
│   ├── sections.css        # Section-specific styles
│   ├── styles.css          # Core styles
│   └── theme-toggle.css    # Theme toggle component styles
├── js/
│   ├── animations.js       # Animation behaviors
│   ├── creative.js         # Creative interactive elements
│   ├── form-handler.js     # Form submission and validation
│   ├── main.js             # Core functionality
│   └── theme-toggle.js     # Theme toggle functionality
├── images/
│   └── profile-*.png       # Profile images
└── index.html              # Main HTML file
```

## Setup and Deployment

1. Clone the repository
2. Open `index.html` in your browser to view the site locally
3. For development, you can use a local server:
   ```
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000` in your browser

4. To deploy, upload all files to your web hosting service

## Contact Form Setup

The contact form is configured to work with Formspree:

1. Form is set up with proper field names for Formspree integration
2. Uses AJAX submission to prevent page reload
3. Includes validation for all fields
4. Provides visual feedback for form submission status

## Customization

- Update personal information in `index.html`
- Add or modify projects in the projects section
- Update experience timeline with your own work history
- Replace profile images in the `/images` directory
- Update the Formspree endpoint in the contact form action attribute

## Browser Support

The site is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## License

© 2025 Karanbir Singh Pelia. All rights reserved.