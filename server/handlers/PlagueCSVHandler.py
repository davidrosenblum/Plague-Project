import tornado.web
from server.param_utils import ParamExtractor
from server.plague_sim import PlagueSimulation


class PlagueCSVHandler(tornado.web.RequestHandler):
    def run_simulation(self, validated_params):
        sim = PlagueSimulation()

        sim.create_plague(
            infection_length=validated_params["infection_length"],
            transmission_rate=validated_params["transmission_rate"],
            virulence=validated_params["virulence"],
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

        # run simulation and store results
        try:
            params = ParamExtractor.extract_and_validate(self)
            sim = self.run_simulation(params)
        except TypeError as error:
            err_msg = str(error)
        except ValueError as error:
            err_msg = str(error)
        except Exception:
            err_msg = "Simulation failure error"

        if err_msg is None:
            self.set_header("Content-Type", "text/csv")
            self.set_header("Content-Disposition", "attachment; filename=data.csv")

            self.finish(sim.simulation_csv)
        else:
            self.set_status(400)
            self.finish(err_msg)