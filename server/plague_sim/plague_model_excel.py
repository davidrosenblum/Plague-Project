from mpmath import mpf, mp
from .disease_model import DiseaseModel
from .plague_params import PlagueParams

class PlagueModelExcel(DiseaseModel):
    
    mp.dps = 8

    @staticmethod
    def calc_susceptible(self, plague_params, prev_disease_day):
        return str(
            mpf(prev_disease_day["Susceptible"])  -  \
           (mpf(plague_params.virility)           *  \
            mpf(prev_disease_day["Susceptible"])  *  \
            mpf(prev_disease_day["Infected"])     /  \
            mpf(plague_params.initial_pop)
           )
        )

    @staticmethod
    def calc_immune(self, plague_params, prev_disease_day):
        return str(
            mpf(prev_disease_day["Immune"])       +  \
           (mpf(prev_disease_day["Infected"])     /  \
            mpf(plague_params.infection_length)
           )
        )

    @staticmethod
    def calc_infected(self, plague_params, prev_disease_day):
        return str(
            mpf(prev_disease_day["Infected"])     +  \
           (mpf(plague_params.virility)           *  \
            mpf(prev_disease_day["Susceptible"])  *  \
            mpf(prev_disease_day["Infected"])     /  \
            mpf(plague_params.initial_pop)        -  \
            mpf(prev_disease_day["Infected"])     /  \
            mpf(plague_params.infection_length)   -  \
            mpf(prev_disease_day["Infected"])     *  \
            mpf(plague_params.percent_fatal)      /  \
           (mpf(100)                              *  \
            mpf(plague_params.infection_length))
           )
        )

    @staticmethod
    def calc_dead(self, plague_params, prev_disease_day):
        return str(
            mpf(plague_params.percent_fatal)      *  \
            mpf(prev_disease_day["Infected"])     /  \
           (mpf(100)                              *  \
            mpf(plague_params.infection_length))  +  \
            mpf(prev_disease_day["Dead"])
        )
