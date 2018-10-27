'''
	This class tests that the implementation of the plague model conforms to the model contained in the Excel sheet, by ensuring that the values for the different aspects of the simulation computed by the implementation match those computed by the Excel sheet. 
'''
import unittest
from decimal import Decimal, getcontext, ROUND_HALF_UP

class TestPlagueModelExcel(unittest.TestCase):
	def setUp(self):
		from plague_sim.plague import Plague
		getcontext().rounding = ROUND_HALF_UP
		self.testParams = (2, 2, .05, 100000, .03, 1)
		self.sim_length = 20
		self.testModel = Plague(*self.testParams, "PlagueModelExcel")
		self.testModel.run_sim(self.sim_length)
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

	def test_day1_Susceptible(self):
		self.assertEqual(self.testModel.plague_simulation[1]['Susceptible'], self.excelComputed['day1']['Susceptible'])

	def test_day1_Infected(self):
		self.assertEqual(self.testModel.plague_simulation[1]['Infected'], self.excelComputed['day1']['Infected'])
		
	def test_day1_Immune(self):
		self.assertEqual(self.testModel.plague_simulation[1]['Immune'], self.excelComputed['day1']['Immune'])
		
	def test_day1_Dead(self):
		self.assertEqual(self.testModel.plague_simulation[1]['Dead'], self.excelComputed['day1']['Dead'])
		
	def test_day1_TotalPopulation(self):
		self.assertEqual(self.testModel.plague_simulation[1]['TotalPopulation'], self.excelComputed['day1']['TotalPopulation'])

	def test_day2_Susceptible(self):
		self.assertEqual(self.testModel.plague_simulation[2]['Susceptible'], self.excelComputed['day2']['Susceptible'])

	def test_day2_Infected(self):
		self.assertEqual(self.testModel.plague_simulation[2]['Infected'], self.excelComputed['day2']['Infected'])
		
	def test_day2_Immune(self):
		self.assertEqual(self.testModel.plague_simulation[2]['Immune'], self.excelComputed['day2']['Immune'])
		
	def test_day2_Dead(self):
		self.assertEqual(self.testModel.plague_simulation[2]['Dead'], self.excelComputed['day2']['Dead'])
		
	def test_day2_TotalPopulation(self):
		self.assertEqual(self.testModel.plague_simulation[2]['TotalPopulation'], self.excelComputed['day2']['TotalPopulation'])
		
#	def test_day7_Susceptible(self):
#		self.assertEqual(self.testModel.plague_simulation[7]['Susceptible'], self.excelComputed['day7']['Susceptible'])
#	
#	def test_day7_Infected(self):
#		self.assertEqual(self.testModel.plague_simulation[7]['Infected'], self.excelComputed['day7']['Infected'])
#	
#	def test_day7_Immune(self):
#		self.assertEqual(self.testModel.plague_simulation[7]['Immune'], self.excelComputed['day7']['Immune'])
#	
#	def test_day7_Dead(self):
#		self.assertEqual(self.testModel.plague_simulation[7]['Dead'], self.excelComputed['day7']['Dead'])
#	
#	def test_day7_TotalPopulation(self):
#		self.assertEqual(self.testModel.plague_simulation[7]['TotalPopulation'], self.excelComputed['day7']['TotalPopulation'])
#		
#	def test_day17_Susceptible(self):
#		self.assertEqual(self.testModel.plague_simulation[17]['Susceptible'], self.excelComputed['day17']['Susceptible'])
#	
#	def test_day17_Infected(self):
#		self.assertEqual(self.testModel.plague_simulation[17]['Infected'], self.excelComputed['day17']['Infected'])
#	
#	def test_day17_Immune(self):
#		self.assertEqual(self.testModel.plague_simulation[17]['Immune'], self.excelComputed['day17']['Immune'])
#	
#	def test_day17_Dead(self):
#		self.assertEqual(self.testModel.plague_simulation[17]['Dead'], self.excelComputed['day17']['Dead'])
#	
#	def test_day17_TotalPopulation(self):
#		self.assertEqual(self.testModel.plague_simulation[17]['TotalPopulation'], self.excelComputed['day17']['TotalPopulation'])
	
if __name__=='__main__':
	unittest.main()