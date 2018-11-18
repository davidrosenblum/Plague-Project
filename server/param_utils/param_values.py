# utility class that makes sure parameters are of the correct type (int vs float)
# and the params are in their set ranges

from math import isnan


class ParamValues:
    INFECTION_LENGTH = (1, 365)
    TRANSMISSION_RATE = (0, 20)
    VIRULENCE = (0, 1)
    INITIAL_POPULATION = (1, 1000000)
    IMMUNE_PERCENT = (0, 1)
    INITIAL_INFECTED = (0, 1000000)
    SIMULATION_LENGTH = (1, 365)

    @staticmethod
    def validate_infection_length(infection_length):
        if isnan(infection_length) or not isinstance(infection_length, int):
            raise TypeError("Infection Length must be of type int.")

        min_val = ParamValues.INFECTION_LENGTH[0]
        max_val = ParamValues.INFECTION_LENGTH[1]

        if infection_length < min_val or infection_length > max_val:
            raise ValueError("Infection Length value must be in the range {a}-{b}.".format(a=min_val, b=max_val))

    @staticmethod
    def validate_transmission_rate(transmission_rate):
        if isnan(transmission_rate) or not isinstance(transmission_rate, float):
            raise TypeError("Transmission Rate must be of type float.")

        min_val = ParamValues.TRANSMISSION_RATE[0]
        max_val = ParamValues.TRANSMISSION_RATE[1]

        if transmission_rate < min_val or transmission_rate > max_val:
            raise ValueError("Transmission Rate value must be in the range {a}-{b}.".format(a=min_val, b=max_val))

    @staticmethod
    def validate_virulence(virulence):
        if isnan(virulence) or not isinstance(virulence, float):
            raise TypeError("Virulence must be of type float.")

        min_val = ParamValues.VIRULENCE[0]
        max_val = ParamValues.VIRULENCE[1]

        if virulence < min_val or virulence > max_val:
            raise ValueError("Virulence value must be in the range {a}-{b}.".format(a=min_val, b=max_val))

    @staticmethod
    def validate_initial_population(initial_population):
        if isnan(initial_population) or not isinstance(initial_population, int):
            raise TypeError("Initial Population must be of type int.")

        min_val = ParamValues.INITIAL_POPULATION[0]
        max_val = ParamValues.INITIAL_POPULATION[1]

        if initial_population < min_val or initial_population > max_val:
            raise ValueError("Initial Population value must be in the range {a}-{b}.".format(a=min_val, b=max_val))

    @staticmethod
    def validate_immune_percent(immune_percent, initial_population=None, initial_infected=None):
        if isnan(immune_percent) or not isinstance(immune_percent, float):
            raise TypeError("Immune Percent must be of type float.")

        min_val = ParamValues.IMMUNE_PERCENT[0]
        max_val = ParamValues.IMMUNE_PERCENT[1]

        if initial_population is not None and initial_infected is not None:
            max_val = (initial_population - initial_infected) / initial_population

        if immune_percent < min_val or immune_percent > max_val:
            raise ValueError("Immune Percent value must be in the range {a}-{b}.".format(a=min_val, b=max_val))

    @staticmethod
    def validate_initial_infected(initial_infected, initial_population=None):
        if isnan(initial_infected) or not isinstance(initial_infected, int):
            raise TypeError("Intitial Infected must be of type int.")

        min_val = ParamValues.INITIAL_INFECTED[0]
        max_val = initial_population or ParamValues.INITIAL_INFECTED[1]

        if initial_infected < min_val or initial_infected > max_val:
            raise ValueError("Initial Infected value must be in the range {a}-{b}.".format(a=min_val, b=max_val))

    @staticmethod
    def validate_simulation_length(simulation_length):
        if isnan(simulation_length) or not isinstance(simulation_length, int):
            raise TypeError("Simulation Length must be of type int.")

        min_val = ParamValues.SIMULATION_LENGTH[0]
        max_val = ParamValues.SIMULATION_LENGTH[1]

        if simulation_length < min_val or simulation_length > max_val:
            raise ValueError("Simulation Length value must be in the range {a}-{b}.".format(a=min_val, b=max_val))

    @staticmethod
    def validate_all_params(params_dict):
        # infection length check
        if "infection_length" in params_dict:
            infection_length = params_dict["infection_length"]
            ParamValues.validate_infection_length(infection_length)
        else:
            raise ValueError("Infection Length parameter missing.")

        # transmission rate check
        if "transmission_rate" in params_dict:
            transmission_rate = params_dict["transmission_rate"]
            ParamValues.validate_transmission_rate(transmission_rate)
        else:
            raise ValueError("Transmission Rate parameter missing.")

        # virulence check
        if "virulence" in params_dict:
            virulence = params_dict["virulence"]
            ParamValues.validate_virulence(virulence)
        else:
            raise ValueError("Virulence parameter missing.")

        # initial population check
        if "initial_population" in params_dict:
            initial_population = params_dict["initial_population"]
            ParamValues.validate_initial_population(initial_population)
        else:
            raise ValueError("Initial Population parameter missing.")

        # intial infected check
        if "initial_infected" in params_dict:
            initial_infected = params_dict["initial_infected"]
            ParamValues.validate_initial_infected(initial_infected, initial_population)
        else:
            raise ValueError("Initial Infected parameter missing.")

        # immmune percent check
        if "immune_percent" in params_dict:
            immune_percent = params_dict["immune_percent"]
            ParamValues.validate_immune_percent(immune_percent, initial_population, initial_infected)
        else:
            raise ValueError("Immune Percent parameter missing.")

        # simulation length check
        if "simulation_length" in params_dict:
            simulation_length = params_dict["simulation_length"]
            ParamValues.validate_simulation_length(simulation_length)
        else:
            raise ValueError("Simulation Length parameter missing.")

