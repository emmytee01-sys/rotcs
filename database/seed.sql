-- ROTCS Initial Seed Data (MySQL)
-- Populating Lagos, Ondo, and Taraba states with users and operators

USE rotcs_db;

-- 1. Insert Initial States
INSERT INTO states (name, code, slug, logo_url) VALUES 
('Lagos State', 'LA', 'lagos', 'https://placeholder.logo/lagos.png'),
('Ondo State', 'ON', 'ondo', 'https://placeholder.logo/ondo.png'),
('Taraba State', 'TR', 'taraba', 'https://placeholder.logo/taraba.png');

-- 2. Insert Initial Users
-- Roles: 'global_admin', 'state_admin', 'auditor', 'operator_admin'
-- Password hashes are placeholders (to be hashed by the auth service)
INSERT INTO users (state_id, username, email, password_hash, role) VALUES 
(NULL, 'global_consultant', 'admin@rotcs.consultant.com', 'hashed_pass_123', 'global_admin'),
(1, 'lagos_admin', 'admin@lagos.gov.ng', 'hashed_pass_123', 'state_admin'),
(2, 'ondo_admin', 'admin@ondo.gov.ng', 'hashed_pass_123', 'state_admin'),
(3, 'taraba_admin', 'admin@taraba.gov.ng', 'hashed_pass_123', 'state_admin');

-- 3. Insert Operators (Licensed per state)
-- Lagos Operators
INSERT INTO operators (state_id, name, license_number, api_endpoint, status) VALUES 
(1, 'Bet9ja Lagos', 'LGS-10021', 'https://api.bet9ja.com/v1/lagos-reg', 'active'),
(1, 'SportyBet Lagos', 'LGS-10022', 'https://api.sportybet.com/v1/reg-data', 'active');

-- Ondo Operators
INSERT INTO operators (state_id, name, license_number, api_endpoint, status) VALUES 
(2, 'Bet9ja Ondo', 'OND-20054', 'https://api.bet9ja.com/v1/ondo-reg', 'active'),
(2, 'KingBet Ondo', 'OND-20055', 'https://api.kingbet.com/v1/reg-data', 'active');

-- Taraba Operators
INSERT INTO operators (state_id, name, license_number, api_endpoint, status) VALUES 
(3, 'Bet9ja Taraba', 'TRB-80011', 'https://api.bet9ja.com/v1/taraba-reg', 'active'),
(3, 'GreenLotto Taraba', 'TRB-80012', 'https://api.greenlotto.com/v1/reg-data', 'active');

-- 4. Initial Tax Rules (GGR tax + optional withholding on player winnings)
INSERT INTO tax_rules (state_id, tax_rate, withholding_tax_rate, deductibles_allowed, effective_from) VALUES 
(1, 15.00, 0.00, FALSE, '2024-01-01'),
(2, 12.50, 0.00, TRUE, '2024-01-01'), -- Ondo
(3, 10.00, 5.00, FALSE, '2024-01-01'); -- Taraba: 5% withholding on winning tickets

-- 5. LGAs for Ondo State (state_id = 2)
INSERT INTO lgas (state_id, name, code) VALUES 
(2, 'Akure South', 'akure-south'),
(2, 'Ondo West', 'ondo-west'),
(2, 'Owo', 'owo'),
(2, 'Akure North', 'akure-north'),
(2, 'Idanre', 'idanre');

-- 6. LGAs for Taraba State (state_id = 3)
INSERT INTO lgas (state_id, name, code) VALUES 
(3, 'Jalingo', 'jalingo'),
(3, 'Wukari', 'wukari'),
(3, 'Sardauna', 'sardauna'),
(3, 'Takum', 'takum'),
(3, 'Zing', 'zing');

-- 7. LGA Daily Metrics - Ondo (report_date: 2026-03-09). IDs: Lagos 1-6 not used here; Ondo lgas 1-5, Taraba lgas 6-10
-- Ondo: lga id 1=Akure South, 2=Ondo West, 3=Owo, 4=Akure North, 5=Idanre
INSERT INTO lga_daily_metrics (lga_id, total_wager, total_payout, active_users, report_date) VALUES 
(1, 1620000.00, 1134000.00, 1850, '2026-03-09'),
(2, 1240000.00, 868000.00, 1420, '2026-03-09'),
(3, 980000.00, 686000.00, 1180, '2026-03-09'),
(4, 780000.00, 546000.00, 920, '2026-03-09'),
(5, 600000.00, 420000.00, 650, '2026-03-09');

-- Taraba: lga id 6=Jalingo, 7=Wukari, 8=Sardauna, 9=Takum, 10=Zing
INSERT INTO lga_daily_metrics (lga_id, total_wager, total_payout, active_users, report_date) VALUES 
(6, 1380000.00, 966000.00, 1580, '2026-03-09'),
(7, 960000.00, 672000.00, 1120, '2026-03-09'),
(8, 720000.00, 504000.00, 840, '2026-03-09'),
(9, 520000.00, 364000.00, 620, '2026-03-09'),
(10, 340000.00, 238000.00, 410, '2026-03-09');

-- 8. Mock Daily Metrics (For Dashboard Testing)
INSERT INTO daily_metrics (state_id, operator_id, total_wager, total_payout, tax_due, active_users, report_date) VALUES 
(1, 1, 12500000.00, 8500000.00, 600000.00, 15400, '2026-03-09'),
(1, 2, 8400000.00, 5200000.00, 480000.00, 9200, '2026-03-09'),
(2, 3, 4200000.00, 2100000.00, 315000.00, 4500, '2026-03-09'),
(3, 5, 1200000.00, 600000.00, 120000.00, 1200, '2026-03-09');
