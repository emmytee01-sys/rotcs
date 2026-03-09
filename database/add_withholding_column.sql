-- Add withholding_tax_rate to tax_rules (run once)
USE rotcs_db;

ALTER TABLE tax_rules
  ADD COLUMN withholding_tax_rate DECIMAL(5, 2) NOT NULL DEFAULT 0.00 AFTER tax_rate;

UPDATE tax_rules SET withholding_tax_rate = 5.00 WHERE state_id = 3;
