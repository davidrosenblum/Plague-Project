import json
import tornado.web
from server.param_utils import ParamExtractor
from server.plague_sim import PlagueSimulation

class PlagueHandler(tornado.web.RequestHandler):
    def run_simulation(self, validated_params):
        sim = PlagueSimulation()

        sim.create_plague(
            infection_length=validated_params["infection_length"],
            virility=validated_params["virility"],
            percent_fatal=validated_params["fatal_percent"],
            init_pop=validated_params["initial_population"],
            immune_percent=validated_params["immune_percent"],
            init_infected=validated_params["initial_infected"],
            model_length=validated_params["simulation_length"]
        )

        return sim

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Methods", "OPTIONS")
        self.set_header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Content-Type")

    def options(self, *args, **kwargs):
        self.set_status(204)
        self.finish()

    def get(self):
        err_msg = None
        sim = None

        # special option - csv (default is json)
        csv_format = self.get_argument("csv", "").lower() == "true"

        # run simulation and store results
        try:
            params = ParamExtractor.extract_and_validate(self)
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
                results = sim.simulation_csv
            else:
                self.set_header("Content-Type", "text/json")
                results = sim.simulation_json

            self.finish(results)
        else:
            print(err_msg)
            self.set_status(400)
            self.finish(err_msg)
