def print_circle_with_radius_of(radius):
    if type(radius) is not int or radius < 1 or radius > 100:
        print("argument 'radius' must be an integer between 1 and 100.")
        return

    diameter = 2 * radius
    print('\n')

    for y in range(1, diameter+1):
        for x in range(1, diameter+1):
            pos_y = (y-radius)**2
            pos_x = (x-radius)**2
            if abs(pos_x + pos_y) < radius**2:
                print('* ', end="")
            else:
                if x == diameter:
                    print('')
                else:
                    print('  ', end="")


print_circle_with_radius_of(5)
