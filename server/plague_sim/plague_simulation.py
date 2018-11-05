from .plague import Plague
import json

class PlagueSimulation:

    def __init__(self):
        self._plague = None

    def create_plague(self, 
                 infection_length,
                 transmission_rate,
                 virulence,
                 init_pop,
                 immune_percent,
                 init_infected,
                 model_length = 0,
                 model_type = "PlagueModelExcel",
                 bound_checking = True):
        self._plague = Plague(infection_length,
                            transmission_rate,
                            virulence,
                            init_pop,
                            immune_percent,
                            init_infected,
                            model_type)
        if model_length != 0:
            self._plague.run_sim(model_length)

    def run_plague_sim(self, model_length):
        self._plague.run_sim(model_length)

    @property
    def simulation_array(self):
        return self._plague.plague_simulation_str

    @property
    def simulation_json(self):
        return json.dumps(self.simulation_array, sort_keys=True)

    @property
    def simulation_csv(self):
        csv_string = ""
        fieldnames = ['Susceptible', 'Infected', 'Immune', 'Dead', 'TotalPopulation']
        
        csv_string += ",".join(fieldnames)
        csv_string += '\n'

        for row in self.simulation_array:
            csv_string += "{s},{inf},{im},{d},{p}\n".format(
                    s=row["Susceptible"],
                    inf=row["Infected"],
                    im=row["Immune"],
                    d=row["Dead"],
                    p=row["TotalPopulation"])

        return csv_string