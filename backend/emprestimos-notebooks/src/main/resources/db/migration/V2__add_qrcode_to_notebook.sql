ALTER TABLE notebook ADD COLUMN qr_code UUID NOT NULL DEFAULT gen_random_uuid();
ALTER TABLE notebook ADD CONSTRAINT uk_notebook_qrcode UNIQUE (qr_code);