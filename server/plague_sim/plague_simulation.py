from .plague import Plague
from decimal import Decimal, ROUND_HALF_UP
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
                            model_type,
                            bound_checking)
        if model_length != 0:
            self._plague.run_sim(model_length)

    def run_plague_sim(self, model_length):
        self._plague.run_sim(model_length)

    # normal round (no bankers rounding) for csv values
    def _round(self, n):
        return Decimal(n).quantize(0, rounding=ROUND_HALF_UP)

    @property
    def simulation_array(self):
        return self._plague.plague_simulation_str

    @property
    def simulation_json(self):
        return json.dumps(self.simulation_array, sort_keys=True)

    @property
    def invalid_bound_err_day(self):
        return self._plague.invalid_result_day

    @property
    def simulation_csv(self):
        paramnames = ['Infection Length', 'Transmission Rate', 'Virulence', 'Initial Population',
            'Initial Percent Immune', 'Initial Infected'] 
        fieldnames = ['Susceptible', 'Infected', 'Immune', 'Dead', 'Total Population']
   
        csv_string = ",".join(paramnames)
        csv_string += '\n'

        # rounds each value up
        # (python uses banker's rounding - this uses normal rounding)
        csv_string += "{inf_l},{tr},{v},{init_p},{imm},{init_inf}\n\n".format(
            inf_l=self._round(self._plague.infection_length),
            tr=self._round(self._plague.transmission_rate),
            v=self._round(self._plague.virulence),
            init_p=self._round(self._plague.initial_pop),
            imm=self._round(self._plague.immune_percent),
            init_inf=self._round(self._plague.initial_infected)
        )
        
        csv_string += ",".join(fieldnames)
        csv_string += '\n'

        for row in self.simulation_array:
            csv_string += "{s},{inf},{im},{d},{p}\n".format(
                    s=self._round(row["Susceptible"]),
                    inf=self._round(row["Infected"]),
                    im=self._round(row["Immune"]),
                    d=self._round(row["Dead"]),
                    p=self._round(row["TotalPopulation"]))

        return csv_string
