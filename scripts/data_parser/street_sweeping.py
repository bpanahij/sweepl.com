import json
import re

# Read the data from the CSV file
with open('Street_Sweeping_Schedule.csv', 'r') as file:
    data = file.readlines()

# Remove the header
data = data[1:]

result = []

# Process each line
for line in data:
    print("")

    linestring = line.strip().split("LINESTRING (")
    if (len(linestring) < 2):
        continue
    print(linestring)
    linestring = linestring[1].replace(')','').replace("\"","")
    print("ls", linestring)
    line = line.strip().split(',')
    # print("line", line)
    weeks = sum(map(int, line[9:14]))
    # print("weeks", weeks)
    # Extract coordinates from the LINESTRING
    points = [item.split() for item in  linestring.strip().split(', ')]
    # filtered_items = [item for item in split_items if len(item) > 2]
    print("coordinates", points)
    # continue
    # points = [coordinates[i:i + 2] for i in range(0, len(coordinates), 2)]
    # print(points)

    # Calculate the center of the line segment
    if points:
        lat = sum(float(point[1]) for point in points) / len(points)
        lon = sum(float(point[0]) for point in points) / len(points)
        center_point = [lat, lon]

        # Duplicate the center point based on the number of weeks
        for _ in range(weeks):
            result.append(center_point)

# Write the resulting JSON data to a file
with open('output.json', 'w') as outfile:
    json.dump(result, outfile, indent=4)
