from .plague_params import PlagueParams
from .plague_model_excel import PlagueModelExcel

class Plague:
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
        self._disease_model = PlagueModelExcel()
        self._plague_spread = []
        self._plague_spread = self._plague_params.day_zero

    

#     def run(self):
#         self.__days = [self.day_zero()]

#         for i in range(1, self.__plague_params.model_length + 1):
#             self.__days.append(
#                 PlagueDay(
#                     susceptible=self.susceptible(self.__days[i-1]),
#                     infected=self.infected(self.__days[i - 1]),
#                     immune=self.immune(self.__days[i - 1]),
#                     dead=self.dead(self.__days[i - 1]),
#                     total_pop=self.__days[i - 1].total_population
#                 )
#             )
   
#     def get_data(self):
#         data = []

#         for day in self.__days:
#             data.append(day.__dict__)

#         return data


# class PlagueDay:
#     def __init__(self, susceptible, infected, immune, dead, total_pop):
#         self.susceptible = susceptible
#         self.infected = infected
#         self.immune = immune
#         self.dead = dead
#         self.total_population = total_pop