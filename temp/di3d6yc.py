import sys

# Accept input as a command-line argument
if len(sys.argv) > 1:
    val = sys.argv[1]
else:
    val = input("Enter your value: ")

print(val)
