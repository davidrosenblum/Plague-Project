from .plague_params import PlagueParams
from .model_factory import ModelFactory
from decimal import Decimal as Dec, getcontext, ROUND_HALF_UP

# Set context parameters for floating-point processing
getcontext().rounding = ROUND_HALF_UP
getcontext().prec     = 8

class Plague:

    def __init__(self, 
                 infection_length,
                 transmission_rate,
                 virulence,
                 init_pop,
                 immune_percent,
                 init_infected,
                 disease_model,
                 bound_checking):
        self._plague_params = PlagueParams(infection_length, 
            transmission_rate, virulence, init_pop, immune_percent, 
            init_infected)
        self._disease_model    = ModelFactory.create_disease_model(self, disease_model)
        self._plague_spread    = []
        self._plague_spread.append(self._plague_params.day_zero)
        self._bound = bound_checking
        self._out_of_bound_result_day = -1

    def run_sim(self, sim_length):

        del self._plague_spread[:]
        self._plague_spread.append(self._plague_params.day_zero)

        for day in range(1, sim_length + 1):
            plague_day = {
                "Susceptible"     : self._disease_model.calc_susceptible(self, self._plague_params, self._plague_spread[day-1]),
                "Infected"        : self._disease_model.calc_infected(self, self._plague_params, self._plague_spread[day-1]),
                "Immune"          : self._disease_model.calc_immune(self, self._plague_params, self._plague_spread[day-1]),
                "Dead"            : self._disease_model.calc_dead(self, self._plague_params, self._plague_spread[day-1]),
                "TotalPopulation" : ""
            }

            plague_day["TotalPopulation"] = self._plague_params.initial_pop - Dec(plague_day["Dead"])

            if self._bound:
                total_pop_day = Dec(plague_day["Susceptible"]) + Dec(plague_day["Infected"]) + \
                    Dec(plague_day["Immune"]) + Dec(plague_day["Dead"])

                if (total_pop_day > self._plague_params.initial_pop):

                    susceptible_percent = plague_day["Susceptible"] / total_pop_day
                    infected_percent = plague_day["Infected"] / total_pop_day
                    immune_percent = plague_day["Immune"] / total_pop_day
                    dead_percent = plague_day["Dead"] / total_pop_day

                    plague_day["Susceptible"] = self._plague_params.initial_pop * susceptible_percent
                    plague_day["Infected"] = self._plague_params.initial_pop * infected_percent
                    plague_day["Immune"] = self._plague_params.initial_pop * immune_percent
                    plague_day["Dead"] = self._plague_params.initial_pop * dead_percent
                    plague_day["TotalPopulation"] = self._plague_params.initial_pop - Dec(plague_day["Dead"])    

            self._plague_spread.append(plague_day)
            
    @property
    def plague_simulation_str(self):
        return Plague._serialize_spread(self.plague_simulation_raw)
        
    @property
    def plague_simulation_raw(self):
        return self._plague_spread

    @staticmethod
    def _serialize_spread(spread):
        return  [ { 'Susceptible' : str(day['Susceptible']),
                    'Infected' : str(day['Infected']),
                    'Immune' : str(day['Immune']),
                    'Dead' : str(day['Dead']),
                    'TotalPopulation' : str(day['TotalPopulation'])
                  } for day in spread
                ]