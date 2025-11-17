import { spawn } from 'child_process';
import os from 'os';

const platform = os.platform();

function runCommandInNewTerminal(command) {
  if (platform === 'win32') {
    // Windows: start en cmd
    spawn('cmd.exe', ['/c', 'start', 'cmd.exe', '/k', command], { stdio: 'inherit' });
  } else if (platform === 'darwin') {
    // macOS: usar AppleScript
    spawn('osascript', ['-e', `tell application "Terminal" to do script "${command}"`]);
  } else {
    // Linux: usar gnome-terminal
    spawn('gnome-terminal', ['--', 'bash', '-c', `${command}; exec bash`]);
  }
}

// Abrir Vite en una terminal
runCommandInNewTerminal('npm run dev');

// Abrir Electron en otra terminal
runCommandInNewTerminal('npx electron .');
