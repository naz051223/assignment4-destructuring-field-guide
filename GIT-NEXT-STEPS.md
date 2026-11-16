# Bonus 4: Git repository

Owner: naz051223
Repository: https://github.com/naz051223/assignment4-destructuring-field-guide

The instructor asked for a public repository. Public visibility and remote HEAD
are checked during the final upload. This allows the instructor to read the work
without a collaborator invitation. The local history has more than five meaningful
commits across three days, including the React key investigation.

## Check a fresh copy

```sh
git clone https://github.com/naz051223/assignment4-destructuring-field-guide.git
cd assignment4-destructuring-field-guide
npm install
npm run all
npm run check
```

CLEAN-CLONE-CHECK.txt identifies the exact runnable-code snapshot tested from a
fresh bundle clone. The final documentation changes do not change its code.
The ZIP includes assignment4-history.bundle as an offline backup of the history:

```sh
git clone assignment4-history.bundle assignment4-repository
cd assignment4-repository
git remote set-url origin https://github.com/naz051223/assignment4-destructuring-field-guide.git
```

Commit dates are automatic and unchanged. The README and PDF do not need manual
date labels. The protected original ZIP is kept separately. If CLI authorization
is revoked after upload, a later push needs a new authorization; the public
repository and its uploaded commits remain available.
