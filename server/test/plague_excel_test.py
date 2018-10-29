'''
	This class tests that the implementation of the plague model conforms to the model contained in the Excel sheet, by ensuring that the values for the different aspects of the simulation computed by the implementation match those computed by the Excel sheet. 
'''
import unittest
from ..plague_sim.plague import Plague
from decimal import Decimal, getcontext, ROUND_HALF_UP

class TestPlagueModelExcel(unittest.TestCase):
	def setUp(self):
		# Set context parameters for floating-point processing
		getcontext().rounding = ROUND_HALF_UP
		getcontext().prec     = 8
		# Initialize the test parameters and run the simulation
		self.testParams = (2, 2, .05, 100000, .03, 1)
		self.sim_length = 20
		self.testModel = Plague(*self.testParams, "PlagueModelExcel")
		self.testModel.run_sim(self.sim_length)
		# Manually copy over the values computed by the Excel spreadsheet given the above parameters
		self.excelComputed = {
			'day1'  :
				{
					'Susceptible' 		: 96997,
					'Infected'			: 2,
					'Immune'			: 3001,
					'Dead'				: 0,
					'TotalPopulation'	: 100000
				},
			'day2'  :
				{
					'Susceptible' 		: 96992,
					'Infected'			: 6,
					'Immune'			: 3002,
					'Dead'				: 0,
					'TotalPopulation'	: 100000
				},
			'day7'  :
				{
					'Susceptible' 		: 96346,
					'Infected'			: 477,
					'Immune'			: 3169,
					'Dead'				: 8,
					'TotalPopulation'	: 99992
				},
			'day17'  :
				{
					'Susceptible' 		: 143,
					'Infected'			: 5094,
					'Immune'			: 90393,
					'Dead'				: 4370,
					'TotalPopulation'	: 95630
				}
		}
		
# -------- RAW VALUE COMPARISONS

### DAY 1
#
#	def test_day1_Susceptible(self):
#		self.assertEqual(self.testModel.plague_simulation_raw[1]['Susceptible'], self.excelComputed['day1']['Susceptible'])
#
#	def test_day1_Infected(self):
#		self.assertEqual(self.testModel.plague_simulation_raw[1]['Infected'], self.excelComputed['day1']['Infected'])
#		
#	def test_day1_Immune(self):
#		self.assertEqual(self.testModel.plague_simulation_raw[1]['Immune'], self.excelComputed['day1']['Immune'])
#		
#	def test_day1_Dead(self):
#		self.assertEqual(self.testModel.plague_simulation_raw[1]['Dead'], self.excelComputed['day1']['Dead'])
#		
#	def test_day1_TotalPopulation(self):
#		self.assertEqual(self.testModel.plague_simulation_raw[1]['TotalPopulation'], self.excelComputed['day1']['TotalPopulation'])
##
### DAY 2
##
#	def test_day2_Susceptible(self):
#		self.assertEqual(self.testModel.plague_simulation_raw[2]['Susceptible'], self.excelComputed['day2']['Susceptible'])
#
#	def test_day2_Infected(self):
#		self.assertEqual(self.testModel.plague_simulation_raw[2]['Infected'], self.excelComputed['day2']['Infected'])
#		
#	def test_day2_Immune(self):
#		self.assertEqual(self.testModel.plague_simulation_raw[2]['Immune'], self.excelComputed['day2']['Immune'])
#		
#	def test_day2_Dead(self):
#		self.assertEqual(self.testModel.plague_simulation_raw[2]['Dead'], self.excelComputed['day2']['Dead'])
#		
#	def test_day2_TotalPopulation(self):
#		self.assertEqual(self.testModel.plague_simulation_raw[2]['TotalPopulation'], self.excelComputed['day2']['TotalPopulation'])
#	
## DAY 7
#		
#	def test_day7_Susceptible(self):
#		self.assertEqual(self.testModel.plague_simulation_raw[7]['Susceptible'], self.excelComputed['day7']['Susceptible'])
#	
#	def test_day7_Infected(self):
#		self.assertEqual(self.testModel.plague_simulation_raw[7]['Infected'], self.excelComputed['day7']['Infected'])
#	
#	def test_day7_Immune(self):
#		self.assertEqual(self.testModel.plague_simulation_raw[7]['Immune'], self.excelComputed['day7']['Immune'])
#	
#	def test_day7_Dead(self):
#		self.assertEqual(self.testModel.plague_simulation_raw[7]['Dead'], self.excelComputed['day7']['Dead'])
#	
#	def test_day7_TotalPopulation(self):
#		self.assertEqual(self.testModel.plague_simulation_raw[7]['TotalPopulation'], self.excelComputed['day7']['TotalPopulation'])
#
## DAY 17
#		
#	def test_day17_Susceptible(self):
#		self.assertEqual(self.testModel.plague_simulation_raw[17]['Susceptible'], self.excelComputed['day17']['Susceptible'])
#	
#	def test_day17_Infected(self):
#		self.assertEqual(self.testModel.plague_simulation_raw[17]['Infected'], self.excelComputed['day17']['Infected'])
#	
#	def test_day17_Immune(self):
#		self.assertEqual(self.testModel.plague_simulation_raw[17]['Immune'], self.excelComputed['day17']['Immune'])
#	
#	def test_day17_Dead(self):
#		self.assertEqual(self.testModel.plague_simulation_raw[17]['Dead'], self.excelComputed['day17']['Dead'])
#	
#	def test_day17_TotalPopulation(self):
#		self.assertEqual(self.testModel.plague_simulation_raw[17]['TotalPopulation'], self.excelComputed['day17']['TotalPopulation'])

