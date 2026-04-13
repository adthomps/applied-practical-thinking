---
title: File Upload
version: v2
description: Pattern for uploading files with progress, validation, and accessibility considerations.
---

## Intent

Allow users to select and upload files with clear feedback, size/type validation, and progress reporting.

## Anatomy

- Dropzone / input control
- Selected file list
- Progress indicators
- Error messages and actions (retry/remove)

## Accessibility

Support keyboard access to the file picker, provide clear text alternatives for drag-and-drop, and announce upload progress when appropriate.

## Tokens & Theming

Use tokens for dragzone background, success, and error states. Keep contrasts accessible.

## API/Components

Expose `FileUpload` component with hooks for upload progress, validation, and cancellation.

## Code examples

See `examples/file-upload.example.tsx`.

## Integration notes

Handle large files via chunking or background uploads and sanitize filenames server-side.

## Variants

- Single-file picker
- Multi-file dropzone
- Avatar/photo cropper

## Tests & QA

Test keyboard and screen-reader interactions, file-type restrictions, and large-file behavior.
