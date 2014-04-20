INSERT INTO devices VALUES (DEFAULT, '11:42:84:0E:71:6B:14:3F:C5:1C:AB:C3:48:E6:BF:9A:BD:B1:9B:8C', NULL, 't');
DELETE FROM user_config WHERE "type"='exchanges';
COPY user_config (id, type, data) FROM stdin;
1	exchanges	{"exchanges" : {\
    "settings": {\
      "commission": 1.0\
    },\
    "plugins" : {\
      "current": {\
        "ticker": "bitpay",\
        "trade": null,\
        "transfer": "blockchain"\
      },\
      "settings": {\
        "bitpay": {},\
        "bitstamp": {"currency": "USD", "key": "test", "secret": "test", "clientId": "test" },\
        "blockchain" : {\
          "fromAddress" : "1EXr28tvHsPAADSzZF2UaBkqHQB66nKkNh",\
          "password" : "9@jVA*%ZzbHMp!^nbkY@hVsiYP045NYp9bYwqOdq$wdiV%d2m^tBn3uRNaH5%uyJ",\
          "guid" : "9bd12a28-a179-4250-be73-92136891494d"\
        }\
      }\
    }\
  }\
}
\.
