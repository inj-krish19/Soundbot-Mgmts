## 📂 Project Structure

```
src/
│
├── assets/          # Public Resources
├── components/      # UI components like Loading
│   ├── auth/        # Authentication
│   ├── charging/    # Charging-related
│   ├── device/      # Device-related
│   └── home_ui/     # Homepage related
│   └── layout/      # Layout related
│   └── player/      # Player-related
│   └── session/     # Session-related
│   └── ui/          # Helper components
├── pages/           # Pages like Dashboard
├── utils/           # Helper Functions, Util Functions
├── store/           # Stores, Constants
└── App.jsx
```

---

### File name explanation for Postfix Component Guide

- Postfix with \*\*\*`Card` are those components that are used for showing full details on hovering.
- Postfix with \*\*\*`MiniCard` are those components that are used for showing details to small devices and during their details dashboard page.
- Postfix with \*\*\*`Filter` are those components that have filtering options ui layout.

### File name explanation for Prefix Component Guide

- Prefix with `Create`\*\*\* components are the components for creating a new resource form and layout
- Prefix with `Update`\*\*\* components are the components for updating an existing resource form and layout
- Prefix with `Delete`\*\*\* components are the components for deleting a resource form and layout
