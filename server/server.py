from flask import Flask, make_response, send_from_directory, request
import os
import json
from plague import PlagueParams, PlagueSimulation


# main method - server setup
def main():
    # flask server
    app = Flask(__name__, static_url_path="/static", static_folder="../web/build/static")

    # endpoint for web app
    @app.route("/", methods=["GET", "OPTIONS"])
    def root():
        # send react app
        return send_from_directory(directory="./web/build", filename="index.html")

    # api endpoint for plague simulation (query strings)
    @app.route("/plague", methods=["GET", "OPTIONS"])
    def plague():
        # attempt query string parse
        try:
            il = int(request.args.get("infection_length"))
            v = float(request.args.get("virility"))
            fp = float(request.args.get("fatal_percent"))
            imp = float(request.args.get("immune_percent"))
            ip = int(request.args.get("initial_population"))
            ii = int(request.args.get("initial_infected"))

            csv_format = str(request.args.get("csv")).lower() == "true"

        except ValueError:
            response = make_response("Bad request - value error.")
            setup_headers(response)
            return response, 400

        except TypeError:
            response = make_response("Bad request - bad query strings values.")
            setup_headers(response)
            return response, 400

        # construct parameters
        params = PlagueParams(
            infection_length=il,
            virility=v,
            fatal_percent=fp,
            initial_population=ip,
            immune_percent=imp,
            initial_infected=ii,
        )

        # run simulation
        sim = PlagueSimulation(params)
        sim.run()

        # results json
        results = json.dumps(sim.get_data()) if not csv_format else sim.get_data_csv()

        # create response
        response = make_response(results)
        setup_headers(response)

        # respond
        return response

    # api endpoint for test response (no simulation, fake results)
    @app.route("/test", methods=["GET", "OPTIONS"])
    def test():
        params = PlagueParams(
            infection_length=100,
            virility=1,
            fatal_percent=0,
            initial_population=100000,
            immune_percent=0,
            initial_infected=1,
        )

        data = json.dumps(PlagueSimulation(params).run().get_data())

        response = make_response(data)
        setup_headers(response)

        return response

    # extract config variables
    port = os.environ["PORT"] if "PORT" in os.environ else 8080
    debug = True if "DEBUG" in os.environ else False

    # start the server
    app.run(port=port, debug=debug)


# applies standard headers, required for CORS
def setup_headers(resp):
    resp.headers["Access-Control-Allow-Origin"] = "*"
    resp.headers["Access-Control-Allow-Headers"] = "Access-Control-Allow-Origin"


# run main method
if __name__ == "__main__":
    main()
