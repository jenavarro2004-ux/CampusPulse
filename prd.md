# Product Requirement Document (PRD) — CampusPulse

**System Title:** CampusPulse: Student Organization Engagement and Activity Monitoring System  
**Target Institution:** Central Philippines State University (CPSU)  
**Architecture Tech Stack:** Laravel 13, React 19, Inertia.js, TypeScript, PostgreSQL  

---

## 1. System Objectives

### General Objective

To design, develop, and implement **CampusPulse**, a web-based management system that centralizes student organization activities, automates compliance workflows, and monitors student engagement to foster an active, organized, and collaborative campus community.

### Specific Objectives

1. **System Automation & Centralization:**
   * Centralized directory for all recognized student organizations (replacing paper-based records with secure digital profiles).
   * Digitalize event proposal and approval workflows (enabling online submissions and real-time status tracking).
   * Online membership registration module allowing students to join organizations and officers to manage rosters.
2. **Activity Monitoring & Engagement Tracking:**
   * Dynamic QR code scanning system for real-time attendance tracking.
   * Interactive analytics visualizing student participation indices and high-engagement activities.
   * Automatic generation of compliance reports for end-of-semester evaluation and accreditation.
3. **Collaboration & Information Dissemination:**
   * Centralized bulletin board and event calendar for upcoming campus activities, meetings, and deadlines.
   * Automated notification system (email / in-app alerts) informing officers of urgent updates and submission deadlines.
4. **Security & Technical Quality:**
   * Strict Role-Based Access Control (RBAC) across 5 core institutional roles.
   * Full alignment with the ISO/IEC 25010 software quality model (Functional Suitability, Usability, Reliability, Security).

---

## 2. Scope and Limitations

### System Scope

* **Web Portal & Responsive Interface:** Desktop and mobile web access across all user roles.
* **Organization Directory:** Digital profiles, officer registries, club charters, and constitution files.
* **Approval Automation:** Multi-tiered submission, review routing, and real-time proposal tracking.
* **Attendance Tracking:** Dynamic QR code generation for events with live scanning/check-in management.
* **Analytics & Reports:** Student engagement indices, activity metrics, and end-of-semester compliance logs.
* **Communication Hub:** Centralized calendar, bulletin board, and automated alert system.

### System Limitations

* **No Direct Payments:** Financial processing is excluded; manual payment receipt upload and verification are supported.
* **Identity Provisioning:** Strict dependence on official institutional SSO or institutional email domains (`@cpsu.edu.ph`); guest account creation is prohibited.
* **No Offline Sync:** Attendance scanning requires an active internet connection (no local offline synchronization in V1.0).

---

## 3. Role-Based Access Control (RBAC) Matrix

| User Role | Organizational Scope | Core Access Rights | Key System Actions |
| :--- | :--- | :--- | :--- |
| **Campus / School Admin** | System-Wide / IT Leadership | Full System Admin & Audit Read Access | System configuration, user provisioning, global auditing, emergency administrative override/revocation. |
| **OSSA Administrator** | Office of Student Services & Affairs | Final Operational Approver & Accreditation | Event proposal review/approval, club accreditation management, university-wide engagement analytics monitoring. |
| **Student Council Officer** | University Student Government | Review & Endorsement | Proposal draft review, calendar conflict verification, endorsement to OSSA, council event scheduling. |
| **Club President / Officer** | Recognized Student Organization | Create & Execute | Event proposal submission, roster management, attendance QR generation, accomplishment report compiling. |
| **General Student** | Campus Community | Read-Only / Action Access | Organization directory browsing, membership applications, event RSVPs, presenting personal QR passes. |

---

## 4. Proposal Approval Workflow (3-Tier Governance)

```text
[ Club Officer ] ──(Submits)──► [ Student Council ] ──(Endorses)──► [ OSSA ] ──(Final Approval)──► Event Live!
                                       │                               │
                                       ├─► (Requests Revisions)        ├─► (Requests Revisions)
                                       └─► (Rejects)                   └─► (Rejects)
                                                                       │
                                                                       ▼
                                                         [ Campus Admin Dashboard ]
                                                         • Live Read-Only Audit Feed
                                                         • Emergency Revoke Button
