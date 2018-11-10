# Plague Project

###  Project Documents
[UI Mockup](https://wireframe.cc/MuMHXu)

### Requirements
Install [Node.js](https://nodejs.org/en/) (for React development)

Install [Python 3](https://www.python.org/downloads/) (for server)

## Python Tornado Server

### Installation & Setup

Install required Python modules 

```pip install -r requirements.txt``` 

("web" folder contains information for React) 

### Tornado Server

Run the _server.py_ file with Python

Optional PORT variable (default 8080)

Optional DEBUG variable (default false)

```PORT=9999 DEBUG=true python server.py```

## Plague API

Plague simulation endpoint

```
GET /plague
```

Query string parameters

| Parameter          | Type  | Description                             |
|--------------------|-------|-----------------------------------------|
| immune_percent     | Float | % of initial population that is immune  |
| transmission_rate  | Float | How infectious the disease is           |
| virulence          | Float | How fatal the disease is                |
| initial_infected   | Int   | Amount of people start as infected      |
| initial_population | Int   | Total starting population               |
| infection_length   | Int   | How long someone is infected for        |
| simulation_length  | Int   | How many days to run the simulation for |

Example

```
GET /plague?immune_percent=0.1&transmission_rate=0.2&virulence=0.25&initial_infected=500&initial_population=1000000&infection_length=100&simulation_length=365&preset=Custom
```