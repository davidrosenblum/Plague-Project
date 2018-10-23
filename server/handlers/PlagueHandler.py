import json
import tornado.web
from server.param_utils import ParamExtractor
from server.plague import PlagueParams, PlagueSimulation


class PlagueHandler(tornado.web.RequestHandler):
    def run_simulation(self, validated_params):
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

    def get(self):
        err_msg = None
        sim = None

        # special option - csv (default is json)
        csv_format = self.get_argument("csv", "").lower() == "true"

        # run simulation and store results
        try:
            params = ParamExtractor.extract_and_validate(self)
            print("PARAMS= " + str(params))
            sim = self.run_simulation(params)
        except TypeError as error:
            err_msg = str(error)
        except ValueError as error:
            err_msg = str(error)
        except Exception as error:
            err_msg = "Simulation failure error (" + str(error) + ")"

        if err_msg is None:
            print("No error" + str(sim is None))
            # json or csv
            if csv_format is True:
                self.set_header("Content-Type", "text/csv")
                results = sim.get_data_csv()
            else:
                self.set_header("Content-Type", "text/json")
                results = json.dumps(sim.get_data())

            self.finish(results)
        else:
            print(err_msg)
            self.set_status(400)
            self.finish(err_msg)
