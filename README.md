# iPad-Terminal-Core.Replit
Built entirely on an iPad by a high school student.

A lightweight, browser-based Alpine Linux terminal core. This project was developed to create a functional Linux environment using proot in restricted environments where Docker or root access is unavailable.
Developer's Focus

• 100% iPad Native Development:
Developed, tested, and deployed using only an iPad (Safari + Replit). Not a single PC was used throughout the entire process.

• "Phoenix" Self-Healing System:
A custom setup script triggers on every connection to automatically restore and prepare the Alpine environment from scratch.

• Cyberpunk UX:
Focused on the "boot sequence" experience (DECRYPTING_KERNEL..., LOADING_SYSTEM_CORE...) to provide a raw, hacker-like terminal interface.
Tech Stack

• Frontend: HTML5, xterm.js, Socket.io-client
• Backend: Node.js, Socket.io
• Virtualization: proot (Rootless containerization), Alpine Linux Rootfs

A Message from the Developer
"Hardware limitations should never limit your creativity."
As a high school student without access to a PC, my iPad was my only weapon. This project is my direct answer to anyone trying to enjoy programming within a restricted environment.
If you have any ideas on how to optimize this even further for an iPad-only workflow, I’d love to hear your feedback!

Security Warning (Important)
This project is a naked shell access tool. It contains no authentication or encryption layers by design to keep the core lightweight.
Do not deploy this to a public URL. Anyone who discovers the link will have full control over your environment. It is intended for local use or strictly private development environments only.
