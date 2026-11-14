# Bonus 4: Git repository — current status

Published private repository:
https://github.com/naz051223/assignment4-destructuring-field-guide

The five original commits were uploaded with their real history. The README/PDF
publication update is recorded in an additional real commit. All of today's
commits retain 14 November 2026 timestamps.

## Work on the existing repository

From a normal authenticated Git terminal:

```sh
git clone https://github.com/naz051223/assignment4-destructuring-field-guide.git
cd assignment4-destructuring-field-guide
npm install
npm run all
npm run check
```

The ZIP also preserves assignment4-history.bundle as an offline history backup.
To restore it:

```sh
git clone assignment4-history.bundle assignment4-repository
cd assignment4-repository
git remote set-url origin https://github.com/naz051223/assignment4-destructuring-field-guide.git
```

## Conditions still remaining

Continue real review and improvements on later days. The handout asks for at least
five meaningful commits over several days. The commit count is satisfied, but
commits made on one day do not satisfy the several-day condition.

When the instructor's GitHub username is announced, grant the instructor access
according to CATS. Rebuild the PDF and export a newly named ZIP after subsequent
changes. Preserve the completed Bonus 1–3 ZIP backup.

If GitHub CLI authorization is revoked after today's upload, normal reauthorization
or another supported authentication method is required for later private-repository
pushes. The repository and commits remain on GitHub when CLI access is revoked.
