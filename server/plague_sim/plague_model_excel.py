from .disease_model import DiseaseModel
from .plague_params import PlagueParams
from decimal import Decimal as Dec, getcontext, ROUND_HALF_UP

getcontext().rounding = ROUND_HALF_UP

class PlagueModelExcel(DiseaseModel):
    
    @staticmethod
    def calc_susceptible(self, plague_params, prev_disease_day):
        return \
            (
                prev_disease_day["Susceptible"]  -  \
                (
                    plague_params.virility           *  \
                    prev_disease_day["Susceptible"]  *  \
                    prev_disease_day["Infected"]     /  \
                    plague_params.initial_pop
                )
            ).to_integral()

    @staticmethod
    def calc_immune(self, plague_params, prev_disease_day):
        return \
            (
                prev_disease_day["Immune"]       +  \
                (
                    prev_disease_day["Infected"]     /  \
                    plague_params.infection_length
                )
            ).to_integral()

    @staticmethod
    def calc_infected(self, plague_params, prev_disease_day):
        return \
            (
                prev_disease_day["Infected"]     +  \
                (
                    plague_params.virility           *  \
                    prev_disease_day["Susceptible"]  *  \
                    prev_disease_day["Infected"]     /  \
                    plague_params.initial_pop        -  \
                    prev_disease_day["Infected"]     /  \
                    plague_params.infection_length   -  \
                    prev_disease_day["Infected"]     *  \
                    plague_params.percent_fatal      /  \
                    plague_params.infection_length
#                    (
#                        100                              *  \
#                        plague_params.infection_length
#                    )
                )
            ).to_integral()

    @staticmethod
    def calc_dead(self, plague_params, prev_disease_day):
        return \
            (
                plague_params.percent_fatal      *  \
                prev_disease_day["Infected"]     /  \
                plague_params.infection_length   +  \
#                (
#                    100                              *  \
#                    plague_params.infection_length
#                )                                     +  \
                prev_disease_day["Dead"]
            ).to_integral()