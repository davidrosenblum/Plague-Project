from server.param_utils import ParamExtractor
from server.handlers import SimCORSHandler


# HTTP request handler that handles simulation CSV file requests
class PlagueCSVHandler(SimCORSHandler):
    # handle HTTP GET request
    def get(self):
        err_msg = None
        sim = None

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
        except Exception:
            err_msg = "Simulation failure error"

        if err_msg is None:
            # format response to be a file
            self.set_header("Content-Type", "text/csv")
            self.set_header("Content-Disposition", "attachment; filename=data.csv")

            # respond with csv file
            self.finish(sim.simulation_csv)
        else:
            # error occurred - respond with bad request
            self.set_status(400)
            self.finish(err_msg)
