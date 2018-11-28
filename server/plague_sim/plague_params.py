from decimal import Decimal as Dec, getcontext, ROUND_HALF_UP

# Set context parameters for floating-point processing
getcontext().rounding = ROUND_HALF_UP
getcontext().prec     = 8

class PlagueParams():
    def __init__(self,
                 infection_length,
                 transmission_rate,
                 virulence,
                 init_pop,
                 immune_percent,
                 init_infected):
        # Save parameters as properties, as Decimal objects
        self._infection_length    = Dec(infection_length)
        self._transmission_rate   = Dec(transmission_rate)
        self._virulence           = Dec(virulence)
        self._initial_pop         = Dec(init_pop)
        self._immune_percent      = Dec(immune_percent)
        self._initial_infected    = Dec(init_infected)
        # Calculate initial values for each aspect
        self._day_zero = {
            "Susceptible"  :  \
                self._initial_pop       -  \
                self._initial_infected  -  \
                (
                    self._immune_percent  *  \
                    self._initial_pop
                ),
            "Infected"  :  self._initial_infected,
            "Immune"  :  \
                self._initial_pop  *  \
                self._immune_percent,
            "Dead"  :  Dec(0),
            "TotalPopulation" : self._initial_pop
        }

    @property
    def infection_length(self):
        return self._infection_length

    @property
    def transmission_rate(self):
        return self._transmission_rate

    @property
    def virulence(self):
        return self._virulence

    @property
    def initial_pop(self):
        return self._initial_pop

    @property
    def immune_percent(self):
        return self._immune_percent

    @property
    def initial_infected(self):
        return self._initial_infected

    @property
    def day_zero(self):
        return self._day_zero