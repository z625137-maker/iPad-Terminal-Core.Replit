const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn, exec } = require('child_process'); 
const { Server } = require('socket.io');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(fs.readFileSync(path.join(process.cwd(), 'core/index.html')));
    }
});

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('New connection: Initiating Self-Healing Setup...');

    exec('bash core/setup_alpine.sh', (error, stdout, stderr) => {
        if (error) {
            console.error(`Setup error: ${error}`);
            return;
        }
        console.log('System Restored: Alpine Ready.');


    const userShell = spawn('proot', [
        '-0',
        '-i', '0:0',
        '-b', '/nix',
        '-b', '/etc',
        '-b', '/usr',
        '-b', '/bin',
        '-b', '/proc',
        '-b', '/dev',
        '-w', process.env.HOME,
        '/usr/bin/env',
        'PATH=' + process.env.PATH,
        'HOME=/root',
        'script',
        '-qf',
        '-c', 'env TERM=xterm /bin/bash',
        '/dev/null'
    ], {
        stdio: ['pipe', 'pipe', 'pipe'],
        env: { ...process.env, TERM: 'xterm' }
    });

    const bootSequence = [
        'stty -echo',
        'clear',
        'echo -e "\\x1b[32m"',
        'for i in {1..20}; do echo "LOADING_SYSTEM_CORE_$(date +%s%N)__ACCESS_LEVEL_ROOT_$(($RANDOM%100))%"; sleep 0.02; done',
        'echo -e "DECRYPTING_KERNEL_ENCRYPTION... DONE"',
        'sleep 0.3',
        'clear',
        'neofetch --ascii_distro ubuntu',
        'echo -e "\\x1b[1;31m[SYSTEM] WEBLINUXTERMINAL : KERNEL_ENGAGED\\x1b[0m"',
        'echo -e "\\x1b[1;31m[STATUS] ALL SYSTEMS OPERATIONAL / ACCESS: GRANTED\\x1b[0m"',
        'export PS1="\\e[1;31m[Ubuntu-root]# \\e[0m"',
        'alias alpine="proot -r /home/runner/workspace/alpine -b /proc -b /dev -b /sys -w /root /usr/bin/env -i HOME=/root TERM=xterm PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin /bin/sh -c \'export PS1=\\\"\\\\e[1;31m[alpine-root]# \\\\e[0m\\\"; exec /bin/sh\'"',
        'stty echo',
        'echo ""'
    ];

    setTimeout(() => {
        userShell.stdin.write(bootSequence.join('\n') + '\n');
    }, 1000);

    userShell.stdout.on('data', (data) => socket.emit('output', data.toString()));
    userShell.stderr.on('data', (data) => socket.emit('output', data.toString()));

    socket.on('input', (data) => {
        if (userShell.stdin.writable) userShell.stdin.write(data);
    });

    socket.on('stop_signal', () => {
        if (userShell.stdin.writable) userShell.stdin.write('\x03\n');
    });

    socket.on('disconnect', () => {
        userShell.kill();
      });
    });
  });
server.listen(3000);
