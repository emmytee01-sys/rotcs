-- Run this only if you already have rotcs_db and ran schema/seed before withholding was added.
-- For a fresh install, just run schema.sql and seed.sql.
USE rotcs_db;

-- Add withholding tax rate (omit if you get "Duplicate column" — column already exists)
ALTER TABLE tax_rules ADD COLUMN withholding_tax_rate DECIMAL(5, 2) NOT NULL DEFAULT 0.00 AFTER tax_rate;
UPDATE tax_rules SET withholding_tax_rate = 5.00 WHERE state_id = 3;

-- Then run the new tables and INSERTs from schema.sql (lgas, lga_daily_metrics) and seed.sql (lgas + lga_daily_metrics inserts).
