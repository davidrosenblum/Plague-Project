from flask import Flask, make_response, send_from_directory, request
import os
import json
from plague import PlagueParams, PlagueSimulation

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
    # special option - csv
    csv_format = str(request.args.get("csv")).lower() == "true"

    # run simulation and store results
    try:
        sim = run_simulation(request.args)
    except TypeError:
        return "Bad request - bad query string values.", 400
    except ValueError:
        return "Bad request - valuer error.", 400
    except Exception:
        return "Bad request", 400

    results = json.dumps(sim.get_data()) if not csv_format else sim.get_data_csv()

    # create response
    response = make_response(results)
    setup_headers(response)

    # respond
    return response


# api endpoint for CSV files
@app.route("/plague/csv", methods=["GET", "OPTIONS"])
def plague_csv():
    # run simulation and store results
    try:
        sim = run_simulation(request.args)
    except TypeError:
        return "Bad request - bad query string values.", 400
    except ValueError:
        return "Bad request - valuer error.", 400
    except Exception:
        return "Bad request", 400

    csv_data = sim.get_data_csv()

    # create response
    response = make_response(csv_data)
    setup_headers(response)
    response.headers["Content-Type"] = "text/csv"
    response.headers["Content-Disposition"] = "attachment; filename=data.csv"

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


# runs through a simulation based on request arguments (query string values)
def run_simulation(request_args):
    # attempt query string parse
    il = int(request_args.get("infection_length"))
    v = float(request_args.get("virility"))
    fp = float(request_args.get("fatal_percent"))
    imp = float(request_args.get("immune_percent"))
    ip = int(request_args.get("initial_population"))
    ii = int(request_args.get("initial_infected"))

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
    return sim


# applies standard headers, required for CORS
def setup_headers(resp):
    resp.headers["Access-Control-Allow-Origin"] = "*"
    resp.headers["Access-Control-Allow-Headers"] = "Access-Control-Allow-Origin"


# run main method (for testing)
if __name__ == "__main__":
    # extract config variables
    port = os.environ["PORT"] if "PORT" in os.environ else 8080
    debug = True if "DEBUG" in os.environ else False

    # start the server
    app.run(port=port, debug=debug)
