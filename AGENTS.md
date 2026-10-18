<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Menu behavior

- Keep the public product catalog in `src/lib/products.ts`, with descriptive fields and image references only; this keeps product data consistent and independently testable without exposing commercial pricing.

- The header nav highlights the section currently in view, and the scroll spy is frozen while the mobile menu is open — opening the menu shifts the layout and would otherwise move the highlight to the previous section.
- Mobile menu links scroll to their section in code (`goToSection`) instead of relying on the anchor default: closing the menu unmounts the link, which cancels the browser's own anchor navigation.
