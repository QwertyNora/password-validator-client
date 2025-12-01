# Password Validator Client

A modern, interactive React application for validating password strength with real-time feedback and API integration.

## Features

-   ✨ **Real-time validation** - Live feedback as you type
-   🎨 **Modern UI** - Built with React, TypeScript, and Tailwind CSS
-   🔒 **Comprehensive rules** - Checks length, uppercase, lowercase, numbers, and special characters
-   👁️ **Password visibility toggle** - Show/hide password functionality
-   🎭 **Smooth animations** - Powered by Motion (Framer Motion)
-   🔌 **API integration** - Validates passwords against a backend API
-   ♿ **Accessible** - ARIA labels and keyboard navigation support

## Password Requirements

The validator checks for the following criteria:

-   At least 8 characters
-   At least one uppercase letter
-   At least one lowercase letter
-   At least one number
-   At least one special character (`!@#$%^&*()_+-=[]{};':"\|,.<>/?`)

## Tech Stack

-   **React 19** - UI framework
-   **TypeScript** - Type-safe development
-   **Vite** - Fast build tool and dev server
-   **Tailwind CSS 4** - Utility-first styling
-   **Motion** (Framer Motion) - Animation library
-   **Lucide React** - Icon library

## Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn
-   Backend API running on `http://localhost:5094` (see API Integration section)

## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/QwertyNora/password-validator-client.git

# Navigate to project directory
cd password-validator-client

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The application will open at `http://localhost:5173`

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

### Linting

```bash
# Run ESLint
npm run lint
```

## API Integration

The application expects a backend API endpoint at:

```
POST http://localhost:5094/api/password/validate
```

### Request Body

```json
{
    "password": "YourPassword123!"
}
```

### Response Format

```json
{
    "isValid": true,
    "errors": []
}
```

Or for invalid passwords:

```json
{
    "isValid": false,
    "errors": ["Password must be at least 8 characters", "Password must contain at least one uppercase letter"]
}
```

## Project Structure

```
password-validator-client/
├── src/
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   ├── index.css            # Global styles
│   ├── types/
│   │   └── types.ts         # TypeScript type definitions
│   └── assets/              # Static assets
├── public/                  # Public assets
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
└── eslint.config.js         # ESLint configuration
```

## TypeScript Types

The project uses strict TypeScript typing:

```typescript
type PasswordRule = {
    label: string;
    test: (password: string) => boolean;
};

type ValidationResponse = {
    isValid: boolean;
    errors: string[];
};
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Author

QwertyNora

## Acknowledgments

-   Icons provided by [Lucide](https://lucide.dev/)
-   Animations powered by [Motion](https://motion.dev/)
