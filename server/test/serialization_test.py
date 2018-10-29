from ..plague_sim.plague_simulation import PlagueSimulation
from decimal import Decimal, getcontext, ROUND_HALF_UP

# Set context parameters for floating-point processing
getcontext().rounding = ROUND_HALF_UP
getcontext().prec     = 8
# Initialize the test parameters and run the simulation
testParams = (2, 2, .05, 100000, .03, 1)
sim_length = 20
testModel = PlagueSimulation()
testModel.create_plague(*testParams, model_length = sim_length)
testModel.run_plague_sim(sim_length)
# Print to the console the json-ed string representation of the plague_sim computed values
print(testModel.simulation_json)