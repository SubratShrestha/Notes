# Tools

We have 5 tools that can help with synchronization problems in OS/161.

## Locks

Locks are very simple. They can be created, aquired, and deleted.

When a lock is created, it just exists - no thread can work on it just yet, nothing happens until a thread "aquires" the lock. When a thread aquires a lock, the thread can work on it and no other thread can aquire this lock until the first thread "releases" it.

If a thread tries to aquire a lock that's already aquired, the thread goes to sleep. When the thread that had the lock releases the lock, the sleeping thread will be woken up and it can aquire the lock.

There are x functions related to locks:

* create - this creates a lock but no thread can use it until its been aquired
* aquire - this makes a thread aquire a lock, only a single thread can aquire a lock
* release - this releases the lock for the thread that had the lock and a sleeping thread may be woken up
* destroy - this destroys the lock but only locks that aren't held by anything can b
* do_i_hold - this function just lets the user know if the current thread is holding a lock