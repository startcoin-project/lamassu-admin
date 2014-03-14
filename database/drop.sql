-- drop tables

DROP TABLE user_config;
DROP TABLE txlog;
DROP TABLE devices;
REVOKE ALL ON SCHEMA public FROM postgres;
drop role postgres;

