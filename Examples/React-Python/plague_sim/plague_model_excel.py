from decimal import *
from .disease_model import DiseaseModel

class PlagueModelExcel(DiseaseModel):
    
    @staticmethod
    def calc_day_zero(self, plague_params):
        pass

    @staticmethod
    def calc_susceptible(self, plague_params, prev_disease_day):
        pass

    @staticmethod
    def calc_immune(self, plague_params, prev_disease_day):
        pass

    @staticmethod
    def calc_infected(self, plague_params, prev_disease_day):
        pass

    @staticmethod
    def calc_dead(self, plague_params, prev_disease_day):
        pass