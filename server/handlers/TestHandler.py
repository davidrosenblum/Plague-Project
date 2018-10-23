import json
import tornado.web
from server.plague import PlagueParams, PlagueSimulation


class TestHandler(tornado.web.RequestHandler):
    def get(self):
        params = PlagueParams(
            infection_length=100,
            virility=1,
            fatal_percent=0,
            initial_population=100000,
            immune_percent=0,
            initial_infected=1,
            simulation_length=60
        )

        # send json
        self.set_header("Content-Type", "text/json")
        self.finish(json.dumps(PlagueSimulation(params).run().get_data()))