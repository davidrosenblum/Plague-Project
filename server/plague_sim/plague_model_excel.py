from .disease_model import DiseaseModel
from .plague_params import PlagueParams
from decimal import Decimal as Dec, getcontext, ROUND_HALF_UP

# Set context parameters for floating-point processing
getcontext().rounding = ROUND_HALF_UP
getcontext().prec     = 8

class PlagueModelExcel(DiseaseModel):
    
    @staticmethod
    def calc_susceptible(plague_params, prev_disease_day):
        return  prev_disease_day["Susceptible"]  -  \
                (
                    plague_params.transmission_rate   *  \
                    prev_disease_day["Susceptible"]  *  \
                    prev_disease_day["Infected"]     /  \
                    plague_params.initial_pop
                )

    @staticmethod
    def calc_immune(plague_params, prev_disease_day):
        return  prev_disease_day["Immune"]       +  \
                (
                    prev_disease_day["Infected"]     /  \
                    plague_params.infection_length
                )

    @staticmethod
    def calc_infected(plague_params, prev_disease_day):
        return  prev_disease_day["Infected"]     +  \
                (
                    plague_params.transmission_rate   *  \
                    prev_disease_day["Susceptible"]  *  \
                    prev_disease_day["Infected"]     /  \
                    plague_params.initial_pop        -  \
                    prev_disease_day["Infected"]     /  \
                    plague_params.infection_length   -  \
                    prev_disease_day["Infected"]     *  \
                    plague_params.virulence          /  \
                    plague_params.infection_length
                )

    @staticmethod
    def calc_dead(plague_params, prev_disease_day):
        return  plague_params.virulence          *  \
                prev_disease_day["Infected"]     /  \
                plague_params.infection_length   +  \
                prev_disease_day["Dead"]
