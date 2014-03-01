-- drop tables

DROP TABLE user_config;
DROP TABLE txlog;
REVOKE ALL ON SCHEMA public FROM postgres;
drop role postgres;

