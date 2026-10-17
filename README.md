# Nova by Nexus Workspace

Official command-line companion for the [Nexus](https://www.nexusworkspace.net/) desktop app.

Install Nexus, keep it up to date, sign in, check your Nexus Cloud AI usage and see how the service is doing, all from your terminal.

> **Platform support:** Nexus is currently available for **Windows 10 and Windows 11** only. Nova therefore runs on Windows only. macOS and Linux builds don't exist yet; when they do, Nova will gain support for them.

## Requirements

- Windows 10 or Windows 11 (64-bit; x64 or ARM64)
- [Node.js](https://nodejs.org/) 20 or newer
- An internet connection

Windows on ARM PCs install the x64 build of Nexus, which Windows runs under emulation.

## Install

```powershell
npm install -g @getnexus/nova
nova --help
```

The `-g` flag matters: it puts the `nova` command on your PATH. If you'd rather not install it, you can run it once with `npx @getnexus/nova install`.

## Quick start

```powershell
nova install     # download and install the latest Nexus
nova login       # sign in (or sign up) with Google or GitHub
nova usage       # see your Nexus Cloud AI usage
```

Something not working? Run `nova doctor` first. It checks your Node.js version, Windows version, internet access, the release feed, Nexus Cloud and your sign-in.

## Commands

| Command | What it does |
| --- | --- |
| `nova install [--passive\|--silent]` | Download and install the latest Nexus |
| `nova update [--force] [--passive\|--silent]` | Install only if a newer release exists |
| `nova check` | Show installed vs. latest version |
| `nova login [-p google\|github] [--no-browser]` | Sign in or sign up from the terminal (requires Nexus installed); also signs in the Nexus app |
| `nova whoami` | Show the signed-in account |
| `nova usage` | Show Nexus Cloud AI token usage |
| `nova logout` | Sign out of Nova and the Nexus app, revoking the session |
| `nova status [--open]` | Check Nexus Cloud health (`--open` also opens the status page) |
| `nova website` | Open the Nexus website |
| `nova releases` | Open the releases page |
| `nova doctor` | Diagnose your setup |
| `nova version` | Print the CLI version (also `nova -v`) |

Run `nova <command> --help` for details on any command.

## Installing and updating Nexus

`nova install` downloads the latest Nexus Windows installer (`setup.exe`) from the official release channel and launches it.

| Option | Effect |
| --- | --- |
| *(none)* | Opens the normal installer so you can follow the prompts. Windows may ask for permission (UAC). |
| `--passive` | Shows installer progress but needs no interaction. |
| `--silent` | Installs with no window at all. Nova waits for it to finish and reports success or failure. |

`nova update` does the same, but only when a newer version than the one installed is available. Add `--force` to reinstall the current version. Close Nexus before updating so the installer can replace its files; Nova will remind you if it's still running.

Downloads are restricted to GitHub over HTTPS, checked for size, and verified against the published SHA-256 checksum whenever GitHub provides one. If no checksum is available, Nova tells you so.

## Signing in

`nova login` only works once the Nexus desktop app is installed (run `nova install` first). New accounts are created automatically on first sign-in, so the same command signs you up or in.

1. Nova shows a **confirmation code** and opens your browser (use `--no-browser` to print the link instead).
2. Authorize with Google or GitHub (`-p github` to use GitHub; Google is the default).
3. The browser asks you to confirm. **Only continue if it shows the same code Nova printed.**
4. Nova finishes signing in and saves your session.

Your session is saved in two places:

- `%APPDATA%\nova\credentials.json`, in your Windows user profile, for Nova itself.
- **Windows Credential Manager**, where the Nexus app reads it, so the app is signed in too.

If Nexus is already running, restart it to pick up the sign-in.

Nova and the app share one session, so `nova logout` signs you out of both and revokes the session on the server. Treat your session like a password and never share `credentials.json`.

## Exit codes

Nova exits with `0` on success and `1` on any error (including an unhealthy `nova status`), so it's safe to use in scripts:

```powershell
nova update --silent
if ($LASTEXITCODE -ne 0) { Write-Error "Nexus update failed" }
```

## Troubleshooting

| Problem | What to try |
| --- | --- |
| `nova` is not recognized | Install with `npm install -g @getnexus/nova`, then open a new terminal window. |
| "Nova currently supports Windows 10 and 11 only" | Nexus isn't available for macOS or Linux yet. |
| "GitHub rate limit reached" | Wait a while, or set the `GITHUB_TOKEN` environment variable. |
| Installer doesn't appear | Check for a UAC prompt or a SmartScreen warning, or run `nova install --passive`. |
| "Checksum mismatch" | The download was corrupted or altered. Run the command again; if it persists, contact support. |
| "Nexus isn't installed" when signing in | Run `nova install` first. |
| "Your session is no longer valid" | Run `nova login` again. |
| Signed in to Nova but not the app | Restart Nexus. If it still asks you to sign in, sign in inside the app. |
| Sign-in times out | You have 10 minutes to complete it in the browser. Run `nova login` again. |

Still stuck? Run `nova doctor` and include its output when you contact support.

## Privacy and security

- Nova only talks to the Nexus Cloud service, GitHub (for releases and downloads) and the sign-in provider pages you open in your browser. It does not collect analytics.
- Secrets are never passed on the command line. The Nexus Cloud key is handed to Windows Credential Manager through the environment of a short-lived process.
- Use of Nexus Cloud through Nova is covered by the Nexus End User License Agreement and Privacy Policy.

## Support

Questions or bug reports: [support@nexusworkspace.net](mailto:support@nexusworkspace.net)

## License

Nova is proprietary software, not open source. Use is governed by the [Nova CLI License](https://nexusworkspace.net/nova-license) and the [Nexus Software License](https://nexusworkspace.net/software-license).

Copyright © 2026 Nawrasse Andaloussi Dahman. All Rights Reserved.
