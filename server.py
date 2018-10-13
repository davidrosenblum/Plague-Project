from flask import Flask, make_response, send_from_directory, request
import os
import json
from plague import PlagueParams, PlagueSimulation


# main method - server setup
def main():
    # flask server
    app = Flask(__name__, static_url_path="/static", static_folder="./web/build/static")

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
            pf = float(request.args.get("fatality"))
            ip = int(request.args.get("initial_population"))
            im = float(request.args.get("immune"))
            inf = int(request.args.get("initial_infected"))
            ml = int(request.args.get("model_length"))
        except ValueError:
            response = make_response("Bad request - query strings value error.")
            setup_headers(response)
            return response, 400
        except TypeError:
            response = make_response("Bad request - query strings type error.")
            setup_headers(response)
            return response, 400

        # construct parameters
        params = PlagueParams(
            infection_length=il,
            virility=v,
            percent_fatal=pf,
            init_pop=ip,
            immune_percent=im,
            init_infected=inf,
            model_length=ml
        )

        # run simulation
        sim = PlagueSimulation(params)
        sim.run()

        # results json
        results = json.dumps(sim.get_data())

        # create response
        response = make_response(results)
        setup_headers(response)

        # respond
        return response

    # api endpoint for test response (no simulation, fake results)
    @app.route("/test", methods=["GET", "OPTIONS"])
    def test():
        params = PlagueParams(5, 0.6, 0.1, 10000, 0.5, 300, 60)
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
