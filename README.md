# TinyBigCorp Frontend

Angular 21 frontend following **MVVM + Signal Architecture** with standalone components.

## 🏗️ Architecture

### Design System (`src/app/theme/`)
All visual design tokens and styles.
- `colors.ts` - Color constants (TypeScript)
- `variables.scss` - CSS custom properties
- `typography.scss` - Typography mixins
- `icons.registry.ts` - SVG icon definitions

**Key Rule**: Never hardcode colors or styles. Always use design tokens.

### Core (`src/app/core/`)
Application-wide services and models.
- **Services**: HTTP services (e.g., `UserService`)
- **Models**: TypeScript interfaces matching backend DTOs
- **Interceptors**: HTTP interceptors for auth, logging, etc.

### Features (`src/app/features/`)
Feature modules organized by business domain.
- **Smart Components**: Container components with business logic
- **Dumb Components**: Presentational components (inputs/outputs only)

## 🚀 Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm start
```

Application runs at: **http://localhost:4200**

## 🧪 Development

### Run Tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

### Build for Production
```bash
npm run build
```

## 📐 Component Architecture

### Smart (Container) Components
- Inject services
- Manage state using Signals
- Handle business logic
- Pass data to dumb components

### Dumb (Presentational) Components
- Receive data via `@Input()`
- Emit events via `@Output()`
- No service injection
- Pure presentation logic

### Example Structure
```typescript
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, UserCardComponent],
  template: `...`
})
export class UserListComponent {
  private userService = inject(UserService);
  
  // State (Signal)
  users = signal<UserDto[]>([]);
  
  // Computed State
  activeUsers = computed(() => 
    this.users().filter(u => u.is_active)
  );
  
  // Load data
  ngOnInit() {
    this.userService.getUsers().subscribe(
      users => this.users.set(users)
    );
  }
}
```

## 🎨 Design System Usage

### Using Colors
```typescript
// In TypeScript
import { COLORS } from '@app/theme/colors';
const primaryColor = COLORS.primary[500];
```

```scss
// In SCSS
.my-component {
  color: var(--color-primary-600);
  background: var(--color-neutral-50);
}
```

### Using Typography
```scss
@import 'app/theme/typography';

.heading {
  @include heading-2;
}

.body-text {
  @include body-base;
}
```

## 📝 Adding a New Feature

1. Create feature folder: `src/app/features/my-feature/`
2. Create models matching backend DTOs
3. Create service for HTTP operations
4. Create smart component (container)
5. Create dumb components (presentational)
6. Add routes to `app.routes.ts`

## 🔧 Configuration

### Environment Files
- `src/environments/environment.ts` - Development
- `src/environments/environment.prod.ts` - Production

### API Configuration
Update `apiUrl` in environment files to point to your backend.

## 📚 Key Principles

### DO
- Use Signals for state management
- Decouple components from HTTP (use services)
- Use design tokens for all styling
- Follow Smart/Dumb component pattern
- Document all public methods with JSDoc

### DO NOT
- Use `any` type (use `unknown` if necessary)
- Put logic in templates
- Hardcode colors or styles
- Import from `app.module` (use standalone components)
- Make HTTP calls directly in components

## 🎯 Architecture Validation

**The Reskin Test**: Change the entire color scheme by modifying only `src/app/theme/variables.scss`.

## 📦 Project Structure

```
src/
├── app/
│   ├── theme/              # Design system
│   ├── core/               # Core services and models
│   │   ├── services/
│   │   ├── models/
│   │   └── interceptors/
│   ├── features/           # Feature modules
│   │   └── users/
│   │       ├── components/
│   │       └── services/
│   ├── app.config.ts       # App configuration
│   └── app.routes.ts       # Routing configuration
├── environments/           # Environment configs
└── styles.scss            # Global styles
```
