# Talks

## Overview

The Talks feature provides UI and state for creating, editing, and presenting talks.

## Key user flows

- Create a talk
- Add sections and subsections
- Edit section/subsection content
- Present a talk (navigate subsections, view timing/progress)

## Data Model

### Outline

| Field     | Type      | Description              |
| --------- | --------- | ------------------------ |
| id        | string    | Unique identifier        |
| name      | string    | Outline name             |
| sections  | Section[] | Ordered list of sections |
| createdAt | number    | Timestamp                |
| updatedAt | number    | Timestamp                |

## Outline list (Talks list display)

The Talks page displays a list of outlines. Each row represents one outline.

### Display fields

| UI Field        | Source              |
| --------------- | ------------------- |
| Title           | Outline.name        |
| Sections count  | Outline.sections    |

### Example (stored outline)

```ts
type Outline = {
  id: string;
  name: string;
  sections: { name: string; subsections: { name: string }[] }[];
  createdAt: number;
  updatedAt: number;
};

const example: Outline = {
  id: "talk-1",
  name: "Public Talk: The Value of Prayer",
  sections: [
    {
      name: "Introduction",
      subsections: [{ name: "Opening question" }],
    },
    {
      name: "Main points",
      subsections: [{ name: "What prayer is" }, { name: "How prayer helps" }],
    },
  ],
  createdAt: 1730000000000,
  updatedAt: 1730000000000,
};
```

### Section

| Field       | Type         | Description                 |
| ----------- | ------------ | --------------------------- |
| name        | string       | Section name                |
| subsections | Subsection[] | Ordered list of subsections |

_Order is determined by position in the sections array._

### Subsection

| Field          | Type   | Description                            |
| -------------- | ------ | -------------------------------------- |
| name           | string | Subsection name                        |
| content        | string | Subsection content/notes               |
| timeAllocation | number | Time in seconds (15-second increments) |
