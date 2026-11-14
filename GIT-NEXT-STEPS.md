# Bonus 4: Git repository — remaining steps

Owner: naz051223. A local repository with genuine commit timestamps has been
created. No remote repository or instructor permission has been claimed as done.

## Restore the preserved history

The ZIP includes assignment4-history.bundle. From the extracted assignment4 folder:

```sh
git clone assignment4-history.bundle assignment4-repository
cd assignment4-repository
git log --date=short --format="%h %ad %s"
```

## Publish when signed in

Create an empty private GitHub repository named assignment4-destructuring-field-guide
under naz051223, without adding a README, license or .gitignore on GitHub. Then,
from the restored repository:

```sh
git remote set-url origin https://github.com/naz051223/assignment4-destructuring-field-guide.git
git push -u origin main
```

From the original local project, where no origin has been added yet, use
`git remote add origin ...` instead of `git remote set-url origin ...`.
Normal GitHub authentication is required; do not put passwords or tokens in the
README or chat. The account's current authentication is not bundled in the ZIP.

## Complete the assignment's history and access conditions

Continue real review and improvements on later days. The handout asks for at least
five meaningful commits over several days; commits made today do not by themselves
satisfy that requirement. Useful future changes include explaining a depth case in
your own words, checking an additional React edge case, or improving a real-code
analysis after understanding it. Do not change timestamps to simulate earlier work.

Add the actual repository link to the Bonus 4 section of README, grant the instructor
access according to CATS, rebuild the PDF with npm run build:guide, and regenerate
the final ZIP. Keep the repository private until you choose otherwise.
