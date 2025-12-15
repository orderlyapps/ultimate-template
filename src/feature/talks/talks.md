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
