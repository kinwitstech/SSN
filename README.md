# SSN Health Care Project Repository

## 🛠 Requirements

- **Node.js:** `22.17.0` (LTS version)  
- **Yarn:** `v4.x` (managed via Corepack)

#### ⚙️ Setup Yarn v4 (One-time Setup):

If you previously installed Yarn globally, uninstall it first:

```bash
npm uninstall -g yarn
```

Then enable Corepack (included with Node ≥16.10):

```bash
corepack enable
```

## 🚀 Installation Steps

```bash
git clone https://github.com/kinwitstech/SSN.git
```

```bash
cd SSN
```

```bash
yarn install
```

```bash
yarn dev
```

## 🧹 Linting & Code Formatting

Add the following to your local `.vscode/settings.json` to enable auto-formatting and ESLint fixes on save:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "eslint.validate": ["javascript", "javascriptreact"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
``` 

> 💡 Ensure the Prettier and ESLint VS Code extensions are installed:
>
> - Prettier - Code formatter
> -	ESLint
>


## 🔧 Linting Commands

Use the following Yarn scripts to check and fix ESLint issues:

- Lists all ESLint issues in the project:

```bash
yarn lint
```
- Automatically fixes ESLint issues:

```bash
yarn lint:fix
```

