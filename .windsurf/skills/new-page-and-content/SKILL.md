---
name: new-page-and-content
description: use this skill when asked to add a new page to the app
---

## Add New Page Component

1. Create a new ionic page component using IonPage, IonHeader, IonContent etc. The you can component should be placed accordingly to where the user says and also named accordingly.
2. Create a new content component and add it to the newly created page component in the content section. The content component should be placed in a folder in src/content.
3. Any path params should be fetched within the content component, not the page component
4. Create a new Zustand store for this page content in a store directory within the same folder as the new content component
