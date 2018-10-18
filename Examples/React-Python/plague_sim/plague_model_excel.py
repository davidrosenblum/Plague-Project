from mpmath import *
from .disease_model import DiseaseModel
from .plague_params import PlagueParams

class PlagueModelExcel(DiseaseModel):
    
    @staticmethod
    def calc_susceptible(self, plague_params, prev_disease_day):
        return 0

    @staticmethod
    def calc_immune(self, plague_params, prev_disease_day):
        return 0

    @staticmethod
    def calc_infected(self, plague_params, prev_disease_day):
        return 0

    @staticmethod
    def calc_dead(self, plague_params, prev_disease_day):
        return 0