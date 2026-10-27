# Ask the user for two integer inputs
num1 = int(input("Enter the first number: "))
num2 = int(input("Enter the second number: "))

# Calculate and print the results
print(f"Sum: {num1 + num2}")
print(f"Difference: {num1 - num2}")
print(f"Product: {num1 * num2}")

# Handle division and remainder safely (avoiding division by zero)
if num2 != 0:
    print(f"Division: {num1 / num2}")
    print(f"Remainder: {num1 % num2}")
else:
    print("Division: Cannot divide by zero")
    print("Remainder: Cannot divide by zero")