from server.param_utils import ParamExtractor
from server.handlers import CORSHandler
from server.plague_sim import PlagueSimulation


# HTTP request handler that handles plague simulation requests
class PlagueHandler(CORSHandler):
    # handle HTTP GET request
    def get(self):
        # setup
        err_msg = None
        sim = None

        # extract non-simulation parameters/headers
        content_type = self.request.headers.get("Content-Type")
        # special option - csv (default is json)
        csv_format = content_type == "text/csv"

        # run simulation and store results
        try:
            # extract query strings and make sure they are valid
            params = ParamExtractor.extract_and_validate(self)

            # run the simulation using the query string values
            sim = PlagueSimulation()
            sim.create_plague(
                infection_length=params["infection_length"],
                transmission_rate=params["transmission_rate"],
                virulence=params["virulence"],
                init_pop=params["initial_population"],
                immune_percent=params["immune_percent"],
                init_infected=params["initial_infected"],
                model_length=params["simulation_length"]
            )

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
                self.set_header("Content-Disposition", "attachment; filename=data.csv")
                results = sim.simulation_csv
            else:
                # not csv format - use json
                self.set_header("Content-Type", "text/json")
                self.set_header("Content-Disposition", "attachment; filename=data.json")
                results = sim.simulation_json

            # respond
            self.finish(results)
        else:
            # error occurred - respond with bad request
            print(err_msg)
            self.set_status(400)
            self.finish(err_msg)
