# Instagram Detective

Compare downloaded Instagram followers and following JSON exports locally. This release replaces the prototype’s private API scanner: it does not log into Instagram, read cookies, or make follow/unfollow requests.

## Use

1. Load this repository folder through Chrome’s **Load unpacked** control, then open the toolbar popup.
2. Choose **Open private comparison**.
3. Download followers and following from Instagram as JSON for the complete available time range, and unzip the export.
4. Select all numbered follower JSON files and the following JSON file, then compare.
5. Export the accounts that do not follow back as CSV, or clear the imported data.

Results describe the supplied exports. They cannot identify historical unfollow events from a single snapshot. Old or incomplete files affect accuracy. At most 1,000 result rows are displayed; CSV contains the complete result.

## Privacy

Imported files stay in the comparison tab’s memory. Clear data or close the tab to discard them. The release has no storage, host, cookie or account permissions and makes no network requests. No paid checkout is configured yet.

## Development

The active runtime is `manifest.json` and `release/`; older prototype files are excluded from release packages. No compilation is required. Run `node --test tests/*.test.cjs` for export parsing checks and `python3 scripts/build.py` to generate the Chrome ZIP. Browser validation uses `node tests/browser.cjs` and the sibling Redline Playwright installation, or `INSTAGRAM_PLAYWRIGHT` to point to another installation.
