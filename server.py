from flask import Flask, make_response, send_from_directory, request
import os
import json
import base64
from plague import PlagueParams, PlagueSimulation, PlagueParamValues

# expected query string params from requests
EXPECTED_REQUEST_PARAMS = ("infection_length", "virility", "initial_population", "initial_infected", "fatal_percent", "immune_percent", "simulation_length")

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
        params = validate_params(request.args)
        sim = run_simulation(params)
    except TypeError as error:
        return "Bad request {msg}".format(msg=str(error)), 400
    except ValueError as error:
        return "Bad request {msg}".format(msg=str(error)), 400
    except Exception:
        return "Simulation failure.", 400

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
        params = validate_params(request.args)
        sim = run_simulation(params)
    except TypeError as error:
        return "Bad request {msg}".format(msg=str(error)), 400
    except ValueError as error:
        return "Bad request {msg}".format(msg=str(error)), 400
    except Exception:
        return "Simulation failure.", 400

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


# validated user-given parameters with helpful error messages
def validate_params(request_args):
    # results go in this dict
    extracted_params = {}    

    # make sure every param exists
    for param in EXPECTED_REQUEST_PARAMS:
        if request_args.get(param) is None:
            raise ValueError("{p} parameter is missing.".format(p=param))
        else:
            extracted_params[param] = request_args.get(param)

    # convert infection length
    try:
        extracted_params["infection_length"] = int(extracted_params["infection_length"])
    except ValueError:
        raise ValueError("Infection Length must be of type int.")

    # convert virility
    try:
        extracted_params["virility"] = float(extracted_params["virility"])
    except ValueError:
        raise ValueError("Virility must be of type float.")

    # convert fatal percent
    try:
        extracted_params["fatal_percent"] = float(extracted_params["fatal_percent"])
    except ValueError:
        raise ValueError("Fatal Percent must be of type float.")

    # convert immune percent
    try:
        extracted_params["immune_percent"] = float(extracted_params["immune_percent"])
    except ValueError:
        raise ValueError("Immune Percent must be of type float.")

    # convert initial population
    try:
        extracted_params["initial_population"] = int(extracted_params["initial_population"])
    except ValueError:
        raise ValueError("Initial Population must be of type int.")

    # convert intial infected
    try:
        extracted_params["initial_infected"] = int(extracted_params["initial_infected"])
    except ValueError:
        raise ValueError("Initial Infected must be of type int.")

    # convert simulation length
    try:
        extracted_params["simulation_length"] = int(extracted_params["simulation_length"])
    except ValueError:
        raise ValueError("Simulation Length must be of type int.")

    # types at this point are valid, make sure they are in range
    PlagueParamValues.validate_all_params(extracted_params)

    # return results
    return extracted_params


# runs through a simulation based on request arguments (query string values)
def run_simulation(validated_params):
    # construct parameters
    params = PlagueParams(
        infection_length=validated_params["infection_length"],
        virility=validated_params["virility"],
        fatal_percent=validated_params["fatal_percent"],
        initial_population=validated_params["initial_population"],
        immune_percent=validated_params["immune_percent"],
        initial_infected=validated_params["initial_infected"],
        simulation_length=validated_params["simulation_length"]
    )

    # run simulation
    sim = PlagueSimulation(params)
    sim.run()
    return sim


# applies standard headers, required for CORS
def setup_headers(resp):
    resp.headers["Access-Control-Allow-Origin"] = "*"
    resp.headers["Access-Control-Allow-Headers"] = "*"


# run main method (for testing)
if __name__ == "__main__":
    # extract config variables
    port = os.environ["PORT"] if "PORT" in os.environ else 8080
    debug = True if "DEBUG" in os.environ else False

    # start the server
    app.run(port=port, debug=debug)
