# Git & GitHub: Your Creative Coding Backup Crew

Kick things off by watching this short, upbeat overview: [How To Use GitHub For Beginners](https://www.youtube.com/watch?v=a9u2yZvsqHA). It gives a quick tour of the GitHub website and sets the vibe for everything below.

Welcome! This tutorial is written for absolute beginners. If you can open Visual Studio Code and vibe with your team, you have all the skills you need to get value from Git and GitHub. No command-line wizardry required.

## Why we care about Git and GitHub

- **Git keeps a memory of your project.** Every meaningful change becomes a commit you can rewind to if something breaks.
- **GitHub shares that memory with your crew.** It stores your commits online so teammates (and future you) can pull them anytime.
- **Together they make teamwork feel safe.** You can try ideas, compare versions, and roll back mistakes without panic.

If you like analogies, Git is the *actual* version-control tool on your computer. In a video game, that would be your local save slots. GitHub is the *real* website that hosts your code. In a game analogy, that feels like a cloud save so the rest of your party can load the same progress.

## Git in plain words

- **Version control:** Git watches your project folder and remembers how files change over time. *Video game parallel:* The system that stores every save slot so you can reload any moment in your adventure.
- **Repository (repo):** A project folder that Git is tracking. It can live on your computer, on GitHub, or both. *Video game parallel:* The cartridge or game world you and your friends keep returning to.
- **Commit:** A saved checkpoint with a short message explaining what changed. All the magic flows from making solid commits. *Video game parallel:* Hitting “save” after clearing a level and leaving yourself a quick note about what you completed.
- **History:** The timeline of commits you and your teammates have made. *Video game parallel:* The list of story chapters you’ve finished so you know where everyone left off.

### Why developers trust Git

- **Safety net:** Break something? Jump back to an earlier commit.
- **Collaboration:** Everyone can work on the same repo without tripping over each other.
- **Proof of work:** Commits show exactly who changed what and when.
- **Experiments:** Try bold ideas on a branch and only merge them when they feel good.

## GitHub in plain words

- **Online home for repos:** GitHub keeps a copy of your repo on the internet (in the “cloud”). *Video game parallel:* The shared server where your squad downloads the latest save.
- **Team hub:** Invite collaborators, review each other’s changes, and talk through ideas. *Video game parallel:* A guild hall where everyone compares gear, strategies, and progress.
- **Portfolio:** Your public repos become a highlight reel for colleges, internships, and future teammates. *Video game parallel:* A profile page showing off your unlocked achievements.
- **Integrations:** GitHub connects with tools like VS Code to make sharing and syncing painless. *Video game parallel:* Quality-of-life mods that streamline how you jump into co-op.

### Git vs. GitHub at a glance

- **Git** runs on your computer and handles version history.
- **GitHub** lives online and lets you store, share, and discuss Git repos.
- You almost always use them together: Git does the tracking; GitHub does the sharing.

## How Git fits your Visual Studio Code flow

Visual Studio Code has a Source Control tab (the icon looks like a branching line). You can run your whole Git workflow there without typing a single command.

1. **Make changes** in your project files.
2. **Open Source Control** (`Ctrl+Shift+G` on Windows/Linux, `Cmd+Shift+G` on macOS).
3. **Review the changes** listed under “Changes.” Click a file to see before/after.
4. **Stage** the files you’re ready to commit (hover a file and click the `+`). This tells Git, “include this in the next commit.”
5. **Write a commit message** up top. Keep it short and clear (example: `Add starter HTML structure`).
6. **Commit** by pressing the checkmark icon. You just created a new checkpoint!
7. **Sync** your work with GitHub by clicking “Sync Changes” (or “Push”). VS Code will upload your commits so everyone stays in sync.

> **Pro tip:** Commit small, meaningful chunks. It’s way easier to understand “Add hero image” than “massive update lol.”

## What actually happens when you commit

1. You stage files. Git marks them as the exact changes to include in the next commit.
2. You write a message describing the change so future you (and your teammates) know what happened.
3. VS Code runs Git under the hood to write the commit into your history.
4. If you’re connected to GitHub, syncing pushes that commit so others see it.

*Video game parallel:* Stage files like equipping the gear you want to carry forward, commit to lock in the progress, and sync to upload that save so the rest of the party loads the same checkpoint.

## Merge conflicts without the stress

Sometimes two people edit the same line in the same file. Git pauses and asks for help—that’s a merge conflict.

How to handle it in VS Code:

- The file will show sections labeled `<<<<<<`, `======`, and `>>>>>>`.
- The top chunk is your teammate’s version, the bottom is yours.
- Talk with your teammate, decide what the final text should be, edit the file to match that decision, then save and commit again.

Conflicts aren’t a disaster—they’re Git’s way of protecting everyone’s work.

## Light practice mission

Try this with your class to build muscle memory:

1. Create a new folder and open it in VS Code.
2. Use the Source Control tab to **initialize** the repo (there’s a “Initialize Repository” button if Git isn’t active yet).
3. Add a simple `notes.md` file and write one sentence.
4. Stage the file, commit with the message `Add first note`, and sync to GitHub.
5. Edit the sentence, commit again with `Update note`, and sync.
6. Open GitHub in the browser and show the commit history so students can see the timeline.

## Helpful mindsets

- **Commit when something works, even if it’s tiny.** Frequent saves beat giant risky ones.
- **Use clear messages.** Imagine your teammate reading it with no extra context.
- **Check history when confused.** VS Code’s Source Control view or GitHub’s “Commits” tab can answer “what changed?” faster than asking around.
- **Ask for help with conflicts early.** They’re easier to solve before lots of new commits pile up.

## Ready for teamwork? Try the collaboration exercise

Once you're comfortable with basic commits and syncing, level up with our hands-on collaboration exercise:

**[Git Collaboration Exercise: Epic Dodgeball Rules](https://github.com/corylanou/git-dodgeball)**

You'll learn:

- How to **fork** a repository (make your own copy)
- How to submit **pull requests** (propose changes to someone else's project)
- How to resolve **merge conflicts** (when two people edit the same thing)
- How to **sync your fork** with the original project

This is exactly how open source projects work! The exercise uses a fun dodgeball rules theme, so you're just editing text, not worrying about code. Perfect for practicing Git collaboration skills.

**Time needed:** 45-60 minutes
**Difficulty:** Beginner (assumes you know basic Git from this tutorial)

## Keep exploring

- [GitHub Docs – Hello World](https://docs.github.com/en/get-started/start-your-journey/hello-world): Official friendly walkthrough that inspired many of these ideas.
- [Atlassian – What Is Version Control?](https://www.atlassian.com/git/tutorials/what-is-version-control): Gives simple language for why version control matters.
- [freeCodeCamp – What Is Git?](https://www.freecodecamp.org/news/what-is-git-learn-git-version-control): Beginner-focused article that reinforces the key vocabulary.
- [GitHub Skills: Introduction to GitHub](https://skills.github.com/): Free interactive labs for practicing commits, branches, and pull requests.

### Video vibes to queue up

- [Git and GitHub Crash Course for Beginners (2024)](https://www.youtube.com/watch?v=l2yrJtwoC_E) – Big-picture walk-through with live demos.
- [How To Use GitHub For Beginners](https://www.youtube.com/watch?v=a9u2yZvsqHA) – Quick, upbeat intro to the GitHub website.
- [Ultimate GitHub Workflow for VS Code in 2024](https://www.youtube.com/watch?v=LHhforvBjFI) – Shows the VS Code flow we use in class.

Remember: the goal right now isn’t to memorize commands—it’s to understand that Git keeps your work safe and GitHub keeps your crew connected. You’ll pick up the buttons and shortcuts just by practicing.