# -------- ROUNDED-VALUE COMPARISONS

# DAY 1

	def test_day1_Susceptible(self):
		self.assertEqual(self.testModel.plague_simulation_raw[1]['Susceptible'].to_integral(), self.excelComputed['day1']['Susceptible'])
	
	def test_day1_Infected(self):
		self.assertEqual(self.testModel.plague_simulation_raw[1]['Infected'].to_integral(), self.excelComputed['day1']['Infected'])
	
	def test_day1_Immune(self):
		self.assertEqual(self.testModel.plague_simulation_raw[1]['Immune'].to_integral(), self.excelComputed['day1']['Immune'], f'((Raw value was {self.testModel.plague_simulation_raw[1]["Immune"]}))')
	
	def test_day1_Dead(self):
		self.assertEqual(self.testModel.plague_simulation_raw[1]['Dead'].to_integral(), self.excelComputed['day1']['Dead'])
	
	def test_day1_TotalPopulation(self):
		self.assertEqual(self.testModel.plague_simulation_raw[1]['TotalPopulation'].to_integral(), self.excelComputed['day1']['TotalPopulation'])

# DAY 2

	def test_day2_Susceptible(self):
		self.assertEqual(self.testModel.plague_simulation_raw[2]['Susceptible'].to_integral(), self.excelComputed['day2']['Susceptible'])
	
	def test_day2_Infected(self):
		self.assertEqual(self.testModel.plague_simulation_raw[2]['Infected'].to_integral(), self.excelComputed['day2']['Infected'])
	
	def test_day2_Immune(self):
		self.assertEqual(self.testModel.plague_simulation_raw[2]['Immune'].to_integral(), self.excelComputed['day2']['Immune'])
	
	def test_day2_Dead(self):
		self.assertEqual(self.testModel.plague_simulation_raw[2]['Dead'].to_integral(), self.excelComputed['day2']['Dead'])
	
	def test_day2_TotalPopulation(self):
		self.assertEqual(self.testModel.plague_simulation_raw[2]['TotalPopulation'].to_integral(), self.excelComputed['day2']['TotalPopulation'])

# DAY 7

	def test_day7_Susceptible(self):
		self.assertEqual(self.testModel.plague_simulation_raw[7]['Susceptible'].to_integral(), self.excelComputed['day7']['Susceptible'])
	
	def test_day7_Infected(self):
		self.assertEqual(self.testModel.plague_simulation_raw[7]['Infected'].to_integral(), self.excelComputed['day7']['Infected'])
	
	def test_day7_Immune(self):
		self.assertEqual(self.testModel.plague_simulation_raw[7]['Immune'].to_integral(), self.excelComputed['day7']['Immune'])
	
	def test_day7_Dead(self):
		self.assertEqual(self.testModel.plague_simulation_raw[7]['Dead'].to_integral(), self.excelComputed['day7']['Dead'])
	
	def test_day7_TotalPopulation(self):
		self.assertEqual(self.testModel.plague_simulation_raw[7]['TotalPopulation'].to_integral(), self.excelComputed['day7']['TotalPopulation'])

# DAY 17
		
	def test_day17_Susceptible(self):
		self.assertEqual(self.testModel.plague_simulation_raw[17]['Susceptible'].to_integral(), self.excelComputed['day17']['Susceptible'])
	
	def test_day17_Infected(self):
		self.assertEqual(self.testModel.plague_simulation_raw[17]['Infected'].to_integral(), self.excelComputed['day17']['Infected'])
	
	def test_day17_Immune(self):
		self.assertEqual(self.testModel.plague_simulation_raw[17]['Immune'].to_integral(), self.excelComputed['day17']['Immune'])
	
	def test_day17_Dead(self):
		self.assertEqual(self.testModel.plague_simulation_raw[17]['Dead'].to_integral(), self.excelComputed['day17']['Dead'])
	
	def test_day17_TotalPopulation(self):
		self.assertEqual(self.testModel.plague_simulation_raw[17]['TotalPopulation'].to_integral(), self.excelComputed['day17']['TotalPopulation'])
	
if __name__=='__main__':
	unittest.main()
#	from plague_sim.plague import Plague
#	testParams = (2, 2, .05, 100000, .03, 1)
#	sim_length = 20
#	testModel = Plague(*testParams, "PlagueModelExcel")
#	testModel.run_sim(sim_length)
#	from tabulate import tabulate
#	print(tabulate([[f'Day {index}']+list(day.values()) for index, day in enumerate(testModel.plague_simulation)], headers=['Day #', 'Susceptible', 'Infected', 'Immune', 'Dead', 'Total Pop'], tablefmt='grid'))
	
	