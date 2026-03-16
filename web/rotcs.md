Regulatory Oversight & Tax Calculation
System (ROTCS)
Architecture & Implementation Guide
1. Executive Summary
The Regulatory Oversight & Tax Calculation System (ROTCS) is a unified
platform designed to provide state governments with real-time visibility into the
operations of licensed gaming companies.
Currently, many jurisdictions rely on self-reported aggregate data from operators to
determine tax liabilities. This creates a risk of revenue leakage and compliance
blind spots. ROTCS shifts this paradigm by directly connecting to operator
endpoints, ingesting raw transaction data, and independently calculating Gross
Gaming Revenue (GGR) and tax obligations.
Primary Objectives:
1. Revenue Assurance: accurately calculate taxes due based on verifiable raw
data.
2. Operational Visibility: Monitor operator health, uptime, and game
performance (RTP).
3. Compliance: Ensure operators adhere to data reporting standards and
statutory payout limits.
4. Territorial Intelligence: Map user density and economic activity across
specific jurisdictions (States/LGAs).
2. High-Level Architecture
The system is architected as a secure data pipeline that "pulls" information from
external sources, processes it through a logic engine, and presents it via a secure
web dashboard.
2.1 Architectural Diagram Description
●
Source Layer: External Gaming Operator APIs (The "Endpoints").
●
Ingestion Layer: The ROTCS Connector Service (Poller/Fetcher).
●
Processing Layer: Validation, Normalization (ETL), Geospatial
Aggregation, and Anomaly Detection.
●
Storage Layer: * Hot Tier: TimescaleDB for active reporting.
○
Cold Tier: S3/Glacier for 7-year audit retention.
●
Application Layer: API Gateway, Tax Engine, and Payment Service.
●
Presentation Layer:
○
Govt Admin Dashboard: Executive oversight & Revenue tracking
(Single State Context).
○
Consultant Dashboard: Multi-tenant Audit & Technical Oversight
(Multi-State Context).
○
Operator Portal: Client view for billing and compliance.
3. Data Ingestion & Integration Strategy
We operate on a "Pull" model where the Regulator's system actively fetches data
from endpoints provided by the Gaming Companies.
3.1 The Connector Service
We will deploy a microservice specifically for managing external connections.
●
Endpoint Registry: A configuration database storing the base URLs, auth
tokens, and specific API signatures for every licensed operator.
●
Polling Logic: * Transactions: Fetched in micro-batches (e.g., every 5
minutes) to ensure near real-time fidelity without overloading operator
servers.
○
Summaries: Daily reconciliation reports fetched at 00:01 AM local
time.
●
Circuit Breakers: If an operator's endpoint fails or times out, the system will
retry with exponential backoff. Critical failures trigger an automated alert to
the Compliance Officer.
3.2 Standardization: The Unified Regulatory Data Model (URDM)
Incoming data will vary by operator. The Ingestion Layer must map these into our
URDM.
Example Mapping:
Data Point Operator A
(JSON)
Operator B (XML) ROTCS (URDM)
Bet Amount wager
_
val <stake> transaction.wager
_
mount
a
Win Amount payout <win> transaction.payout
_
mount
a
Game ID game
_
ref <gid> game.id
Timestamp ts
utc _
<datetime> transaction.timestam
p
Territory/LGA region
_
code <loc
_
id> player.territory_
cod
e
4. The Tax Calculation Engine
The engine is the "Brain" of the financial module. It allows for the independent
verification of taxes due.
4.1 Core Calculation Logic (GGR)
For every reporting period (Daily/Monthly), the system runs the following logic
per Operator:
1. Aggregate Wagers: Sum of transaction.wager
_
amount for the period.
2. Aggregate Payouts: Sum of transaction.payout
_
amount for the period.
3. Calculate GGR: GGR = Total Wagers - Total Payouts.
4.2 State Tax Rules Configuration
The engine supports a configurable "Ruleset" to accommodate changing laws
without code rewrites.
●
●
Variable: Tax
_
Rate (e.g., 15%).
Variable: Deductibles
_
Allowed (Boolean).
Logic:
if Deductibles
Allowed:
_
Taxable
_
Base = GGR - (Free
_
Play_
Credits + Uncollectible
_
Debt)
else:
Taxable
Base = GGR
_
Total
Tax
Due = Taxable
Base * Tax
Rate
_
_
_
_
4.3 Automated Reconciliation
The system compares its Calculated GGR against the Reported GGR (submitted
by the operator via a separate summary endpoint).
●
Green: Variance < 0.05%.
●
Amber: Variance between 0.05% and 0.5% (Requires manual review).
●
Red: Variance > 0.5% (Triggers Audit Flag).
5. User Interfaces
The system is split into three distinct dashboards to ensure separation of duties
between high-level governance, technical auditing, and operator compliance.
5.1 The Government Admin Dashboard (Executive View)
Focus: Revenue Collection, High-Level Compliance, Policy Enforcement
Target Audience: State Commissioners, Directors of Finance, Senior Regulators.
●
The Revenue Command Center:
○
Tax Revenue Gauge: A visual progress bar showing "Tax Collected
MTD" vs "Projected Revenue"
.
○
Collections Feed: Real-time stream of invoices paid by operators (e.g.,
"Bet9ja paid ₦50M - 10:05 AM").
●
Territorial User Base (Geospatial Intelligence):
○
Active Player Heatmap: An interactive map showing user density per
Territory/LGA.
○
Regional Leaderboard: A breakdown of "Active Users" and "GGR" by
region (e.g., Lagos Island: 50k Users | ₦200M GGR).
○
Market Penetration: Percentage of adult population actively gaming in
each territory.
●
Market Overview:
○
Total Market Volume: Aggregate GGR across all operators.
○
Operator Status Grid: Simple traffic light system (Green/Red)
indicating which operators are compliant with tax payments and which
are in default.
5.2 The Consultant Dashboard (Multi-Jurisdiction Technical & Audit View)
Focus: Multi-State Management, Benchmarking, Cross-Border Audit
Target Audience: Technical Consultants managing multiple State portfolios.
●
The Multi-State Command Hub (Global View):
○
Jurisdiction Switcher: A global selector allowing the consultant to
toggle the entire dashboard context between managed entities (e.g.,
Lagos State ↔ Ogun State ↔ Rivers State).
○
Portfolio Health Matrix: A high-level grid showing the status of all
managed states simultaneously.
■ Example: "Lagos: Healthy"
,
"Oyo: Critical API Failures"
,
"Kano:
98% Collection Rate"
.
○
Comparative Analytics: Benchmarking tools to compare Operator
performance across borders.
■ Example: "Compare Bet9ja GGR Yield: Lagos vs. Ogun"
.
●
State-Specific Deep Dive (Contextual View):
○
Once a state is selected, the dashboard filters all data to that specific
jurisdiction:
○
Data Reconciliation Hub: Variance reports specific to the selected
state's tax laws.
○
Ingestion Logs: Monitoring API endpoints relevant to that state's
licensees.
○
Forensic Tools (Context-Aware):
■ Geospatial Penetration: Analysis of betting patterns within the
selected state's boundaries (LGAs).
■ RTP Analyzer: Deep-dive into specific game IDs to detect
anomalies.
■ Transaction Explorer: Query raw logs for specific bet IDs.
●
System Health: Global monitoring of the "Heartbeat" of all API connections
across all jurisdictions.
5.3 The Operator Portal (Client View)
Focus: Liability, Payment, Compliance Status
This is a restricted-access portal where operators (e.g., Bet9ja, SportyBet) log in to
manage their statutory obligations.
A. The Operator Home
●
Tax Liability Counter: A real-time view of "Estimated Tax Due" for the
current period based on ingested data.
●
Compliance Scorecard: A unified status indicator.
B. Invoicing & Reconciliation
●
Billing History: A ledger of all past tax periods.
●
Dispute Mechanism: "Raise a Dispute" function for GGR discrepancies.
C. The Payment Workflow
The portal integrates directly with state-approved Payment Gateways (e.g., pay4it).
1. Generate Invoice:
○
Operator clicks "Finalize & Pay" for the period.
○
System generates a payment invoice linked to Revenue Code:
07081999 (Gaming Tax Liability).
○
A unique Payment Reference Number (PRN) is created.
2. Select Payment Method:
○
Web Pay: Pay immediately via card/token.
○
Branch Pay: Print PDF invoice with Revenue Code 07081999 and PRN
to pay at any bank branch.
3. Automated Receipting:
○
Upon payment confirmation, status updates to PAID.
○
Digital Tax Clearance Certificate is generated.
6. Security, Compliance, & Audit
6.1 Data Integrity (Chain of Custody)
●
WORM Storage: Raw transaction logs are stored in "Write Once, Read
Many" buckets to prevent tampering. Even DB admins cannot alter historical
transaction data.
●
Hashing: Each batch of ingested data is hashed. Any modification to the data
post-ingestion would break the hash signature, alerting the system to data
corruption or tampering.
6.2 Data Privacy
●
PII Redaction: Player names and addresses are not stored in the primary
analytics database. We store a unique Player
_
Hash.
●
Territorial Aggregation: While we track territory_
code, individual player
coordinates are fuzzified to the nearest LGA center point to protect privacy
while enabling density mapping.
●
Decryption Keys: Access to PII is separated and requires "Two-Person Rule"
authentication.