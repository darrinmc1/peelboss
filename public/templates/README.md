# Template files

Drop actual `.docx` / `.pdf` / `.xlsx` files here with filenames that match the
`filePath` entries in `data/activities/templates-catalog.json`.

When a real file exists for a template, flip its `fileAvailable` field in the
catalog to `true`. The download button in the UI will then link directly to the
file (and the browser will save it).

Preview images live under `/public/templates/previews/` — same filename basis.
If absent, the `TemplateCard` component falls back to a file-type gradient.
