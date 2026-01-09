# Contributing to Frontend (AdventureWork-ERP-frontend)

This guide is specific to frontend development. For general contribution guidelines, see the [main repo CONTRIBUTING.md](https://github.com/CkoThuw11/TinyBigCorp/blob/main/CONTRIBUTING.md).

---

## 🚀 Quick Start

### Setup

```bash
# From main repo
cd frontend

# Install dependencies
npm install

# Start dev server
npm start
```

Access at: http://localhost:4200

---

## 🏗️ MVVM Architecture

### 1. View (Template)

**HTML only** - No logic in templates.

```html
<!-- user-list.component.html -->
<div class="user-list">
  @for (user of users(); track user.id) {
    <div class="user-card">
      <h3>{{ user.fullName }}</h3>
      <p>{{ user.email }}</p>
      <button (click)="onDeactivate(user.id)">Deactivate</button>
    </div>
  }
</div>
```

**Rules**:
- ✅ Display data only
- ✅ Emit events
- ❌ No business logic
- ❌ No HTTP calls

### 2. ViewModel (Component)

**UI state and logic** - Uses Signals for reactivity.

```typescript
// user-list.component.ts
export class UserListComponent {
  private userService = inject(UserService);
  
  // Signals for reactive state
  users = signal<UserDto[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  
  ngOnInit() {
    this.loadUsers();
  }
  
  loadUsers() {
    this.loading.set(true);
    this.userService.listUsers().subscribe({
      next: (users) => {
        this.users.set(users);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }
  
  onDeactivate(userId: number) {
    // Handle UI event
    this.userService.deactivateUser(userId).subscribe({
      next: () => this.loadUsers()
    });
  }
}
```

**Rules**:
- ✅ Use Signals for state
- ✅ Call services
- ✅ Handle UI events
- ❌ No HTTP calls directly
- ❌ No business logic

### 3. Model (Service)

**Data access** - HTTP calls and transformations.

```typescript
// user.service.ts
@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/users`;
  
  listUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.apiUrl);
  }
  
  deactivateUser(userId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${userId}/deactivate`, {});
  }
}
```

**Rules**:
- ✅ HTTP calls only
- ✅ Return Observables
- ✅ Transform data if needed
- ❌ No UI logic

---

## 🎨 Design System

### Use Design Tokens

**❌ Don't hardcode values**:
```scss
.button {
  color: #007bff;        // ❌ Hardcoded
  padding: 12px;         // ❌ Magic number
  border-radius: 4px;    // ❌ Magic number
}
```

**✅ Use CSS variables**:
```scss
.button {
  color: var(--color-primary-500);
  padding: var(--spacing-3);
  border-radius: var(--radius-md);
}
```

### Design Token Files

- **Colors**: `src/app/theme/colors.ts`
- **Variables**: `src/app/theme/variables.scss`
- **Typography**: `src/app/theme/typography.scss`
- **Icons**: `src/app/theme/icons.registry.ts`

### Typography Mixins

```scss
@use 'src/app/theme/typography' as typo;

.heading {
  @include typo.heading-1;  // ✅ Use mixin
}

.body-text {
  @include typo.body-large;  // ✅ Use mixin
}
```

---

## ✅ Code Quality

### Before Every Commit

```bash
# Run all checks
npm run lint
npm test
npm run build

# Or use the check script
npm run check
```

### Linting Rules

- **ESLint**: TypeScript and Angular rules
- **Prettier**: Code formatting
- **No `any` types**: Use proper TypeScript types
- **Strict mode**: Enabled in `tsconfig.json`

### Testing Requirements

- ✅ Coverage > 80%
- ✅ Component tests for all components
- ✅ Service tests with mocked HTTP
- ✅ Test both success and error cases

---

## 📝 Component Structure

### Standalone Components

```typescript
@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  // Use inject() for dependencies
  private userService = inject(UserService);
  
  // Use signals for state
  users = signal<UserDto[]>([]);
}
```

**Rules**:
- ✅ Standalone components only
- ✅ Use `inject()` for DI
- ✅ Use Signals for state
- ✅ Explicit imports

### File Structure

```
user-list/
├── user-list.component.ts       # Component logic
├── user-list.component.html     # Template
├── user-list.component.scss     # Styles
└── user-list.component.spec.ts  # Tests
```

---

## 🧪 Testing Examples

### Component Test

```typescript
describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: jasmine.SpyObj<UserService>;
  
  beforeEach(() => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['listUsers']);
    
    TestBed.configureTestingModule({
      imports: [UserListComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ]
    });
    
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });
  
  it('should load users on init', () => {
    const mockUsers: UserDto[] = [
      { id: 1, email: 'test@example.com', username: 'test', fullName: 'Test User' }
    ];
    
    userService.listUsers.and.returnValue(of(mockUsers));
    
    component.ngOnInit();
    
    expect(component.users()).toEqual(mockUsers);
    expect(component.loading()).toBe(false);
  });
});
```

### Service Test

```typescript
describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  it('should fetch users', () => {
    const mockUsers: UserDto[] = [
      { id: 1, email: 'test@example.com', username: 'test', fullName: 'Test User' }
    ];
    
    service.listUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });
    
    const req = httpMock.expectOne(`${environment.apiUrl}/users`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
  
  afterEach(() => {
    httpMock.verify();
  });
});
```

---

## 📋 PR Checklist

Before submitting a PR:

- [ ] Follows MVVM architecture
- [ ] Uses Signals for state
- [ ] No `any` types
- [ ] Uses design system tokens
- [ ] All tests pass (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Coverage > 80%
- [ ] Build succeeds (`npm run build`)
- [ ] No console errors
- [ ] Documentation updated

---

## 🚫 Common Mistakes

### ❌ HTTP in Component

```typescript
// BAD
export class UserListComponent {
  ngOnInit() {
    this.http.get('/api/users').subscribe(...);  // ❌
  }
}
```

### ✅ HTTP in Service

```typescript
// GOOD
export class UserListComponent {
  private userService = inject(UserService);
  
  ngOnInit() {
    this.userService.listUsers().subscribe(...);  // ✅
  }
}
```

### ❌ Hardcoded Colors

```scss
// BAD
.button {
  background: #007bff;  // ❌
}
```

### ✅ Design Tokens

```scss
// GOOD
.button {
  background: var(--color-primary-500);  // ✅
}
```

---

## 📚 Resources

- [Main Contributing Guide](https://github.com/CkoThuw11/TinyBigCorp/blob/main/CONTRIBUTING.md)
- [Learning Guides](https://github.com/CkoThuw11/TinyBigCorp/tree/main/docs)
- [Angular Documentation](https://angular.dev)
- [Signals Guide](https://angular.dev/guide/signals)

---

**Questions?** Open a discussion in the main repo or tag `@anhhoangdev`.
