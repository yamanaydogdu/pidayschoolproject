import mpmath as mp

mp.mp.dps = 600
pi_str = str(mp.pi)

if __name__ == '__main__':
    print(pi_str[:1002])
