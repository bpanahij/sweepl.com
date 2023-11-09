import json
import matplotlib.pyplot as plt
import os

# Load JSON data
file_path = os.path.join(os.path.dirname(__file__), '../src/pages/results.json')
with open(file_path, 'r') as file:
    data = json.load(file)
    
#Transform data into list of tuples
locations = [(coordinate[0], coordinate[1]) for coordinate in data]

# Test: Plot coordinates using Matplotlib
# TODO: try out Folium (meh), GeoPandas
lats = [location[0] for location in locations]
longs = [location[1] for location in locations]

plt.scatter(longs, lats, c='red', marker='o')
plt.xlabel('Longitude')
plt.ylabel('Latitude')
plt.title('Illegal Trash Dumping Locations in San Francisco')
plt.show()

'''
Current: sweepl.com/analysis
Dest: sweepl.com/src/pages
'''