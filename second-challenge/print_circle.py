def print_circle_with_radius_of(radius):
    if type(radius) is not int or radius < 1 or radius > 100:
        print("argument 'radius' must be an integer between 1 and 100.")
        return

    diameter = radius * 2
    jump = 2
    # TOP
    for value in range(radius, diameter, jump):
        indentation = ' ' * (diameter-value)
        symbols = '* ' * value
        print(indentation + symbols)
    # MIDDLE
    for value in range(0, radius):
        print('* ' * diameter)
    # BOTTOM
    for value in range(diameter, radius, -jump):
        indentation = ' ' * (diameter-value)
        symbols = '* ' * value
        print(indentation + symbols)


print_circle_with_radius_of(5)
