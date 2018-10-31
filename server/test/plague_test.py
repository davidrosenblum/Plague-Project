'''
    This class tests the functionality of the PlagueParams class,
    ensuring it instantiates the passed parameters as expected 
    and correctly computes the values for the Day-0 of the simulation.
'''
import unittest
from ..plague_sim.plague_params import PlagueParams

class TestPlagueParams(unittest.TestCase):
    def setUp(self):
        self.testParams = PlagueParams(2, 2, .05, 100000, .03, 1)
        self.excelComputed = {
            'Susceptible' 		: 96999,
            'Infected'			: 1,
            'Immune'			: 3000,
            'Dead'				: 0,
            'TotalPopulation'	: 100000
        }
        
    def test_intantiated_InfectionLength(self):
        self.assertEqual(self.testParams.infection_length, 2)
    
    def test_instantiated_TransmissionRate(self):
        self.assertEqual(self.testParams.transmissionRate, 2)
        
    def test_instantiated_Virulence(self):
        self.assertEqual(self.testParams.virulence, .05)
    
    def test_instantiated_InitialPop(self):
        self.assertEqual(self.testParams.initial_pop, 100000)
        
    def test_instantiated_ImmunePercent(self):
        self.assertEqual(self.testParams.immune_percent, .03)
    
    def test_instantiated_InitialInfected(self):
        self.assertEqual(self.testParams.initial_infected, 1)
        
    def test_computed_Day0_Suceptible(self):
        self.assertEqual(self.testParams.day_zero['Susceptible'], self.excelComputed['Susceptible'])
        
    def test_computed_Day0_Infected(self):
        self.assertEqual(self.testParams.day_zero['Infected'], self.excelComputed['Infected'])
        
    def test_computed_Day0_Immune(self):
        self.assertEqual(self.testParams.day_zero['Immune'], self.excelComputed['Immune'])
        
    def test_computed_Day0_Dead(self):
        self.assertEqual(self.testParams.day_zero['Dead'], self.excelComputed['Dead'])
        
    def test_computed_Day0_TotalPopulation(self):
        self.assertEqual(self.testParams.day_zero['TotalPopulation'], self.excelComputed['TotalPopulation'])


if __name__ == '__main__':
    unittest.main()