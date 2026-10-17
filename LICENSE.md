# Nova CLI License

*Last updated: October 16, 2026*

**Copyright © 2026 Nawrasse Andaloussi Dahman. All Rights Reserved.**

This Nova CLI License ("License") governs your use of **Nova**, the official command-line companion for Nexus, published on npm as **@getnexus/nova** ("Nova"). Nova is created and maintained by **Nawrasse Andaloussi Dahman**, an independent developer based in Morocco ("**Operator**," "**we**," "**us**," or "**our**").

**Nova is not open-source software.** Although Nova is distributed through the public npm registry, and its JavaScript files can be read on your computer, that does not grant you any right to copy, modify, redistribute or build on it beyond what this License allows. This is why the package is marked `UNLICENSED` in its metadata: no rights are granted to the public by default, and the only permissions you have are the ones written here.

---

## 1. Relationship to Other Nexus Terms

Nova is part of the Nexus product family. Your use of Nova is also governed by the [Nexus Software License](https://nexusworkspace.net/software-license), the [Nexus Privacy Policy](https://nexusworkspace.net/privacy-policy), and, for the Nexus Cloud Service, the [Nexus Terms of Service](https://nexusworkspace.net/terms-service).

Capitalized terms used but not defined in this License, including "Nexus Cloud Service," "Third-Party Provider" and "Your Content," have the meanings given to them in the Software License. For the purposes of the Software License, Nova is treated as part of the Software.

If this License and the Software License conflict, the Software License controls to the extent of the conflict. This License governs the intellectual-property rights in Nova itself and how Nova may be used and distributed.

## 2. What is Nova?

Nova is a command-line tool for Windows. It can:

- find the latest Nexus release and download, verify and launch the Nexus installer;
- check which version of Nexus is installed and whether an update is available;
- sign you in to the Nexus Cloud Service with a supported provider and, on your computer, share that session with the installed Nexus app;
- show your account details, your Nexus Cloud usage, and the health of the Nexus Cloud Service;
- open Nexus web pages; and
- diagnose whether your setup is ready.

Nova does not open or read your Nexus notes database, and this License does not change how Nexus handles Your Content.

## 3. License Grant

Subject to your compliance with this License and the Software License, the Operator grants you a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to:

1. install Nova from the official npm package **@getnexus/nova**, or run it with `npx`, on computers that you own or are authorized to control;
2. use Nova for your personal purposes, or for the internal business purposes of an organization you represent, including running it from your own scripts, scheduled tasks and internal automation to install, update and check Nexus on your own computers; and
3. make the temporary copies of Nova that are a normal part of running it, such as the npm cache and package installation folders.

Nova is provided to you free of charge. This License grants a right to use Nova only. It does not transfer ownership of Nova or any intellectual-property rights to you. No implied license is granted, and all rights not expressly granted are reserved.

## 4. Restrictions

Except to the extent expressly permitted by this License, a separate written agreement, an applicable third-party license, or mandatory law, you may not, and may not knowingly permit or help anyone else to:

1. copy, publish, mirror or redistribute Nova, including by republishing it, or a modified version of it, to npm or any other package registry, repository or download site;
2. bundle or include Nova in a product, service, installer or distribution that you give or sell to others;
3. modify, adapt, translate, fork or create derivative works of Nova;
4. reverse engineer, decompile or attempt to derive source code, algorithms or non-public interfaces from Nova, except to the extent applicable law expressly permits that and it cannot be restricted by agreement;
5. remove, obscure or alter copyright, trademark or proprietary notices;
6. present a modified, unofficial or imitation tool as Nova, or as endorsed by, or affiliated with, Nexus;
7. use Nova, or its sign-in flow, to access the Nexus Cloud Service through any means other than the official Nexus applications and Nova, or to bypass authentication, usage limits, rate limits or other protective measures;
8. extract, copy or use a session key or other credential created by Nova outside Nova and the official Nexus application, or write credentials into the Nexus app's credential storage by any means other than Nova's own sign-in;
9. use Nova to automate abuse of the Nexus Cloud Service, including sending traffic intended to overload it, scrape it or interfere with its availability or security;
10. use Nova to download, install or distribute anything other than the official Nexus releases it is designed to install, or to attempt to point it at servers or release sources that the Operator has not authorized, in order to deliver software to other people's computers; or
11. use Nova to violate applicable law or the rights of others.

Nothing in this section prohibits conduct that applicable law expressly permits and that cannot lawfully be restricted by contract.

## 5. Source Code and Readable Files

Nova is distributed as JavaScript files that you can open and read. That is a feature of how npm packages work, and it is also how you can inspect what Nova does before running it, which we encourage.

Being able to read Nova's files does not grant you any additional license. The Nova source code remains proprietary to the Operator, except for third-party components covered by Section 7.

If you have a good-faith security concern about Nova, please report it privately to [support@nexusworkspace.net](mailto:support@nexusworkspace.net) rather than publishing details, so it can be fixed before it affects other people.

## 6. Ownership and Branding

Nova, including its code, command design, text, documentation and branding, is owned by the Operator and protected by applicable intellectual-property laws. The names **Nexus** and **Nova**, and associated logos and product names, may be trademarks or protected identifiers of the Operator.

You may refer to Nova by name to truthfully describe it, for example in a tutorial or a setup guide. You may not use the names or branding in a way that suggests endorsement, sponsorship, affiliation or ownership, or that could confuse people about who made a tool.

You retain all rights you have in Your Content. Nothing in this License transfers ownership of Your Content to the Operator.

## 7. Third-Party Components

Nova depends on third-party open-source packages, currently including Commander and open, which are distributed under their own licenses. Nova also runs on Node.js and uses features of Windows, PowerShell, and the Nexus release and cloud services.

Those components remain subject to their own licenses and terms, which govern them to the extent required by their terms. Nothing in this License limits rights granted to you under an applicable open-source license. Notices and license information for these components are available from their respective packages.

## 8. Installers, Updates and the Nexus Cloud Service

Nova helps you download and run the Nexus installer. The Nexus application you install is licensed to you under the [Software License](https://nexusworkspace.net/software-license).

Nova may contact GitHub to find and download Nexus releases and the Nexus Cloud Service to sign you in and read account information, usage and service health. Those services have their own terms, and ordinary network information such as your IP address is visible to them when your computer connects. See the [Privacy Policy](https://nexusworkspace.net/privacy-policy) for details.

Nova checks the integrity of the installers it downloads when a checksum is published for them, but it cannot guarantee that any download is free from defects. Windows may also show its own security prompts when you run an installer.

## 9. Updates and Availability

The Operator may release new versions of Nova, change or remove commands and options, or stop distributing Nova at any time. Unless a new version is accompanied by different terms, this License applies to it. The Operator is not obligated to provide support, updates or any particular feature, except where applicable law requires it.

## 10. Term and Termination

This License begins when you first install or run Nova and continues until terminated. You may end it at any time by uninstalling Nova (for example with `npm uninstall -g @getnexus/nova`).

The Operator may terminate this License if you materially breach it as described in Section 11 of the Software License, including the notice and opportunity to remedy that it provides where reasonably practicable and legally permitted. A material breach of this License is treated as a material breach of the Software License.

On termination you must stop using Nova and delete the copies in your possession, except where retention is required by law. Uninstalling or losing the right to use Nova does not delete Your Content stored in Nexus on your device.

## 11. Disclaimer of Warranties

**TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, NOVA IS PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY OR OTHERWISE.**

To the maximum extent permitted by law, the Operator disclaims implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and does not warrant that Nova will be uninterrupted, error-free, secure, compatible with every system, or free from defects.

Nova can run installers, change your installed software and write sign-in information to your computer's credential storage. You are responsible for deciding whether to run it, for reviewing what a command does before using it in automation, and for keeping backups of anything important. **You use Nova at your own risk.**

Nothing in this License excludes or limits any warranty, right or remedy that cannot lawfully be excluded or limited.

## 12. Limitation of Liability

**TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE OPERATOR WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY OR PUNITIVE DAMAGES, OR FOR LOSS OF PROFITS, REVENUE, BUSINESS OPPORTUNITIES, GOODWILL OR DATA, ARISING OUT OF OR RELATING TO NOVA OR THIS LICENSE.**

To the maximum extent permitted by law, the Operator's total aggregate liability for all claims arising out of or relating to Nova or this License will not exceed the greater of the amount you actually paid to the Operator for the relevant Nexus service in the twelve months before the event giving rise to the claim, or **USD $100**. This limit applies in the aggregate across this License, the Software License and the Nexus Terms of Service, and is not cumulative across them.

Nothing in this License limits liability that cannot legally be limited or excluded, including liability for fraud or intentional misconduct.

## 13. Indemnification

To the extent permitted by applicable law, you agree to indemnify and hold harmless the Operator from third-party claims, liabilities, damages and reasonable expenses arising directly from your unlawful use of Nova, your material breach of this License, or your violation of applicable law. This does not apply to the extent a claim results from the Operator's own unlawful conduct, fraud or intentional misconduct.

## 14. Governing Law and Disputes

Except to the extent mandatory law provides otherwise, this License is governed by the laws of the **Kingdom of Morocco**, without regard to conflict-of-law principles. Subject to mandatory consumer protections and other rights that cannot be waived, disputes arising from or relating to this License will be submitted to the competent courts of the Kingdom of Morocco. Nothing in this section limits any mandatory right or remedy available to you under the laws that apply to you.

## 15. Export and Sanctions Compliance

You agree to use Nova in compliance with applicable export-control, sanctions and trade laws.

## 16. Changes to This License

The Operator may update this License from time to time. The updated version will show its updated date, and, where the law requires, we will give reasonable notice of material changes. Where legally permitted, continued use of Nova after an update takes effect means you accept the updated License. If you do not agree, stop using Nova.

## 17. General

If any part of this License is found invalid or unenforceable, it will be enforced to the maximum extent permitted and the rest will remain in effect. Failing to enforce a provision is not a waiver of it. You may not assign this License without the Operator's written consent, except where that restriction is prohibited by law. The Operator may assign it in connection with a transfer of Nexus or Nova, or the creation of a successor legal entity. This License, together with the Software License, and the Privacy Policy, is the whole agreement between you and the Operator about Nova.

## 18. Contact

Questions regarding this License may be directed to:

**Nawrasse Andaloussi Dahman**\
Operator of Nexus\
Morocco

**Email:** [support@nexusworkspace.net](mailto:support@nexusworkspace.net)

---

**Copyright © 2026 Nawrasse Andaloussi Dahman. All Rights Reserved.**

**NOVA SOFTWARE LICENSE**

Copyright (c) 2026 Nawrasse Andaloussi Dahman. All Rights Reserved.

**Last updated:** October 13, 2026

This Nova Software License ("License") governs the license granted to you for
Nova, the official command-line companion for the Nexus application
("Nova"). Nova is created and developed by Nawrasse Andaloussi Dahman, an
independent developer based in Morocco.

Nova is a proprietary command-line tool that helps you install and update
Nexus, sign in to your Nexus account, view your Nexus Cloud AI usage, and
check the status of Nexus services. This License applies to the proprietary
portions of Nova, including version 1.0.0 and later, unless a later version is
accompanied by different license terms.

NOVA IS NOT OPEN-SOURCE SOFTWARE. Except for third-party components
distributed under their own licenses, no right to copy, modify, distribute,
publish, sublicense, or create derivative works from Nova is granted except as
expressly provided by this License, the Nexus End User License Agreement
("EULA"), applicable third-party licenses, or a separate written agreement
signed by Nawrasse Andaloussi Dahman.


1. RELATIONSHIP TO THE NEXUS EULA AND THE NEXUS SOFTWARE LICENSE

Nova is part of the Nexus software ecosystem. Your use of Nova is governed by
this License and by the [Nexus End User License Agreement](https://nexusworkspace.net/eula),
which forms part of the legal terms governing Nova.
Nova is treated as part of the "Software" for purposes of the
EULA, and your use of Nexus Cloud Service features through Nova is governed by
the EULA and the Nexus Privacy Policy.

Capitalized terms used but not defined in this License, including "Software"
and "Nexus Cloud Service," have the meanings given to them in the EULA.

This License is intended to be consistent with the Nexus Software License that
applies to the Nexus desktop application. If this License and the EULA
conflict, including concerning the scope of the license granted, the permitted
use of the Software or the Nexus Cloud Service, or termination, the EULA
controls to the extent of that conflict.


2. PROPRIETARY SOFTWARE

Nova and its proprietary components are protected by applicable copyright,
trademark, and other intellectual-property laws. Proprietary components
include, where applicable:

  - source code and compiled or packaged distributions;
  - software architecture and implementation;
  - command names, command-line interface design, and output formats;
  - documentation and written materials;
  - the names "Nova" and "Nexus," logos, and branding; and
  - other original materials created for or incorporated into Nova.

Except for third-party materials governed by their own licenses, these
components are owned by or licensed to Nawrasse Andaloussi Dahman.


3. LICENSE GRANT

Subject to your compliance with this License and the EULA, Nawrasse Andaloussi
Dahman grants you a limited, non-exclusive, non-transferable,
non-sublicensable, revocable license to install and run Nova on devices that
you own or are authorized to control, solely to install, update, and interact
with Nexus and the Nexus Cloud Service as intended.

The license permits use of Nova for your personal purposes and for your own
internal business purposes, subject to the restrictions in this License and
the EULA. You may make reasonable backup copies of Nova for archival purposes.

This License grants a right to use Nova only. It does not transfer ownership
of Nova or any intellectual-property rights to you. No implied license is
granted. All rights not expressly granted are reserved.


4. RESTRICTIONS

Unless expressly permitted by this License, the EULA, applicable third-party
licenses, or mandatory applicable law, you may not:

  (a) copy, reproduce, or redistribute proprietary portions of Nova;
  (b) publish, mirror, publicly host, or otherwise make proprietary portions
      of Nova available to third parties;
  (c) sell, rent, lease, sublicense, assign, or transfer Nova or the rights
      granted under this License;
  (d) modify, adapt, translate, or create derivative works from proprietary
      portions of Nova;
  (e) reverse engineer, decompile, disassemble, or attempt to derive source
      code from Nova, except to the extent such activity cannot legally be
      restricted;
  (f) remove, obscure, or alter copyright, trademark, licensing, attribution,
      or proprietary notices;
  (g) use Nova or its proprietary components to create or provide a competing
      product or service in violation of the EULA or another applicable
      agreement;
  (h) circumvent or interfere with technical, security, licensing,
      authentication, access-control, rate-limit, or usage-restriction
      mechanisms of Nova, Nexus, or the Nexus Cloud Service;
  (i) use Nova to facilitate unauthorized access to the Nexus Cloud Service,
      including by sharing, extracting, or reusing session tokens, API keys,
      or other credentials stored or issued by Nova outside authorized Nexus
      functionality;
  (j) use Nova to distribute modified, unofficial, or malicious installers
      as though they were official Nexus software; or
  (k) use Nova in a manner prohibited by the EULA or applicable law.

Nothing in this License prohibits conduct that applicable law expressly
permits and that cannot lawfully be restricted by agreement.


5. SOURCE CODE

The Nova source code is proprietary and confidential intellectual property,
except for portions that consist of or incorporate third-party components
subject to separate licensing terms.

No right to access, inspect, copy, modify, publish, distribute, reproduce, or
create derivative works from proprietary Nova source code is granted under
this License. Because Nova may be distributed as readable script files,
the ability to read those files does not by itself grant any license or
ownership rights beyond those expressly stated in this License.


6. THIRD-PARTY SOFTWARE

Nova depends upon third-party software that is distributed under licenses
separate from this License, including the "commander" and "open" packages and
their dependencies, which are made available under their own open-source
licenses. Those components remain subject to their respective licenses, and
nothing in this License restricts rights granted to you under them. Applicable
license information is available in each package's distribution.


7. NEXUS CLOUD SERVICE, CREDENTIALS, AND INSTALLERS

Nova may connect to the Nexus Cloud Service, which is operated by the same
developer but is a separate service governed by the EULA and the Nexus Privacy
Policy. This License does not grant you any ownership or independent license
to the infrastructure, server-side software, credentials, APIs, or other
proprietary systems used to operate the Nexus Cloud Service.

When you sign in using Nova, a session token is stored on your device in
Nova's configuration directory. You are responsible for keeping that token
confidential and for activity that occurs using it. You can revoke it at any
time by signing out.

Nova downloads Nexus installers from the official Nexus release channel. The
Nexus application you install is governed by the Nexus Software License and
the EULA.


8. USER CONTENT

This License does not claim ownership of content you create or store using
Nexus. Nova does not transfer ownership of your content to Nawrasse
Andaloussi Dahman. Your rights in your content are governed by the EULA and
the Nexus Privacy Policy.


9. TRADEMARKS AND BRANDING

The names Nova and Nexus, associated logos, product names, branding, and other
identifying marks may constitute trademarks or protected identifiers of
Nawrasse Andaloussi Dahman or their respective owners. This License does not
grant you permission to use them in a manner that suggests endorsement,
sponsorship, affiliation, authorization, or ownership without prior written
permission. Third-party names, trademarks, and logos remain the property of
their respective owners.


10. NO TRANSFER OF OWNERSHIP

Your possession or authorized use of Nova does not give you ownership of Nova
or any proprietary intellectual property contained in it. Except for the
limited rights expressly granted, all rights, title, and interest in the
proprietary portions of Nova remain with Nawrasse Andaloussi Dahman or the
applicable rights holder.


11. UPDATES AND NEW VERSIONS

Nova may receive updates, patches, or new versions. Unless an update is
accompanied by separate license terms, this License applies to the proprietary
portions of the updated Nova. Nothing in this License requires Nawrasse
Andaloussi Dahman to provide updates, maintain a particular version or
feature, or continue distributing Nova, except as required by applicable law
or expressly agreed otherwise.


12. TERM AND TERMINATION

The license granted under this License continues until it is terminated in
accordance with Section 11 of the EULA, including the notice and opportunity
to remedy that Section provides where reasonably practicable and legally
permitted. A material breach of this License is treated as a material breach
of the EULA for purposes of that Section.

Upon termination of your license, you must cease using the proprietary
portions of Nova and, to the extent reasonably practicable, delete copies of
Nova in your possession, except where retention is required by law or
reasonably necessary for legitimate archival, backup, or record-keeping
purposes. Termination does not transfer ownership of your content or require
the deletion of local content except as otherwise provided by applicable law
or the EULA.


13. DISCLAIMERS AND LIMITATION OF LIABILITY

The disclaimers of warranty, limitations of liability, indemnification
provisions, and dispute provisions in the EULA apply to Nova. Nothing in this
License limits any mandatory right or protection that cannot legally be
excluded or restricted under applicable law.


14. RESERVATION OF RIGHTS

All rights not expressly granted under this License are reserved by Nawrasse
Andaloussi Dahman or the applicable third-party rights holder. No license,
right, title, or permission is granted by implication, estoppel, exhaustion,
or otherwise except to the extent expressly provided by applicable law.


15. CONTACT

Questions regarding this License may be directed to:

  Nawrasse Andaloussi Dahman
  Operator of Nexus
  Morocco
  Email: support@nexusworkspace.net


Copyright (c) 2026 Nawrasse Andaloussi Dahman. All Rights Reserved.
