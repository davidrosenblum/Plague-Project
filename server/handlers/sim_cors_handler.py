from server.plague_sim import PlagueSimulation
from server.handlers import CORSHandler


# superclass for CORS request handler that can run simulations 
class SimCORSHandler(CORSHandler):
    # runs a plague simulation
    # requires validated parameters dictionary 
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