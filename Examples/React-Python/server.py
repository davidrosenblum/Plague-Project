from flask import Flask, send_from_directory
from plague import PlagueParams, PlagueSimulation
import os
import json


def main():
    app = Flask(__name__)

    @app.route("/", methods=["GET"])
    def root():
        return send_from_directory(directory="./web", filename="index.html")

    @app.route("/plague/<inf_len>/<vir>/<per_fatl>/<init_pop>/<imm_per>/<init_inf>/<mod_len>", methods=["GET"])
    def plague(inf_len, vir, per_fatl, init_pop, imm_per, init_inf, mod_len):
        # build simulation parameters
        params = PlagueParams(
            infection_length=float(inf_len),
            virility=float(vir),
            percent_fatal=float(per_fatl),
            init_pop=float(init_pop),
            immune_percent=float(imm_per),
            init_infected=float(init_inf),
            model_length=int(mod_len)
        )

        # create & run the simulation
        try:
            sim = PlagueSimulation(params)
            sim.run()
        except Exception:
            return "Error"

        # respond with json of the simulation results
        return json.dumps(sim.get_data(), sort_keys=True, indent=4, separators=(",", ":"))

    port = os.environ["PORT"] if "PORT" in os.environ else 8080
    app.run(port=port, debug=True)


if __name__ == "__main__":
    main()