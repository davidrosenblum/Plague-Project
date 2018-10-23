import json
import tornado.web
from server.plague import PlagueParams, PlagueSimulation


class TestHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Methods", "OPTIONS")
        self.set_header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Content-Type")

    def options(self, *args, **kwargs):
        self.set_status(204)
        self.finish()

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