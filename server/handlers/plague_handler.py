from server.param_utils import ParamExtractor
from server.handlers import SimCORSHandler


# HTTP request handler that handles plague simulation requests
class PlagueHandler(SimCORSHandler):
    # handle HTTP GET request
    def get(self):
        err_msg = None
        sim = None

        # special option - csv (default is json)
        csv_format = self.get_argument("csv", "").lower() == "true"

        # run simulation and store results
        try:
            # extract query strings and make sure they are valid
            params = ParamExtractor.extract_and_validate(self)
            # run the simulation using the query string values
            sim = self.run_simulation(params)
        except TypeError as error:
            err_msg = str(error)
        except ValueError as error:
            err_msg = str(error)
        except Exception as error:
            err_msg = "Simulation failure error (" + str(error) + ")"

        if err_msg is None:
            # json or csv
            if csv_format is True:
                # csv format requested
                self.set_header("Content-Type", "text/csv")
                results = sim.simulation_csv
            else:
                # not csv format - use json
                self.set_header("Content-Type", "text/json")
                results = sim.simulation_json

            # respond
            self.finish(results)
        else:
            # error occurred - respond with bad request
            print(err_msg)
            self.set_status(400)
            self.finish(err_msg)
