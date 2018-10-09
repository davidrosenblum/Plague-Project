class PlagueParams:
    def __init__(self, infection_length, virility, percent_fatal, init_pop, immune_percent, init_infected, model_length):
        self.infection_length = infection_length
        self.virility = virility
        self.percent_fatal = percent_fatal
        self.initial_population = init_pop
        self.immune_percent = immune_percent
        self.initial_infected = init_infected
        self.model_length = model_length