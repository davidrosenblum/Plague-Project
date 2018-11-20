from server.plague_sim import PlagueSimulation
from . import CORSHandler


# HTTP request handler for test JSON data
class TestHandler(CORSHandler):
    # handles HTTP GET requests - ignores query strings, uses preset data
    def get(self):
        sim = PlagueSimulation()

        sim.create_plague(
            infection_length=100,
            transmission_rate=1,
            virulence=0,
            init_pop=100000,
            immune_percent=0,
            init_infected=1,
            model_length=60
        )

        # send json
        self.set_header("Content-Type", "text/json")
        self.finish(sim.simulation_json)