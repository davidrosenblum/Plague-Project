# utility class hat extracts parameters from a request's query string arguments
# and makes sure they are in range, correct type (int vs float) and all defined

from . import ParamValues


class ParamExtractor:
    EXPECTED_REQUEST_PARAMS = (
        "infection_length",
        "transmission_rate",
        "initial_population",
        "initial_infected",
        "virulence",
        "immune_percent",
        "simulation_length"
    )

    @staticmethod
    def extract_and_validate(req_handler):
        # results go in this dict
        extracted_params = {}

        # make sure each param meets
        for param in ParamExtractor.EXPECTED_REQUEST_PARAMS:
            raw_val = req_handler.get_argument(param, None)

            if raw_val is not None:
                extracted_params[param] = raw_val
            else:
                raise TypeError("Argument required for parameter {p}.".format(p=param))

        # convert infection length
        try:
            extracted_params["infection_length"] = int(extracted_params["infection_length"])
        except ValueError:
            raise ValueError("Infection Length must be of type int.")

        # convert transmission rate
        try:
            extracted_params["transmission_rate"] = float(extracted_params["transmission_rate"])
        except ValueError:
            raise ValueError("Transmission Rate must be of type float.")

        # convert virulence
        try:
            extracted_params["virulence"] = float(extracted_params["virulence"])
        except ValueError:
            raise ValueError("Virulence must be of type float.")

        # convert immune percent
        try:
            extracted_params["immune_percent"] = float(extracted_params["immune_percent"])
        except ValueError:
            raise ValueError("Immune Percent must be of type float.")

        # convert initial population
        try:
            extracted_params["initial_population"] = int(extracted_params["initial_population"])
        except ValueError:
            raise ValueError("Initial Population must be of type int.")

        # convert initial infected
        try:
            extracted_params["initial_infected"] = int(extracted_params["initial_infected"])
        except ValueError:
            raise ValueError("Initial Infected must be of type int.")

        # convert simulation length
        try:
            extracted_params["simulation_length"] = int(extracted_params["simulation_length"])
        except ValueError:
            raise ValueError("Simulation Length must be of type int.")

        # types at this point are valid, make sure they are in range
        ParamValues.validate_all_params(extracted_params)

        # return results
        return extracted_params
