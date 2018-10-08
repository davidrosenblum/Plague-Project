from decimal import *
from .disease_model import DiseaseModel
from .plague_params import PlagueParams

class PlagueModelExcel(DiseaseModel):
    
    @staticmethod
    def calc_day_zero(self, plague_params):
        return { "Susceptible"     : plague_params.initial_pop - plague_params.initial_infected,
                 "Infected"        : plague_params.initial_infected,
                 "Immune"          : plague_params.initial_pop * plague_params.immune_percent,
                 "Dead"            : 0,
                 "TotalPopulation" : plague_params.initial_pop }

    @staticmethod
    def calc_susceptible(self, plague_params, prev_disease_day):
        return 

    @staticmethod
    def calc_immune(self, plague_params, prev_disease_day):
        return 0

    @staticmethod
    def calc_infected(self, plague_params, prev_disease_day):
        return 0

    @staticmethod
    def calc_dead(self, plague_params, prev_disease_day):
        return 0