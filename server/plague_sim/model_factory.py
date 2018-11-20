from .plague_model_excel import PlagueModelExcel

class ModelFactory:
    @staticmethod
    def create_disease_model(model_name):
        if model_name == "PlagueModelExcel":
            return PlagueModelExcel()
        return None