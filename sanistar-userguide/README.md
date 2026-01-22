# Documentation Template System

A clean, responsive documentation template system designed for technical guides and tutorials. Built with HTML, CSS, and vanilla JavaScript, this template provides a consistent and user-friendly documentation experience. 
Built for the NEXTGEN CyberLAB.


## Features

- 📱 Fully responsive design
- 🎨 Clean and modern interface
- 🖼️ Image modal for enlarged viewing
- 💻 Machine/environment indicators
- 📝 Multiple content block types

## Directory Structure

```
documentation-template/
├── css/
│   └── styles.css
├── js/
│   └── modal.js
├── images/
│   ├── CyberLAB.png
│   ├── NEXTGEN.png
│   └── section1/
│       └── step1.png
├── index.html
└── section1.html
```

## Getting Started

1. Clone this repository:
```bash
git clone https://github.com/travisande/sherpa-template.git
```

2. Customize the template:
   - Update logos in the `images` folder
   - Modify colors in `../css/styles.css` variables
   - Edit navigation in HTML files
   - Add your content to each section

3. Deploy to GitHub Pages:
   - Push to your repository
   - Enable GitHub Pages in repository settings
   - Select the appropriate branch (main/master)

## Components

### Available Content Blocks

```html
<!-- Prerequisites Box -->
<div class="prerequisites">
    <h3>Prerequisites</h3>
    <ul>
        <li>Requirement 1</li>
        <li>Requirement 2</li>
    </ul>
</div>

<!-- Important Notice -->
<div class="important">
    <h4>Title</h4>
    <p>Important information...</p>
</div>

<!-- Tip Box -->
<div class="tip">
    <p>Helpful tip...</p>
</div>

<!-- Note Box -->
<div class="note">
    <p>Additional information...</p>
</div>

<!-- Step with Machine Indicator -->
<li class="step">
    <div class="step-header">
        <div class="step-title">Step Title</div>
        <div class="machine-indicator">MACHINE1</div>
    </div>
    <p>Instructions...</p>
</li>

<!-- Verification Checklist -->
<div class="verification-list">
    <h4>Verification Checklist</h4>
    <ul class="checklist">
        <li>Verification point...</li>
    </ul>
</div>
```

### Image Handling

- Place section images in corresponding folders under `images/section1/`, `images/section2/`, etc.
- Images automatically open in a modal when clicked
- Use the `step-image` class for proper styling:
```html
<img src="images/section1/step1.png" alt="Description" class="step-image">
```

## Customization

### Colors and Themes

Modify the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #00297A;
    --secondary-color: #007DC1;
    --accent-color: #6e46ae;
    /* Add or modify colors as needed */
}
```

### Navigation

Update the sidebar navigation in each HTML file:

```html
<nav class="sidebar-nav">
    <a href="./index.html" class="nav-item">
        <div>0. Overview</div>
    </a>
    <!-- Add more navigation items -->
</nav>
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Edge (latest)
- Safari (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built for simplicity and ease of use
- Designed for technical documentation needs

## Support

For issues, questions, or contributions, please open an issue in the repository.

---
