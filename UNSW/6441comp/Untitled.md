# Something Awesome Checkin

I've been through a lot of resources on keyloggers and found that the code can be very OS dependant - for example in python, I needed different APIs for windows and linux.

I also went through all the different languages I could go with. 

The requirements are

* Runs in all Operating Systems
	* The thing I'm most concerned about at the moment is the code requiring different packages and APIs for different operating systems
	* Maybe there's something I can use to find out what the host OS is?
* Should not require an installer
	* It would be riddiculous to have the host install something random. If it needs things to be installed, it must do it silently in the background.
	* I may find this to be too constricting later on as I find out more about the project. No installation may not be realistic, but a silent one should be possible.



## JavaScript

Since I can't just write to files from the browser and I can't be limited to it.

If I want to run a script file on the actual machine, I would need the host to have node installed.

The immediate advantage I found with using JS is that there are no special OS requirements and as long as node is installed, the script should run just fine. 

Some things I might need would require accessing a few system resources from the script's event loop and I found a package called `node-ffi` to help with that.



## Python

I run into the same problem as before in that I need python to be installed on the host computer before I get started on anything.

I read up about different solutions to this like having a portable version of the Python Interpretter on something like a thumbdrive, PythonAnywhere, PyPy.js, etc but none of them actually run on the host computer and so it doesn't have access to the file system.

What I could do is use somethig like `py2exe` to compile the python script into something that can locally be run on a windows computer, and the same with `py2app` to compile to a Mac. I'm not sure if I can do both.



## C/C++

This is probably the easiest way to ensure it runs everywhere and I would only need to compile it into a single executable.

It would have full access to read/write to files without requiring any OS specific work.

The cons are that firstly, its C/C++ and I'm not great with it but this might be the time to practice it a little more, and secondly, code for features like special character detection, active application detection, emailing log files, being invisible to foreground, having a different process name, etc may become long and verbose.



## Verdict

After researching some more I think I've landed with Python because I'm comfortable with it, its not verbose and when its time to start distributing the code, I could use libraries like py2exe or py2app to compile into simple executables and as for needing different APIs, I would have to find out the OS programmatically and I've found that this is possible with the "platform" module.



## Repository

I've set up a git repository [ here ] and currently includes a readme file and script that runs on the foregrond only Windows computers.

Improvements to come soon.

