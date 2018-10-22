from mpmath import mpf, mp
from plague_sim.plague_params import PlagueParams
from plague_sim.plague_model_excel import PlagueModelExcel

class Plague:

    mp.dps = 8
    
    def __init__(self, 
                 infection_length,
                 virility,
                 percent_fatal,
                 init_pop,
                 immune_percent,
                 init_infected):
        self._plague_params = PlagueParams(infection_length, 
            virility, percent_fatal, init_pop, immune_percent, 
            init_infected)
        self._disease_model    = PlagueModelExcel()
        self._plague_spread    = []
        self._plague_spread.append(self._plague_params.day_zero)

    def run_sim(self, sim_length):
        for day in range(1, sim_length + 1):
            plague_day = {
                "Susceptible"     : self._disease_model.calc_susceptible(self, self._plague_params, self._plague_spread[day-1]),
                "Infected"        : self._disease_model.calc_infected(self, self._plague_params, self._plague_spread[day-1]),
                "Immune"          : self._disease_model.calc_immune(self, self._plague_params, self._plague_spread[day-1]),
                "Dead"            : self._disease_model.calc_dead(self, self._plague_params, self._plague_spread[day-1]),
                "TotalPopulation" : ""
            }
            plague_day["TotalPopulation"] = str(
                mpf(plague_day["Susceptible"]) + mpf(plague_day["Infected"]) + mpf(plague_day["Immune"])
            )
            self._plague_spread.append(plague_day)
        
    @property
    def plague_simulation(self):
        return self._plague_spread

def main():
    test_plague = Plague(2, 1, 0, 100000, 0, 1)
    test_plague.run_sim(100)
    print(test_plague.plague_simulation)