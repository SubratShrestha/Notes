# Version Control.

Its a way to control and record the history of the development of programs, especially when there are multiple people working on a project, things like new features and additions can get way out of hand and a version control system like git can manage all of these.

Allows us to see the entire development process, get feedback on contributions, see other people's contributions, see the all the versions of the software like a time machine. Multiple versions can be developed simultaneously, even.

Comes from Bell Labs - SCCS (source code control system), it only tracked the changes on the files, it was centralised - meaning a single central repo. It had a single user model which meant that one user would work on a certain program, and lock it -  this would mean that nobody else could work on that file until that person unlocked it again.

This was made open sourced later and called the RCS (revision control system), and this is actually still in use. Its the same as SCCS, but open source.

Then came CVS (concurrent version system) and it changed the model where it went from the locking mechanism to merging, and this was now useful for multiple people working on the same project, where many people could edit the software and all the changes would be merged into one. It also had a web-accessible interface which allowed for people to work from different locations. But it could not handle some things like metadata, file renames and links and stuff.

Then came Subversion depicted as CVS done right, fixed many things CVS had gotten wrong, it was better documented and much easier to understand, it followed the same model as CVS though - one central repo, also still in use. It would work now for many things but it still has the weakness of the single central repo. That's what posed the problem, it might seem like its not too big a deal but then people didn't and still don't have access to the internet 24/7 and unlike git, the entire version history of the projects were not stored in local machines, so people couldn't work on them anytime they wanted.

Came bitkeeper written by Larry McVoy with its distributed VCS - multiple repositories, and every user had their own repos. So anyone working on a project would not only have the millions of lines of code, but also had the thousands of versions of the code. It also had very clever ways to store all those versions - computers were much faster and more capable, and the changes from different versions were quite little. BitKeeper was heavily licensed and people started to reverse engineer it to make it better for specific needs but had frequent legal and licensing clashes with Bitkeeper.

This led to Linus Torvalds writing their own distributed VCS and calling it GIT for the linux kernel, turned out to be extremely well written, but there are multiple others like bazaar, darcs, mercurial, etc and its not that git is superior to all of them, it was just more popular, all of it is debatable taking into consideration specific needs.

# Git.

Followed the distributed version control system, every user had thier own repo and external revisions imported as branches. It had flexible handling of these external versions of the same codebase and many useful algorithms for auto-merging which almost always does the right thing.

Its a huge project with an huge variety of different commands that most people would probably never use. So its helpful to start with a small subset of these commands.

Many VCSs use this thing called a repository, and a repo is just where all the versions of all the files live. The way this is stored depends on the system but it may be a single file (not the best way to go about things), a directory tree (what we'll be using for the assignment), or a database.

The files can be accessed in different ways as well, Github for ex. uses filesystems, a http request, with ssh or even some other custom protocol.



## Working.

Git uses a sub-directory called `.git` which stores the repository. There are a bunch of thing in there:

*   **blobs** are the hashes of the files. Git uses hashing to compare files, so instead of having to compare every byte of a file, the hash is just one giant integer which is much faster and easier to compare. Git uses the SHA-1 hash for this.

*   **tree objects** which link all these blobs to more information like what directories they're in, links and even permissions - not the entire permissions from unix but a limited subset.

*   **commit objects** which is the state of the repository and it links the tree objects with some more info about parents (the previous version of the files), time (when the commit was made) and the log messages (commit messages). 

    



## Commands.

The basic commands would be `git `

*   `status` to check the current status of the repo. "Untracked" means we have some files that are on the computer and in the folder we're working on but git doesn't know about. 

    "Modified" means the file has been edited and only the old version is up to date with git.

*   `add` to add files to version control. It also adds the files to an intermediate (called index or stage), and things in this intermediate will be part of the next commit.
*   `commit -m` to commit the changes. This is an important point in time, this is the next version of the project, the commit message comes after the `-m` in quotes and these should be descriptive - not short and unclear. We need to commit things often though because if we don't supply git with commits, it has no way of tracking our software, and a giant commit with a whole bunch of changes is never clear.
*   We can see all the commits in a repo with `git log`, where we can see the unique hash of every commit, and if we wanted we could go back in time to that exact commit with `git checkout <hash>`
*   `push` to upload these commits to the repository. We were working on our own repository upto this point but this command pushes the changes we made here to the actual repository where other people and see it (if it was public).

