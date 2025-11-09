

# 📝 Git Recovery Notes – Dangling Commits & Corrupt HEAD

### **Incident Reference – Nov 9, 2025**

* System froze while VS Code was open.
* Repository `frontend` showed corruption:

```
error: object file .git/objects/... is empty
fatal: bad object HEAD
```

* `git fsck --full` reported multiple missing/corrupt objects.
* `git fsck --lost-found` showed dangling commits:

```
dangling commit c94b9cbb7ea022bc14c8bdc338cf45bc48604b5a
dangling commit f4559acd43a6c385b7167197831bfc0c683ed595
```

* Last known good commit was `c94b9cb` (query fix in store).

---

## **Recovery**

### **Step 1 – Diagnose**

1. Check repository health:

```bash
git fsck --full
git fsck --lost-found
```

* Found dangling commits.
* Confirmed last valid commit hash: `c94b9cbb7ea022bc14c8bdc338cf45bc48604b5a`.

2. Inspect commit:

```bash
git show c94b9cbb7ea022bc14c8bdc338cf45bc48604b5a
```

* Verified code and changes are correct.

---

### **Step 2 – Recover HEAD**

* Original attempts failed:

```bash
git branch -f main c94b9cb...  # Failed because branch was current
git checkout --detach         # Failed: branch yet to be born
```

* Solution: manually update HEAD to the good commit:

```bash
git update-ref HEAD c94b9cbb7ea022bc14c8bdc338cf45bc48604b5a
```

* Result:

```bash
git status
# On branch main
# All working directory changes remained unstaged/untracked
```

---

### **Step 3 – Verify Branch**

* Checked branch pointer:

```bash
git branch
* main
git rev-parse main
# c94b9cbb7ea022bc14c8bdc338cf45bc48604b5a
```

* HEAD now points to main branch at correct commit.
* Working tree untouched. All uncommitted edits preserved.

---

### **Step 4 – Outcome**

* Repository fully restored.
* Only one commit lost (earlier than `c94b9cb`).
* Working directory and staged changes remained intact.
* All future commits can proceed safely.

---

### **Step 5 – Safety & Recovery Tips**

1. **Check repo integrity** before panic:

```bash
git fsck --full
git fsck --lost-found
```

2. **Inspect dangling commits** to find the latest good commit:

```bash
git show <dangling-commit-hash>
```

3. **Recover HEAD** if branch is broken:

```bash
git update-ref HEAD <good-commit-hash>
```

4. **Verify branch pointers**:

```bash
git rev-parse main
git log --oneline -5
```

5. **Optional safety**:

```bash
git stash push --include-untracked
```

---

### **Step 6 – Reference Commands from Incident**

```bash
# Set HEAD to last good commit
git update-ref HEAD c94b9cbb7ea022bc14c8bdc338cf45bc48604b5a

# Check status and log
git status
git log --oneline -5

# Verify branch pointer
git rev-parse main
git branch
```

✅ **Key Learning:**
Dangling commits can be recovered even if HEAD or branch pointers are broken. Working tree edits remain safe. Manual `git update-ref` is the main recovery tool.

---

