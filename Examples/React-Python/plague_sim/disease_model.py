from abc import ABC, abstractstaticmethod

class DiseaseModel(ABC):
 
    @abstractstaticmethod
    def calc_day_zero(self, parameter_list):
        pass

    @abstractstaticmethod
    def calc_susceptible(self, parameter_list):
        pass

    @abstractstaticmethod
    def calc_immune(self, parameter_list):
        pass

    @abstractstaticmethod
    def calc_infected(self, parameter_list):
        pass

    @abstractstaticmethod
    def calc_dead(self, parameter_list):
        pass