Run the server (9999 can be any number, 8080 is default if PORT= is missing)
```PORT=9999 python server.py```

Access web client (placeholder html)
```HTTP GET localhost:9999```

Simulation API
```HTTP GET localhost:9999/plague/<inf_len>/<vir>/<per_fatl>/<init_pop>/<imm_per>/<init_inf>/<mod_len>```

Example
```http://localhost:9999/plague/2/1/0/100000/0/1/100```