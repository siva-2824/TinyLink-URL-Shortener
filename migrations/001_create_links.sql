CREATE TABLE IF NOT EXISTS links (
  code varchar(8) PRIMARY KEY,
  url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  last_clicked timestamptz,
  clicks bigint DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_url ON links (url);