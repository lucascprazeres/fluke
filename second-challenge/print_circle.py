def print_circle_with_radius_of(radius):
    if type(radius) is not int or radius < 1 or radius > 100:
        print('Invalid entry - radius must be an integer between 1 and 100')
        return

    # FIRST HALF OF THE CIRCLE
    # loop though a range of values until reach the radius of the circle
    # calculate the number of symbols to print
    # create a row made of blank spaces
    # place the symbols in the middle of the row
    # print the result

    # SECOND HALF OF THE CIRCLE
    #do the same, looping from the radius to the first value


print_circle_with_radius_of(5)
