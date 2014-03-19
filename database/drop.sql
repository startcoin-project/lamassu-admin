-- drop tables

DROP TABLE user_config;
DROP TABLE txlog;
DROP TABLE devices;
DROP TABLE pairing_tokens;
DROP TABLE users;
REVOKE ALL ON SCHEMA public FROM postgres;
drop role postgres;

