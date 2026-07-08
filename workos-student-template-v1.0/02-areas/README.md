# Areas

Ongoing business context lives here.

Create areas with `/new-area`. Each area starts with `_overview.md`.

## Area Types

Most single-business workspaces start with function areas:

- `email-marketing`
- `sales`
- `operations`
- `support`

Client and multi-venture workspaces may use client or venture areas instead:

- `acme-client`
- `brand-a`
- `b2b-saas-portfolio`

The area type lives in `_overview.md` frontmatter:

```yaml
container_type: area
area_type: function # function | client | venture
```

## Projects Stay In `03-projects/`

Areas do not contain nested project folders. Finish-line work belongs in
`03-projects/` and links back to the accountable area with `primary_area`.

Use the area overview for ongoing context, constraints, canonical links, and
related active work. Use `/work-map` for the generated cross-workspace view.
