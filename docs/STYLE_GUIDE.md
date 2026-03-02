# Style Guide & Design Tokens

## Theme
- **Primary Color**: Orange (#F05A00)
- **Background**: Dark Theme (Zinc-900 / #121212)
- **Surface**: Zinc-800 / #1E1E1E
- **Text**: Gray-100 (Primary), Gray-400 (Secondary)

## Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, Tight tracking
- **Body**: Regular, Relaxed line-height

## UI Components

### Buttons
- **Shape**: Pill (Full rounded)
- **Variants**: Primary (Orange), Secondary (Outline/Ghost)

### Cards
- **Shape**: Large rounded corners (`rounded-2xl` or `rounded-3xl`)
- **Style**: Dark surface with subtle border/shadow

### Interactions
- **Hover**: Subtle brightness increase or lift
- **Transitions**: Smooth (`duration-200 ease-in-out`)

## Tailwind Strategy
- Use `clsx` and `tailwind-merge` for class composition.
- Centralize colors in `tailwind.config.js`.
