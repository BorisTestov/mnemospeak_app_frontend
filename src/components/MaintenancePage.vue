<template>
  <div class="content-wrapper">
    <main>
      <div class="container">
        <div class="error-card">
          <div class="error-header">
            <h1>Технические работы</h1>
          </div>

          <div class="error-body">
            <div class="error-icon">⚙️</div>
            <p class="error-message">Ведутся технические работы, попробуйте позже.</p>
            <p>Приносим извинения за временные неудобства.</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style>
:root {
  /* Primary Colors - Blues */
  --primary-color: #173f8e;
  --primary-light: #4c6aa6;
  --primary-dark: #173f8e;

  /* Secondary Colors - Yellows/Oranges */
  --secondary-color: #f9d498;
  --accent-color: #fac166;

  /* Background Colors */
  --bg-color: #fff4dc;
  --bg-card: #ffffff;

  /* Text Colors */
  --text-primary: #173f8e;
  --text-secondary: #4c6aa6;

  /* Spacing */
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;

  /* Border radius */
  --border-radius: 0.5rem;
  --border-radius-lg: 1rem;

  /* Shadows */
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);

  /* Transitions */
  --transition-normal: 250ms ease-in-out;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

h1 {
  font-size: 2rem;
  margin-bottom: var(--spacing-md);
  color: var(--primary-color);
}

html, body {
  height: 100%;
}

body {
  font-family: 'Myriad Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-primary);
  background-color: var(--bg-color);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  padding: var(--spacing-lg);
}

.content-wrapper {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1 0 auto;
}

.error-card {
  background-color: var(--bg-card);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  max-width: 600px;
  margin: 0 auto;
}

.error-header {
  padding: var(--spacing-lg);
  background-color: var(--primary-color);
  color: white;
  text-align: center;
}

.error-body {
  padding: var(--spacing-xl);
  text-align: center;
}

.error-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-lg);
  color: var(--primary-color);
}

.error-message {
  margin-bottom: var(--spacing-lg);
  font-size: 1.2rem;
}

.button {
  display: inline-block;
  padding: var(--spacing-md) var(--spacing-xl);
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  transition: all var(--transition-normal);
  text-decoration: none;
  margin-top: var(--spacing-lg);
}

.button.primary {
  background-color: var(--primary-color);
  color: white;
}

.button.primary:hover {
  background-color: var(--primary-dark);
  transform: scale(1.02);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Responsive design */
@media (max-width: 768px) {
  .container {
    padding: var(--spacing-md);
  }

  .error-icon {
    font-size: 3rem;
  }

  .error-header, .error-body {
    padding: var(--spacing-lg);
  }
}
</style>