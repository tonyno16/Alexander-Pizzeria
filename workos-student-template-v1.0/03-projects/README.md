# Projects

Time-bound work with a finish line lives here.

Create projects with `/new-project`. Each project starts with `_overview.md`.

## Link Projects To Areas

Every active project should name the area accountable for keeping it moving:

```yaml
container_type: project
primary_area: 02-areas/email-marketing/_overview.md
related_areas:
  - 02-areas/sales/_overview.md
```

`primary_area` is the accountable home, not the only topic. A launch might touch
email, sales, product, and support, but one area should own the project unless
there is an explicit reason it does not.

Use `primary_area: none` only when the project truly has no owning area yet, and
write the reason in the project overview.
