class PlagueParams():
    def __init__(self, 
                 infection_length,
                 virility,
                 percent_fatal,
                 init_pop,
                 immune_percent,
                 init_infected,
                 model_length):
        self._infection_length = infection_length
        self._virility = virility
        self._percent_fatal = percent_fatal
        self._initial_pop = init_pop
        self._immune_percent = immune_percent
        self._initial_infected = init_infected
        self._model_length = model_length
        self._day_zero = { "Susceptible"     : self._initial_pop - self._initial_infected,
                           "Infected"        : self._initial_infected,
                           "Immune"          : self._initial_pop * self._immune_percent,
                           "Dead"            : 0,
                           "TotalPopulation" : self._initial_pop }

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
    def model_length(self):
        return self._model_length

    @property
    def day_zero(self):
        return self._day_zero