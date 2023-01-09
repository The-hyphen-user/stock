import json

# Open the JSON file
with open('d.json', 'r') as f:
  data = json.load(f)


# The total number of objects in the list
num_objects = len(data)

# The number of objects to include in each new file
chunk_size = 1000

# The index of the first object in the current chunk
start_index = 0

# Keep track of the file number
file_num = 1

# Loop through the data in chunks
while start_index < num_objects:
  # Calculate the end index for the current chunk
  end_index = start_index + chunk_size

  # Make sure the end index doesn't go past the end of the list
  if end_index > num_objects:
    end_index = num_objects

  # Get the current chunk of data
  chunk = data[start_index:end_index]

  # Open a new JSON file and write the chunk to it
  with open(f'data/data_{file_num}.json', 'w') as f:
    json.dump(chunk, f)

  # Increment the file number
  file_num += 1

  # Set the start index for the next chunk
  start_index = end_index