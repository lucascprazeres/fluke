import math


def print_circle_with_radius_of(radius):
    if type(radius) is not int or radius < 1 or radius > 100:
        print('Invalid entry - radius must be an integer between 1 and 100')
        return

    diameter = radius * 2
    jump = 2
    print(jump)
    # TOP
    for value in range(radius, diameter, jump):
        left_indent = ' ' * (diameter-value)
        symbols = '* ' * value
        print(left_indent + symbols)
    # MIDDLE
    for value in range(0, radius):
        left_indent = ' '
        symbols = '* ' * diameter
        print(symbols)
    # BOTTOM
    for value in range(diameter, radius, -jump):
        left_indent = ' ' * (diameter-value)
        symbols = '* ' * value
        print(left_indent + symbols)


print_circle_with_radius_of(5)
