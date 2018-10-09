from plague import PlagueParams, PlagueDay


class PlagueSimulation:
    def __init__(self, params):
        if not isinstance(params, PlagueParams):
            raise Exception("Params argument must be of type PlagueParams.")

        self.__params = params
        self.__days = []

    def run(self):
        self.__days = [self.day_zero()]

        for i in range(1, self.__params.model_length + 1):
            self.__days.append(
                PlagueDay(
                    susceptible=self.susceptible(self.__days[i-1]),
                    infected=self.infected(self.__days[i - 1]),
                    immune=self.immune(self.__days[i - 1]),
                    dead=self.dead(self.__days[i - 1]),
                    total_pop=self.__days[i - 1].total_population
                )
            )

    def day_zero(self):
        return PlagueDay(
            susceptible=self.__params.initial_population - self.__params.initial_infected,
            infected=self.__params.initial_infected,
            immune=self.__params.initial_population * self.__params.immune_percent,
            dead=0,
            total_pop=self.__params.initial_population
        )

    def susceptible(self, prev_day):
        return prev_day.susceptible - \
               (
                       self.__params.virility *
                       prev_day.susceptible *
                       prev_day.infected /
                       self.__params.initial_population
               )

    def infected(self, prev_day):
        return prev_day.infected + \
               (
                    self.__params.virility *
                    prev_day.susceptible *
                    prev_day.infected /
                    self.__params.initial_population -
                    prev_day.infected /
                    self.__params.infection_length -
                    prev_day.infected *
                    self.__params.percent_fatal /
                    (100 * self.__params.infection_length)
               )

    def immune(self, prev_day):
        return prev_day.immune + (prev_day.infected / self.__params.infection_length)

    def dead(self, prev_day):
        return self.__params.percent_fatal * prev_day.infected / (100 * self.__params.infection_length + prev_day.dead)

    def get_data(self):
        data = []

        for day in self.__days:
            data.append(day.__dict__)

        return data
