# Bonus 4: Git repository - current status

Private repository:
https://github.com/naz051223/assignment4-destructuring-field-guide

The initial work is uploaded. Newer review and documentation commits are saved
locally and still need to be pushed. The local history spans two days and has
more than five commits. Instructor access and further review over several days
remain pending. Commit timestamps have not been changed.

## Continue work

In an authenticated Git terminal, use git push origin main to upload local commits.
Revoked GitHub CLI access requires a new authorization before using that method.
Revoking CLI access does not delete the repository or its commits.

For a new checkout:

```sh
git clone https://github.com/naz051223/assignment4-destructuring-field-guide.git
cd assignment4-destructuring-field-guide
npm install
npm run all
npm run check
```

The ZIP also includes assignment4-history.bundle as an offline history backup:

```sh
git clone assignment4-history.bundle assignment4-repository
cd assignment4-repository
git remote set-url origin https://github.com/naz051223/assignment4-destructuring-field-guide.git
```

Add instructor access according to CATS once the username is known. After later
changes, update the PDF and export a new ZIP. Keep the protected original backup.
