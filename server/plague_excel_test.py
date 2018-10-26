'''
	This class tests that the implementation of the plague model conforms to the model contained in the Excel sheet, by ensuring that the values for the different aspects of the simulation computed by the implementation match those computed by the Excel sheet. 
'''
import unittest
from mpmath import mpf, mp

class TestPlagueModelExcel(unittest.TestCase):
	def setUp(self):
		from plague_sim.plague import Plague
		mp.dps = 8
		self.testParams = (2, 2, .05, 100000, .03, 1)
#		self.testParams = (2), mpf(2), mpf(.05), mpf(100000), mpf(.03), mpf(1))
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
#			'day1'  :
#				{
#					'Susceptible' 		: mpf(96997),
#					'Infected'			: mpf(2),
#					'Immune'			: mpf(3001),
#					'Dead'				: mpf(0),
#					'TotalPopulation'	: mpf(100000)
#				},
			'day7'  :
				{
					'Susceptible' 		: 96346,
					'Infected'			: 477,
					'Immune'			: 3169,
					'Dead'				: 8,
					'TotalPopulation'	: 99992
				},
#			'day7'  :
#				{
#					'Susceptible' 		: mpf(96346),
#					'Infected'			: mpf(477),
#					'Immune'			: mpf(3169),
#					'Dead'				: mpf(8),
#					'TotalPopulation'	: mpf(99992)
#				},
			'day17'  :
				{
					'Susceptible' 		: 143,
					'Infected'			: 5094,
					'Immune'			: 90393,
					'Dead'				: 4370,
					'TotalPopulation'	: 95630
				},
#			'day17'  :
#				{
#					'Susceptible' 		: mpf(143),
#					'Infected'			: mpf(5094),
#					'Immune'			: mpf(90393),
#					'Dead'				: mpf(4370),
#					'TotalPopulation'	: mpf(95630)
#				},
		}
	
	def test_day1_Susceptible(self):
		self.assertEqual(round(mpf(self.testModel.plague_simulation[1]['Susceptible'])), self.excelComputed['day1']['Susceptible'])
	
	def test_day1_Infected(self):
		self.assertEqual(round(mpf(self.testModel.plague_simulation[1]['Infected'])), self.excelComputed['day1']['Infected'])
	
	def test_day1_Immune(self):
		self.assertEqual(round(mpf(self.testModel.plague_simulation[1]['Immune'])), self.excelComputed['day1']['Immune'], f'((Raw value was {self.testModel.plague_simulation[1]["Immune"]}))')
	
	def test_day1_Dead(self):
		self.assertEqual(round(mpf(self.testModel.plague_simulation[1]['Dead'])), self.excelComputed['day1']['Dead'])
	
	def test_day1_TotalPopulation(self):
		self.assertEqual(round(mpf(self.testModel.plague_simulation[1]['TotalPopulation'])), self.excelComputed['day1']['TotalPopulation'])
		
	def test_day7_Susceptible(self):
		self.assertEqual(round(mpf(self.testModel.plague_simulation[7]['Susceptible'])), self.excelComputed['day7']['Susceptible'])
	
	def test_day7_Infected(self):
		self.assertEqual(round(mpf(self.testModel.plague_simulation[7]['Infected'])), self.excelComputed['day7']['Infected'])
	
	def test_day7_Immune(self):
		self.assertEqual(round(mpf(self.testModel.plague_simulation[7]['Immune'])), self.excelComputed['day7']['Immune'])
	
	def test_day7_Dead(self):
		self.assertEqual(round(mpf(self.testModel.plague_simulation[7]['Dead'])), self.excelComputed['day7']['Dead'])
	
	def test_day7_TotalPopulation(self):
		self.assertEqual(round(mpf(self.testModel.plague_simulation[7]['TotalPopulation'])), self.excelComputed['day7']['TotalPopulation'])
		
	def test_day17_Susceptible(self):
		self.assertEqual(round(mpf(self.testModel.plague_simulation[17]['Susceptible'])), self.excelComputed['day17']['Susceptible'])
	
	def test_day17_Infected(self):
		self.assertEqual(round(mpf(self.testModel.plague_simulation[17]['Infected'])), self.excelComputed['day17']['Infected'])
	
	def test_day17_Immune(self):
		self.assertEqual(round(mpf(self.testModel.plague_simulation[17]['Immune'])), self.excelComputed['day17']['Immune'])
	
	def test_day17_Dead(self):
		self.assertEqual(round(mpf(self.testModel.plague_simulation[17]['Dead'])), self.excelComputed['day17']['Dead'])
	
	def test_day17_TotalPopulation(self):
		self.assertEqual(round(mpf(self.testModel.plague_simulation[17]['TotalPopulation'])), self.excelComputed['day17']['TotalPopulation'])
	
if __name__=='__main__':
	unittest.main()