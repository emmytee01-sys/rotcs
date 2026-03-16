-- ROTCS Database Schema (MySQL)
-- Unified Multi-tenant Regulatory Oversight & Tax Calculation System

CREATE DATABASE IF NOT EXISTS rotcs_db;
USE rotcs_db;

-- 1. States table: Stores the jurisdictions
CREATE TABLE IF NOT EXISTS states (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    code VARCHAR(5) NOT NULL UNIQUE, -- e.g., 'LA' for Lagos, 'TR' for Taraba
    slug VARCHAR(50) NOT NULL UNIQUE, -- e.g., 'lagos', 'taraba'
    status ENUM('active', 'inactive') DEFAULT 'active',
    logo_url VARCHAR(255) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Users table: Deterministic access based on state_id
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    state_id INT NULL, -- NULL for 'global_admin' or 'consultant' who can see all states
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('global_admin', 'state_admin', 'auditor', 'operator_admin') NOT NULL,
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (state_id) REFERENCES states(id) ON DELETE SET NULL
);

-- 3. Operators table: Licensed gaming companies per state
CREATE TABLE IF NOT EXISTS operators (
    id INT AUTO_INCREMENT PRIMARY KEY,
    state_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    license_number VARCHAR(50) UNIQUE,
    api_endpoint VARCHAR(255) NULL, -- Source URL for pulling data
    api_key VARCHAR(100) NULL,
    status ENUM('active', 'inactive', 'revoked') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (state_id) REFERENCES states(id) ON DELETE CASCADE
);

-- 4. Tax Rules table: Configurable tax rates per state
CREATE TABLE IF NOT EXISTS tax_rules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    state_id INT NOT NULL,
    tax_rate DECIMAL(5, 2) NOT NULL DEFAULT 15.00, -- e.g., 15% on GGR
    withholding_tax_rate DECIMAL(5, 2) NOT NULL DEFAULT 0.00, -- % withheld on player winnings (winning tickets)
    deductibles_allowed BOOLEAN DEFAULT FALSE,
    effective_from DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (state_id) REFERENCES states(id) ON DELETE CASCADE
);

-- 4b. LGAs (Local Government Areas) per state
CREATE TABLE IF NOT EXISTS lgas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    state_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY (state_id, code),
    FOREIGN KEY (state_id) REFERENCES states(id) ON DELETE CASCADE
);

-- 4c. LGA-level daily metrics (for regional rankings per state)
CREATE TABLE IF NOT EXISTS lga_daily_metrics (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    lga_id INT NOT NULL,
    total_wager DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    total_payout DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    ggr DECIMAL(15, 2) GENERATED ALWAYS AS (total_wager - total_payout) STORED,
    active_users INT NOT NULL DEFAULT 0,
    report_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY (lga_id, report_date),
    FOREIGN KEY (lga_id) REFERENCES lgas(id) ON DELETE CASCADE
);

-- 5. Daily Metrics table: Aggregated transaction summaries for the dashboard
CREATE TABLE IF NOT EXISTS daily_metrics (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    state_id INT NOT NULL,
    operator_id INT NOT NULL,
    total_wager DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    total_payout DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    ggr DECIMAL(15, 2) GENERATED ALWAYS AS (total_wager - total_payout) STORED,
    tax_due DECIMAL(15, 2) NOT NULL DEFAULT 0.00,
    active_users INT NOT NULL DEFAULT 0,
    report_date DATE NOT NULL,
    is_reconciled BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY (state_id, operator_id, report_date),
    FOREIGN KEY (state_id) REFERENCES states(id) ON DELETE CASCADE,
    FOREIGN KEY (operator_id) REFERENCES operators(id) ON DELETE CASCADE
);

-- 6. Invoices table: For billing operators
CREATE TABLE IF NOT EXISTS invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    state_id INT NOT NULL,
    operator_id INT NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    prn VARCHAR(20) NOT NULL UNIQUE, -- Payment Reference Number
    period_month TINYINT NOT NULL,
    period_year INT NOT NULL,
    status ENUM('UNPAID', 'PAID', 'PAST_DUE', 'DISPUTED') DEFAULT 'UNPAID',
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    paid_at TIMESTAMP NULL,
    FOREIGN KEY (state_id) REFERENCES states(id) ON DELETE CASCADE,
    FOREIGN KEY (operator_id) REFERENCES operators(id) ON DELETE CASCADE
);

-- 7. Audit Logs: For tracking all administrative actions
CREATE TABLE IF NOT EXISTS audit_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    action VARCHAR(255) NOT NULL,
    details TEXT NULL,
    state_id INT NULL, -- The state context of the action
    ip_address VARCHAR(45) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
