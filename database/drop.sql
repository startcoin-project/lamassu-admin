-- drop tables

DROP TABLE user_config;
DROP TABLE txlog;
DROP TABLE devices;
DROP TABLE pairing_tokens;
REVOKE ALL ON SCHEMA public FROM postgres;
drop role postgres;

