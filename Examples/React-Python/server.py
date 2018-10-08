from flask import Flask, send_from_directory, make_response, request, current_app
from plague import PlagueParams, PlagueSimulation
import os
import json


def main():
    app = Flask(__name__, static_url_path="/static", static_folder="./web/build/static")

    # root endpoint
    @app.route("/", methods=["GET"])
    def root():
        return send_from_directory(directory="./web/build", filename="index.html")

    # endpoint with parameters in URL path
    @app.route("/plague/<inf_len>/<vir>/<per_fatl>/<init_pop>/<imm_per>/<init_inf>/<mod_len>", methods=["GET", "OPTIONS"])
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
        sim = PlagueSimulation(params)
        sim.run()

        # respond with json of the simulation results
        results = json.dumps(sim.get_data(), sort_keys=True, indent=4, separators=(",", ":"))

        response = make_response(results)
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Headers"] = "*"

        return response

    # endpoint with parameters as query strings
    @app.route("/plague", methods=["GET", "OPTIONS"])
    def plague_query_strings():
        print("Hello!")
        # build params from extracted query strings
        params = PlagueParams(
            infection_length=float(request.args.get("infection_length")),
            virility=float(request.args.get("virility")),
            percent_fatal=float(request.args.get("percent_fatal")),
            init_pop=float(request.args.get("initial_population")),
            immune_percent=float(request.args.get("immune_percent")),
            init_infected=float(request.args.get("initial_infected")),
            model_length=int(request.args.get("model_length"))
        )

        # create & run the simulation
        sim = PlagueSimulation(params)
        sim.run()

        # respond with json of the simulation results
        results = json.dumps(sim.get_data(), sort_keys=True, indent=4, separators=(",", ":"))

        response = make_response(results)
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Headers"] = "*"

        return response

    port = os.environ["PORT"] if "PORT" in os.environ else 8080
    app.run(port=port, debug=True)


if __name__ == "__main__":
    main()