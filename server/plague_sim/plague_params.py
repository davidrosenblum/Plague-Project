from decimal import Decimal as Dec, getcontext, ROUND_HALF_UP

getcontext().rounding = ROUND_HALF_UP

class PlagueParams():
    def __init__(self, 
                 infection_length,
                 virility,
                 percent_fatal,
                 init_pop,
                 immune_percent,
                 init_infected):
        self._infection_length = Dec(infection_length)
        self._virility = Dec(virility)
        self._percent_fatal = Dec(percent_fatal)
        self._initial_pop = Dec(init_pop)
        self._immune_percent = Dec(immune_percent)
        self._initial_infected = Dec(init_infected)
        self._day_zero = { "Susceptible"     : (self._initial_pop - self._initial_infected - (self._immune_percent * self._initial_pop)).to_integral(),
                           "Infected"        : (self._initial_infected).to_integral(),
                           "Immune"          : (self._initial_pop * self._immune_percent).to_integral(),
                           "Dead"            : Dec(0),
                           "TotalPopulation" : (self._initial_pop).to_integral() }

    @property
    def infection_length(self):
        return self._infection_length

    @property
    def virility(self):
        return self._virility

    @property
    def percent_fatal(self):
        return self._percent_fatal

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